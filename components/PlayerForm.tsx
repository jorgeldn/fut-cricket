"use client"

import * as React from "react"
import { ref, push, update, remove } from "firebase/database"
import { database } from "@/firebase-config"
import { Player, PlayerSkills, initialSkills, PlayerType } from "@/types/player"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { SkillRating } from "@/components/SkillRating"
import { Trash2 } from "lucide-react"

interface PlayerFormProps {
    playerToEdit?: Player | null
    onCancel?: () => void
    onSuccess?: () => void
}

export function PlayerForm({ playerToEdit, onCancel, onSuccess }: PlayerFormProps) {
    const [name, setName] = React.useState(playerToEdit?.name || "")
    const [type, setType] = React.useState<PlayerType>(playerToEdit?.type || "Mensalista")
    const [skills, setSkills] = React.useState<PlayerSkills>(playerToEdit?.skills || initialSkills)
    const [isLoading, setIsLoading] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) return

        setIsLoading(true)
        try {
            if (playerToEdit) {
                const playerRef = ref(database, `players/${playerToEdit.id}`)
                await update(playerRef, {
                    name,
                    type,
                    skills,
                })
            } else {
                const playersRef = ref(database, "players")
                await push(playersRef, {
                    name,
                    type,
                    skills,
                    createdAt: Date.now(),
                })
            }
            setName("")
            setSkills(initialSkills)
            onSuccess?.()
        } catch (error) {
            console.error("Error saving player:", error)
            alert("Erro ao salvar jogador. Verifique o console para mais detalhes.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!playerToEdit || !confirm("Tem certeza que deseja excluir este jogador?")) return

        setIsLoading(true)
        try {
            const playerRef = ref(database, `players/${playerToEdit.id}`)
            await remove(playerRef)
            onSuccess?.()
        } catch (error) {
            console.error("Error deleting player:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{playerToEdit ? "Editar Jogador" : "Novo Jogador"}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-1 block">Nome</label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nome do craque"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1 block">Tipo</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="Mensalista"
                                        checked={type === "Mensalista"}
                                        onChange={(e) => setType(e.target.value as PlayerType)}
                                        className="w-4 h-4 text-primary"
                                    />
                                    Mensalista
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="Diarista"
                                        checked={type === "Diarista"}
                                        onChange={(e) => setType(e.target.value as PlayerType)}
                                        className="w-4 h-4 text-primary"
                                    />
                                    Diarista
                                </label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium block">Skills</label>
                            <div className="bg-secondary/20 p-4 rounded-lg space-y-2">
                                <SkillRating
                                    label="Velocidade"
                                    icon="speed"
                                    value={skills.speed}
                                    onChange={(v) => setSkills({ ...skills, speed: v })}
                                />
                                <SkillRating
                                    label="Vigor"
                                    icon="stamina"
                                    value={skills.stamina}
                                    onChange={(v) => setSkills({ ...skills, stamina: v })}
                                />
                                <SkillRating
                                    label="Inteligência"
                                    icon="intelligence"
                                    value={skills.intelligence}
                                    onChange={(v) => setSkills({ ...skills, intelligence: v })}
                                />
                                <SkillRating
                                    label="Visão"
                                    icon="vision"
                                    value={skills.vision}
                                    onChange={(v) => setSkills({ ...skills, vision: v })}
                                />
                                <SkillRating
                                    label="Técnica"
                                    icon="technique"
                                    value={skills.technique}
                                    onChange={(v) => setSkills({ ...skills, technique: v })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        {playerToEdit && (
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={isLoading}
                                className="mr-auto"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Excluir
                            </Button>
                        )}

                        {onCancel && (
                            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                                Cancelar
                            </Button>
                        )}
                        <Button type="submit" isLoading={isLoading}>
                            {playerToEdit ? "Salvar Alterações" : "Cadastrar Jogador"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
