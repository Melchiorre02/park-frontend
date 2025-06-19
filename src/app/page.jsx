

import {
  MapIcon,
  CalendarIcon,
  ClockIcon,
  TicketIcon,
  StarIcon,
  BellIcon,
  CameraIcon,
  PlayIcon,
  TrendingUpIcon,
  UsersIcon,
  HeartIcon,
  ZapIcon,
  SparklesIcon,
  RocketIcon,
  ThumbsUpIcon,
  AwardIcon,
  ShieldCheckIcon,
  GiftIcon,
} from "lucide-react"




import { Badge } from "../components/ui/badge"
import { Navbar } from "../components/navbar"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Carousel } from "../components/carousel"
import { Footer } from "../components/footer"
import { CountdownTimer } from "../components/countdown-timer"
import { InteractiveWeather } from "../components/interactive-weather"

export default function Home() {
  // Data arrays
  const stats = [
    { number: "50+", label: "Attrazioni" },
    { number: "2M+", label: "Visitatori Annui" },
    { number: "15", label: "Ristoranti" },
    { number: "4.9★", label: "Valutazione" },
  ]

  const featuredAttractions = [
    {
      name: "Montagne Russe Extreme",
      description: "Le montagne russe più adrenaliniche d'Europa con loop a 360° e velocità fino a 120 km/h",
      category: "Estremo",
      rating: "4.9",
      waitTime: "45 min",
      intensity: "Massima",
      badgeColor: "bg-red-500 text-white",
    },
    {
      name: "Splash Mountain",
      description: "Un'avventura acquatica mozzafiato attraverso rapide e cascate spettacolari",
      category: "Acquatico",
      rating: "4.7",
      waitTime: "30 min",
      intensity: "Media",
      badgeColor: "bg-blue-500 text-white",
    },
    {
      name: "Giostra Incantata",
      description: "Un viaggio incantato nel mondo della fantasia, perfetto per tutta la famiglia",
      category: "Famiglia",
      rating: "4.8",
      waitTime: "60 min",
      intensity: "Bassa",
      badgeColor: "bg-purple-500 text-white",
    },
  ]

  const modernFeatures = [
    {
      icon: MapIcon,
      title: "Mappa AR",
      description: "Realtà aumentata per navigare il parco",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
      benefits: ["Navigazione GPS precisa", "Punti di interesse in tempo reale", "Percorsi ottimizzati"],
      a: "/mappa",
      buttonText: "Esplora Mappa",
    },
    {
      icon: ClockIcon,
      title: "Tempi Live",
      description: "Attese aggiornate ogni 30 secondi",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      benefits: ["Dati in tempo reale", "Previsioni intelligenti", "Notifiche personalizzate"],
      a: "/attrazioni",
      buttonText: "Vedi Attese",
    },
    {
      icon: CalendarIcon,
      title: "Smart Planner",
      description: "IA che ottimizza la tua giornata",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
      benefits: ["Algoritmi avanzati", "Preferenze personali", "Sincronizzazione cloud"],
      a: "/planner",
      buttonText: "Pianifica Ora",
    },
    {
      icon: TicketIcon,
      title: "Biglietti Digitali",
      description: "QR Code e pagamenti contactless",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
      benefits: ["Accesso istantaneo", "Pagamenti sicuri", "Sconti esclusivi"],
      a: "/biglietti",
      buttonText: "Acquista",
    },
    {
      icon: BellIcon,
      title: "Notifiche Smart",
      description: "Avvisi personalizzati e promemoria",
      iconBg: "bg-gradient-to-br from-yellow-500 to-orange-500",
      benefits: ["Promemoria spettacoli", "Offerte speciali", "Aggiornamenti meteo"],
      a: "/info",
      buttonText: "Configura",
    },
    {
      icon: HeartIcon,
      title: "Preferiti Sync",
      description: "Sincronizza su tutti i dispositivi",
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-500",
      benefits: ["Cloud storage", "Multi-dispositivo", "Backup automatico"],
      a: "/profilo",
      buttonText: "Accedi",
    },
  ]

  const enhancedTestimonials = [
    {
      name: "Marco Rossi",
      rating: 5,
      text: "Un'esperienza che supera ogni aspettativa! Le attrazioni sono mozzafiato e l'app rende tutto perfetto. I miei figli non volevano più andare via!",
      date: "15 maggio 2025",
      visitType: "Famiglia",
      likes: 127,
    },
    {
      name: "Giulia Bianchi",
      rating: 5,
      text: "Organizzazione impeccabile e divertimento garantito. Il Dragon Coaster è semplicemente incredibile! Già prenotato per il prossimo weekend.",
      date: "10 maggio 2025",
      visitType: "Coppia",
      likes: 89,
    },
    {
      name: "Luca Verdi",
      rating: 4,
      text: "Tecnologia all'avanguardia e attrazioni spettacolari. L'app con la realtà aumentata è geniale. Consigliatissimo a tutti gli amanti dell'adrenalina!",
      date: "5 maggio 2025",
      visitType: "Amici",
      likes: 156,
    },
  ]

  const notifications = [
    {
      icon: GiftIcon,
      title: "Nuova Attrazione",
      text: "Sky Rider aprirà il 1° giugno! Prenota il tuo FastPass gratuito ora.",
      time: "2 ore fa",
      borderColor: "border-green-400",
      bgColor: "bg-green-500/10",
      iconColor: "text-green-400",
      titleColor: "text-green-300",
      textColor: "text-green-200",
    },
    {
      icon: ZapIcon,
      title: "Manutenzione",
      text: "Thunder Mountain sarà chiusa per manutenzione dal 22 al 24 maggio.",
      time: "1 giorno fa",
      borderColor: "border-yellow-400",
      bgColor: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
      titleColor: "text-yellow-300",
      textColor: "text-yellow-200",
    },
    {
      icon: SparklesIcon,
      title: "Evento Speciale",
      text: "Festival delle Luci: spettacoli ogni sera alle 21:00 per tutto giugno.",
      time: "3 giorni fa",
      borderColor: "border-purple-400",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
      titleColor: "text-purple-300",
      textColor: "text-purple-200",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section - Ultra Modern */}
        <section className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-black dark:from-gray-900 dark:to-gray-800 text-white overflow-hidden flex items-center justify-center">
  {/* Video di sfondo */}
  <div className="absolute inset-0 z-0">
    <video
      className="w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/fallback.jpg" // facoltativo, in caso il video non si carica subito
    >
      <source src="/video/mirabilandia-hero.mp4" type="video/mp4" />
      Il tuo browser non supporta il video HTML5.
    </video>
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 z-10"></div>
  </div>

  {/* Contenuto principale */}
  <div className="relative z-20 text-center px-6 max-w-4xl space-y-10">
    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent animate-gradient">
      Preparati all'Avventura
    </h1>
    <p className="text-lg sm:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
      Entra in un mondo dove l'immaginazione prende vita. Dai brividi sulle montagne russe alla magia degli spettacoli... <span className="text-white font-semibold">Divertlanda</span> ti aspetta.
    </p>

    {/* CTA buttons */}
    <div className="flex flex-col sm:flex-row justify-center gap-6">
      <a href="/biglietti">
        <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-black hover:text-white transition-all duration-300">
          Acquista Biglietti
        </button>
      </a>
      <a href="/mappa">
        <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300">
          Scopri il Parco
        </button>
      </a>
    </div>
  </div>

  {/* Scroll Down Indicator */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
      <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
    </div>
  </div>
</section>



       

        {/* Attrazioni in Evidenza */}
        <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-black dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
                Attrazioni da{" "}
                <span className=" bg-clip-text bg-gradient-to-r text-black">
                  Brivido
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Scopri le nostre attrazioni più adrenaliniche e popolari
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
              {featuredAttractions.map((attraction, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={`${attraction.badgeColor} font-semibold`}>{attraction.category}</Badge>
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 mx-auto mb-1 text-yellow-400 fill-current" />
                        <span className="font-bold text-sm">{attraction.rating}</span>
                      </div>
                    </div>

                    <CardTitle className="text-2xl font-black group-hover:text-green-600 transition-colors duration-300">
                      {attraction.name}
                    </CardTitle>

                    <CardDescription className="text-base leading-relaxed">{attraction.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <ClockIcon className="w-5 h-5 mx-auto mb-1 text-green-600" />
                        <div className="text-sm font-semibold">{attraction.waitTime}</div>
                        <div className="text-xs text-gray-500">Attesa</div>
                      </div>
                      <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <TrendingUpIcon className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                        <div className="text-sm font-semibold">{attraction.intensity}</div>
                        <div className="text-xs text-gray-500">Intensità</div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="relative z-10">
                  <a href="/planner" className="w-full">
                      
                  </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - Ultra Modern */}
        <section className="w-full py-24 bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white relative overflow-hidden">
  {/* Decorative Blur Lights */}
  <div className="absolute top-10 left-[-100px] w-[300px] h-[300px] bg-green-500 opacity-20 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-[-120px] w-[400px] h-[400px] bg-teal-400 opacity-10 rounded-full blur-[200px]"></div>

  <div className="container mx-auto px-4 md:px-8 relative z-10">
    <div className="text-center mb-20">
      <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
        L'<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-300">App che trasforma</span> la tua avventura
      </h2>
      <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
        Scopri un'esperienza interattiva unica con tecnologie intuitive, veloci e pronte per stupirti.
      </p>
    </div>

    {/* Feature Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {modernFeatures.map((feature, index) => (
        <div
          key={index}
          className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-8 transition-all duration-500 backdrop-blur-md shadow-xl"
        >
          <div
            className={`w-14 h-14 mb-6 flex items-center justify-center rounded-xl ${feature.iconBg} transform group-hover:scale-110 transition duration-300`}
          >
            <feature.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 group-hover:text-green-300 transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-gray-300 mb-6">{feature.description}</p>
          <a
            href={feature.a}
            className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-emerald-300 font-medium transition-colors duration-300"
          >
            {feature.buttonText}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      ))}
    </div>
  </div>
</section>


      </main>
      <Footer />
    </div>
  )
}
