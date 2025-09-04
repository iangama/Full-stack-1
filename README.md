cat << 'EOF' > README.md
# Full-stack-1

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

Projeto full-stack desenvolvido para estudos e testes de integração **frontend + backend + banco de dados**.

---

## Tecnologias

- Backend: Node.js, Express, Prisma  
- Banco de Dados: PostgreSQL (ou outro configurado)  
- Frontend: React (ou Next.js, se aplicável)  
- Containerização: Docker / Docker Compose  
- Outros serviços:
  - Redis (fila/worker)
  - Mailhog (teste de emails)
  - MinIO (armazenamento de arquivos)

---

## Como rodar o projeto

### 1. Clonar o repositório
\`\`\`bash
git clone git@github.com:iangama/Full-stack-1.git
cd Full-stack-1
\`\`\`

### 2. Subir os serviços com Docker
\`\`\`bash
docker-compose up --build
\`\`\`

### 3. Acessos principais
- API: http://localhost:4000  
- Frontend/Dashboard: http://localhost:3000  
- Mailhog: http://localhost:8025  
- MinIO: http://localhost:9000  

### 4. Criar usuários e pedidos
- Use os endpoints da API (\`/users\`, \`/orders\`) para cadastrar usuários e pedidos de teste.

---

## Funcionalidades testadas

- [x] Usuário semente no banco  
- [x] Criação de pedidos via API  
- [x] Visualização no dashboard  
- [x] Worker processando fila Redis  
- [x] Emails simulados no Mailhog  
- [x] Upload/gerenciamento de arquivos no MinIO  

---

## Preview

> (adicione aqui prints ou GIFs do sistema rodando — API, Dashboard, Mailhog etc.)

---

## Licença
Este projeto é apenas para fins de estudo e não possui licença comercial.
EOF

git add README.md
git commit -m "Adicionando README.md profissional"
git push origin main
