# PETCARE+

## Backend (API)

### Pré-requisitos
- Node.js (recomendado: 18+)
- MySQL 8+

### Configuração
1. Entre no diretório do backend:
   - `cd backend`
2. Instale as dependências:
   - `npm install`
3. Configure o banco:
   - Edite `backend/.env` e ajuste `DATABASE_URL` (formato `mysql://USER:PASS@HOST:PORT/petshop`)
4. Crie as tabelas a partir do `migration.sql`:
   - `npm run db:migrate`
5. Popule dados iniciais a partir do `seeders.sql`:
   - `npm run db:seed`
6. Gere o client do Prisma:
   - `npm run prisma:generate`

### Rodando
- Desenvolvimento (hot reload):
  - `npm run dev`
- Produção:
  - `npm start`

### Endpoints
- `GET /api` (info)
- `GET /api/health` (saúde do serviço + status do DB)
- `GET /api/users` | `POST /api/users`
- `GET /api/pets` | `POST /api/pets`
- `GET /api/appointments` | `POST /api/appointments`

