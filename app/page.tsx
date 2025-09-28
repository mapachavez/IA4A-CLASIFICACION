"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Trophy, Medal, Award, Star, Zap, Shield } from "lucide-react"
import ParticipantModal from "@/components/participant-modal"
import AnimatedChart from "@/components/animated-chart"
import RankingPodium from "@/components/ranking-podium"

// Datos de participantes con sus colores de superhéroe
const participantsData = [
  {
    id: 1,
    name: "Allison",
    superhero: "Hawkeye",
    color: "#8B5CF6", // Morado
    weeklyParticipation: 1,
    avActivities: [
      { completed: true, daysEarly: 3 },
      { completed: true, daysEarly: 5 },
      { completed: true, daysEarly: 5 },
    ],
    googleSkillsActivities: [{ completed: true, daysEarly: 5 }],
    image: "/professional-woman-avatar.png",
  },
  {
    id: 2,
    name: "Pablo",
    superhero: "Hulk",
    color: "#22C55E", // Verde
    weeklyParticipation: 1,
    avActivities: [
      { completed: true, daysEarly: 4 },
      { completed: true, daysEarly: 5 },
      { completed: true, daysEarly: 5 },
    ],
    googleSkillsActivities: [{ completed: true, daysEarly: 0 }],
    image: "/professional-man-avatar.png",
  },
  {
    id: 3,
    name: "Darwin",
    superhero: "Black Panther",
    color: "#6B21A8", // Negro/Morado oscuro
    weeklyParticipation: 1,
    avActivities: [
      { completed: true, daysEarly: 4 },
      { completed: true, daysEarly: 5 },
      { completed: true, daysEarly: 5 },
    ],
    googleSkillsActivities: [{ completed: true, daysEarly: 5 }],
    image: "/professional-man-avatar.png",
  },
  {
    id: 4,
    name: "Isaac",
    superhero: "Falcon",
    color: "#EF4444", // Rojo
    weeklyParticipation: 1,
    avActivities: [
      { completed: true, daysEarly: 1 },
      { completed: true, daysEarly: 5 },
      { completed: true, daysEarly: 5 },
    ],
    googleSkillsActivities: [{ completed: false, daysEarly: 0 }],
    image: "/professional-man-avatar.png",
  },
  {
    id: 5,
    name: "Bryan",
    superhero: "Ant-Man",
    color: "#64748B", // Gris metálico
    weeklyParticipation: 1,
    avActivities: [
      { completed: true, daysEarly: 4 },
      { completed: true, daysEarly: 0 },
      { completed: true, daysEarly: 5 },
    ],
    googleSkillsActivities: [{ completed: true, daysEarly: 0 }],
    image: "/professional-man-avatar.png",
  },
  {
    id: 6,
    name: "Emily",
    superhero: "Black Widow",
    color: "#DC2626", // Rojo oscuro
    weeklyParticipation: 1,
    avActivities: [
      { completed: true, daysEarly: 3 },
      { completed: true, daysEarly: 5 },
      { completed: true, daysEarly: 0 },
    ],
    googleSkillsActivities: [{ completed: true, daysEarly: 5 }],
    image: "/professional-woman-avatar.png",
  },
  {
    id: 7,
    name: "Julio",
    superhero: "Dr.Strange",
    color: "#EF4444", // Rojo neón
    weeklyParticipation: 1,
    avActivities: [
      { completed: true, daysEarly: 0 },
      { completed: true, daysEarly: 0 },
      { completed: true, daysEarly: 0 },
    ],
    googleSkillsActivities: [{ completed: true, daysEarly: 0 }],
    image: "/professional-man-avatar.png",
  },
  {
    id: 8,
    name: "Carlos",
    superhero: "Capitan America",
    color: "#3B82F6", // Azul
    weeklyParticipation: 1,
    avActivities: [
      { completed: true, daysEarly: 4 },
      { completed: true, daysEarly: 0 },
      { completed: true, daysEarly: 0 },
    ],
    googleSkillsActivities: [{ completed: true, daysEarly: 5 }],
    image: "/professional-man-avatar.png",
  },
  {
    id: 9,
    name: "Esteban",
    superhero: "Spider-Man",
    color: "#DC2626", // Rojo
    weeklyParticipation: 1,
    avActivities: [
      { completed: true, daysEarly: 1 },
      { completed: true, daysEarly: 0 },
      { completed: true, daysEarly: 0 },
    ],
    googleSkillsActivities: [{ completed: true, daysEarly: 5 }],
    image: "/professional-man-avatar.png",
  },
  {
    id: 10,
    name: "Damian",
    superhero: "Thor",
    color: "#F59E0B", // Amarillo/Dorado
    weeklyParticipation: 1,
    avActivities: [
      { completed: true, daysEarly: 5 },
      { completed: true, daysEarly: 5 },
      { completed: true, daysEarly: 0 },
    ],
    googleSkillsActivities: [{ completed: true, daysEarly: 5 }],
    image: "/professional-man-avatar.png",
  },
]

// Función para calcular puntos totales
function calculateTotalPoints(participant: any) {
  let total = participant.weeklyParticipation // Puntos por participación semanal

  // Puntos por actividades AV
  participant.avActivities.forEach((activity: any) => {
    if (activity.completed) {
      total += activity.daysEarly
    }
  })

  // Puntos por actividades Google Skills
  participant.googleSkillsActivities.forEach((activity: any) => {
    if (activity.completed) {
      total += activity.daysEarly
    }
  })

  return total
}

export default function MVPPage() {
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Calcular puntos y ordenar participantes
  const participantsWithPoints = participantsData
    .map((participant) => ({
      ...participant,
      totalPoints: calculateTotalPoints(participant),
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints)

  const topThree = participantsWithPoints.slice(0, 3)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-avengers-gradient text-foreground">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-50" />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className={`transition-all duration-1000 ${isLoaded ? "animate-slide-in-up" : "opacity-0"}`}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <Shield className="w-12 h-12 text-accent animate-pulse-glow" />
              <h1 className="text-6xl md:text-8xl font-bold neon-text text-accent">MVP</h1>
              <Trophy className="w-12 h-12 text-accent animate-pulse-glow" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">MÓDULO 1</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              El MVP del Módulo 1 será el participante con mayor puntaje de participación.
              <br />
              <span className="text-accent font-semibold">
                El ganador se llevará un premio especial en la próxima reunión presencial. Recordar que:Por cada dia
                que entregues ANTES de la fecha de entrega de la actividad ganas 1 punto (max:5 pts por actividad).
                ---HAY UN MVP POR CADA MODULO---
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Ranking Podium */}
      <section className="container mx-auto px-4 py-16">
        <RankingPodium topThree={topThree} />
      </section>

      {/* Chart Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="glass-card p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Zap className="w-8 h-8 text-accent" />
              Estadísticas de Participación
              <Zap className="w-8 h-8 text-accent" />
            </h3>
            <p className="text-muted-foreground">
              Haz clic en cualquier barra para ver el desglose detallado de puntos
            </p>
          </div>
          <AnimatedChart participants={participantsWithPoints} onParticipantClick={setSelectedParticipant} />
        </Card>
      </section>

      {/* Participants Grid */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
          <Star className="w-8 h-8 text-accent" />
          Todos los Participantes
          <Star className="w-8 h-8 text-accent" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {participantsWithPoints.map((participant, index) => (
            <Card
              key={participant.id}
              className={`glass-card p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                index < 3 ? "animate-glow" : ""
              }`}
              onClick={() => setSelectedParticipant(participant)}
              style={{
                borderColor: participant.color,
                boxShadow: `0 0 20px ${participant.color}20`,
              }}
            >
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={participant.image || "/placeholder.svg"}
                    alt={participant.name}
                    className="w-20 h-20 rounded-full mx-auto border-2"
                    style={{ borderColor: participant.color }}
                  />
                  {index < 3 && (
                    <div className="absolute -top-2 -right-2">
                      {index === 0 && <Trophy className="w-6 h-6 text-yellow-500" />}
                      {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
                      {index === 2 && <Award className="w-6 h-6 text-amber-600" />}
                    </div>
                  )}
                </div>
                <h4 className="font-bold text-lg mb-2" style={{ color: participant.color }}>
                  {participant.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">{participant.superhero}</p>
                <div className="text-2xl font-bold text-accent">{participant.totalPoints} pts</div>
                <div className="text-sm text-muted-foreground">Posición #{index + 1}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedParticipant && (
        <ParticipantModal participant={selectedParticipant} onClose={() => setSelectedParticipant(null)} />
      )}
    </div>
  )
}
