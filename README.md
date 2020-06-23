<header align="center"style="background: #f2f2f2;">
  <img src="./assets/logo.svg" alt="Helpeo">
</header>

>Helpeo é um projeto que foi baseado no [Ecoleta](https://github.com/joaoazevedoJS/Ecoleta "Ecoleta feito pelo JoaoAzevedoJS") da rocketseat!

## Baixando arquivos iniciais

``` JS
yarn
```
Ou
``` JS
npm install

// Ou use

npm i
```

## Env

Na pasta **backend** vai ter um arquivo chamado
`.host.env`

Adicione seu ip para que você possa usar o mobile

Na pasta **Web** e **Mobile** e só ir na pasta services no arquivo api e trocar para seu ip

> Caso não sabia como pegar seu ip, abra o cmd e digite `ipconfig` e pegue o que estiver em ipv4

## Backend

## Configurando o banco de dados SQLite

``` JS
/* YARN */

// Criar banco de dados
yarn knex:migrate

// Adicionar Dados Default
yarn knex:seed

/* NPM */

npm run knex:migrate
npm run knex:seed
```

## Utilizando o programa

``` JS
yarn dev

// ou

npm run dev
```

## Rotas

### SignUp and SignIn

| Route     | Method | Params                                   | Description       |
| :-------- | :----- | :--------------------------------------- | :---------------- |
| `/signup` | Post   | `name` `email` `password` in body params | Create a new user |
| `/signin` | Post   | `email` `password` in body params        | Login             |

### Items

| Route    | Method | Params    | Description                        |
| :------- | :----- | :-------- | :--------------------------------- |
| `/items` | Get    | No params | Get all itens for charity donation |

### User

| Route | Method | Params | Headers | Description |
| :- | :- | :- | :- | :- |
| `/user/authenticated` | Get | No params | Authorization | Check authenticated user in web for access Private Router |
| `/user` | Get | No params | Authorization | Get user data |
| `/user/points` | Post | [Params](#parâmetros-do-userpoints) | Authorization | Create a new point for charity donation |
| `/user/points` | Get | No params | Authorization | List all user points |
| `/user/point/:id` | Put | [Params](#parâmetros-do-userpoints) and point id in params | Authorization | Update user point |
| `/user/point/:id` | Delete | point id in params | Authorization | Delete user point |


## Parâmetros do user/points
``` JS
title,
whatsapp,
latitude,
longitude,
city,
uf,
address,
neighborhood,
numbering,
items
```

## :pencil2: Fork esse repositório

> Crie uma branch com a sua feature: `git checkout -b my-feature`

> Commit suas mudanças: `git commit -m feat: My new feature`

> Push a sua branch: `git push origin my-feature`

### Criado pelo joaoAzevedoJS :heart:
