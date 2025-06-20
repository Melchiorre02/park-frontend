"use client"
import { useState, useEffect } from "react"
import { DragDropContext as ReactDragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import {
  ClockIcon, MapPinIcon, CalendarIcon, SaveIcon, TrashIcon, PlusIcon,
  ZapIcon, TimerIcon, TrendingUpIcon, UsersIcon, StarIcon, HeartIcon,
} from "lucide-react"
import { Navbar } from "../../components/navbar"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Footer } from "../../components/footer"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { toast } from "sonner"
import LoginModal from "../../components/LoginModal"

export default function PlannerPage() {
  const [planName, setPlanName] = useState("Il mio piano")
  const [planDate, setPlanDate] = useState(new Date().toISOString().split("T")[0])
  const [plannedItems, setPlannedItems] = useState([])
  const [availableAttractions, setAvailableAttractions] = useState([])
  const [availableShows, setAvailableShows] = useState([])
  const [showLoginModal, setShowLoginModal] = useState(false)

  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null
  const userId = user?.id

  useEffect(() => {
    const fetchAttractionsAndShows = async () => {
      try {
        const [attractionRes, showRes] = await Promise.all([
          fetch("http://localhost:3000/api/attractions"),
          fetch("http://localhost:3000/api/shows")
        ])
        const [attractionsData, showsData] = await Promise.all([
          attractionRes.json(), showRes.json()
        ])
        setAvailableAttractions(attractionsData)
        setAvailableShows(showsData)
      } catch (error) {
        console.error("Errore nel caricamento:", error)
      }
    }
    const fetchUserPlanner = async () => {
      if (!userId) return
      try {
        const resp = await fetch(`http://localhost:3000/api/planner/user/${userId}`)
        const data = await resp.json()
        if (resp.ok && data.planner) {
          setPlanName(data.planner.name)
          setPlanDate(data.planner.date)
          setPlannedItems(data.planner.items)
          localStorage.setItem("planner_id", data.planner.id)
        } else {
          setPlannedItems([])
        }
      } catch (error) {
        console.error("Errore fetch planner:", error)
      }
    }
    fetchAttractionsAndShows()
    fetchUserPlanner()
    // eslint-disable-next-line
  }, [userId])

  const handleAddItem = (item, type) => {
    const exists = plannedItems.some(pi => pi.id === item.id && pi.type === type)
    if (exists) {
      toast(<p className="text-sm">“{item.name}” è già nel piano.</p>)
      return
    }
    const newItem = { ...item, type, plannedTime: type === "show" ? item.times[0] : "" }
    setPlannedItems(prev => [...prev, newItem])
    toast(<p className="text-sm">“{item.name}” aggiunto!</p>)
  }
  const handleRemoveItem = (itemId) => {
    setPlannedItems(prev => prev.filter(i => i.id !== itemId))
    toast(<p className="text-sm">Elemento rimosso.</p>)
  }
  const handleDragEnd = (res) => {
    if (!res.destination) return
    const copy = Array.from(plannedItems)
    const [moved] = copy.splice(res.source.index, 1)
    copy.splice(res.destination.index, 0, moved)
    setPlannedItems(copy)
  }
  const handleSavePlan = async () => {
    if (!userId) {
      setShowLoginModal(true)
      toast(<p className="text-gray-700">Devi essere loggato.</p>)
      return
    }
    const plan = { name: planName, date: planDate, items: plannedItems, userId }
    try {
      const res = await fetch("http://localhost:3000/api/planner/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plan),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem("planner_id", data.planner.id)
        localStorage.setItem("enjoypark_plan", JSON.stringify(plan))
        toast(<p className="text-gray-800">Piano salvato!</p>)
      } else {
        toast(<p className="text-gray-700">Errore: {data.message}</p>)
      }
    } catch {
      toast(<p className="text-gray-700">Errore di rete.</p>)
    }
  }
  const handleDeletePlan = async () => {
    const pid = localStorage.getItem("planner_id")
    if (!pid || !userId) {
      toast(<p className="text-gray-700">Nessun piano da cancellare.</p>)
      return
    }
    try {
      const res = await fetch(`http://localhost:3000/api/planner/delete/${pid}`, { method: "DELETE" })
      const data = await res.json()
      if (res.ok) {
        setPlannedItems([])
        localStorage.removeItem("enjoypark_plan")
        localStorage.removeItem("planner_id")
        toast(<p className="text-gray-800">Piano cancellato.</p>)
      } else {
        toast(<p className="text-gray-700">Errore: {data.message}</p>)
      }
    } catch {
      toast(<p className="text-gray-700">Errore di rete.</p>)
    }
  }
  const totalDuration = plannedItems.reduce((t, i) => {
    return t + (i.type === "attraction" ? (i.waitTime || 0) + 15 : (i.duration || 30))
  }, 0)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-black dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      {/* Hero responsive */}
      <section className="relative flex items-center justify-center min-h-[50vh] sm:min-h-[60vh] overflow-hidden px-2 bg-black">
  {/* Immagine di sfondo */}
  <div className="absolute inset-0 z-0">
    <img
      src="/img/planner.jpg"
      alt="Sfondo"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 z-10"></div>
  </div>

  

  {/* Contenuto */}
  <div className="relative text-center z-30 text-white w-full max-w-3xl mx-auto px-2">
    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent animate-gradient">
      Planner
    </h1>
    <p className="mt-4 text-base sm:text-xl md:text-2xl text-gray-200">
      Pianifica la tua avventura al parco in modo semplice e intuitivo
    </p>
    <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
      {[
        { label: "Elementi", value: plannedItems.length },
        { label: "Durata", value: `${Math.floor(totalDuration / 60)}h ${(totalDuration % 60)}m` },
        { label: "Ottimizzazione", value: "98%" },
        { label: "Rating", value: "5★" },
      ].map((s, i) => (
        <div key={i} className="bg-gray-200/10 backdrop-blur-lg rounded-xl p-2 sm:p-4">
          <div className="text-xl sm:text-2xl font-bold text-white">{s.value}</div>
          <div className="mt-1 text-xs sm:text-sm text-gray-300">{s.label}</div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Main responsive */}
      <main className="flex-1 bg-gradient-to-br from-gray-50 to-black dark:from-gray-900 dark:to-gray-800 py-6 sm:py-12">
        <div className="mx-auto container px-2 sm:px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Planner Column */}
          <div className="order-2 md:order-1 md:col-span-2 flex flex-col gap-4 md:gap-6">
            <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden">
              <header className="p-3 sm:p-6 bg-gradient-to-r from-gray-200/30 to-gray-500/30 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">Il Tuo Piano Magico</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Trascina per riorganizzare il tuo itinerario
                </p>
              </header>
              <section className="p-3 sm:p-6 space-y-2 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  <LabelledInput
                    id="plan-name"
                    label="Nome del Piano"
                    type="text"
                    value={planName}
                    onChange={e => setPlanName(e.target.value)}
                  />
                  <LabelledInput
                    id="plan-date"
                    label="Data della Visita"
                    type="date"
                    value={planDate}
                    onChange={e => setPlanDate(e.target.value)}
                  />
                </div>
                <ReactDragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="planner">
                    {(prov, snap) => (
                      <div
                        ref={prov.innerRef}
                        {...prov.droppableProps}
                        className={`
                          min-h-[200px] sm:min-h-[300px] p-2 sm:p-4 rounded-2xl border-2 transition
                          ${snap.isDraggingOver
                            ? "border-gray-700 bg-gray-200/20"
                            : "border-gray-300 dark:border-gray-600"}
                        `}
                      >
                        {plannedItems.length === 0
                          ? <EmptyPlaceholder />
                          : plannedItems.map((item, i) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id.toString()}
                              index={i}
                            >
                              {(p, snap2) => (
                                <PlannedItemCard
                                  innerRef={p.innerRef}
                                  provided={p}
                                  snapshot={snap2}
                                  item={item}
                                  onRemove={handleRemoveItem}
                                />
                              )}
                            </Draggable>
                          ))
                        }
                        {prov.placeholder}
                      </div>
                    )}
                  </Droppable>
                </ReactDragDropContext>
              </section>
              <footer className="px-3 sm:px-6 py-2 sm:py-4 border-t flex flex-col sm:flex-row justify-between gap-2 bg-gradient-to-r from-gray-100 to-gray-300 border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={handleDeletePlan}
                  className="border-gray-400 text-gray-700 hover:bg-gray-100 w-full sm:w-auto"
                >
                  <TrashIcon className="mr-2" /> Cancella Piano
                </Button>
                <Button
                  onClick={handleSavePlan}
                  className="bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:from-black hover:to-gray-800 w-full sm:w-auto"
                >
                  <SaveIcon className="mr-2" /> Salva Piano Magico
                </Button>
              </footer>
            </div>
          </div>
          {/* Sidebar responsive: sempre full width su mobile/tablet */}
          <SidebarAdd
            availableAttractions={availableAttractions}
            availableShows={availableShows}
            onAdd={handleAddItem}
          />
        </div>
      </main>
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <Footer />
    </div>
  )
}

// ——————————————
// 🔧 COMPONENTI DI SUPPORTO PERSONALIZZATI (responsive)
// ——————————————
function LabelledInput({ id, label, type = "text", value, onChange }) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-gray-700 dark:text-gray-300 font-medium">{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-300 dark:border-gray-600 focus:border-gray-700 rounded-xl p-2 w-full"
      />
    </div>
  )
}
function EmptyPlaceholder() {
  return (
    <div className="text-center py-8 sm:py-12 text-gray-500">
      <CalendarIcon className="mx-auto mb-4 h-8 w-8 sm:h-10 sm:w-10 text-gray-400 animate-pulse" />
      <p className="font-medium">Il tuo piano è vuoto</p>
      <p className="text-sm">Aggiungi attrazioni/spettacoli dalla barra laterale</p>
    </div>
  )
}
function PlannedItemCard({ innerRef, provided, snapshot, item, onRemove }) {
  return (
    <div
      ref={innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`
        relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 sm:p-4 rounded-2xl border transition w-full
        ${snapshot.isDragging ? "ring-2 ring-gray-500 scale-105" : "border-gray-200 dark:border-gray-700"}
      `}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</h4>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex gap-2 flex-wrap">
            <div className="flex items-center"><MapPinIcon className="mr-1 h-4 w-4 text-gray-500" />{item.type === "attraction" ? item.zone : item.location}</div>
            {item.type === "attraction" && (
              <div className="flex items-center"><ClockIcon className="mr-1 h-4 w-4 text-gray-600" />{item.waitTime} min</div>
            )}
            {item.type === "show" && (
              <div className="flex items-center"><CalendarIcon className="mr-1 h-4 w-4 text-gray-600" />{item.plannedTime}</div>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.id)}
          className="text-gray-500 hover:text-gray-700 dark:hover:bg-gray-700/20 mt-2 sm:mt-0"
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  )
}
function SidebarAdd({ availableAttractions, availableShows, onAdd }) {
  const [tab, setTab] = useState("attractions")
  return (
    <aside className="order-1 md:order-2 lg:sticky lg:top-12 space-y-4 sm:space-y-6 w-full">
      <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden w-full">
        <div className="p-3 sm:p-6 border-b bg-gradient-to-r from-gray-200/30 to-gray-500/30 border-gray-200 dark:border-gray-700">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">Aggiungi Magia</h3>
          <p className="mt-1 text-gray-600 dark:text-gray-300 text-xs sm:text-base">Scegli attrazioni o spettacoli</p>
        </div>
        <Tabs value={tab} onValueChange={setTab} className="p-3 sm:p-4">
          <TabsList className="grid grid-cols-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-2">
            <TabsTrigger value="attractions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-800 data-[state=active]:to-gray-600 data-[state=active]:text-white text-xs sm:text-base">🎢 Attrazioni</TabsTrigger>
            <TabsTrigger value="shows" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-800 data-[state=active]:to-gray-600 data-[state=active]:text-white text-xs sm:text-base">🎭 Spettacoli</TabsTrigger>
          </TabsList>
          <TabsContent value="attractions" className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 max-h-[250px] sm:max-h-[400px] overflow-y-auto pr-1 sm:pr-2">
            {availableAttractions.map((a, idx) => (
              <div key={a.id} className="flex justify-between items-center p-2 sm:p-3 bg-white/70 dark:bg-gray-800/70 rounded-xl hover:shadow transition w-full">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">{a.name}</h4>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                    <ClockIcon className="h-4 w-4 text-gray-500" /> {a.waitTime} min
                    <MapPinIcon className="h-4 w-4 text-gray-400" /> {a.zone}
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => onAdd(a, "attraction")}
                  className="bg-gradient-to-r from-gray-900 to-gray-700 text-white"
                >
                  <PlusIcon />
                </Button>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="shows" className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 max-h-[250px] sm:max-h-[400px] overflow-y-auto pr-1 sm:pr-2">
            {availableShows.map((s, idx) => (
              <div key={s.id} className="flex justify-between items-center p-2 sm:p-3 bg-white/70 dark:bg-gray-800/70 rounded-xl hover:shadow transition w-full">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">{s.name}</h4>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-600" /> {Array.isArray(s.times) ? s.times.join(", ") : "–"}
                    <MapPinIcon className="h-4 w-4 text-gray-400" /> {s.location}
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => onAdd(s, "show")}
                  className="bg-gradient-to-r from-gray-800 to-gray-600 text-white"
                >
                  <PlusIcon />
                </Button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </aside>
  )
}
