







import { Navbar } from "../components/navbar"


import { Footer } from "../components/footer"


export default function Home() {
 

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section - Ultra Modern */}
        <section className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-black dark:from-gray-900 dark:to-gray-800 text-white overflow-hidden flex items-center justify-center">
  {/* Immagine di sfondo */}
  <div className="absolute inset-0 z-0">
    <img
      src="/img/home.jpg"
      alt="Sfondo"
      className="w-full h-full object-cover"
    />
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

    {/* Pulsanti CTA */}
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
</section>
      </main>
      <Footer />
    </div>
  )
}
