"use client"

import * as React from "react"
import { ref, onValue } from "firebase/database"
import { database } from "@/firebase-config"
import { Player } from "@/types/player"
import { PlayerForm } from "@/components/PlayerForm"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Plus, User, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlayerRegistryProps {
    onBack: () => void
}

export function PlayerRegistry({ onBack }: PlayerRegistryProps) {
    const [players, setPlayers] = React.useState<Player[]>([])
    const [isFormOpen, setIsFormOpen] = React.useState(false)
    const [editingPlayer, setEditingPlayer] = React.useState<Player | null>(null)
    const [loading, setLoading] = React.useState(true)

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

    const handleEdit = (player: Player) => {
        setEditingPlayer(player)
        setIsFormOpen(true)
    }

    const handleAddNew = () => {
        setEditingPlayer(null)
        setIsFormOpen(true)
    }

    const handleFormClose = () => {
        setIsFormOpen(false)
        setEditingPlayer(null)
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    const getOverall = (skills: Player["skills"]) => {
        const sum = Object.values(skills).reduce((a, b) => a + b, 0)
        return (sum / 5).toFixed(1)
    }

    if (isFormOpen) {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center mb-4">
                    <Button variant="ghost" onClick={handleFormClose} className="pl-0 hover:bg-transparent hover:text-primary">
                        ← Voltar para Lista
                    </Button>
                </div>
                <PlayerForm
                    playerToEdit={editingPlayer}
                    onCancel={handleFormClose}
                    onSuccess={handleFormClose}
                />
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
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

            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Gerenciar Elenco</h2>
                <Button onClick={handleAddNew} size="sm" className="shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Jogador
                </Button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-muted-foreground">Carregando craques...</div>
            ) : players.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground border border-dashed border-white/10 rounded-xl bg-white/5">
                    <User className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>Nenhum peladeiro cadastrado.</p>
                    <Button variant="link" onClick={handleAddNew} className="mt-2">
                        Cadastrar o primeiro
                    </Button>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {players.map((player) => (
                        <Card
                            key={player.id}
                            className="cursor-pointer hover:border-primary/50 transition-all hover:bg-white/5 group"
                            onClick={() => handleEdit(player)}
                        >
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-lg shrink-0 border border-primary/20 group-hover:scale-110 transition-transform">
                                    {getInitials(player.name)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold truncate text-white group-hover:text-primary transition-colors">{player.name}</h3>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="text-xs text-muted-foreground">{player.type}</p>
                                        {player.positions && player.positions.length > 0 && (
                                            <>
                                                <span className="text-xs text-muted-foreground">•</span>
                                                <p className="text-xs text-primary/80">{player.positions.join(", ")}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-2xl font-bold text-primary">
                                        {getOverall(player.skills)}
                                    </div>
                                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                        Pontuação
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
