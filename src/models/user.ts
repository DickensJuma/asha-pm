import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../utils/database';

interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

class User extends Model<UserAttributes> {
  password: any;
  id: any;
  email: any;
  first_name: any;
  last_name: any;
  role: any;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'user',
  }
);

// User.belongsToMany(Project, { through: 'UserProjects', as: 'projects', foreignKey: 'userId' });
// User.belongsToMany(Task, { through: 'UserTasks', as: 'tasks', foreignKey: 'userId' });
// User.belongsToMany(Team, { through: 'UserTeams', as: 'teams', foreignKey: 'userId' });

export default User;
