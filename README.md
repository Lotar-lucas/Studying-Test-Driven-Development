# Projeto FC4-TDD

Este projeto é parte de um desafio do curso "TDD - Test Driven Development" da trilha "Testes Automatizados", que faz parte do programa FullCycle 4.0.

## Descrição
Este projeto é um exemplo de aplicação utilizando TDD (Test-Driven Development) para gerenciar reservas de propriedades. Ele inclui serviços para criar, cancelar e gerenciar reservas, além de testes unitários e de integração para garantir a qualidade do código.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Instalação

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd fc4-tdd
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

## Configuração

Certifique-se de que o arquivo `tsconfig.json` está configurado corretamente para o TypeScript. Não é necessário configurar um banco de dados, pois o projeto utiliza repositórios fake para testes.

## Execução dos Testes

Para executar os testes, utilize o comando:

```bash
npm test
```

Os testes estão configurados para rodar com o [Jest](https://jestjs.io/), e incluem testes unitários e de integração.

## Estrutura do Projeto

Abaixo está uma visão geral da estrutura do projeto:

```
src/
  application/
    dtos/          # Data Transfer Objects
    services/      # Serviços de aplicação
  domain/
    entities/      # Entidades de domínio
    repositories/  # Interfaces de repositórios
    value_objects/ # Objetos de valor
  infrastructure/
    persistence/   # Persistência de dados
    repositories/  # Implementações de repositórios
    web/           # Controladores e testes E2E
```