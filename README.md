# Growink

<div align="center">
<h1><a href="https://growink.vercel.app/" target="_blank">Growink</a></h1>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/-NextJS-000000?logo=nextdotjs">
  <img src="https://img.shields.io/badge/-ReactJS-61DAFB?logo=react&logoColor=black">
</div>

<br>
<div align="center">
<img width="80%" alt="App screenshot" src="/public/images/design.png">
</div>
<br>
<br>

<p align="center"><strong>Growink</strong> is a mobile web based app built using <strong>Next Js, Material UI,Nest Js, Prisma, PostgreSQL</strong>.</p>

## Table of Contents

- [About](#about)
- [Repository](#repository)
- [UI UX Design](#ui-ux-design)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Data Model](#data-model)
- [Installation](#installation)
- [Live Demo](#live-demo)
- [API Documentation](#api-documentation)
- [Endpoints](#endpoints)
- [Author](#author)

## About

**_Growink_** App is a website with a mobile web base which aims to make it easier for farmers to make agricultural records, view agricultural history, and monitor their agriculture, apart from that there is a financial feature which aims to record their expenses and income and can see the history of their expenses and income and can also see their balance

In the design stage, this website was created using Next Js technology as the frontend, Nest Js as the backend and using PostgresQL for the database.

## Repository

- [Frontend](https://github.com/growink-app/growink-fe)
- [Backend](https://github.com/growink-app/growink-be)

## UI UX Design

View Design UI/UX with : [Figma](https://www.figma.com/file/qieKxgAPkKlZK9WyXhQyHP/Growink?type=design&mode=design&t=pbHhGK7cSav3NvCB-0)

## Technologies Used

- Frontend Framework : Next Js App Router
- Backend : Nest Js
- Database : PostgreSQL, Prisma ORM
- Styling : Material UI
- App Deployment : Vercel
- Database Deployment : Railway

## Features

- Users can log in and register
- users can see the total balance, total income, total expense of the last transaction and the last agricultural record
- Users can create agricultural records, update agricultural records, view agricultural record history, monitor agriculture, and view agricultural statistics
- Users can create financial records, update financial records, view financial history and view financial statistics

## Data Model

Our data model is designed to ensure smooth interactions and seamless data management. From users and artists to events and categories, everything is well-connected for a holistic user experience.

![Data Model](/assets/schema.png)

## Installation

To run Media Maven on your local machine, follow these steps:

1. Clone the project repository:

   ```bash
   git clone https://github.com/growink-app/growink-fe
   ```

2. Navigate to the project directory:

   ```bash
   cd teledoc-app
   ```

3. Install project dependencies using [NPM](https://www.npmjs.com/):

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   This will launch the application in watch mode, allowing you to view it in your web browser at `http://localhost:3000`.

## Live Demo

![Vercel](https://vercelbadge.vercel.app/api/StarSheriff2/nextjs-pokemon-search-app)

- Deployed to Vercel: [Live Demo](https://growink.vercel.app/)

## API Documentation

- API = https://growink-api.up.railway.app/
- Swagger = https://growink-api.up.railway.app/docs

# Endpoints

**Authentication**

| Method | Endpoint         | Description         | Auth |
| :----- | :--------------- | :------------------ | ---- |
| 'POST' | '/auth/register' | Register a new user |      |
| 'POST' | '/auth/login'    | Login user          |      |

**User**

| Method  | Endpoint   | Description        | Auth |
| :------ | :--------- | :----------------- | ---- |
| 'GET'   | '/user/me' | Get user profile   | 🔑   |
| 'PATCH' | '/user/me' | Patch user profile | 🔑   |

**Products**

| Method | Endpoint           | Description      | Auth |
| :----- | :----------------- | :--------------- | ---- |
| 'GET'  | '/yields/products' | Get all Products |      |

**Yields**

| Method   | Endpoint                            | Description                     | Auth |
| :------- | :---------------------------------- | :------------------------------ | ---- |
| 'GET'    | '/yields '                          | Get all Yields                  | 🔑   |
| 'POST'   | '/yields '                          | Post a new Yields               | 🔑   |
| 'GET'    | '/yields/statistic '                | Get all Yield Statistic         | 🔑   |
| 'GET'    | '/yields/statistic/{year}/{month} ' | Get Yield based on year & month | 🔑   |
| 'GET'    | '/yields/{id} '                     | GET Yields by id                | 🔑   |
| 'PATCH'  | '/yields/{id} '                     | PATCH Yields                    | 🔑   |
| 'DELETE' | '/yields/{id} '                     | Delete Yields                   | 🔑   |

**Transactions**

| Method   | Endpoint            | Description              | Auth |
| :------- | :------------------ | :----------------------- | ---- |
| 'GET'    | '/transaction '     | Get Transaction Category |      |
| 'GET'    | '/transaction'      | Get all Transaction      | 🔑   |
| 'POST'   | '/transaction '     | Post a new Transaction   | 🔑   |
| 'GET'    | '/transaction/{id}' | GET Transaction by id    | 🔑   |
| 'PATCH'  | '/transaction/{id}' | Update Transaction       | 🔑   |
| 'DELETE' | '/transaction/{id}' | Delete Transaction       | 🔑   |

## Validation

- 🔑= User

## Author

👤 **Nofrialdi**

- Github: [Nofrialdi](https://github.com/nofrialdi)
- Linkedin: [Nofrialdi](https://linkedin.com/in/nofrialdi)

👤 **Niko Setiawan P**

- Github: [Niko Setiawan P](https://github.com/nikosetiawanp)
- Linkedin: [Niko Setiawan P](https://www.linkedin.com/in/nikosetiawanp/)

👤 **Gary Cruise**

- Github: [Gary Cruise](https://github.com/Garycruisee)
- Linkedin: [Gary Cruise](https://www.linkedin.com/in/garycruise/)

👤 **Indra Setiadhi P.**

- Github: [Indra Setiadhi P.](https://github.com/indrasetiadhi4)
- Linkedin: [Indra Setiadhi P.](https://www.linkedin.com/in/indrasetiadhi/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## Show your support

Give a ⭐️ if you like this project!
