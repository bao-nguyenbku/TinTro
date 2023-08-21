<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# TinTro Mobile App Services

## Description
This is backend source code for TinTro mobile application.

## Technical Stack
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

## Installation

```bash
$ yarn install
```

## How to generate database
Take a look at `docker-compose.yml`, we created a container for database postgresql. Server of nest app will be runned in dev mode. (You can create new container for nest server).
```
$ docker-compose up -d
```
Run `prisma generate` to sync with `PrismaClient`:
```bash
$ yarn generate
```
Run `prisma migrate` to migrate schema to database:
```bash
$ yarn migrate:dev
```
Run `prisma studio` to show UI for manage database:
```bash
$ yarn studio
```


## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
## Folder Structure

## License

Nest is [MIT licensed](LICENSE).


## Maintenance ⚠
We are currently refactoring