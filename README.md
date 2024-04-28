# Telephone Directory Server
### Agenda telefônica

## Tecnologias Utilizadas

- **Adonis.JS**
- **Prisma**
- **PostgreSQL**
- **Docker**

<p align="center">
  <img src="https://skillicons.dev/icons?i=adonis,prisma,postgres,docker" alt="techs">
</p>

## Regras de Negócio

### 1. Acesso ao Sistema
Apenas usuários administradores têm permissão para utilizar o sistema.

### 2. Gerenciamento de Usuários
Usuários administradores têm autorização para realizar as seguintes operações relacionadas a usuários:
- Visualizar informações de usuários
- Criar novos usuários
- Excluir usuários existentes
- Editar informações de usuários

### 3. Gerenciamento de Listas de Números de Telefone
Usuários administradores têm permissão para gerenciar listas de números de telefone associadas a cada usuário, incluindo:
- Visualizar listas de números de telefone de usuários
- Criar novas listas de números de telefone
- Editar listas de números de telefone existentes

## Diagramas do Banco de Dados

<p align="center">
  <img src="https://raw.githubusercontent.com/marcosdanielr/telephone-directory-server/d7e513467529aeda5f44183e950b741919efd60e/tmp/images/ERD.svg" alt="Diagrama do Banco de Dados" width="50%">
</p>

## Requisitos

- **Node.js:** Versão recomendada é a 20.12.2 (LTS).

## Instalação e Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/marcosdanielr/telephone-directory-server.git
   cd telephone-directory-server

# Instalação e Configuração

## Instale as dependências:
```bash
npm install
```

## Certifique-se de ter o Docker instalado e execute:
```bash
docker compose up -d
```

## Aplique as migrações do Prisma:
```bash
npx prisma migrate dev
```

## Inicie o servidor:
```bash
npm run dev
```

# Rotas

## POST: /api/auth
- **Corpo da requisição:** `{ "email": "example@example.com", "password": "senha123" }`
- **Descrição:** Rota de login. Não requer autenticação.

## GET: /api/users?page=1
- **Descrição:** Lista todos os usuários cadastrados.

## POST: /api/users
- **Corpo da requisição:** `{ "name": "Nome", "email": "example@example.com", "password": "senha123", "role": "USER" }`
- **Descrição:** Cria um novo usuário administrador.

## DELETE: /api/users/:id
- **Descrição:** Exclui um usuário pelo ID.

## PATCH: /api/users/:id
- **Corpo da requisição:** `{ "name": "Novo Nome", "email": "novo@example.com", "password": "novasenha123", "role": "USER" }`
- **Descrição:** Atualiza um usuário existente.

## POST: /api/users/phone_numbers
- **Corpo da requisição:** `{ "user_id": 1, "number": "123456789" }`
- **Descrição:** Cadastra um número de telefone para um usuário.

## GET: /api/users/:user_id/phone_numbers
- **Descrição:** Lista os números de telefone de um usuário.

## DELETE: /api/users/phone_numbers/:id
- **Descrição:** Exclui um número de telefone pelo ID.

## PATCH: /api/users/phone_numbers/:id
- **Corpo da requisição:** `{ "number": "987654321" }`
- **Descrição:** Atualiza um número de telefone existente.

Todas as informações devem ser enviadas no formato JSON no corpo da requisição.

# Melhorias Futuras
- Criar documentação com Swagger.
- Separar as rotas em arquivos individuais.
- Adicionar rate limiter para evitar ataques.

