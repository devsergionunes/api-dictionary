/* eslint-disable no-unused-vars */

declare namespace NodeJS {
	export interface ProcessEnv {

		//	Ambiente
		ENVIRONMENT: "development" | "production";

		//	Database
		DB_HOST: string;
		DB_USER: string;
		DB_PASSWORD: string;
		DB_PORT: number;
	}
}
