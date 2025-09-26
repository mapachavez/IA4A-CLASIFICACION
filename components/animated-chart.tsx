"use client"

import { useEffect, useRef } from "react"

interface AnimatedChartProps {
  participants: any[]
  onParticipantClick: (participant: any) => void
}

export default function AnimatedChart({ participants, onParticipantClick }: AnimatedChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const maxPoints = Math.max(...participants.map((p) => p.totalPoints))

  useEffect(() => {
    // Animate bars on mount
    const bars = chartRef.current?.querySelectorAll(".chart-bar")
    bars?.forEach((bar, index) => {
      setTimeout(() => {
        bar.classList.add("animate-slide-in-up")
      }, index * 100)
    })
  }, [])

  return (
    <div ref={chartRef} className="space-y-4">
      {participants.map((participant, index) => {
        const percentage = (participant.totalPoints / maxPoints) * 100

        return (
          <div
            key={participant.id}
            className="chart-bar opacity-0 cursor-pointer group"
            onClick={() => onParticipantClick(participant)}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-sm font-bold text-muted-foreground">#{index + 1}</span>
                <img
                  src={participant.image || "/placeholder.svg"}
                  alt={participant.name}
                  className="w-10 h-10 rounded-full border-2"
                  style={{ borderColor: participant.color }}
                />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-lg" style={{ color: participant.color }}>
                    {participant.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{participant.superhero}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-accent">{participant.totalPoints}</div>
                <div className="text-sm text-muted-foreground">puntos</div>
              </div>
            </div>

            <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-lg transition-all duration-1000 ease-out group-hover:brightness-110"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: participant.color,
                  boxShadow: `0 0 20px ${participant.color}40`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-end pr-4">
                <span className="text-sm font-bold text-white mix-blend-difference">{percentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
