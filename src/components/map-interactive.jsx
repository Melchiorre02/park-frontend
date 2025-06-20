"use client"

import { useState, useRef, useEffect } from "react"




import { ZoomInIcon, ZoomOutIcon, HomeIcon, XIcon, ClockIcon, StarIcon, MapPinIcon, PhoneIcon, TheaterIcon } from "lucide-react"
import { UtensilsIcon, InfoIcon, RollerCoasterIcon as RollercoasterIcon, HelpCircleIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"

export function MapInteractive({ highlightedPoints = [] }) {
  // Stato per la mappa
  const containerRef = useRef(null)
  const [activePoint, setActivePoint] = useState(null)
  const [selectedPoint, setSelectedPoint] = useState(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [points, setPoints] = useState([])

  // Definizione dei punti di interesse con informazioni dettagliate
  useEffect(() => {
    async function fetchPoints() {
      try {
        const res1 = await fetch("http://localhost:3000/api/attraction-map")
        const attractions = await res1.json()

        const res2 = await fetch("http://localhost:3000/api/show-map")
        const shows = await res2.json()

        const combinedPoints = [
          ...attractions.map((a) => ({ ...a, type: "attraction" })),
          ...shows.map((s) => ({ ...s, type: "shows" })),
        ]

        setPoints(combinedPoints)
      } catch (err) {
        console.error("Errore nel caricamento dei dati:", err)
      }
    }

    fetchPoints()
  }, [])

  // Aree del parco
  const areas = [
    { id: 1, x: 15, y: 15, width: 30, height: 30, name: "Zona Avventura", color: "rgba(255, 200, 200, 0.3)" },
    { id: 2, x: 60, y: 15, width: 30, height: 30, name: "Zona Acqua", color: "rgba(200, 200, 255, 0.3)" },
    { id: 3, x: 15, y: 60, width: 30, height: 30, name: "Zona Horror", color: "rgba(200, 150, 200, 0.3)" },
    { id: 4, x: 60, y: 60, width: 30, height: 30, name: "Zona Famiglia", color: "rgba(255, 255, 200, 0.3)" },
  ]

  // Gestione del trascinamento
  const handleMouseDown = (e) => {
    if (activePoint) return

    setIsDragging(true)
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Funzioni per lo zoom
  const handleZoomIn = () => {
    setScale((prev) => Math.min(3, prev + 0.2))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(0.5, prev - 0.2))
  }

  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  // Funzione per ottenere l'icona in base al tipo di punto
  const getPointIcon = (type) => {
    const iconSize = 14
    const iconProps = {
      className: "text-white",
      size: iconSize,
    }

    switch (type) {
      case "attraction":
        return <RollercoasterIcon {...iconProps} />
      case "shows":
        return <TheaterIcon {...iconProps} />
      case "service":
        return <InfoIcon {...iconProps} />
      default:
        return <HelpCircleIcon {...iconProps} />
    }
  }

  // Colore in base al tipo di punto
  const getPointColor = (type) => {
    switch (type) {
      case "attraction":
        return "#008080"
      case "shows":
        return "#003366"
      case "service":
        return "#eab308"
      default:
        return "#10b981"
    }
  }

  // Gestione del click su un punto
  const handlePointClick = (point) => {
    setSelectedPoint(point)
  }

  // Chiudi la card dei dettagli
  const closeDetails = () => {
    setSelectedPoint(null)
  }
  
  

  // Renderizza la card dei dettagli
  const renderDetailsCard = () => {
    if (!selectedPoint) return null

    return (
      <Card className="w-full h-full overflow-y-auto bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 hover:bg-gray-200/50"
            onClick={closeDetails}
          >
            <XIcon className="h-4 w-4" />
          </Button>
          <CardTitle className="text-xl pr-8 text-white">{selectedPoint.name}</CardTitle>
          {selectedPoint.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium text-white">{selectedPoint.rating}</span>
              </div>
              <span className="text-sm text-white">({selectedPoint.reviews} recensioni)</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Immagine */}
          <img
            src={selectedPoint.image || "/placeholder.svg"}
            alt={selectedPoint.name}
            className="w-full h-48 object-cover rounded-lg"
          />

          {/* Descrizione */}
          <p className="text-white dark:text-gray-300">{selectedPoint.description}</p>

          {/* Informazioni specifiche per tipo */}
          {selectedPoint.type === "attraction" && (
            <div className="space-y-3">
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-400">Durata</h4>
                  <p className="text-sm text-white">{selectedPoint.duration}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-400">Altezza minima</h4>
                  <p className="text-sm text-white">{selectedPoint.height}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-400">Intensità</h4>
                  <Badge
                    variant={
                      selectedPoint.intensity === "Estrema"
                        ? "destructive"
                        : selectedPoint.intensity === "Media"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {selectedPoint.intensity}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-400">Zona</h4>
                  <p className="text-sm text-white">{selectedPoint.zone}</p>
                </div>
              </div>

              {selectedPoint.waitTime && (
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <ClockIcon className="h-4 w-4 text-green-600" />
                  <span className="text-sm">
                    Tempo di attesa: <strong>{selectedPoint.waitTime} min</strong>
                  </span>
                </div>
              )}

              {selectedPoint.fastPass && (
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  FastPass Disponibile
                </Badge>
              )}
            </div>
          )}

          {selectedPoint.type === "shows" && (
            <div className="space-y-3">
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-400"></h4>
                  <p className="text-sm text-whiteÓÓ">{selectedPoint.cuisine}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-400">Fascia di prezzo</h4>
                  <p className="text-sm text-white">{selectedPoint.priceRange}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-400">Capacità</h4>
                  <p className="text-sm text-white">{selectedPoint.capacity}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-400">Prenotazioni</h4>
                  <Badge variant={selectedPoint.reservation ? "default" : "secondary"}>
                    {selectedPoint.reservation ? "Richieste" : "Non necessarie"}
                  </Badge>
                </div>
              </div>

              {selectedPoint.specialties && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Specialità</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedPoint.specialties.map((specialty, index) => (
                      <li key={index}>• {specialty}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {selectedPoint.type === "service" && (
            <div className="space-y-3">
              <Separator />
              <div>
                <h4 className="font-medium text-sm">Tipo di servizio</h4>
                <p className="text-sm text-gray-600">{selectedPoint.serviceType}</p>
              </div>

              {selectedPoint.services && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Servizi disponibili</h4>
                  <ul className="text-smtext-white space-y-1">
                    {selectedPoint.services.map((service, index) => (
                      <li key={index}>• {service}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedPoint.languages && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Lingue parlate</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedPoint.languages.map((lang, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Informazioni comuni */}
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-white" />
              <span className="text-sm text-white">Orari: {selectedPoint.openTime}</span>
            </div>
            {selectedPoint.phone && (
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-white" />
                <span className="text-sm text-white">{selectedPoint.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-white" />
              <span className="text-sm text-white">Posizione sulla mappa</span>
            </div>
          </div>

          {/* Pulsanti azione */}
          <div className="flex gap-2 pt-4">
          <a href="/planner">
            <Button className="flex-1 bg-green-600 hover:bg-green-700">Aggiungi al Planner</Button>
            </a>
            {selectedPoint.type === "shows" && selectedPoint.reservation && (

              <Button variant="outline" className="flex-1">
                Prenota Tavolo
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Aggiungi questo style tag prima del return
  const breatheAnimation = `
  @keyframes breathe {
    0%, 100% { 
      transform: scale(1.4); 
      opacity: 0.6; 
    }
    50% { 
      transform: scale(1.6); 
      opacity: 0.3; 
    }
  }
`

  return (
    <>
      <style>{breatheAnimation}</style>
      <div className="flex gap-4 h-[600px]">
        {/* Mappa */}
        <div
          className={`relative border rounded-lg overflow-hidden bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-green-700 transition-all duration-300 ${
            selectedPoint ? "w-2/3" : "w-full"
          }`}
        >
          <div
            ref={containerRef}
            className="w-full h-full"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            {/* Mappa con trasformazioni */}
            <div
              className="absolute w-full h-full"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "0 0",
                transition: isDragging ? "none" : "transform 0.1s ease-out",
              }}
            >
              {/* Sfondo della mappa */}
              <div className="absolute inset-0 w-full h-full">
                {/* Griglia di base */}
                <div
                  className="absolute inset-0 bg-white dark:bg-green-900"
                  style={{ width: "100%", height: "100%" }}
                >
                  {/* Strade principali */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-[5%] bg-neutral-300 dark:bg-gray-700 -translate-x-1/2"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-[5%] bg-neutral-300 dark:bg-gray-700 -translate-y-1/2"></div>

                 
                </div>

                {/* Aree del parco */}
                {areas.map((area) => (
                  <div
                    key={area.id}
                    className="absolute rounded-lg flex items-center justify-center text-sm font-medium"
                    style={{
                      left: `${area.x}%`,
                      top: `${area.y}%`,
                      width: `${area.width}%`,
                      height: `${area.height}%`,
                      backgroundColor: area.color,
                    }}
                  >
                    {area.name}
                  </div>
                ))}

                {/* Punti di interesse */}
                {points.map((point) => {
                  const isHighlighted = highlightedPoints.includes(point.name)
                  const pointColor = getPointColor(point.type)
                  return (
                    <div
                      key={point.name}
                      className={`absolute rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out
                                hover:scale-110 hover:shadow-md hover:shadow-black/50
                                ${selectedPoint?.name === point.name ? "ring-4 ring-white ring-opacity-80" : ""}
                                ${isHighlighted ? "scale-115" : ""}`}
                      style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        width:
                          activePoint?.id === point.name || selectedPoint?.name === point.name || isHighlighted
                            ? "32px"
                            : "28px",
                        height:
                          activePoint?.name === point.name || selectedPoint?.name === point.name || isHighlighted
                            ? "32px"
                            : "28px",
                        backgroundColor: pointColor,
                        boxShadow:
                          activePoint?.name === point.name
                            ? "0 0 0 3px white"
                            : isHighlighted
                              ? `0 0 12px ${pointColor}50, 0 0 20px ${pointColor}30`
                              : "none",
                        zIndex:
                          activePoint?.name === point.name || selectedPoint?.name === point.name || isHighlighted ? 20 : 1,
                        filter: isHighlighted ? "brightness(1.05)" : "none",
                        opacity: isHighlighted ? "1" : "0.9",
                      }}
                      onMouseEnter={() => setActivePoint(point)}
                      onMouseLeave={() => setActivePoint(null)}
                      onClick={() => handlePointClick(point)}
                    >
                      {/* Anello sottile che respira dolcemente */}
                      {isHighlighted && (
                        <div
                          className="absolute inset-0 rounded-full border-2 opacity-60"
                          style={{
                            borderColor: pointColor,
                            transform: "scale(1.4)",
                            animation: "breathe 3s ease-in-out infinite",
                          }}
                        />
                      )}

                      {/* Nome della struttura per punti evidenziati */}
                      {isHighlighted && (
                        <div
                          className="absolute text-white text-xs font-medium bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md pointer-events-none whitespace-nowrap"
                          style={{
                            top: "-35px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 25,
                            animation: "breathe 3s ease-in-out infinite",
                          }}
                        >
                          {point.name}
                        </div>
                      )}

                      {/* Icona centrale */}
                      <div className="relative z-10">{getPointIcon(point.type)}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Tooltip per il punto attivo */}
            {activePoint && !selectedPoint && (
              <div
                className="absolute bg-gray-500/30 backdrop-blur-md p-2 rounded-md shadow-lg z-20 pointer-events-none text-sm text-white"
                style={{
                  left: `calc(${activePoint.x}% * ${scale} + ${position.x}px)`,
                  top: `calc(${activePoint.y}% * ${scale} + ${position.y}px - 40px)`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="font-medium">{activePoint.name}</div>
                {activePoint.waitTime && (
                  <div className="text-sm text-green-600 dark:text-green-400">Attesa: {activePoint.waitTime} min</div>
                )}
                <div className="text-xs text-grau-400">Clicca per dettagli</div>
              </div>
            )}

            {/* Controlli dello zoom */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomIn}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-black"
              >
                <ZoomInIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomOut}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-black"
              >
                <ZoomOutIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleReset}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-black"
              >
                <HomeIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Legenda */}
            <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md p-3 rounded-lg shadow-md z-10 text-grey-600">
              <h3 className="font-bold text-sm mb-2">Legenda</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-900 mr-2 flex items-center justify-center">
                    <RollercoasterIcon className="h-3 w-3 text-white" />
                  </div>
                  <span>Attrazioni</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-900 mr-2 flex items-center justify-center">
                    <TheaterIcon className="h-3 w-3 text-white" />
                  </div>
                  <span>Spettacoli</span>
                </div>
               
              </div>
            </div>
          </div>
        </div>

        {/* Card dei dettagli */}
        {selectedPoint && (
          <div className="w-1/3 animate-in slide-in-from-right duration-300">{renderDetailsCard()}</div>
        )}
      </div>
    </>
  )
}
