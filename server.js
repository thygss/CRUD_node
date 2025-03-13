require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey";

app.use(express.json());
app.use(cors());


app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado" });
    }

    console.log("Senha armazenada no banco:", user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Senha válida?", isPasswordValid);

    if (!isPasswordValid) {
        return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
});


const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Acesso negado" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Token inválido" });
        req.user = user;
        next();
    });
};

app.get("/products", authenticateToken, async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

app.post("/products", authenticateToken, async (req, res) => {
    let { name, description, price, category, stock } = req.body;

    try {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),  // Converte price para número decimal
                category,
                stock: parseInt(stock)  // Converte stock para número inteiro
            }
        });

        res.json(product);
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        res.status(500).json({ error: "Erro ao criar produto" });
    }
});

app.put("/products/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const product = await prisma.product.update({
        where: { id: parseInt(id) },
        data: { name, description, price: parseFloat(price), category, stock },
    });
    res.json(product);
});

app.delete("/products/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Produto deletado com sucesso" });
});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));
