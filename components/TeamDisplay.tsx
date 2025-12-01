import * as React from "react"
import { Team } from "@/lib/balancing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { calculateScore } from "@/lib/balancing"
import { getSimpleInitials } from "@/lib/initials"

interface TeamDisplayProps {
    teams: Team[]
}

export function TeamDisplay({ teams }: TeamDisplayProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
                <Card key={team.id} className="overflow-hidden">
                    <CardHeader className="bg-secondary/20 pb-4">
                        <CardTitle className="flex justify-between items-center">
                            <span>{team.name}</span>
                            <span className="text-sm font-normal bg-primary/10 px-2 py-1 rounded text-primary">
                                Força: {team.totalScore}
                            </span>
                        </CardTitle>
                        <div className="text-xs text-muted-foreground">
                            Média: {team.averageScore} | Jogadores: {team.players.length}
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ul className="divide-y">
                            {team.players.map((player) => (
                                <li key={player.id} className="p-3 flex justify-between items-center hover:bg-secondary/10">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                            {getSimpleInitials(player.name)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">{player.name}</div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <div className="text-[10px] text-muted-foreground">{player.type}</div>
                                                {player.positions && player.positions.length > 0 && (
                                                    <>
                                                        <span className="text-[10px] text-muted-foreground">•</span>
                                                        <div className="text-[10px] text-primary/70">{player.positions.join(", ")}</div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="font-bold text-sm text-muted-foreground">
                                        {calculateScore(player)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
