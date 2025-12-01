import { Player, Position } from "@/types/player"

export interface Team {
    id: number
    name: string
    players: Player[]
    totalScore: number
    averageScore: number
    positionCounts: { [key in Position]: number }
}

export function calculateScore(player: Player): number {
    const { speed, stamina, intelligence, vision, technique } = player.skills
    // Sum of all skills
    return speed + stamina + intelligence + vision + technique
}

function getPositionCounts(team: Team): { [key in Position]: number } {
    const counts: { [key in Position]: number } = {
        Defesa: 0,
        Meio: 0,
        Ataque: 0
    }

    team.players.forEach(player => {
        if (player.positions) {
            player.positions.forEach(pos => {
                counts[pos]++
            })
        }
    })

    return counts
}

function calculateTeamBalance(team: Team): number {
    // Lower is better - we want balanced teams in terms of both score and positions
    const positionCounts = getPositionCounts(team)
    const positions = Object.values(positionCounts)

    // Calculate variance in position distribution
    if (positions.every(count => count === 0)) return team.totalScore

    const avgPositionCount = positions.reduce((a, b) => a + b, 0) / 3
    const positionVariance = positions.reduce((sum, count) => {
        return sum + Math.pow(count - avgPositionCount, 2)
    }, 0) / 3

    // Combine score with position balance (weight position variance to make it significant)
    return team.totalScore + (positionVariance * 10)
}

export function generateTeams(players: Player[], numTeams: number): Team[] {
    // 1. Calculate how many players each team should have
    const totalPlayers = players.length
    const basePlayersPerTeam = Math.floor(totalPlayers / numTeams)
    const teamsWithExtraPlayer = totalPlayers % numTeams

    // Calculate max players for each team
    // Example: 18 players, 3 teams = 6, 6, 6
    // Example: 16 players, 3 teams = 6, 5, 5 (1 team with 6, 2 teams with 5)
    const teamSizes: number[] = Array.from({ length: numTeams }, (_, i) => {
        return i < teamsWithExtraPlayer ? basePlayersPerTeam + 1 : basePlayersPerTeam
    })

    // 2. Calculate scores for all players
    const playersWithScores = players.map((p) => ({
        ...p,
        score: calculateScore(p),
        // Add a tiny random noise to break ties and allow reshuffling variations
        sortScore: calculateScore(p) + (Math.random() - 0.5) * 0.5
    }))

    // 3. Sort players by score descending
    playersWithScores.sort((a, b) => b.sortScore - a.sortScore)

    // 4. Initialize teams
    const teams: Team[] = Array.from({ length: numTeams }, (_, i) => ({
        id: i + 1,
        name: `Time ${String.fromCharCode(65 + i)}`, // Time A, Time B, etc.
        players: [],
        totalScore: 0,
        averageScore: 0,
        positionCounts: { Defesa: 0, Meio: 0, Ataque: 0 },
        maxPlayers: teamSizes[i]
    }))

    // 5. Distribute players considering score, position balance, AND team size limits
    for (const player of playersWithScores) {
        // Find eligible teams (those that haven't reached their max size)
        const eligibleTeams = teams.filter(team => team.players.length < (team as any).maxPlayers)

        if (eligibleTeams.length === 0) {
            // This shouldn't happen, but just in case
            console.error("No eligible teams found for player distribution")
            break
        }

        // Among eligible teams, find the one with best balance
        eligibleTeams.sort((a, b) => calculateTeamBalance(a) - calculateTeamBalance(b))
        const targetTeam = eligibleTeams[0]

        targetTeam.players.push(player)
        targetTeam.totalScore += player.score
    }

    // 6. Finalize stats
    teams.forEach(team => {
        team.averageScore = team.players.length > 0
            ? Number((team.totalScore / team.players.length).toFixed(1))
            : 0
        team.positionCounts = getPositionCounts(team)
        // Sort players within team by score for display
        team.players.sort((a, b) => calculateScore(b) - calculateScore(a))
        // Remove temporary maxPlayers property
        delete (team as any).maxPlayers
    })

    return teams.sort((a, b) => a.id - b.id)
}
