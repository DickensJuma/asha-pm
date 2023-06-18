import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../utils/database';

import Task from '../models/task';

interface ProjectAttributes {
  id: string;
  name: string;
  description: string;
  tasks: Array<string>;
}

class Project extends Model<ProjectAttributes> {
  name: string;
  description: string;
  tasks: string[];
}

Project.init(
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
    tasks: {
      type: DataTypes.ARRAY(DataTypes.STRING),

      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'project',
  }
);
// Association with Task model
Project.hasMany(Task, {
  foreignKey: 'projectId',
  as: 'projectTasks',
});


export default Project;
