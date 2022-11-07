<h1 align="center">
    <img alt="NLW-copa" title="" src="logo-nlw-copa.svg" width="250px" />
</h1>

<p>
  <img src="cover.png" alt="nlw-copa" />
</p>

<h4 align="center"> 
	🚧  NLW Copa Concluído 🚀 🚧
</h4>

## 💻 About

O NLW Copa é uma aplicação com parte web, back-end e mobile, que tem como função a realização de bolões a respeito das partidas de jogos da copa do mundo, no qual esses bolões podem ser realizados entre conhecidos, amigos e até familiares.

O projeto foi desenvolvido durante a **NLW - Next Level Week** oferecida pela [Rocketseat](https://blog.rocketseat.com.br/primeira-next-level-week/). O NLW é uma experiência online com muito conteúdo prático, desafios e hacks onde o conteúdo fica disponível durante uma semana.

---

## 🎨 Layout

Você pode visualizar o layout do projeto através [desse link](https://www.figma.com/community/file/1169028343875283461). É necessário ter conta no [Figma](https://www.figma.com/) para acessá-lo.

### Web

<p align="center">
  <img alt="Layout Web Demonstration" title="#Web" src=".github/images/web-demonstration.png" width="100%">
</p>

### Mobile

<p align="center">
  <img alt="Layout Mobile Demonstration" title="#Mobile" src=".github/images/mobile-demonstration.png" width="100%">
</p>

---

## 🚀 How it works

Este projeto é divido em três partes:
1. Backend (pasta server) 
2. Frontend (pasta web)
3. Mobile (pasta mobile)

💡Tanto o Frontend quanto o Mobile precisam que o Backend esteja sendo executado para funcionar.

### Pré-requisitos

Antes de baixar o projeto você vai precisar ter instalado na sua máquina as seguintes ferramentas:

* [Git](https://git-scm.com)
* [NodeJS](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/)

#### 🎲 Rodando o Backend (servidor)

```bash
# Clone este repositório
$ git clone git@github.com:pabloxt14/NLW-Copa.git

# Acesse a pasta do projeto no terminal/cmd
$ cd NLW-Copa

# Vá para a pasta server
$ cd server

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3333 - acesse http://localhost:3333 
```

#### 🧭 Rodando a aplicação web (Frontend)

```bash
# Vá para a pasta da aplicação Front End
$ cd web

# Instale as dependências
# Para a aplicação web funcionar perfeitamente você precisar comentar o host em server/src/server (linha 33)
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```

#### 📱 Rodando a aplicação mobile (Mobile)

```bash
# Vá para a pasta da aplicação mobile
$ cd mobile

# Instale as dependências
# Para a aplicação Mobile funcionar perfeitamente você precisar descomentar o host em server/src/server (linha 33)
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npx expo start
```

---

## 🛠 Technologies

As seguintes ferramentas foram usadas na construção do projeto:

#### **Website**  ([Next](https://nextjs.org/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[TailwindCSS](https://tailwindcss.com/)**
-   **[PostCSS](https://postcss.org/)**
-   **[Axios](https://github.com/axios/axios)**

> Veja o arquivo  [package.json]

#### **Server**  ([NodeJS](https://nodejs.org/en/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Fastify](https://www.fastify.io/)**
-   **[Zod](https://github.com/colinhacks/zod)**
-   **[Short-Unique-Id](https://www.npmjs.com/package/short-unique-id)**
-   **[Prisma](https://www.prisma.io/)**
-   **[SQLite](https://github.com/mapbox/node-sqlite3)**

> Veja o arquivo  [package.json]

#### **Mobile**  ([React Native](http://www.reactnative.com/)  +  [TypeScript](https://www.typescriptlang.org/))
 
-   **[Expo](https://expo.io/)**
-   **[Expo Fonts](https://docs.expo.dev/guides/using-custom-fonts/)**
-   **[Expo Google Fonts](https://github.com/expo/google-fonts)**
-   **[Expo Auth Session](https://docs.expo.dev/versions/latest/sdk/auth-session/)**
-   **[Expo Web Browser](https://docs.expo.dev/versions/latest/sdk/webbrowser/)**
-   **[Native Base](https://nativebase.io/)**
-   **[Phosphor React Native](https://github.com/duongdev/phosphor-react-native)**
-   **[React Navigation](https://reactnavigation.org/)**
-   **[React Native SVG](https://github.com/react-native-community/react-native-svg)**
-   **[React Native Country Flag](https://www.npmjs.com/package/react-native-country-flag)**
-   **[Axios](https://github.com/axios/axios)**
-   **[Country-List](https://www.npmjs.com/package/country-list)**
-   **[DayJS](https://day.js.org/)**
-   **[dotENV](https://www.npmjs.com/package/dotenv)**

> Veja o arquivo  [package.json]

---
