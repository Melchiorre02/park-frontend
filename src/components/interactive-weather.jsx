"use client"

import { useState, useEffect } from "react"

import {
  SunIcon,
  CloudIcon,
  CloudRainIcon,
  CloudLightningIcon,
  CloudSnowIcon,
  WindIcon,
  DropletIcon,
  ThermometerIcon,
  EyeIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"



export function InteractiveWeather() {
  const [caricamento, setCaricamento] = useState(true)
  const [usaCelsius, setUsaCelsius] = useState(true)
  const [giornoSelezionato, setGiornoSelezionato] = useState("")
  const [datiMeteo, setDatiMeteo] = useState(null)
  const [mostraDettagli, setMostraDettagli] = useState(false)

  useEffect(() => {
    const caricaMeteo = async () => {
      setCaricamento(true)
      try {
        const res = await fetch("http://localhost:3000/api/weather?city=Rome")
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || "Errore nella richiesta meteo")
        }

        const datiFormattati = formattaDatiMeteo(data)
        setDatiMeteo(datiFormattati)
        setGiornoSelezionato(Object.keys(datiFormattati)[0])
        setCaricamento(false)
      } catch (errore) {
        console.error("Errore nel caricamento meteo:", errore)
        setCaricamento(false)
      }
    }

    caricaMeteo()
  }, [])

  const formattaDatiMeteo = (data) => {
    const giorni = {}

    data.forecast.forecastday.forEach((giorno) => {
      const dataGiorno = new Date(giorno.date).toLocaleDateString("it-IT", {
        weekday: "long",
      })

      giorni[dataGiorno] = {
        data: dataGiorno,
        condizione: giorno.day.condition.text.toLowerCase(),
        icona: giorno.day.condition.icon,
        temp: Math.round(giorno.day.avgtemp_c),
        min: Math.round(giorno.day.mintemp_c),
        max: Math.round(giorno.day.maxtemp_c),
        umidita: giorno.day.avghumidity,
        vento: Math.round(giorno.day.maxwind_kph),
        visibilita: Math.round(giorno.day.avgvis_km),
        orario: giorno.hour.map((h) => ({
          ora: h.time.split(" ")[1],
          temp: Math.round(h.temp_c),
          condizione: h.condition.text.toLowerCase(),
          icona: h.condition.icon,
        })),
      }
    })

    return giorni
  }

  const convertiTemperatura = (celsius) => {
    return usaCelsius ? celsius : Math.round((celsius * 9) / 5 + 32)
  }

  const iconaMeteo = (condizione, dimensione = 6) => {
    const classe = `h-${dimensione} w-${dimensione} ${coloreIcona(condizione)} drop-shadow-lg`
    switch (condizione) {
      case "soleggiato":
        return <SunIcon className={`${classe} animate-pulse`} />
      case "nuvoloso":
        return <CloudIcon className={classe} />
      case "pioggia":
        return <CloudRainIcon className={classe} />
      case "temporale":
        return <CloudLightningIcon className={classe} />
      case "neve":
        return <CloudSnowIcon className={classe} />
      default:
        return <SunIcon className={`${classe} animate-pulse`} />
    }
  }

  const coloreIcona = (condizione) => {
    switch (condizione) {
      case "soleggiato":
        return "text-yellow-500"
      case "nuvoloso":
        return "text-gray-400"
      case "pioggia":
        return "text-blue-500"
      case "temporale":
        return "text-purple-500"
      case "neve":
        return "text-blue-200"
      default:
        return "text-yellow-500"
    }
  }

  const sfondoGradiente = (condizione) => {
    switch (condizione) {
      case "soleggiato":
        return "bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 dark:from-yellow-900/30 dark:via-orange-900/20 dark:to-yellow-800/30"
      case "nuvoloso":
        return "bg-gradient-to-br from-gray-100 via-slate-50 to-gray-200 dark:from-gray-800/30 dark:via-slate-800/20 dark:to-gray-700/30"
      case "pioggia":
        return "bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-200 dark:from-blue-900/30 dark:via-cyan-900/20 dark:to-blue-800/30"
      case "temporale":
        return "bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-200 dark:from-purple-900/30 dark:via-indigo-900/20 dark:to-purple-800/30"
      case "neve":
        return "bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-900/20 dark:via-slate-800/10 dark:to-blue-800/20"
      default:
        return "bg-gradient-to-br from-green-50 via-emerald-25 to-green-100 dark:from-green-900/20 dark:via-emerald-900/10 dark:to-green-800/20"
    }
  }

  if (caricamento || !datiMeteo) {
    return (
      <Card className="border-green-200 dark:border-green-800 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <SunIcon className="h-6 w-6 text-yellow-500 animate-pulse" />
            </div>
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold">
              Meteo in aggiornamento...
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center h-[200px] space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 dark:border-green-700"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent absolute top-0"></div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Caricamento dati meteo...</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Connessione al servizio meteorologico</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const giorniDisponibili = Object.keys(datiMeteo)
  const giornoCorrente = datiMeteo[giornoSelezionato]

  return (
    <Card className="border-green-200 dark:border-green-800 shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full shadow-lg">
              <SunIcon className="h-6 w-6 text-yellow-500" />
            </div>
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold text-xl">
              Previsioni Meteo
            </span>
          </CardTitle>
          <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 rounded-full px-4 py-2 backdrop-blur-sm">
            <Label className="text-sm font-medium text-green-700 dark:text-green-300">°C</Label>
            <Switch
              checked={!usaCelsius}
              onCheckedChange={() => setUsaCelsius(!usaCelsius)}
              className="data-[state=checked]:bg-green-600"
            />
            <Label className="text-sm font-medium text-green-700 dark:text-green-300">°F</Label>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs value={giornoSelezionato} onValueChange={setGiornoSelezionato}>
          <TabsList className=" w-full mb-6 bg-green-100 dark:bg-green-900/30 p-1 rounded-xl">
            {giorniDisponibili.map((giorno) => (
              <TabsTrigger
                key={giorno}
                value={giorno}
                className="  capitalize font-medium data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-green-700 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-green-300 transition-all duration-200"
              >
                {giorno}
              </TabsTrigger>
            ))}
          </TabsList>

          {giorniDisponibili.map((giorno) => {
            const info = datiMeteo[giorno]
            return (
              <TabsContent key={giorno} value={giorno} className="space-y-6 mt-0">
                {/* Card principale meteo */}
                <div
                  className={`p-6 rounded-2xl ${sfondoGradiente(info.condizione)} border border-white/20 shadow-lg backdrop-blur-sm`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <img
                          src={"https:" + info.icona}
                          alt="Icona meteo"
                          className="w-20 h-20 drop-shadow-2xl filter brightness-110"
                        />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                          {iconaMeteo(info.condizione, 4)}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 capitalize">{info.data}</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 capitalize font-medium">
                          {info.condizione}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-5xl font-bold text-gray-800 dark:text-gray-100 drop-shadow-sm">
                        {convertiTemperatura(info.temp)}°
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        <span className="text-blue-600 dark:text-blue-400">↓{convertiTemperatura(info.min)}°</span>
                        {" / "}
                        <span className="text-red-600 dark:text-red-400">↑{convertiTemperatura(info.max)}°</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statistiche meteo */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <DropletIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium uppercase tracking-wide">
                          Umidità
                        </p>
                        <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{info.umidita}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200/50 dark:border-green-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <WindIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-xs text-green-600/70 dark:text-green-400/70 font-medium uppercase tracking-wide">
                          Vento
                        </p>
                        <p className="text-lg font-bold text-green-700 dark:text-green-300">{info.vento} km/h</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <EyeIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-purple-600/70 dark:text-purple-400/70 font-medium uppercase tracking-wide">
                          Visibilità
                        </p>
                        <p className="text-lg font-bold text-purple-700 dark:text-purple-300">{info.visibilita} km</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dettagli orari */}
                {mostraDettagli && (
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                      <ThermometerIcon className="h-5 w-5 text-green-600" />
                      Previsioni Orarie
                    </h4>
                    <div className="overflow-x-auto">
                      <div className="flex space-x-4 pb-2">
                        {info.orario.map((ora, i) => (
                          <div
                            key={i}
                            className="text-center min-w-[90px] bg-white/70 dark:bg-gray-700/70 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{ora.ora}</p>
                            <img src={"https:" + ora.icona} alt="" className="w-10 h-10 mx-auto mb-2 drop-shadow-lg" />
                            <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                              {convertiTemperatura(ora.temp)}°
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Pulsante dettagli */}
                <Button
                  variant="outline"
                  onClick={() => setMostraDettagli(!mostraDettagli)}
                  className="w-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/30 dark:hover:to-emerald-800/30 text-green-700 dark:text-green-300 font-medium py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  {mostraDettagli ? "Nascondi dettagli orari" : "Mostra dettagli orari"}
                </Button>
              </TabsContent>
            )
          })}
        </Tabs>
      </CardContent>
    </Card>
  )
}
