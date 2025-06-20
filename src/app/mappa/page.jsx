"use client";

import { useEffect, useState } from "react";
import {
  MapIcon,
  SearchIcon,
  NavigationIcon,
  ClockIcon,
  StarIcon,
  UtensilsIcon,
  InfoIcon,
  RollerCoasterIcon as RollercoasterIcon,
  ZapIcon,
  TrendingUpIcon,
  UsersIcon,
  HeartIcon,
  ShareIcon,
  TheaterIcon,
} from "lucide-react";
import { Navbar } from "../../components/navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { MapInteractive } from "../../components/map-interactive";
import { Footer } from "../../components/footer";

export default function MappaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [highlightedPoints, setHighlightedPoints] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    async function fetchPoints() {
      try {
        const res1 = await fetch("http://localhost:3000/api/attraction-map");
        const attractions = await res1.json();

        const res2 = await fetch("http://localhost:3000/api/show-map");
        const shows = await res2.json();

        const combinedPoints = [
          ...attractions.map((a) => ({
            ...a,
            type: "attraction",
            globalId: `attr-${a.id}`,
          })),
          ...shows.map((s) => ({
            ...s,
            type: "shows",
            globalId: `show-${s.id}`,
          })),
        ];

        setPoints(combinedPoints);
      } catch (err) {
        console.error("Errore nel caricamento dei dati:", err);
      }
    }

    fetchPoints();
  }, []);

  const filters = [
    { id: "all", label: "Tutto", icon: MapIcon },
    { id: "attractions", label: "Attrazioni", icon: RollercoasterIcon },
    { id: "shows", label: "Spettacoli", icon: TheaterIcon },
    { id: "services", label: "Servizi", icon: InfoIcon },
  ];

  const quickStats = [
    {
      label: "Attrazioni Aperte",
      value: "24",
      icon: RollercoasterIcon,
      color: "text-red-500",
    },
    {
      label: "Tempo Medio Attesa",
      value: "15min",
      icon: ClockIcon,
      color: "text-blue-500",
    },
    {
      label: "Ristoranti Disponibili",
      value: "12",
      icon: UtensilsIcon,
      color: "text-green-500",
    },
    {
      label: "Visitatori Oggi",
      value: "8.2K",
      icon: UsersIcon,
      color: "text-purple-500",
    },
  ];

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setHighlightedPoints([]);
      setSearchResults([]);
      return;
    }
    const results = points.filter(
      (point) =>
        point.name.toLowerCase().includes(term.toLowerCase()) ||
        point.description?.toLowerCase().includes(term.toLowerCase()) ||
        point.zone?.toLowerCase().includes(term.toLowerCase()) ||
        point.type.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
    setHighlightedPoints(results.map((r) => r.id));
  };

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    if (filterId === "all") {
      setHighlightedPoints([]);
      setSearchResults([]);
      return;
    }
    const typeMap = {
      attractions: "attraction",
      shows: "shows",
      services: "service",
    };
    const filtered = points.filter((point) => point.type === typeMap[filterId]);
    setHighlightedPoints(filtered.map((p) => p.name));
    setSearchResults(filtered);
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Immagine di sfondo */}
        {/* Immagine di sfondo */}
  <div className="absolute inset-0 z-0">
    <img
      src="/img/mappa.jpg"
      alt="Sfondo"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 z-10"></div>
  </div>

        {/* Contenuto */}
        <div className="relative z-10 text-center space-y-4 max-w-3xl px-4">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent animate-gradient">
            Esplora Divertland
          </h1>
          <p className="text-lg text-gray-300">
            Naviga tra attrazioni, spettacoli e servizi in tempo reale.
          </p>
        </div>
      </section>

      <section className=" bg-black border-t border-white/10">
        <div className="container mx-auto px-4 space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Input
              placeholder="Cerca attrazioni o servizi..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-white/5 border border-white/20 text-white placeholder:text-gray-400"
            />
            <div className="flex gap-2 flex-wrap justify-center md:justify-start">
              {filters.map((f) => (
                <Button
                  key={f.id}
                  onClick={() => handleFilterChange(f.id)}
                  className={`$ {
                    activeFilter === f.id
                      ? "bg-emerald-600 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  } px-4 py-2 rounded-full transition`}
                >
                  <f.icon className="w-4 h-4 mr-1" />
                  {f.label}
                </Button>
              ))}
            </div>
          </div>

          
        </div>
      </section>

      <section className="py-10 bg-black">
        <div className="container mx-auto px-4">
          <Card className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <CardHeader className="bg-black/30 border-b border-white/10 p-4 flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-white">
                <NavigationIcon className="w-5 h-5" />
                Mappa Interattiva
              </CardTitle>
              <div className="flex gap-2">
                <Button className="bg-white/10 text-white hover:bg-white/20">
                  <HeartIcon className="w-4 h-4 mr-1" /> Preferiti
                </Button>
                <Button className="bg-white/10 text-white hover:bg-white/20">
                  <ShareIcon className="w-4 h-4 mr-1" /> Condividi
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <MapInteractive highlightedPoints={highlightedPoints} />
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
