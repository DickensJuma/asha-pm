import { Request, Response } from 'express';
import Team from '../models/team';
import TeamService from '../services/teamService';

// POST /teams
export async function createTeam(req: Request, res: Response): Promise<void> {
  const { name, description } = req.body;
  try {
    // Create the team
    const team = await TeamService.createTeam({ name, description });
    res.status(201).json(team);

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET /teams/:id
export async function getTeam(req: Request, res: Response): Promise<void> {
  const teamId = req.params.id;
  try {
    const team = await TeamService.getTeam(teamId);
    res.status(200).json({ result: { team } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET /teams
export async function getAllTeams(req: Request, res: Response): Promise<void> {
  // Pagination
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.perPage as string) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results: { next?: { page: number; limit: number }; results: Team[] } = {
    results: []
  };

  try {
    const teams = await TeamService.getAllTeams();

    if (endIndex < teams.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    results.results = teams.slice(startIndex, endIndex);

    res.status(200).json(results);
  } catch (error) {
    console.log('TEAM ALL ERROR', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// PUT /teams/:id
export async function updateTeam(req: Request, res: Response): Promise<void> {
  const teamId = req.params.id;
  const { name, description } = req.body;
  try {
    let team = await TeamService.updateTeam(teamId, { name, description });

    res.status(200).json({ result: { team } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// DELETE /teams/:id
export async function deleteTeam(req: Request, res: Response): Promise<void> {
  const teamId = req.params.id;
  try {
    await TeamService.deleteTeam(teamId);
    
    res.status(204).json({ result: { message: 'Team deleted' } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
