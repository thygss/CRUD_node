# CRUD de Produtos com Node.js e React

## 📌 Descrição
Este projeto é um sistema de cadastro de produtos com funcionalidades de criação, leitura, edição e exclusão (CRUD). Ele utiliza um backend em Node.js com Express e Prisma, um banco de dados MySQL e um frontend em React para a interface do usuário.

---

## 🚀 Tecnologias Utilizadas
- **Backend:** Node.js, Express, Prisma, MySQL
- **Frontend:** React, Axios

---

## 🛠 Como Rodar o Projeto

### 🔹 1. Configurar o Banco de Dados
No diretório do backend, execute o seguinte comando para criar as tabelas no banco de dados:
"npx prisma migrate dev --name init"


### 🔹 2. Rodar o Backend
"cd backend
npm install
npm start"


O backend rodará na porta `5000`.

### 🔹 3. Rodar o Frontend
"cd frontend
npm install
npm start"

O frontend rodará na porta `3000`.

---

## 📡 Endpoints da API
### 🔍 **GET /products**
Retorna todos os produtos cadastrados.

### ➕ **POST /products**
Cria um novo produto. Exemplo de requisição:
```json
{
  "name": "Teclado Mecânico",
  "description": "Teclado mecânico RGB",
  "price": 299.99,
  "category": "Periféricos",
  "stock": 10
}
```

### ✏ **PUT /products/:id**
Atualiza um produto existente. Exemplo de requisição:
```json
{
  "name": "Teclado Gamer",
  "description": "Teclado mecânico com switches vermelhos",
  "price": 349.99,
  "category": "Periféricos",
  "stock": 8
}
```

### ❌ **DELETE /products/:id**
Exclui um produto pelo ID.

---
### ❌ **DELETE /products/:id**