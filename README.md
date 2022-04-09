# ForgeBit

## Documentation of ForgeBit

## Author 🚀

> ADEBAYO EMMANUEL TOLUWANIMI
---

## Technologies

- Node JS
- NestJS
- Typeorm


---

## Database

- [Postgres](https://www.postgresql.org/) (TypeORM)

---

## Install NodeJS

To Install NodeJS, kindly go to [Nodejs](https://nodejs.com) and follow the necessary instructions required depending on
your PC Operating System

## MACOS

using a [package](https://nodejs.org/en/#download) simply download the installer

using [homebrew](https://github.com/Homebrew/legacy-homebrew)

```markdown
brew install node
```

---

## Windows

using a [package](https://nodejs.org/en/#download) simply download the installer

using [chocolatey](http://chocolatey.org/) to install Node

```markdown
cinst nodejs
```

---

## To install Postgres

For Windows users, you can kindly follow this
tutorials [here](https://learnsql.com/blog/how-to-install-postgresql-on-windows-in-5-minutes/) to install Postgres on
your local PC which explains how to create a database

For Mac users, you can kindly follow this tutorials [here](https://www.robinwieruch.de/postgres-sql-macos-setup)  to
install Postgres on your local PC which explains how to create a database


---

## Setup Database

To setup your database for the project, after creation kindly open the ormconfig.js file in the  folder of the
project and replace with your credentials

```markdown
    database: 'your database name',
    url: 'postgres://root:password@localhost/forgebit'
```

### OR

Create a .env file in the root directory and add your databae details. It should have the following properties

```markdown
PORT=3000 DB_URL=postgres://root:password@localhost/forgebit NODE_ENV=local JWT_SECRET=secret
```

Kindly replace these values with the appropriate values based on your Database environment
---

## Start Development

Kindly clone the repo `https://github.com/toluwaanimi/forgebit-task.git`

### Installation

To install the necessary packages, in your folder directory kindly run

```markdown
npm i

# or

yarn add
```

* To continuously watch for changes
    * ```markdown 
      npm run start:dev
      ```

* To build your app for production
    * ```markdown
      npm run build
         ```


* To run your app server for production
    * ```markdown
      npm run start
         ```

---

## Implementation Required

- Create Account
  - username
  - password

- Login
  - username
  - password
  

- Create Post
  - title
  - content
  - category


Get Posts
    

- Get Single Post
  - title
  - content
  - category


Delete Post