import { Model, Table, Column, IsEmail, DataType, Unique } from "sequelize-typescript";

@Table
export class User extends Model<User> {
	@Column(DataType.STRING)
	firstName!: string;

	@Column(DataType.STRING)
	secondName!: string;

	@Column(DataType.STRING)
	middleName!: string;
}
