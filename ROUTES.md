# Documentação das rotas

As rotas de autenticação estão sob o prefixo `/auth` e as rotas de tarefas estão sob `/tasks`.

## Autenticação

### POST /auth/register
- Descrição: cadastra um novo usuário.
- Requer body:
  - `name` (string)
  - `email` (string)
  - `password` (string)
  - `role` (string, opcional, valores: `professor` ou `aluno`)
- Retorno:
  - `201` em caso de sucesso: `{ message: "Usuário cadastrado com sucesso" }`
  - `400` em caso de campos faltando ou erro de validação.

### POST /auth/login
- Descrição: autentica um usuário e retorna token JWT.
- Requer body:
  - `email` (string)
  - `password` (string)
- Retorno:
  - `200` em caso de sucesso: `{ token: "<jwt>" }`
  - `400` em caso de credenciais inválidas ou campos faltando.

## Perfil

### GET /auth/profile
- Descrição: retorna dados básicos do usuário autenticado.
- Requer header:
  - `Authorization: Bearer <token>`
- Retorno:
  - `200` em caso de sucesso:
    ```json
    {
      "message": "Perfil acessado com sucesso!",
      "user": {
        "id": <id>,
        "email": "<email>"
      }
    }
    ```
  - `401` se o token não for fornecido ou for inválido.

## Tarefas

Todas as rotas de tarefa exigem autenticação com JWT via header `Authorization: Bearer <token>`.

### POST /tasks
- Descrição: cria uma nova tarefa.
- Permissão: apenas `professor`.
- Requer body:
  - `title` (string)
  - `description` (string)
- Retorno:
  - `201` em caso de sucesso: `{ message: "Tarefa criada com sucesso" }`
  - `403` se o usuário não for professor.
  - `400` se faltar título ou descrição.

### GET /tasks
- Descrição: retorna tarefas para o usuário autenticado.
- Comportamento:
  - Se o usuário for `professor`: retorna tarefas criadas por ele.
  - Se o usuário for `aluno`: retorna tarefas com o status de progresso (`completed`).
- Parâmetros opcionais:
  - `page` (número, default `1`)
  - `perPage` (número, default `10`)
  - `completed` (`true`/`false`) — filtra se a tarefa está feita ou não (apenas alunos)
  - `status` (`pending`/`done`) — apenas um alias mais legível para o mesmo filtro `completed`
- Retorno:
  - `200` em caso de sucesso: `{ tasks: [...] }`
  - `400` em caso de erro no servidor.

### PUT /tasks/:id
- Descrição: atualiza uma tarefa existente.
- Permissão: apenas `professor` (criador da tarefa).
- Requer params:
  - `id` (ID da tarefa)
- Requer body:
  - `title` (string)
  - `description` (string)
- Retorno:
  - `200` em caso de sucesso: `{ message: "Tarefa atualizada com sucesso" }`
  - `400` se faltar título ou descrição.
  - `403` se o usuário não for professor.
  - `400` se a tarefa não for encontrada ou o criador for diferente.

### PUT /tasks/:taskId/progress
- Descrição: atualiza uma tarefa existente para feito.
- Permissão: apenas `aluno` podem alterar o status.
- Requer params: 
  - `id` (ID da tarefa)
- Requer body:
  - `complete` (boolean)
- Retorno:
- `200` em caso de sucesso: `{ message: "Tarefa marcada como concluída" }`

### DELETE /tasks/:id
- Descrição: deleta uma tarefa.
- Permissão: apenas `professor` (criador da tarefa).
- Requer params:
  - `id` (ID da tarefa)
- Retorno:
  - `200` em caso de sucesso: `{ message: "Tarefa deletada com sucesso" }`
  - `403` se o usuário não for professor.
  - `400` se a tarefa não for encontrada ou o criador for diferente.

## Observações
- O middleware de autenticação adiciona o usuário ao request como `(req as any).user`.
- A estrutura esperada no token JWT inclui pelo menos:
  - `userId` ou `id`
  - `email`
  - `role`
- O prefixo global de rotas é definido em `src/app.ts` com `app.use('/auth', router)`.
