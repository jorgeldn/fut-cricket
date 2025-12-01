import * as React from "react"
import { Zap, Dumbbell, Brain, Glasses, CircleDot } from "lucide-react"
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
    technique: CircleDot,
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

    // Calculate gradient color from red to green based on value
    const getGradientColor = (rating: number) => {
        if (value < rating) return "bg-secondary/50 text-muted-foreground border-white/5"

        // Create a gradient from red (hsl(0, 70%, 50%)) to green (hsl(120, 70%, 50%))
        const hue = ((value - 1) / 4) * 120 // Maps 1-5 to 0-120 degrees (red to green)
        return `text-white shadow-md`
    }

    const getBackgroundStyle = (rating: number) => {
        if (value < rating) return {}
        const hue = ((value - 1) / 4) * 120 // Maps 1-5 to 0-120 degrees (red to green)
        return {
            backgroundColor: `hsl(${hue}, 70%, 50%)`,
        }
    }

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
                        style={getBackgroundStyle(rating)}
                        className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all border border-transparent",
                            readonly ? "cursor-default" : "cursor-pointer hover:scale-110",
                            getGradientColor(rating)
                        )}
                    >
                        {rating}
                    </button>
                ))}
            </div>
        </div>
    )
}
