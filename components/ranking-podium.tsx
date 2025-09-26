"use client"

import { Card } from "@/components/ui/card"
import { Trophy, Medal, Award, Crown } from "lucide-react"

interface RankingPodiumProps {
  topThree: any[]
}

export default function RankingPodium({ topThree }: RankingPodiumProps) {
  if (topThree.length < 3) return null

  const [first, second, third] = topThree

  return (
    <div className="text-center mb-16">
      <h3 className="text-4xl font-bold mb-12 flex items-center justify-center gap-2">
        <Crown className="w-10 h-10 text-yellow-500 animate-pulse" />
        TOP 3 AVENGERS
        <Crown className="w-10 h-10 text-yellow-500 animate-pulse" />
      </h3>

      <div className="flex flex-col md:flex-row items-end justify-center gap-8 max-w-4xl mx-auto">
        {/* Second Place */}
        <Card
          className="glass-card p-8 transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
          style={{
            borderColor: second.color,
            boxShadow: `0 0 30px ${second.color}40`,
          }}
        >
          <div className="text-center">
            <Medal className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
            <img
              src={second.image || "/placeholder.svg"}
              alt={second.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4"
              style={{ borderColor: second.color }}
            />
            <h4 className="text-2xl font-bold mb-2" style={{ color: second.color }}>
              {second.name}
            </h4>
            <p className="text-muted-foreground mb-2">{second.superhero}</p>
            <div className="text-4xl font-bold text-accent mb-2">{second.totalPoints}</div>
            <div className="text-lg font-semibold text-gray-400">2° LUGAR</div>
          </div>
        </Card>

        {/* First Place */}
        <Card
          className="glass-card p-10 transform hover:scale-105 transition-all duration-300 animate-glow md:-mt-8"
          style={{
            borderColor: first.color,
            boxShadow: `0 0 40px ${first.color}60`,
          }}
        >
          <div className="text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
            <img
              src={first.image || "/placeholder.svg"}
              alt={first.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-yellow-500"
            />
            <h4 className="text-3xl font-bold mb-2 neon-text" style={{ color: first.color }}>
              {first.name}
            </h4>
            <p className="text-muted-foreground mb-2 text-lg">{first.superhero}</p>
            <div className="text-5xl font-bold text-yellow-500 mb-2 neon-text">{first.totalPoints}</div>
            <div className="text-2xl font-bold text-yellow-500 neon-text">🏆 MVP 🏆</div>
          </div>
        </Card>

        {/* Third Place */}
        <Card
          className="glass-card p-8 transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
          style={{
            borderColor: third.color,
            boxShadow: `0 0 30px ${third.color}40`,
          }}
        >
          <div className="text-center">
            <Award className="w-12 h-12 text-amber-600 mx-auto mb-4 animate-pulse" />
            <img
              src={third.image || "/placeholder.svg"}
              alt={third.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4"
              style={{ borderColor: third.color }}
            />
            <h4 className="text-2xl font-bold mb-2" style={{ color: third.color }}>
              {third.name}
            </h4>
            <p className="text-muted-foreground mb-2">{third.superhero}</p>
            <div className="text-4xl font-bold text-accent mb-2">{third.totalPoints}</div>
            <div className="text-lg font-semibold text-amber-600">3° LUGAR</div>
          </div>
        </Card>
      </div>
    </div>
  )
}
