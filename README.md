# 🚀 API REST com Express, TypeScript e MySQL

Este projeto consiste no desenvolvimento de uma API REST utilizando Node.js, Express e TypeScript, com integração a banco de dados MySQL.

O objetivo é aplicar conceitos fundamentais de desenvolvimento web, incluindo:
- criação de rotas e controllers  
- organização em camadas (controller, service, repository)  
- autenticação com JWT  
- persistência de dados em banco relacional  
- uso de variáveis de ambiente  
- controle de versão com Git  

---

## ⚡ Como rodar rapidamente

```bash
npm install
cp .env.example .env
npm run dev
```

---

## 📋 Funcionalidades

- Registro de usuários  
- Login com geração de token JWT  
- Autenticação via middleware  
- Consulta de perfil do usuário autenticado  
- Integração com banco de dados MySQL  

---

## 🧰 Pré-requisitos

- Node.js (versão 14 ou superior)  
- MySQL instalado e rodando localmente  

> ⚠️ Importante: você precisa ter um usuário e senha válidos no MySQL

---

## ⚙️ Configuração

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd projeto
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o ambiente:

```bash
cp .env.example .env
```

Você também pode renomear manualmente o arquivo `.env.example` para `.env`, mas o comando acima é o mais recomendado.

Agora edite o arquivo `.env` com suas credenciais do MySQL:

```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_NAME=registerapi
DB_PORT=3306
JWT_SECRET=sua_chave_secreta_jwt
```

---

## 🗄️ Setup do banco de dados

Execute o comando:

```bash
npm run migration:run
```

Esse script irá automaticamente criar o banco de dados (caso não exista) e criar as tabelas necessárias.

---

## ▶️ Executando o projeto

```bash
npm run dev
```

O servidor será iniciado na porta definida no `.env`.

---

## 🔐 Endpoints da API

### Autenticação

- POST /auth/register → Registrar usuário  
- POST /auth/login → Login  

### Usuário

- GET /auth/profile → Obter perfil do usuário (requer token JWT no header Authorization)

---

## 📁 Estrutura do Projeto

```
src/
  app.ts
  server.ts
  modules/
    auth/
      auth.controller.ts
      auth.service.ts
      auth.repository.ts
    user/
      user.controller.ts
  middleware/
  database/

migrations/
  migration.js
  001_create_user_table.sql
```

---

## ⚠️ Possíveis erros

Erro de conexão com o banco:
- Verifique se o MySQL está rodando  
- Verifique usuário e senha no `.env`  

Erro "Unknown database":
- O comando `npm run migration:run` deve resolver automaticamente  

---

## 📦 Dependências principais

- Express  
- TypeScript  
- MySQL2  
- bcryptjs  
- jsonwebtoken  
- dotenv  

---

## 🎯 Conclusão

O projeto demonstra de forma prática a aplicação dos principais conceitos de desenvolvimento backend, incluindo integração com banco de dados, autenticação segura com JWT e organização em camadas.

A estrutura modular adotada facilita a manutenção e evolução do sistema, permitindo a adição de novas funcionalidades de forma organizada, ao mesmo tempo em que atende aos requisitos propostos para o desenvolvimento de um software web com controle de versão e persistência de dados.