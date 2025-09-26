"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Trophy, Calendar, Target, Zap } from "lucide-react"

interface ParticipantModalProps {
  participant: any
  onClose: () => void
}

export default function ParticipantModal({ participant, onClose }: ParticipantModalProps) {
  const avPoints = participant.avActivities.reduce(
    (sum: number, activity: any) => sum + (activity.completed ? activity.daysEarly : 0),
    0,
  )

  const googleSkillsPoints = participant.googleSkillsActivities.reduce(
    (sum: number, activity: any) => sum + (activity.completed ? activity.daysEarly : 0),
    0,
  )

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card
        className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        style={{
          borderColor: participant.color,
          boxShadow: `0 0 40px ${participant.color}40`,
        }}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <img
                src={participant.image || "/placeholder.svg"}
                alt={participant.name}
                className="w-20 h-20 rounded-full border-4"
                style={{ borderColor: participant.color }}
              />
              <div>
                <h2 className="text-3xl font-bold neon-text" style={{ color: participant.color }}>
                  {participant.name}
                </h2>
                <p className="text-xl text-muted-foreground">{participant.superhero}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Trophy className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-bold text-accent">{participant.totalPoints} puntos totales</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Points Breakdown */}
          <div className="space-y-6">
            {/* Weekly Participation */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-bold">Participación Semanal</h3>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{participant.weeklyParticipation} semanas participadas</span>
                <span className="text-2xl font-bold text-blue-500">+{participant.weeklyParticipation} pts</span>
              </div>
            </Card>

            {/* AV Activities */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-bold">Actividades AV</h3>
              </div>
              <div className="space-y-3">
                {participant.avActivities.map((activity: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <span className="text-muted-foreground">
                      Actividad {index + 1} - {activity.daysEarly} días antes
                    </span>
                    <span className="font-bold text-green-500">+{activity.daysEarly} pts</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 border-t border-muted">
                  <span className="font-semibold">Total AV:</span>
                  <span className="text-xl font-bold text-green-500">+{avPoints} pts</span>
                </div>
              </div>
            </Card>

            {/* Google Skills Activities */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-bold">Google Skills</h3>
              </div>
              <div className="space-y-3">
                {participant.googleSkillsActivities.map((activity: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <span className="text-muted-foreground">
                      Actividad {index + 1} - {activity.daysEarly} días antes
                    </span>
                    <span className="font-bold text-purple-500">+{activity.daysEarly} pts</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 border-t border-muted">
                  <span className="font-semibold">Total Google Skills:</span>
                  <span className="text-xl font-bold text-purple-500">+{googleSkillsPoints} pts</span>
                </div>
              </div>
            </Card>

            {/* Total Summary */}
            <Card
              className="glass-card p-6 animate-glow"
              style={{
                borderColor: participant.color,
                boxShadow: `0 0 30px ${participant.color}40`,
              }}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 neon-text" style={{ color: participant.color }}>
                  PUNTUACIÓN TOTAL
                </h3>
                <div className="text-5xl font-bold text-accent neon-text mb-2">{participant.totalPoints}</div>
                <div className="text-muted-foreground">
                  {participant.weeklyParticipation} (semanal) + {avPoints} (AV) + {googleSkillsPoints} (Google Skills)
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  )
}
