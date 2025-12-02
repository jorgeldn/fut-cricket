"use client"

import * as React from "react"
import { Users, Trophy } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { HomeCards } from "@/components/HomeCards"
import { PlayerRegistry } from "@/components/PlayerRegistry"
import { MatchSetupPage } from "@/components/MatchSetupPage"

type View = "home" | "players" | "match"

export default function FutCricketApp() {
  const [currentView, setCurrentView] = React.useState<View>("home")

  const handleNavigate = (view: View) => {
    setCurrentView(view)
  }

  const handleBack = () => {
    setCurrentView("home")
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentView("home")}
          >
            <img src="/logo.svg" alt="Fut Cricket Logo" className="w-10 h-10" />
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Fut Cricket
            </h1>
          </div>

          <nav className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigate("players")}
              className={cn(
                "gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                currentView === "players"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              <Users className="w-4 h-4" />
              Jogadores
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigate("match")}
              className={cn(
                "gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                currentView === "match"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              <Trophy className="w-4 h-4" />
              Partida
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4 pt-8">
        {currentView === "home" && (
          <HomeCards onNavigate={handleNavigate} />
        )}

        {currentView === "players" && (
          <PlayerRegistry onBack={handleBack} />
        )}

        {currentView === "match" && (
          <MatchSetupPage onBack={handleBack} />
        )}
      </main>
    </div>
  )
}
