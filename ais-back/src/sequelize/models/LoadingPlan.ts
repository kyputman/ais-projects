import { Model, Table, Column, DataType, Default } from "sequelize-typescript";

@Table
export class LoadingPlan extends Model<LoadingPlan> {
	@Column(DataType.STRING)
	name!: string;

	@Column(DataType.DATE)
	expiresOn!: Date;

	@Default(false)
	@Column(DataType.BOOLEAN)
	processed!: boolean;
}
