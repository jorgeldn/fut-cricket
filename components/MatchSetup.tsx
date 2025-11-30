"use client";

import { useState } from "react";
import { Player } from "@/db/schema";
import { generateTeams, Team } from "@/lib/balancer";
import { Calendar, Users, Shuffle, ArrowRight } from "lucide-react";
import clsx from "clsx";

export default function MatchSetup({ players }: { players: Player[] }) {
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [numTeams, setNumTeams] = useState(2);
    const [selectedPlayerIds, setSelectedPlayerIds] = useState<Set<number>>(
        new Set(players.map((p) => p.id)) // Default select all
    );
    const [generatedTeams, setGeneratedTeams] = useState<Team[] | null>(null);

    const togglePlayer = (id: number) => {
        const newSet = new Set(selectedPlayerIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedPlayerIds(newSet);
    };

    const handleGenerate = () => {
        const selectedPlayers = players.filter((p) => selectedPlayerIds.has(p.id));
        const teams = generateTeams(selectedPlayers, numTeams);
        setGeneratedTeams(teams);
    };

    if (generatedTeams) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Times Gerados</h2>
                    <button
                        onClick={() => setGeneratedTeams(null)}
                        className="text-sm text-green-600 font-medium hover:underline"
                    >
                        Voltar à configuração
                    </button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {generatedTeams.map((team) => (
                        <div key={team.id} className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                                <h3 className="font-bold text-lg text-gray-800">{team.name}</h3>
                                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                                    Força: {team.totalScore}
                                </span>
                            </div>
                            <ul className="space-y-2">
                                {team.players.map((p) => (
                                    <li key={p.id} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-700">{p.name}</span>
                                        <span className="text-gray-400 text-xs">
                                            {(p.speed + p.intelligence + p.stamina + p.vision + p.skill)} pts
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-3 pt-2 border-t border-gray-50 text-center text-xs text-gray-400">
                                {team.players.length} jogadores
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                        <Calendar size={16} /> Data do Jogo
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                        <Users size={16} /> Quantidade de Times
                    </label>
                    <input
                        type="number"
                        min="2"
                        max="4"
                        value={numTeams}
                        onChange={(e) => setNumTeams(Number(e.target.value))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center justify-between">
                    Quem vai jogar?
                    <span className="text-sm font-normal text-gray-500">
                        {selectedPlayerIds.size} selecionados
                    </span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1">
                    {players.map((player) => (
                        <label
                            key={player.id}
                            className={clsx(
                                "flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition select-none",
                                selectedPlayerIds.has(player.id)
                                    ? "bg-green-50 border-green-200"
                                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                            )}
                        >
                            <input
                                type="checkbox"
                                checked={selectedPlayerIds.has(player.id)}
                                onChange={() => togglePlayer(player.id)}
                                className="hidden"
                            />
                            <div
                                className={clsx(
                                    "w-4 h-4 rounded-full border flex items-center justify-center",
                                    selectedPlayerIds.has(player.id)
                                        ? "bg-green-500 border-green-500"
                                        : "border-gray-400"
                                )}
                            >
                                {selectedPlayerIds.has(player.id) && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                            </div>
                            <span className="text-sm font-medium text-gray-700 truncate">{player.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button
                onClick={handleGenerate}
                disabled={selectedPlayerIds.size < numTeams}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
                <Shuffle size={20} /> Gerar Times
            </button>
        </div>
    );
}
