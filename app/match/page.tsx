import { getPlayers } from "@/app/actions";
import MatchSetup from "@/components/MatchSetup";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function MatchPage() {
    const players = await getPlayers();

    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-20">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 bg-white rounded-full shadow-sm text-gray-600 hover:text-green-600 transition">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Organizar Partida</h1>
                </div>

                <MatchSetup players={players} />
            </div>
        </div>
    );
}
