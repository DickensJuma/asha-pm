import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../utils/database';


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

// Project.belongsToMany(User, { through: 'UserProjects', as: 'users', foreignKey: 'projectId' });
// Project.belongsToMany(Task, { through: 'ProjectTasks', as: 'tasks', foreignKey: 'projectId' });

export default Project;
