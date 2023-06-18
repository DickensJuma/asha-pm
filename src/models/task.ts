import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../utils/database';

import User from '../models/user';
import Project from '../models/project';


interface TaskAttributes {
  id: string;
  name: string;
  description: string;
  status: 'open' | 'closed';
  priority: 'low' | 'medium' | 'high';
  owners: Array<object>;
  accountable: Array<string>;
  subscribers: Array<string>;
  createdAt?: Date;
  updatedAt?: Date;
  stage: 'backlog' | 'todo' | 'in-progress' | 'done';
}

class Task extends Model<TaskAttributes> {
  name: any;
  description: any;
  status: any;
  priority: any;
  owners: any;
  accountable: any;
  subscribers: any;
  stage: any;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('open', 'closed'),
      allowNull: false,
    },
    stage: {
      type: DataTypes.ENUM('backlog', 'todo', 'in-progress', 'done'),
      allowNull: true,
    },

    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
    },
    owners: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    accountable: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    subscribers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'task',
  }
);

// Task.belongsTo(Project, { as: 'project', foreignKey: 'projectId' });
// Task.belongsTo(User, { as: 'user', foreignKey: 'userId' });

export default Task;
