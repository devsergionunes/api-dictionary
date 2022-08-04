/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";

export interface IPoolClient extends Omit<PoolClient, "query"> {
	query: (queryText:string, params?: any[], callback?: (err: Error, result: QueryResult<QueryResultRow>) => void) => Promise<QueryResult<any>>;
}

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    port: 5432,
    max: 50, // Numero maximo e pool de conexoes
    ssl: false,
    Promise: Promise,
});

const getClient = async () =>{
  const client: IPoolClient = await pool.connect();
  const query = client.query as any;

  const release = client.release;
  let lastQuery : string;
  const timeout = setTimeout(() => {
    console.error("Um cliente foi fechado automaticamente porque ele estava sendo usado mais de 1 minuto.");
    console.error(`Ultima query executada: ${lastQuery}`);
  }, 50000);

  client.query = (queryText:string, params?: any[], callback?: (err: Error, result: QueryResult<QueryResultRow>) => void): Promise<QueryResult<any>> => {
    lastQuery = queryText;
		// console.log(`[QUERY] \n ${queryText}`);
    return query.apply([client, queryText, params, callback]);
  };
  client.release = () => {
    clearTimeout(timeout);
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  return client;
};


export { getClient };
