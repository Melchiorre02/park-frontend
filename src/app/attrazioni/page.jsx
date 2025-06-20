"use client"

import { useEffect, useState } from "react"
import {
  ClockIcon,
  UsersIcon,
  HeartIcon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
  ZapIcon,
  WavesIcon,
  SkullIcon,
  TentIcon,
  TrendingUpIcon,
  EyeIcon,
  ThumbsUpIcon,
  PlusIcon,
} from "lucide-react"

import { Navbar } from "../../components/navbar"
import { Footer } from "../../components/footer"
import { Input } from "../../components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"

export default function AttractionsPage() {
  const [attractions, setAttractions] = useState([])
  const [activeCategory, setActiveCategory] = useState("tutte")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/api/attractions")
        const data = await res.json()
        setAttractions(data)
      } catch (err) {
        console.error("Errore caricamento attrazioni:", err)
      }
    }
    fetchData()
  }, [])

  const filtered = attractions.filter((a) => {
    const matchCategory = activeCategory === "tutte" || a.category === activeCategory
    const matchSearch =
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchSearch
  })

  const stats = {
    total: attractions.length,
    open: attractions.filter((a) => a.status !== "maintenance").length,
    wait: attractions.length ? Math.round(attractions.reduce((sum, a) => sum + a.waitTime, 0) / attractions.length) : 0,
    popular: attractions.filter((a) => a.popularity > 80).length,
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative min-h-[60vh] flex items-center justify-center px-4 overflow-hidden bg-black">
  {/* Immagine di sfondo */}
  <div className="absolute inset-0 z-0">
    <img
      src="/img/attrazioni.jpg"
      alt="Sfondo"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 z-10"></div>
  </div>

  {/* Contenuto */}
  <div className="text-center space-y-6 max-w-3xl z-20">
    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent animate-gradient">
      Attrazioni
    </h1>
    <p className="text-lg text-gray-300">
      Scopri tutte le esperienze emozionanti del parco. Filtra, esplora e pianifica il tuo divertimento.
    </p>

    

    <div className="relative max-w-md mx-auto">
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
      <Input
        placeholder="Cerca attrazioni..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-12 bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-full h-12"
      />
    </div>
  </div>
</section>


       {/* FILTRI & CONTENUTO */}
        <section className="py-12 bg-black px-4">
          <Tabs defaultValue="tutte" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="mx-auto grid grid-cols-2 md:grid-cols-5 gap-2 bg-white/10 border border-white/20 rounded-xl p-2 mb-10">

              {[
                { id: "tutte", label: "🎪 Tutte" },
                { id: "avventura", label: "⚡ Avventura" },
                { id: "acqua", label: "🌊 Acqua" },
                { id: "famiglia", label: "👨‍👩‍👧‍👦 Famiglia" },
                { id: "horror", label: "💀 Horror" },
              ].map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 rounded-xl"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeCategory}>
              {filtered.length === 0 ? (
                <div className="text-center py-20 text-white/70">Nessuna attrazione trovata.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((attr) => (
                    <AttractionCard key={attr.id} attraction={attr} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function StatBox({ label, value }) {
  return (
    <div className="bg-white/10 p-4 rounded-xl border border-white/10">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}

function AttractionCard({ attraction }) {
  const isDown = attraction.status === "maintenance"

  const addToPlanner = () => {
    alert(`✔️ ${attraction.name} aggiunta al tuo planner!`)
  }

  return (
    <Card className="bg-white/5 border border-white/10 backdrop-blur-md hover:scale-105 transition-transform">
      <div className="relative h-48 overflow-hidden">
        <img
          src={attraction.image || "/placeholder.jpg"}
          alt={attraction.name}
          className={`w-full h-full object-cover ${isDown ? "grayscale opacity-60" : ""}`}
        />
        {isDown && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-bold">
            🔧 In Manutenzione
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-white text-lg">{attraction.name}</CardTitle>
        <CardDescription className="text-gray-400 text-sm">{attraction.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Attesa: {isDown ? "N/D" : `${attraction.waitTime} min`}</span>
          <span>⭐ {attraction.rating}</span>
        </div>
        <div className="text-sm text-gray-500">Zona: {attraction.zone}</div>
        
      </CardContent>
    </Card>
  )
}
