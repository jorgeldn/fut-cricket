import * as React from "react"
import { Zap, Dumbbell, Brain, Glasses, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface SkillRatingProps {
    label: string
    value: number
    onChange?: (value: number) => void
    readonly?: boolean
    icon: "speed" | "stamina" | "intelligence" | "vision" | "technique"
}

const icons = {
    speed: Zap,
    stamina: Dumbbell,
    intelligence: Brain,
    vision: Glasses,
    technique: Trophy,
}

const colors = {
    speed: "text-yellow-500",
    stamina: "text-red-500",
    intelligence: "text-blue-500",
    vision: "text-purple-500",
    technique: "text-green-500",
}

export function SkillRating({ label, value, onChange, readonly = false, icon }: SkillRatingProps) {
    const Icon = icons[icon]
    const color = colors[icon]

    return (
        <div className="flex items-center gap-4 py-2">
            <div className="flex items-center gap-2 w-32">
                <Icon className={cn("w-5 h-5", color)} />
                <span className="text-sm font-medium">{label}</span>
            </div>

            <div className="flex-1 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                        key={rating}
                        type="button"
                        disabled={readonly}
                        onClick={() => onChange?.(rating)}
                        className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all border border-transparent",
                            readonly ? "cursor-default" : "cursor-pointer hover:scale-110",
                            value >= rating
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                                : "bg-secondary/50 text-muted-foreground border-white/5"
                        )}
                    >
                        {rating}
                    </button>
                ))}
            </div>
            <span className="w-8 text-center font-bold text-lg text-primary">{value}</span>
        </div>
    )
}
