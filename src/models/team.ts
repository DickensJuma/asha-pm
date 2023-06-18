import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../utils/database';
import User from '../models/user';
import Task from '../models/task';



interface TeamAttributes {
  id: string;
  name: string;
  description: string;
}

class Team extends Model<TeamAttributes> {}

Team.init(
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
  },
  {
    sequelize,
    modelName: 'team',
  }
);

Team.belongsToMany(User, { through: 'UserTeams', as: 'users', foreignKey: 'teamId' });
Team.belongsToMany(Task, { through: 'TeamTasks', as: 'tasks', foreignKey: 'teamId' });

export default Team;
