# Bala da Sogra Api

Neste projeto e possivel vender produtos a base de propostas.

## 📌 Visão Geral

Este projeto é uma aplicação **Node.js** (com **TypeScript**) que fornece uma API para venda de doces. Ele foi desenvolvido com foco em organização de código, boas práticas e facilidade de manutenção.

## 🛠️ Tecnologias Utilizadas

* Node.js
* TypeScript
* Express
* Banco de dados: PostgreSQL 
* Ferramentas adicionais:

  * dotenv
  * ts-node-dev / nodemon
  * Swagger (documentação da API)

## 📂 Estrutura do Projeto

````bash
├── scenarios/                # Cenários de testes (ex: k6, testes de carga ou integração)
├── src/
│   ├── config/               # Configurações gerais da aplicação (env, auth, etc.)
│   ├── database/             # Conexão com banco de dados, migrations e repositories
│   ├── modules/              # Módulos da aplicação (arquitetura modular)
│   │   ├── auth/              # Autenticação e autorização
│   │   ├── fornecedores/     # Regras de negócio de fornecedores
│   │   ├── produtos/          # Regras de negócio de produtos
│   │   └── propostas/         # Regras de negócio de propostas
│   ├── seed/                  # Dados iniciais para popular o banco
│   └── shared/                # Código compartilhado entre módulos
│       ├── middlewares/       # Middlewares globais (auth, erros, logs)
│       └── utils/             # Funções utilitárias
├── test/                      # Testes automatizados
└── types/                     # Tipagens globais (TypeScript)
````

## ⚙️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

* Node.js (versão recomendada: >= 18)
* npm ou yarn

## 🚀 Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

Entre na pasta do projeto:

```bash
cd seu-repositorio
```

Instale as dependências:

```bash
npm install
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias:

```env
PORT=3000
DATABASE_URL=...
API_KEY=...
```

## ▶️ Executando o Projeto

Modo desenvolvimento:

```bash
npm run dev
```

Modo produção:

```bash
npm run build
npm start
```

## 📡 Endpoints da API

### Exemplo

**GET** `api/produtos`

Resposta:

```json
{
  "items": [
    {
      "idProd": "d76eeba6-7635-4ca4-bfe5-e4239bfacfe5",
      "descProd": "Bala de coco tradicional",
      "unidMedProd": "UN",
      "precoProd": "1.50",
      "criadoEm": "2025-12-18T02:13:09.538Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

> A documentação completa da API pode ser acessada via Swagger em:

```
http://localhost:3000/api-docs
```

## 🧪 Testes

Se aplicável, explique como rodar os testes:

```bash
npm test
```

##🧪 Testes de requisição:

Teste de numeros de requisição para otimização da api:

```bash
 k6 run index.ts --vus 20 --duration 60s
```

Para este teste é necessário realizar a insatalação e a utlização da ferramenta opensorce K6 link para conhecimento(https://medium.com/xp-inc/conhecendo-o-k6-para-testes-de-carga-943a0489de1e)

## 📄 Boas Práticas Adotadas

* Separação de responsabilidades (MVC)
* Uso de variáveis de ambiente
* Tipagem com TypeScript
* Código organizado e legível

## 👨‍💻 Autor

**Seu Nome**
LinkedIn:[Gabriele Medeiros](https://www.linkedin.com/in/gabriele-medeiros-0a6832164/)
GitHub: https://github.com/gabriele-medeiros

## 📜 Licença

Este projeto está sob a licença ________. Veja o arquivo `LICENSE` para mais detalhes.
