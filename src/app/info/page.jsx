"use client"

import {
  CarIcon, BusIcon, TrainIcon, ClockIcon, InfoIcon, MapPinIcon,
  PhoneIcon, UtensilsIcon, HeartHandshakeIcon, ShieldCheckIcon
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../components/ui/accordion"
import { Navbar } from "../../components/navbar"
import { Footer } from "../../components/footer"

export default function InfoPage() {
  const stats = [
    { label: "Visitatori Oggi", value: "12 847" },
    { label: "Servizi Attivi", value: "45" },
    { label: "Apertura", value: "09:00" },
    { label: "Temperatura", value: "24 °C" },
  ]
  const transport = [
    {
      icon: CarIcon, title: "In Auto",
      desc: "Parcheggio €10/giorno",
      lines: ["A1 Roma Nord/Sud", "A24 Tivoli", "A12 Civitavecchia"],
    },
    {
      icon: BusIcon, title: "Autobus",
      desc: "Navette ogni 30′",
      lines: ["Staz. Centrale", "Staz. Est", "Linee 42/56/78"]
    },
    {
      icon: TrainIcon, title: "Treno",
      desc: "Staz. + navetta gratuita",
      lines: ["Treni ogni ora", "Navetta inclusa", "Taxi in loco"]
    },
  ]
  const services = [
    {
      title: "Ristoranti", icon: UtensilsIcon,
      items: [
        { name: "Panoramico", desc: "Vista unica", rating: 4.8 },
        { name: "Fast Food Galaxy", desc: "Speed & fun", rating: 4.5 },
        { name: "Pizzeria Napoli", desc: "Forno a legna", rating: 4.9 },
      ]
    },
    {
      title: "Generali", icon: HeartHandshakeIcon,
      items: [
        { name: "Pronto Soccorso", desc: "24/7", rating: 5.0 },
        { name: "Wi‑Fi", desc: "Copertura totale", rating: 4.2 },
      ]
    }
  ]
  const faq = [
    { cat: "Regolamento", q: "Posso portare cibo?", a: "Sì, snack e acqua. No alcolici o vetro." },
    { cat: "Meteo", q: "Maltempo?", a: "Pioggia leggera: ok. Temporali: chiusure." },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="bg-gray-900 text-white py-20 text-center px-4">
        <h1 className="text-4xl font-black mb-4">Info & Servizi</h1>
        <p className="max-w-2xl mx-auto text-gray-300">
          Tutto il necessario per pianificare la tua visita con facilità.
        </p>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="p-4 bg-gray-800 rounded-xl shadow">
              <div className="text-2xl font-semibold">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
              {/* <div className="text-xs text-emerald-300 mt-1">{s.change}</div> */}
            </div>
          ))}
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-16">
        <Tabs defaultValue="orari" className="space-y-12">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TabsTrigger value="orari" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-800 data-[state=active]:to-gray-600 rounded-xl">⏰ Orari</TabsTrigger>
            <TabsTrigger value="trasporti" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-800 data-[state=active]:to-gray-600 rounded-xl">🚗 Trasporti</TabsTrigger>
            <TabsTrigger value="servizi" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-800 data-[state=active]:to-gray-600 rounded-xl">🛎 Servizi</TabsTrigger>
            <TabsTrigger value="faq" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-800 data-[state=active]:to-gray-600 rounded-xl">❓ FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="orari">
            <Card>
              <CardHeader>
                <CardTitle>Orari di Apertura</CardTitle>
              </CardHeader>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dalle</TableHead><TableHead>A</TableHead><TableHead>Giorni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>09:00</TableCell><TableCell>20:00</TableCell><TableCell>Lun-Gio</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>09:00</TableCell><TableCell>22:00</TableCell><TableCell>Ven-Dom/Festivi</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="trasporti">
            <div className="grid gap-6 md:grid-cols-2">
              {transport.map((t,i)=>(
                <Card key={i}>
                  <CardHeader className="flex items-center gap-3">
                    <t.icon className="w-6 h-6 text-gray-500"/>
                    <CardTitle>{t.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">{t.desc}</p>
                    <ul className="list-disc pl-6 space-y-1">
                      {t.lines.map((ln,j)=><li key={j}>{ln}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="servizi">
            <div className="grid gap-6 md:grid-cols-2">
              {services.map((cat,i)=>(
                <Card key={i}>
                  <CardHeader className="flex items-center gap-3">
                    <cat.icon className="w-6 h-6 text-gray-500"/>
                    <CardTitle>{cat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cat.items.map((it,j)=>(
                      <div key={j} className="flex justify-between py-2">
                        <div>
                          <div className="font-medium">{it.name}</div>
                          <div className="text-sm text-gray-500">{it.desc}</div>
                        </div>
                        <Badge variant="secondary">{it.rating.toFixed(1)}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faq">
            <Accordion type="single" collapsible className="space-y-4">
              {faq.map((f,i)=>(
                <AccordionItem key={i} value={`f-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-700">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
