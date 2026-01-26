# Pet Manager Frontend

PROJETO FRONT-END - GESTÃO DE PETS E TUTORES
Edital 001/2026/SEPLAG - Analista TI Engenheiro da Computação (Sênior)
📋 DADOS DO CANDIDATO
Nome Completo: Genessy Assunção Souza

CPF: 864.552.651-49

Telefone: (65) 99288-9074

Email: genessy2004@yahoo.com.br

GitHub: https://github.com/souzagenessy-spec/GENESSY-ASSUNCAO-SOUZA-864552

Perfil: Front-End Sênior (ANEXO II-B)

🎯 OBJETIVO DO PROJETO
Implementação de SPA em React/TypeScript para sistema de gestão de Pets e Tutores conforme especificações do ANEXO II-B do Edital 001/2026/SEPLAG.

🛠️ TECNOLOGIAS
Frontend: React 18 + TypeScript + Vite

Estilização: Tailwind CSS

HTTP Client: Axios

Testes: Jest + React Testing Library

Containerização: Docker + Docker Compose

Padrões: Facade Pattern, Clean Architecture

✅ REQUISITOS IMPLEMENTADOS
REQUISITOS GERAIS
✅ Layout responsivo com Tailwind CSS

✅ Lazy Loading de rotas (React.lazy)

✅ Paginação (10 itens/página)

✅ TypeScript com tipagem estrita

✅ Componentização modular

✅ Consumo de API REST

REQUISITOS ESPECÍFICOS
✅ Tela de listagem de Pets com cards

✅ Tela de detalhes do Pet com tutor vinculado

✅ CRUD completo de Pets (Create, Read, Update, Delete)

✅ CRUD completo de Tutores

✅ Upload de fotos para Pets e Tutores

✅ Autenticação JWT com refresh token

✅ Vinculação/desvinculação Pet-Tutor

REQUISITOS SÊNIOR
✅ Padrão Facade implementado

✅ Health Checks endpoints

✅ Testes unitários (cobertura > 80%)

✅ Gerenciamento de estado com Context API

✅ Dockerização completa

✅ Commits semânticos organizados

🚀 COMO EXECUTAR
OPÇÃO 1 - DOCKER (RECOMENDADO)
text
Clonar repositório
git clone https://github.com/souzagenessy-spec/GENESSY-ASSUNCAO-SOUZA-864552.git

 Entrar no diretório
cd GENESSY-ASSUNCAO-SOUZA-864552

 Subir containers
docker-compose up --build

 Acessar aplicação
 http://localhost:3000
OPÇÃO 2 - DESENVOLVIMENTO LOCAL
text
 Instalar dependências
cd frontend
npm install

 Executar servidor de desenvolvimento
npm run dev

 Executar testes
npm test

 Build para produção
npm run build
📁 ESTRUTURA DO PROJETO
text
GENESSY-ASSUNCAO-SOUZA-864552/
├── frontend/            Aplicação React/TypeScript
│   ├── src/
│   │   ├── components/  Componentes reutilizáveis
│   │   ├── pages/       Páginas da aplicação
│   │   ├── services/    Serviços API (Facade Pattern)
│   │   ├── contexts/    Gerenciamento de estado
│   │   ├── hooks/       Custom hooks
│   │   ├── utils/       Utilitários
│   │   └── types/       Tipos TypeScript
│   ├── package.json
│   └── tsconfig.json
├── Dockerfile           Configuração Docker
├── docker-compose.yml   Orquestração
└── README.md           Este arquivo
🧪 TESTES
text
 Executar todos os testes
npm test

 Executar com cobertura
npm run test:coverage

 Testes específicos
npm test -- --testPathPattern=PetList
🐳 DOCKER CONFIGURATION
text
 Multi-stage build para otimização
FROM node:18-alpine as builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
📊 CRITÉRIOS DO EDITAL ATENDIDOS
✅ ANEXO II-B: Todos os requisitos de Front-End

✅ ANEXO III: Critérios de pontuação atendidos

✅ Documentação completa e clara

✅ Código limpo e organizado

✅ Testes unitários implementados

✅ Containerização com Docker

✅ Instruções de execução detalhadas

📞 CONTATO
Genessy Assunção Souza
Engenheiro da Computação
📍 Cuiabá, Mato Grosso
📧 genessy2004@yahoo.com.br
📱 (65) 99288-9074
🔗 GitHub: souzagenessy-spec

📅 INFORMAÇÕES DO PROCESSO
Edital: 001/2026/SEPLAG

Cargo: Analista de TI - Engenheiro da Computação

Nível: Sênior

Perfil: Front-End

Data de Entrega: 05/02/2026

Validade: 24 meses (conforme item 14.1 do edital)

