# inv-gh-hero 

[![Build Status](https://travis-ci.org/thiagozanetti/inv-gh-hero.svg?branch=master)](https://travis-ci.org/thiagozanetti/inv-gh-hero) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/thiagozanetti/inv-gh-hero/master/LICENSE) [![Code Climate](https://codeclimate.com/github/thiagozanetti/inv-gh-hero/badges/gpa.svg)](https://codeclimate.com/github/thiagozanetti/inv-gh-hero) [![dependencies Status](https://david-dm.org/thiagozanetti/inv-gh-hero/status.svg)](https://david-dm.org/thiagozanetti/inv-gh-hero)

Coding chalenge usando a API do GitHub.

### Requisitos

* [X] Gostaria de pesquisar um usuário por **username** e ver o resultado na 
mesma página
* [X] Gostaria de fazer anotações de observação referente ao usuário pesquisado
* [X] Gostaria de fazer paginação dos repositórios do usuário pesquisado
* [X] Gostaria de quando um usuário não existir, que seja exibida uma página 404

### Primeiros passos

Para instalar as dependências (node.js >= 6.x):

```sh
$ npm install
```

Para rodar a aplicação (modo desenvolvimento):

```sh
$ npm start // abrirá uma instância no navegador apontando para 
http://localhost:3000
```

Para construir a aplicação em modo estático:

```sh
$ npm run build
```

Para rodar os testes:

```sh
$ npm test // roda os testes e sai
$ npm test -- --watch // roda os testes e espera modificações
$ npm run test:coverage //roda os testes e coleta informações de cobertura de
 código
```

### Sobre a implementação

`Angular.js` é robusto porém muito pesado e com muito código boilerplate 
além de funcionar bem, na minha opinião, somente quando em conjunto com o 
`Typescript`. `Vue.js` é rápido e muito robusto, como seus atuais concorrentes, 
mas na minha opinião peca por endossar muito fortemente o uso de engines de 
template para renderização das views. Decidi utilizar o `React` + `Redux` pois 
trata-se de um time vencedor, na minha opinião. É rápido e (relativamente) 
fácil de escrever além de fomentar o uso de tecnologias e padrões mais 
modernos. Acompanham na implementação o `react-router` para gerenciamento das 
rotas da aplicação, o `material-ui`, que empresta alguns componentes baseados 
no manifesto do material design, `redux-api-middleware` para consumo de recursos, 
e o `flexbox-react` para a composição de layouts não opinativos e baseados no 
conceito de flex boxes. 
Para testes o projeto usa o `Jest` com o auxílio do 
`nock` para interceptar requisições http e o `redux-mock-store` para interceptar 
ações do `Redux`.
Além disso, o projeto está sendo testado e entregue continuamente com a ajuda
 do `TravisCI`. A aplicação construída pode ser encontrada em 
[https://thiagozanetti.github.io/inv-gh-hero](https://thiagozanetti.github.io/inv-gh-hero)
 
 ### Considerações finais
 
 Creio que tenham faltado critérios de aceitação mais elaborados e / ou 
 definidos. Permitir que o desenvolvedor responsabilize-se pelo que deve ser
  implementado e não como deve ser pode levar a quebra de expectativas junto 
  aos clientes e / ou usuários, aumentando o tempo do ROI e, muitas vezes, o 
  custo (prazo, esforço, escopo) final do projeto.

