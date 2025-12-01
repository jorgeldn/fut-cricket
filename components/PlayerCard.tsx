"use client";

import { Player } from "@/db/schema";
import { deletePlayer } from "@/app/actions";
import { Zap, Brain, BicepsFlexed, Glasses, CircleDot, Trash2 } from "lucide-react";
import { getSimpleInitials } from "@/lib/initials";

export default function PlayerCard({ player }: { player: Player }) {
    const overall = (
        (player.speed + player.intelligence + player.stamina + player.vision + player.skill) / 5
    ).toFixed(1);

    return (
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 flex flex-col gap-3 relative group hover:shadow-lg transition">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500 overflow-hidden">
                        {player.avatar ? (
                            <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                        ) : (
                            getSimpleInitials(player.name)
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">{player.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                            {player.type}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-green-600">{overall}</span>
                    <span className="text-xs text-gray-400 font-medium">Pontuação</span>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-1 pt-2 border-t border-gray-50 mt-1">
                <SkillIcon icon={<Zap size={14} />} value={player.speed} color="text-yellow-500" />
                <SkillIcon icon={<Brain size={14} />} value={player.intelligence} color="text-pink-500" />
                <SkillIcon icon={<BicepsFlexed size={14} />} value={player.stamina} color="text-red-500" />
                <SkillIcon icon={<Glasses size={14} />} value={player.vision} color="text-blue-500" />
                <SkillIcon icon={<CircleDot size={14} />} value={player.skill} color="text-yellow-600" />
            </div>

            <button
                onClick={() => deletePlayer(player.id)}
                className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition opacity-0 group-hover:opacity-100"
                title="Excluir Jogador"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
}

function SkillIcon({ icon, value, color }: { icon: React.ReactNode; value: number; color: string }) {
    return (
        <div className="flex flex-col items-center gap-1">
            <div className={color}>{icon}</div>
            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color.replace("text-", "bg-")}`}
                    style={{ width: `${(value / 5) * 100}%` }}
                />
            </div>
        </div>
    );
}
