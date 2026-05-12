# Sistema de gestão para petshop

Este ExecPlan é um documento vivo. O sistema PETCARE+ é uma aplicação web e mobile desenvolvida para auxiliar tutores de pets no gerenciamento da saúde e dos cuidados de seus animais.

## Purpose / Big Picture
Objetivo: O objetivo do sistema PETCARE+ é fornecer uma solução digital eficiente para o controle e acompanhamento dos cuidados de pets, permitindo que tutores:
- Registrem e mantenham atualizadas informações de seus animais.
- Gerenciem vacinas, consultas e medicações.
- Recebam notificações automáticas para evitar esquecimentos.
- Tenham acesso rápido ao histórico completo de saúde dos pets.

Como objetivo secundário, o sistema visa:
- Reduzir riscos à saúde dos animais causados por falhas no acompanhamento.
- Minimizar custos com tratamentos emergenciais evitáveis.
- Melhorar a organização e a experiência dos tutores no cuidado diário.

No contexto de evolução do sistema, o PETCARE+ também pretende integrar funcionalidades que conectem usuário a pet shops e serviços veterinários, ampliando o valor entregue pela plataforma.

## Progress
- [x] backend iniciado
- [x] construir backend a partir do arquivo migration.sql e seeders.sql
- [x] README.md com instruções para rodar o backend
- [ ] testar o backend (DB + rotas principais)

## Surprises & Discoveries
- (2026-05-06) `migration.sql` e `seeders.sql` estão em `backend/src/database/` (não no diretório `prisma/`). 
- (2026-05-06) `backend/package.json` apontava para `src/server.js`, mas o arquivo não existia (havia apenas `backend/server.js` fora de `src/`).
- (2026-05-06) `backend/prisma/schema.prisma` estava com `provider = "postgresql"`, mas o stack do projeto (e o SQL) é MySQL.
- (2026-05-06) Prisma v7 exige Driver Adapter para MySQL; foi necessário ajustar para Prisma v6 para manter setup simples (MySQL local + `DATABASE_URL`).

## Decision Log
- (2026-05-06) Adotar Prisma + MySQL para mapear o schema do `migration.sql` e expor endpoints básicos de leitura/criação.
- (2026-05-06) Criar scripts Node (`npm run db:migrate` e `npm run db:seed`) para aplicar `migration.sql`/`seeders.sql` via `mysql2`, evitando dependência de CLI externo.
- (2026-05-06) Fixar Prisma em v6 (`@prisma/client` e `prisma`) para evitar a exigência de Driver Adapter no MySQL local.

## Outcomes & Retrospective
Resumo final

## Context and Orientation
O projeto acabou de começar.

## Plan of Work
Aproveitar a estrutura do backend já construída e chegar no objetivo de big picture.

## Concrete Steps
1. Ajustar schema do Prisma para MySQL conforme `migration.sql`.
2. Criar servidor Express em `backend/src/server.js` com rotas mínimas.
3. Criar scripts `db:migrate` e `db:seed` para executar os SQLs.
4. Documentar execução no `README.md`.
5. Validar com MySQL local e chamadas HTTP.

## Validation and Acceptance
- Com MySQL rodando:
  - `cd backend`
  - `npm install`
  - Ajustar `DATABASE_URL` em `backend/.env`
  - `npm run db:migrate`
  - `npm run db:seed`
  - `npm run prisma:generate`
  - `npm run dev`
- Aceite mínimo:
  - `GET /api/health` responde `ok: true`
  - `GET /api/users` e `GET /api/pets` retornam dados (após seed)

## Idempotence and Recovery
- Repetição: `db:migrate` deve ser executado em DB vazio. Em DB já existente pode falhar por tabelas já criadas.
- Recuperação: para reset rápido em dev, apagar o schema (dropar o DB) e reaplicar `db:migrate` + `db:seed`.

## Artifacts and Notes
- Arquivos principais:
  - `backend/src/database/migration.sql`
  - `backend/src/database/seeders.sql`
  - `backend/prisma/schema.prisma`
  - `backend/src/server.js`
  - `README.md`
- Comandos usados (2026-05-06):
  - `rg -n "migration\\.sql|seeders\\.sql" -S .`
  - `git status --porcelain=v1`
  - `git checkout -- docs/srs.txt`
  - `cd backend; npm install`
  - `cd backend; npx prisma generate`
  - Smoke test (sem DB válido): start do server + `GET /api` e `GET /api/health` (retornou `db: down` por credenciais inválidas no `DATABASE_URL`).

## Interfaces and Dependencies
- Node.js
- JavaScript
- Express
- Prisma
- CORS
- MySQL
- MySQL2
- Nodemon
