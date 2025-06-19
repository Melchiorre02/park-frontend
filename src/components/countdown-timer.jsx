"use client"

import { useState, useEffect } from "react"

export function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        giorni: Math.floor(difference / (1000 * 60 * 60 * 24)),
        ore: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minuti: Math.floor((difference / 1000 / 60) % 60),
        secondi: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const timeUnits = [
    { key: "giorni", label: "Giorni" },
    { key: "ore", label: "Ore" },
    { key: "minuti", label: "Minuti" },
    { key: "secondi", label: "Secondi" },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {timeUnits.map(({ key, label }) => (
        <div key={key} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center text-green-600 font-bold text-2xl md:text-3xl">
            {timeLeft[key] !== undefined ? String(timeLeft[key]).padStart(2, "0") : "00"}
          </div>
          <span className="text-xs md:text-sm mt-1 text-green-100">{label}</span>
        </div>
      ))}
    </div>
  )
}
