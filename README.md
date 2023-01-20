<h1 align="center"> :file_cabinet: Sharenergy </h1>

## :memo: Descrição

Esse projeto foi criado como parte do processo seletivo da Sharenergy, consistia de uma aplicação fullstack onde o backend é uma API desenvolvida com Nest.js e consumindo um banco de dados não relacional em MongoDB e o frontend é uma plataforma em React.JS, utilizando Material.UI e consumindo tanto a API desenvolvida como outras externas.

O link do repositório é: https://github.com/Guivaz1993/desafio-sharenergy-2023-01 na Branch guilherme-de-sousa-vaz

:video_camera: Youtube: https://youtu.be/dJ44m5SFP3Y

:bookmark_tabs: Documentação: https://documenter.getpostman.com/view/20510257/2s8ZDYWMNk

## :books: Funcionalidades

### :desktop_computer: Backend

#### :unlock: Rotas não autenticadas

- <b>Login</b>: Validação de usuário para entrar na plataforma

- <b>Criar usuário</b>: Criação de um novo usuário (não implementado no fronted)

#### :lock: Rotas autenticadas

- <b>Infos</b>: Busca o nome e o Id do usuário logado

##### :smile:	Clientes

- <b>Listagem</b>: Lista todos os clientes cadastrados

- <b>Detalhamento</b>: Busca as informações de um cliente em específico

- <b>Criar cliente</b>: Cria um novo cliente

- <b>Editar</b>: Editar informações do cliente

- <b>Delete</b>: Deletar cliente

### :tv: Frontend

- <b>Login</b>: Possibilidade de logar na página e opção de lembrar do usuário logado.

- <b>Home</b>: Consumo da API de usuários, possibilidade de filtar e listagem em uma tabela paginada.

- <b>Cats</b>: Consumo da API que busca memes exemplificando as respostas das requisições HTTP.

- <b>Dogs</b>: Busca fotos e Gif's de cachorros através do consumo de uma API com fotos.

- <b>Clients</b>: Consumo da API produzida no backend, mostra a lista dos clientes cadastrados e possibilita a criação de novos, editar os existentes, detalhamento ou deletar algum já cadastrado.


## :wrench: Tecnologias utilizadas

### :desktop_computer: Backend

- Typescript
- Node.js
- Nest.js
- Jest.js
- MongoDB

### :tv: Frontend

- React.JS
- Material UI (Componentes previamente criados)
- React-Router-Dom (Navegação entre as páginas)

## :rocket: Rodando o projeto

Para rodar o repositório é necessário clonar o mesmo e instalar os arquivos de cada pasta (back, frontend)

```
<linha de comando>

cd ./back

npm run start
yarn run start

cd ./frontend

npm run start
yarn run start
```

## :handshake: Colaboradores

Guilherme Vaz

## :dart: Status do projeto

Finalizado
