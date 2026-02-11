# ⚡ Guia de Início Rápido

## Setup em 5 minutos

### 1️⃣ Instalar Dependências
\`\`\`bash
# Backend
npm install

# Frontend
cd frontend && npm install && cd ..
\`\`\`

### 2️⃣ Configurar .env
\`\`\`bash
cp .env.example .env
\`\`\`

**Edite o .env com:**
- MongoDB URI (local ou Atlas)
- JWT_SECRET (qualquer string aleatória)
- Chaves do Stripe (modo teste)

### 3️⃣ Iniciar MongoDB
\`\`\`bash
# Opção 1: Local
mongod

# Opção 2: Docker
docker run -d -p 27017:27017 mongo

# Opção 3: MongoDB Atlas (cloud grátis)
# Use a URI do Atlas no .env
\`\`\`

### 4️⃣ Rodar o Projeto
\`\`\`bash
npm run dev
\`\`\`

### 5️⃣ Acessar
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🎯 Primeiros Passos

1. **Criar conta** em /register
2. **Fazer login** em /login
3. **Explorar dashboard** em /dashboard
4. **Ver planos** em /pricing

## 🔑 Credenciais de Teste

Após criar sua conta, você terá:
- 7 dias de trial grátis
- Acesso a todas as funcionalidades do plano Trial

## ⚙️ Stripe (Modo Teste)

1. Acesse [stripe.com/br](https://stripe.com/br)
2. Crie uma conta grátis
3. Copie as chaves de **teste**:
   - Publishable key: pk_test_...
   - Secret key: sk_test_...
4. Cole no .env

**Cartões de teste:**
- Sucesso: 4242 4242 4242 4242
- Falha: 4000 0000 0000 0002
- Data: Qualquer data futura
- CVV: Qualquer 3 dígitos

## 📱 Integração WhatsApp (Opcional)

### Evolution API (Recomendado para começar)
\`\`\`bash
git clone https://github.com/EvolutionAPI/evolution-api.git
cd evolution-api
npm install
npm start
\`\`\`

Depois configure:
- \`WHATSAPP_API_URL=http://localhost:8080\`
- \`WHATSAPP_API_KEY=sua_chave\`

## 🚨 Problemas Comuns

### MongoDB não conecta
\`\`\`bash
# Verifique se está rodando
mongosh

# Linux/Mac
sudo systemctl start mongod

# Windows
net start MongoDB
\`\`\`

### Portas em uso
Altere no .env:
- Backend: PORT=5001
- Frontend: vite.config.js → server.port

### Erro de CORS
Verifique:
- FRONTEND_URL no .env = http://localhost:5173
- Portas corretas

## 📖 Próximos Passos

1. Ler o [README.md](./README.md) completo
2. Explorar a estrutura de pastas
3. Customizar o design (Tailwind CSS)
4. Implementar integração WhatsApp
5. Adicionar Flow Builder visual
6. Configurar deploy

## 💡 Dicas

- Use **MongoDB Compass** para visualizar dados
- Instale extensão **Thunder Client** (VSCode) para testar API
- Configure **ESLint** e **Prettier** para código limpo
- Use **Postman** para documentar API

## 🎓 Recursos de Aprendizado

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com/docs)
- [Stripe Docs](https://stripe.com/docs)

---

**Dúvidas?** Abra uma issue no GitHub!
