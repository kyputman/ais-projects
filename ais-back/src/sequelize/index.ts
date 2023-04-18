import { Sequelize } from "sequelize-typescript";

import { LoadingPlan } from "./models/LoadingPlan";
import { Login } from "./models/Login";
import { User } from "./models/User";

const sequelize = new Sequelize({
	port: 3306,
	dialect: "mysql",
	database: "inventory",
	password: "root",
	username: "root",
	models: [User, LoadingPlan, Login],
});

export async function connect() {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}
