# 🚀 WhatsApp SaaS - Automação Profissional

Sistema completo de automação WhatsApp estilo ManyChat, desenvolvido especialmente para barbeiros, manicures e profissionais autônomos.

## 📋 Funcionalidades Principais

### ✅ Implementado
- ✓ Sistema de autenticação completo (registro, login, recuperação de senha)
- ✓ 3 Planos de assinatura (Base, Profissional, Premium)
- ✓ Integração com Stripe para pagamentos
- ✓ Dashboard com estatísticas e gráficos
- ✓ Gestão de contatos
- ✓ Sistema de fluxos de automação
- ✓ Envio de mensagens
- ✓ Analytics básico
- ✓ Cookies de sessão
- ✓ Design moderno azul e preto
- ✓ Responsivo mobile

### 🔄 Para Implementar
- [ ] Integração WhatsApp (Evolution API ou Baileys)
- [ ] Flow Builder visual com React Flow
- [ ] Sistema de IA para respostas automáticas
- [ ] Agendamentos automáticos
- [ ] Templates de mensagens
- [ ] Importação/Exportação de contatos
- [ ] Webhooks personalizados

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticação
- Stripe para pagamentos
- Socket.IO para real-time
- Bcrypt para senhas

### Frontend
- React 18
- React Router v6
- Zustand (state management)
- Tailwind CSS
- React Hook Form
- Recharts (gráficos)
- Axios
- React Hot Toast

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- MongoDB 6+
- Conta no Stripe (para pagamentos)

### 1. Clone o repositório
\`\`\`bash
git clone <seu-repo>
cd whatsapp-saas
\`\`\`

### 2. Configurar Backend

\`\`\`bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
\`\`\`

Edite o arquivo \`.env\` com suas credenciais:

\`\`\`env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/whatsapp-saas

# JWT
JWT_SECRET=seu_jwt_secret_super_seguro_mude_em_producao
JWT_EXPIRE=30d

# Stripe
STRIPE_SECRET_KEY=sk_test_seu_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_seu_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_seu_webhook_secret

# Email (opcional - para recuperação de senha)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu_email@gmail.com
EMAIL_PASSWORD=sua_senha_app

# Frontend URL
FRONTEND_URL=http://localhost:5173
\`\`\`

### 3. Configurar Frontend

\`\`\`bash
cd frontend
npm install
\`\`\`

### 4. Iniciar MongoDB

\`\`\`bash
# Linux/Mac
mongod

# Windows
net start MongoDB

# Ou usando Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
\`\`\`

### 5. Iniciar o projeto

\`\`\`bash
# Na raiz do projeto (inicia backend e frontend simultaneamente)
npm run dev

# OU separadamente:

# Backend (porta 5000)
npm run server

# Frontend (porta 5173)
npm run client
\`\`\`

Acesse: **http://localhost:5173**

## 🎨 Estrutura do Projeto

\`\`\`
whatsapp-saas/
├── backend/
│   ├── config/          # Configurações (DB, etc)
│   ├── middleware/      # Auth, validações
│   ├── models/          # Modelos MongoDB
│   ├── routes/          # Rotas da API
│   ├── utils/           # Utilitários
│   └── server.js        # Entry point
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/  # Componentes reutilizáveis
│       ├── layouts/     # Layouts (Dashboard, etc)
│       ├── pages/       # Páginas
│       ├── stores/      # Zustand stores
│       ├── utils/       # Helpers
│       ├── App.jsx      # App principal
│       └── main.jsx     # Entry point
│
├── package.json
└── README.md
\`\`\`

## 💳 Planos e Preços

### Base - R$ 24,90/mês
- 500 contatos
- 10 fluxos
- 2.000 mensagens/mês
- Analytics básico

### Profissional - R$ 37,90/mês (Mais Popular)
- 2.000 contatos
- 30 fluxos
- 10.000 mensagens/mês
- IA integrada
- Analytics avançado

### Premium - R$ 97,00/mês
- Contatos ilimitados
- Fluxos ilimitados
- Mensagens ilimitadas
- IA avançada
- Suporte 24/7
- White label

**Todos os planos incluem 7 dias de teste grátis!**

## 🔧 Configuração do Stripe

1. Crie uma conta em [stripe.com](https://stripe.com)
2. Obtenha suas chaves em: Dashboard → Developers → API keys
3. Configure o webhook:
   - URL: \`https://seu-dominio.com/api/webhooks/stripe\`
   - Eventos: \`checkout.session.completed\`, \`customer.subscription.*\`, \`invoice.*\`
4. Adicione as chaves no \`.env\`

## 📱 Integração WhatsApp

### Opção 1: Evolution API (Recomendado)
\`\`\`bash
# Clone e instale
git clone https://github.com/EvolutionAPI/evolution-api.git
cd evolution-api
npm install
npm start
\`\`\`

### Opção 2: Baileys
Biblioteca Node.js para WhatsApp Web API

### Opção 3: API Oficial WhatsApp Business
Requer aprovação do Facebook

## 🚀 Deploy

### Backend (Railway, Render, Heroku)
\`\`\`bash
npm run build
npm start
\`\`\`

### Frontend (Vercel, Netlify)
\`\`\`bash
cd frontend
npm run build
# Upload da pasta dist/
\`\`\`

### Variáveis de Ambiente em Produção
Não esqueça de configurar todas as variáveis do \`.env\` no serviço de hosting!

## 📖 Uso

### 1. Criar Conta
- Acesse \`/register\`
- Preencha os dados
- 7 dias de teste grátis automaticamente

### 2. Conectar WhatsApp
- Vá em Configurações
- Escaneie o QR Code
- Aguarde conexão

### 3. Criar Fluxo
- Clique em "Novo Fluxo"
- Adicione nodes (mensagens, perguntas, condições)
- Defina gatilhos (palavras-chave, eventos)
- Ative o fluxo

### 4. Gerenciar Contatos
- Importe contatos (CSV)
- Adicione manualmente
- Tags e segmentação

### 5. Analisar Resultados
- Dashboard com métricas
- Gráficos de performance
- Relatórios exportáveis

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- JWT para autenticação
- Cookies HTTP-only
- Validação de inputs
- Rate limiting
- CORS configurado
- Variáveis de ambiente

## 🐛 Debug

### Problema: MongoDB não conecta
\`\`\`bash
# Verifique se está rodando
mongosh

# Ou
sudo systemctl status mongod
\`\`\`

### Problema: Erro de CORS
- Verifique FRONTEND_URL no .env
- Certifique-se que as portas estão corretas

### Problema: Stripe webhooks não funcionam
- Use ngrok para teste local: \`ngrok http 5000\`
- Configure webhook no Stripe com URL do ngrok

## 📚 API Endpoints

### Auth
- \`POST /api/auth/register\` - Criar conta
- \`POST /api/auth/login\` - Login
- \`POST /api/auth/logout\` - Logout
- \`GET /api/auth/me\` - Usuário atual
- \`POST /api/auth/forgot-password\` - Esqueci senha
- \`PUT /api/auth/reset-password/:token\` - Resetar senha

### Subscriptions
- \`GET /api/subscriptions/plans\` - Listar planos
- \`POST /api/subscriptions/create-checkout-session\` - Criar checkout
- \`POST /api/subscriptions/portal\` - Portal do cliente
- \`GET /api/subscriptions/status\` - Status da assinatura

### Flows
- \`GET /api/flows\` - Listar fluxos
- \`POST /api/flows\` - Criar fluxo
- \`GET /api/flows/:id\` - Ver fluxo
- \`PUT /api/flows/:id\` - Atualizar fluxo
- \`DELETE /api/flows/:id\` - Deletar fluxo

### Contacts
- \`GET /api/contacts\` - Listar contatos
- \`POST /api/contacts\` - Criar contato
- \`GET /api/contacts/:id\` - Ver contato
- \`PUT /api/contacts/:id\` - Atualizar contato
- \`DELETE /api/contacts/:id\` - Deletar contato

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add some AmazingFeature'\`)
4. Push para a branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## 📝 Licença

MIT License - veja o arquivo LICENSE para detalhes

## 👨‍💻 Desenvolvido por

[Seu Nome] - Programador Sênior

## 📧 Suporte

- Email: suporte@whatsappsaas.com
- Discord: [Link do Discord]
- Documentação: [Link da Doc]

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
