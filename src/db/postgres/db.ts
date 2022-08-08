/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import { readFile } from "fs/promises";
import { resolve } from "path";
import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";

export interface IPoolClient extends Omit<PoolClient, "query"> {
	query: (queryText:string, params?: any[], callback?: (err: Error, result: QueryResult<QueryResultRow>) => void) => Promise<QueryResult<any>>;
}

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    port: 5432,
    ssl: false,
    Promise: Promise,
});

export const getClient = async () =>{
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
    return query.apply(client, [queryText, params, callback]);
  };
  client.release = () => {
    clearTimeout(timeout);
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  return client;
};

export const InitScriptsDB = async () => {
	const client = await getClient();
	try {
		client.query("BEGIN");
		const { rows: isScripts } = (await client.query("SELECT * FROM information_schema.tables WHERE table_name = 'catalogo_filmes'"));
		if (isScripts.length) return;

		const file = await readFile(resolve(__dirname, "..", "..", "..",  "scripts/scripts-ddl.sql"), { encoding: "utf-8" });
		const SQLArray = file.split(";");

		for await (const sql of SQLArray) {
			await client.query(sql, []);
		}
		client.query("COMMIT");
	} catch (err) {
		client.query("ROLLBACK");
	} finally {
		client.release();
	}
};
