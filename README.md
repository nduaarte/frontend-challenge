🛒 Checkout Mock — Desafio Frontend

Aplicação desenvolvida em Next.js + React + Tailwind + Shadcn UI, simulando um fluxo completo de checkout 100% mockado, com foco em UX, clareza de estados e fidelidade a um e-commerce real.

🚀 Stack

Next.js 14 (com pages router)

React 18 + TypeScript

TailwindCSS + Shadcn UI

Lucide Icons

Recharts (gráfico de pedidos)

LocalStorage (mock de persistência)

💡 Funcionalidades principais
🔐 Autenticação mockada

Tela única para login/cadastro.

Sessão persistente no navegador.

Bloqueio de acesso ao checkout sem login.

Layout moderno com gradiente e sombra suave.

🛍️ Catálogo de produtos

Produtos mockados com título, descrição e preço.

Adição e remoção dinâmica do carrinho.

Botão muda automaticamente entre “Adicionar” e “Remover”.

Cards com hover, borda sutil e visual limpo.

🛒 Carrinho de compras

Itens listados com nome, preço e quantidade.

Atualização em tempo real do total.

Layout responsivo e elegante.

Botões e inputs otimizados para mobile.

💳 Checkout completo

Etapas: Dados do comprador → Pagamento → Revisão → Confirmação.

Métodos disponíveis: Pix, Cartão de Crédito, Boleto.

Simulação realista de processamento e falhas.

Status dinâmicos: inicial → processando → pago | falhou | expirado.

Redirecionamento automático para a página de Pedidos após pagamento.

📦 Histórico de pedidos (diferencial)

Página /orders com todos os pedidos já feitos.

Exibe status pago, falhou e expirado.

Dados persistem no localStorage.

Contador e resumo de pedidos recentes.

Gráfico com proporção de resultados usando Recharts.

Cada novo teste do avaliador adiciona um pedido — criando um histórico crescente.

📱 Responsividade

Layout otimizado para telas pequenas.

Seções empilhadas e margens balanceadas.

Header adaptável com navegação simplificada.

Inputs e botões com toque confortável no mobile.

🧠 Extras técnicos

Persistência local completa: usuário, carrinho e pedidos.

Simulação de falhas e expiração de pagamento (~25% de chance).

Evita erros de hidratação (SSR/CSR) com controle de montagem (mounted).

Código modular e tipado, com contexts e utils bem organizados.

Botão de limpeza de dados (dev mode) para reset rápido.

🧩 Estrutura de pastas
src/
├── components/
│ ├── Header.tsx
│ └── ProductCard.tsx
├── contexts/
│ ├── AuthContext.tsx
│ └── CartContext.tsx
├── lib/
│ ├── mockProducts.ts
│ └── paymentSimulator.ts
├── pages/
│ ├── auth.tsx
│ ├── cart.tsx
│ ├── checkout.tsx
│ ├── orders.tsx
│ └── index.tsx
└── utils/
└── currency.ts

🧰 Instalação e uso

# Instale dependências

npm install

# Rode o projeto

npm run dev

# Acesse

http://localhost:3000
