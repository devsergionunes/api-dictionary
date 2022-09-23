# API DICTIONARY

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
GET /api/word
GET /api/words/all
GET /api/favorite
POST /api/favorite
DELETE /api/favorite
```
<hr>

## BASE DE DADOS:

### [POSTGRESQL](https://www.postgresql.org/):

- [Documentação](https://www.postgresql.org/docs/)
- [Tutorial para download da imagem docker do postgres](https://felixgilioli.medium.com/como-rodar-um-banco-de-dados-postgres-com-docker-6aecf67995e1)

<hr>

## INICIANDO O PROJETO:

clone o projeto:

<pre>
  git clone https://github.com/devsergionunes/api-dictionary.git
</pre>
### banco de dados:

<pre>
 sudo docker run -p 5432:5432 -e POSTGRES_PASSWORD=1234 postgres
</pre>
### Variaveis de ambiente (arquivo .env):
- Crie um arquivo .env na raiz do projeto e adicione as seguintes variaveis:
<pre>
ENVIRONMENT = development

# config for the production environment
BASE_URL = http://localhost
PORT = 3333


# api key for the app
X_API_KEY = WENFCJKNSKDCSDNJCKNCJNCKJDcndscsnadkcndjncjkackdsdkvsnvajkdvnsjkvnkdsj

# db settings
DB_HOST = localhost
DB_USER = postgres
DB_PASSWORD = 1234
DB_PORT = 5432
</pre>

## Executar aplicação:

<pre>
 npm install && npm start
</pre>
