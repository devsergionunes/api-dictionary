# API FILMS

## Tecnologias:

### TypeScript:

- [TypeScript](https://www.typescriptlang.org/)

### EXPRESS:

- Biblioteca utilizada para a criação do servidor.

### PG:

- Biblioteca utilizada para a conexão com o banco de dados.

### Axios:

- Biblioteca utilizada para a conexão com apis externas.
<hr>

## ROTAS:

```
GET /api/films
POST /api/films
```
<hr>

## BASE DE DADOS:

### [POSTGRESQL](https://www.postgresql.org/):

- [Documentação](https://www.postgresql.org/docs/)
- [Tutorial para download da imagem docker do postgres](https://felixgilioli.medium.com/como-rodar-um-banco-de-dados-postgres-com-docker-6aecf67995e1)

<hr>

## INICIANDO O PROJETO:

banco de dados:

<pre>
 docker run -p 5432:5432 -e POSTGRES_PASSWORD=1234 postgres
</pre>

clone o projeto:

<pre>
  git clone https://github.com/devsergionunes/api-filmscatalog.git
</pre>

Iniciar aplicação:

<pre>
 npm install && npm start
</pre>
