import { Player } from "@/db/schema";

export interface Team {
    id: number;
    name: string;
    players: Player[];
    totalScore: number;
}

export function generateTeams(players: Player[], numTeams: number): Team[] {
    // 1. Calculate scores (already in player object? No, need to sum)
    const playersWithScore = players.map((p) => ({
        ...p,
        totalScore: p.speed + p.intelligence + p.stamina + p.vision + p.skill,
    }));

    // 2. Sort by score descending
    playersWithScore.sort((a, b) => b.totalScore - a.totalScore);

    // 3. Initialize teams
    const teams: Team[] = Array.from({ length: numTeams }, (_, i) => ({
        id: i + 1,
        name: `Time ${String.fromCharCode(65 + i)}`, // Time A, Time B...
        players: [],
        totalScore: 0,
    }));

    // 4. Distribute (Greedy: assign to team with lowest total score)
    for (const player of playersWithScore) {
        // Find team with lowest score
        let minTeamIndex = 0;
        let minScore = teams[0].totalScore;

        for (let i = 1; i < numTeams; i++) {
            if (teams[i].totalScore < minScore) {
                minScore = teams[i].totalScore;
                minTeamIndex = i;
            }
        }

        // Assign
        teams[minTeamIndex].players.push(player);
        teams[minTeamIndex].totalScore += player.totalScore;
    }

    return teams;
}
