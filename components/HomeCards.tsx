"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Users, Trophy } from "lucide-react"

interface HomeCardsProps {
    onNavigate: (view: "players" | "match") => void
}

export function HomeCards({ onNavigate }: HomeCardsProps) {
    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl w-full px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Players Management Card */}
                <Card
                    className="group cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 border-white/10 hover:border-primary/50"
                    onClick={() => onNavigate("players")}
                >
                    <CardHeader className="text-center pb-4">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                            <Users className="w-10 h-10 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            Gestão de Jogadores
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-foreground text-sm">
                            Cadastre e gerencie os jogadores, suas habilidades e estatísticas para montar os melhores times.
                        </p>
                    </CardContent>
                </Card>

                {/* Match Setup Card */}
                <Card
                    className="group cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 border-white/10 hover:border-primary/50"
                    onClick={() => onNavigate("match")}
                >
                    <CardHeader className="text-center pb-4">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/20">
                            <Trophy className="w-10 h-10 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            Sorteio de Times
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-foreground text-sm">
                            Configure a partida, selecione os jogadores presentes e sorteie times balanceados automaticamente.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
