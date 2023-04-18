import {
	Model,
	Table,
	Column,
	Unique,
	DataType,
	BelongsTo,
	ForeignKey,
} from "sequelize-typescript";

import { User } from "./User";

@Table
export class Login extends Model<Login> {
	@Unique
	@Column(DataType.STRING)
	login!: string;

	@Column(DataType.STRING)
	password!: string;

	@ForeignKey(() => User)
	userId!: number;

	@BelongsTo(() => User)
	user!: User;
}
