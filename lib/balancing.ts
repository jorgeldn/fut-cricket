import { Player } from "@/types/player"

export interface Team {
    id: number
    name: string
    players: Player[]
    totalScore: number
    averageScore: number
}

export function calculateScore(player: Player): number {
    const { speed, stamina, intelligence, vision, technique } = player.skills
    // Sum of all skills
    return speed + stamina + intelligence + vision + technique
}

export function generateTeams(players: Player[], numTeams: number): Team[] {
    // 1. Calculate scores for all players
    const playersWithScores = players.map((p) => ({
        ...p,
        score: calculateScore(p),
        // Add a tiny random noise to break ties and allow reshuffling variations
        // while keeping the core balance logic intact.
        // The noise is small enough not to disrupt the main balance significantly
        // but enough to change sort order of similar players.
        sortScore: calculateScore(p) + (Math.random() - 0.5) * 0.5
    }))

    // 2. Sort players by score descending
    playersWithScores.sort((a, b) => b.sortScore - a.sortScore)

    // 3. Initialize teams
    const teams: Team[] = Array.from({ length: numTeams }, (_, i) => ({
        id: i + 1,
        name: `Time ${String.fromCharCode(65 + i)}`, // Time A, Time B, etc.
        players: [],
        totalScore: 0,
        averageScore: 0
    }))

    // 4. Distribute players using a "Snake" distribution or "Greedy" approach
    // Greedy approach: Always add the next best player to the team with the lowest total score.
    // This usually yields better balance than simple snake for small sets.
    for (const player of playersWithScores) {
        // Find team with lowest total score
        teams.sort((a, b) => a.totalScore - b.totalScore)
        const targetTeam = teams[0]

        targetTeam.players.push(player)
        targetTeam.totalScore += player.score
    }

    // 5. Finalize stats
    teams.forEach(team => {
        team.averageScore = team.players.length > 0
            ? Number((team.totalScore / team.players.length).toFixed(1))
            : 0
        // Sort players within team by score for display
        team.players.sort((a, b) => calculateScore(b) - calculateScore(a))
        // Restore original team order (ID based)
    })

    return teams.sort((a, b) => a.id - b.id)
}
