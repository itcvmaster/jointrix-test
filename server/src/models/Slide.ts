import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';

export interface SlideAttributes {
  id?: string;
  title: string;
  content: string;
  layout: 'default' | 'title' | 'split' | 'code';
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Slide extends Model<SlideAttributes> implements SlideAttributes {
  public id!: string;
  public title!: string;
  public content!: string;
  public layout!: 'default' | 'title' | 'split' | 'code';
  public order!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Slide.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    layout: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default',
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'slides',
  }
); 