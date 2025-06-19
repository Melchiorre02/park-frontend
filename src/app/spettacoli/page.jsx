"use client"

import { useEffect, useState } from "react"
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  StarIcon,
  SearchIcon,
  SparklesIcon,
  MusicIcon,
  PartyPopperIcon,
  ZapIcon,
  WandIcon,
  PawPrintIcon,
  HeartIcon,
  EyeIcon,
  PlusIcon,
} from "lucide-react"

import { Navbar } from "../../components/navbar"
import { Footer } from "../../components/footer"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"

export default function ShowsPage() {
  const [shows, setShows] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("Tutti")

  const categories = [
    { name: "Tutti", icon: SparklesIcon, gradient: "from-purple-500 to-pink-500" },
    { name: "Musical", icon: MusicIcon, gradient: "from-blue-500 to-purple-500" },
    { name: "Parata", icon: PartyPopperIcon, gradient: "from-green-500 to-blue-500" },
    { name: "Acrobatico", icon: ZapIcon, gradient: "from-orange-500 to-red-500" },
    { name: "Magia", icon: WandIcon, gradient: "from-purple-500 to-indigo-500" },
    { name: "Animali", icon: PawPrintIcon, gradient: "from-emerald-500 to-teal-500" },
  ]

  useEffect(() => {
    async function fetchShows() {
      try {
        const res = await fetch("http://localhost:3000/api/shows")
        const data = await res.json()
        setShows(data)
      } catch (err) {
        console.error("Errore caricamento spettacoli:", err)
      }
    }
    fetchShows()
  }, [])

  const filteredShows = shows.filter((show) => {
    const matchCategory = activeFilter === "Tutti" || show.category === activeFilter
    const matchSearch =
      show.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      show.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchSearch
  })

  const stats = [
    { label: "Spettacoli oggi", value: "12", icon: CalendarIcon },
    { label: "Spettatori", value: "2.4K", icon: UsersIcon },
    { label: "Rating medio", value: "4.8", icon: StarIcon },
    { label: "Prossimo show", value: "13:00", icon: ClockIcon },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-gray-50 to-black dark:from-gray-900 dark:to-gray-800 px-4 text-center">
          <div className="space-y-6 z-10 max-w-3xl">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent animate-gradient">
              Spettacoli 
            </h1>
            <p className="text-lg text-purple-100">
              
            </p>

            {/* STATISTICHE */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/10 border border-white/10 p-4 rounded-xl backdrop-blur-sm text-center"
                >
                  <s.icon className="w-6 h-6 mx-auto mb-1 text-purple-300" />
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-sm text-purple-200">{s.label}</div>
                </div>
              ))}
            </div>

            {/* RICERCA */}
            <div className="relative max-w-md mx-auto">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 w-5 h-5" />
              <Input
                placeholder="Cerca spettacoli..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 text-white border border-white/20 placeholder:text-purple-200 rounded-full h-12"
              />
            </div>
          </div>
        </section>

        {/* FILTRI */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((cat) => (
              <Button
                key={cat.name}
                onClick={() => setActiveFilter(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                  activeFilter === cat.name
                    ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </Button>
            ))}
          </div>

          {/* SHOWS GRID */}
          {filteredShows.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredShows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-white/60">
              Nessuno spettacolo trovato. Prova a modificare i filtri o la ricerca.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}

function ShowCard({ show }) {
  const isDown = show.status === "maintenance"

  return (
    <Card className="bg-white/5 border border-white/10 rounded-xl hover:scale-105 transition-transform overflow-hidden">
      <div className="relative h-48">
        <img
          src={show.image || "/placeholder.jpg"}
          alt={show.name}
          className={`w-full h-full object-cover ${isDown ? "grayscale opacity-60" : ""}`}
        />
        {isDown && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold">
            🔧 In manutenzione
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            {show.category}
          </Badge>
          <div className="flex items-center gap-1 text-yellow-400">
            <StarIcon className="w-4 h-4 fill-current" />
            {show.rating}
          </div>
        </div>
        <CardTitle>{show.name}</CardTitle>
        <CardDescription className="text-sm text-gray-300">{show.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-4 text-sm text-gray-300">
        <div className="grid grid-cols-2 gap-2">
          <span className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 text-purple-400" />
            {show.time}
          </span>
          <span className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-blue-400" />
            {show.duration}
          </span>
          <span className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-green-400" />
            {show.location}
          </span>
          <span className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-orange-400" />
            {show.capacity} posti
          </span>
        </div>

        <div className="flex justify-between text-xs mt-2">
          <span>👁️ {show.views} views</span>
          <span>❤️ {show.likes} likes</span>
        </div>

        <a href="/planner" className="block">
         
        </a>
      </CardContent>
    </Card>
  )
}
