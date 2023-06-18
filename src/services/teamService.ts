import Team from '../models/team';

interface TeamData {
  name: string;
  description: string;
  // Add any team data fields here
}

class TeamService {
  static async getAllTeams() {
    return Team.findAll();
  }

  static async getTeam(teamId: string) {
    const team = await Team.findByPk(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    return team;
  }


  static async createTeam(teamData: any) {
    return Team.create(teamData);
  }

  static async updateTeam(teamId: string, teamData: TeamData) {
    const team = await Team.findByPk(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    return team.update(teamData);
  }

  static async deleteTeam(teamId: string) {
    const team = await Team.findByPk(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    return team.destroy();
  }
  
}

export default TeamService;
