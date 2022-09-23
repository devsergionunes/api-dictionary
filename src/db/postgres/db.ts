/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import { readFileSync } from "fs";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";
import { WordRepository } from "../../repositories/implementations/WordRepository";

// sudo docker run -p 5432:5432 -e POSTGRES_PASSWORD=1234 postgres

export interface IPoolClient extends Omit<PoolClient, "query"> {
	query: (queryText:string, params?: any[], callback?: (err: Error, result: QueryResult<QueryResultRow>) => void) => Promise<QueryResult<any>>;
}

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: false,
    Promise: Promise,
		connectionTimeoutMillis: 10000,
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

async function insertFileTextDB() {
	const client = await getClient();
	try {
		const wordRepository = new WordRepository(client);
		const wordsList = readFileSync(`${__dirname  }/words.txt`, "utf8").split("\n");
		const words = wordsList.filter((word) => !word.includes(" "))
		.filter((word) => word.length > 4)
		.filter((word) => word.length < 30)
		// eslint-disable-next-line prefer-regex-literals
		.filter((word) => RegExp(/^[a-zA-Z]+$/).test(word));

		words.forEach(async (word) => {
			await wordRepository.insert(word);
		});
	} catch (error) {
		console.log("error ==>", error);
	} finally {
		client.release();
	}
}

export const InitScriptsDB = async () => {
	const client = await getClient();
	try {
		client.query("BEGIN");
		const { rows: isScripts } = (await client.query("SELECT * FROM information_schema.tables WHERE table_name = 'word_list'"));
		if (isScripts.length) return;

		const file = await readFile(resolve(__dirname, "..", "..", "..",  "scripts/scripts-ddl.sql"), { encoding: "utf-8" });
		const SQLArray = file.split(";");
		for await (const sql of SQLArray) {
			await client.query(sql, []);
		}
		client.query("COMMIT");
		insertFileTextDB();
	} catch (err) {
		client.query("ROLLBACK");
	} finally {
		client.release();
	}
};
