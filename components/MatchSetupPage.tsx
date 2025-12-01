"use client"

import * as React from "react"
import { ref, onValue } from "firebase/database"
import { database } from "@/firebase-config"
import { Player } from "@/types/player"
import { generateTeams, Team } from "@/lib/balancing"
import { TeamDisplay } from "@/components/TeamDisplay"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Users, Calendar, Shuffle, Trophy, Settings, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface MatchSetupPageProps {
    onBack: () => void
}

export function MatchSetupPage({ onBack }: MatchSetupPageProps) {
    const [players, setPlayers] = React.useState<Player[]>([])
    const [selectedPlayerIds, setSelectedPlayerIds] = React.useState<Set<string>>(new Set())
    const [numTeams, setNumTeams] = React.useState(2)
    const [matchDate, setMatchDate] = React.useState(new Date().toISOString().split("T")[0])
    const [generatedTeams, setGeneratedTeams] = React.useState<Team[]>([])
    const [loading, setLoading] = React.useState(true)
    const teamsResultRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const playersRef = ref(database, "players")
        const unsubscribe = onValue(playersRef, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const playerList = Object.entries(data).map(([id, player]: [string, any]) => ({
                    id,
                    ...player,
                }))

                // Sort: Mensalistas first (alphabetically), then Diaristas (alphabetically)
                playerList.sort((a, b) => {
                    // First sort by type (Mensalista before Diarista)
                    if (a.type !== b.type) {
                        return a.type === "Mensalista" ? -1 : 1
                    }
                    // Then sort alphabetically by name
                    return a.name.localeCompare(b.name, 'pt-BR')
                })

                setPlayers(playerList)
            } else {
                setPlayers([])
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const handleTogglePlayer = (id: string) => {
        const newSelected = new Set(selectedPlayerIds)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedPlayerIds(newSelected)
    }

    const handleSelectAll = () => {
        if (selectedPlayerIds.size === players.length) {
            setSelectedPlayerIds(new Set())
        } else {
            setSelectedPlayerIds(new Set(players.map(p => p.id)))
        }
    }

    const handleGenerateTeams = () => {
        const selectedPlayers = players.filter(p => selectedPlayerIds.has(p.id))
        if (selectedPlayers.length < numTeams) {
            alert("Selecione jogadores suficientes para o número de times!")
            return
        }
        const teams = generateTeams(selectedPlayers, numTeams)
        setGeneratedTeams(teams)

        // Auto-scroll to results on mobile
        setTimeout(() => {
            teamsResultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Back Button */}
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="gap-2 hover:bg-white/5"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Configuration Column */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-primary">
                                <Settings className="w-5 h-5" />
                                Configuração
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block text-muted-foreground">Data do Jogo</label>
                                <Input
                                    type="date"
                                    value={matchDate}
                                    onChange={(e) => setMatchDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block text-muted-foreground">Quantidade de Times</label>
                                <Input
                                    type="number"
                                    min={2}
                                    max={4}
                                    value={numTeams}
                                    onChange={(e) => setNumTeams(parseInt(e.target.value))}
                                />
                            </div>
                            <Button
                                className="w-full font-bold text-lg h-12 shadow-lg shadow-primary/20"
                                size="lg"
                                onClick={handleGenerateTeams}
                                disabled={selectedPlayerIds.size < numTeams}
                            >
                                <Shuffle className="w-5 h-5 mr-2" />
                                Sortear Times
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col h-[500px]">
                        <CardHeader className="pb-3 shrink-0">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Users className="w-5 h-5 text-primary" />
                                    Presença ({selectedPlayerIds.size})
                                </CardTitle>
                                <Button variant="ghost" size="sm" onClick={handleSelectAll} className="text-xs h-8 hover:bg-white/5">
                                    {selectedPlayerIds.size === players.length ? "Desmarcar Todos" : "Marcar Todos"}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                            {loading ? (
                                <div className="text-center text-sm text-muted-foreground py-8">Carregando...</div>
                            ) : players.length === 0 ? (
                                <div className="text-center text-sm text-muted-foreground py-8">
                                    Nenhum jogador cadastrado. Cadastre jogadores primeiro.
                                </div>
                            ) : (
                                players.map((player) => (
                                    <div
                                        key={player.id}
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                                            selectedPlayerIds.has(player.id)
                                                ? "bg-primary/10 border-primary/50 shadow-sm shadow-primary/5"
                                                : "border-transparent hover:bg-white/5"
                                        )}
                                        onClick={() => handleTogglePlayer(player.id)}
                                    >
                                        <div className={cn(
                                            "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                            selectedPlayerIds.has(player.id) ? "bg-primary border-primary" : "border-muted-foreground/50"
                                        )}>
                                            {selectedPlayerIds.has(player.id) && <div className="w-2.5 h-2.5 bg-primary-foreground rounded-[1px]" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-sm text-white">{player.name}</div>
                                            <div className="text-xs text-muted-foreground">{player.type}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Results Column */}
                <div className="lg:col-span-2" ref={teamsResultRef}>
                    {generatedTeams.length > 0 ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <Trophy className="w-6 h-6 text-yellow-500" />
                                    Times Sorteados
                                </h2>
                                <Button variant="ghost" onClick={() => setGeneratedTeams([])} size="sm" className="hover:bg-white/5">
                                    Limpar
                                </Button>
                            </div>
                            <TeamDisplay teams={generatedTeams} />
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/10 rounded-xl bg-white/5 min-h-[400px]">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 animate-pulse">
                                <Shuffle className="w-10 h-10 opacity-20" />
                            </div>
                            <h3 className="text-xl font-medium text-white">Pronto para o jogo?</h3>
                            <p className="text-sm text-muted-foreground max-w-sm mt-2">
                                Selecione os jogadores confirmados na lista ao lado e clique em "Sortear Times" para gerar o equilíbrio perfeito.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
