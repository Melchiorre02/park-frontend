"use client"
import QRCode from "qrcode";
import { useEffect, useState } from "react"
import { jsPDF } from "jspdf";
import {
  TicketIcon,
  CreditCardIcon,
  QrCodeIcon,
  CalendarIcon,
  UserIcon,
  UsersIcon,
  HeartIcon,

  StarIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  TrendingUpIcon,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "@radix-ui/react-dropdown-menu"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Separator } from "@radix-ui/react-select"
import { Footer } from "../../components/footer"
import { Navbar } from "../../components/navbar"
import { toast } from "sonner"
import LoginModal from "../../components/LoginModal"

export default function TicketsPage() {
  const [activeTab, setActiveTab] = useState("acquista")
  const [ticketType, setTicketType] = useState("adulto")
  const [quantity, setQuantity] = useState(1)
  const [date, setDate] = useState("")
  const [qrCode, setQrCode] = useState(null)
  const [ticketCode, setTicketCode] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [userTickets, setUserTickets] = useState([])
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) return
    const user = JSON.parse(storedUser)
    fetch(`http://localhost:3000/api/tickets/user/${user.id}`)
      .then(res => res.json())
      .then(data => setUserTickets(data))
      .catch(error => console.error("Errore nel recupero biglietti:", error))
  }, [])

  const handleDownloadPDF = async (ticket) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("🎫 Biglietto", 20, 20);
    doc.setFontSize(12);
    doc.text(`Codice: ${ticket.code}`, 20, 40);
    doc.text(`Tipo: ${ticket.type}`, 20, 50);
    doc.text(`Data: ${ticket.date}`, 20, 60);
    doc.text(`Quantità: ${ticket.quantity}`, 20, 70);
    doc.text(`Stato: Valido`, 20, 80);
    try {
      const qrDataURL = await QRCode.toDataURL(ticket.code, { width: 150 });
      doc.addImage(qrDataURL, "PNG", 20, 90, 60, 60);
    } catch (err) { console.error("Errore nella generazione del QR code:", err); }
    doc.save(`biglietto_${ticket.code}.pdf`);
  };

  const calculatePrice = () => {
    let basePrice = 0
    switch (ticketType) {
      case "adulto": basePrice = 45; break
      case "bambino": basePrice = 30; break
      case "senior": basePrice = 35; break
      case "famiglia": basePrice = 120; break
    }
    return basePrice * quantity
  }

  const handleBuyTicket = async (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user?.id
    if (!userId) { setShowLoginModal(true); return }
    if (!date) {
      toast(<div><p className="font-medium">Data mancante</p><p>Seleziona una data per la tua visita</p></div>)
      return
    }
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    try {
      const response = await fetch("http://localhost:3000/api/tickets/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: ticketType, quantity, date, code, userId }),
      })
      const data = await response.json()
      if (response.ok) {
        toast(<div><p className="font-medium">Biglietto acquistato</p><p>Il tuo biglietto è stato salvato con successo</p></div>)
        localStorage.setItem("myTicket", JSON.stringify({ type: ticketType, quantity, date, code, userId }))
        setQrCode(code)
        setActiveTab("biglietti")
      } else {
        toast(<p>Errore: {data.message}</p>)
      }
    } catch (error) {
      console.error("Errore di rete:", error)
      toast(<p>Errore di rete durante l'acquisto</p>)
    }
  }

  const handleCheckTicket = (e) => {
    e.preventDefault()
    if (!ticketCode) {
      toast(<div><p className="font-medium">Codice mancante</p><p>Inserisci il codice del biglietto per verificarne la validità</p></div>)
      return
    }
    toast(<div><p className="font-medium">Biglietto verificato</p><p>Il tuo biglietto è valido per la data selezionata</p></div>)
    setQrCode(ticketCode)
    setActiveTab("biglietti")
  }

  const stats = [
    { label: "Biglietti Venduti Oggi", value: "2,847", icon: TicketIcon },
    { label: "Visitatori Attuali", value: "15,234", icon: UsersIcon },
    { label: "Soddisfazione Media", value: "4.9★", icon: StarIcon },
    { label: "Risparmio Online", value: "15%", icon: TrendingUpIcon },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <main className="flex-1">
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-black">
 
  {/* Immagine di sfondo */}
  <div className="absolute inset-0 z-0">
    <img
      src="/img/biglietti.png"
      alt="Sfondo"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 z-10"></div>
  </div>

  

  {/* Contenuto */}
  <div className="container px-4 py-16 relative z-30 mx-auto">
    <div className="text-center">
      <h1 className="text-5xl md:text-7xl  mb-6 font-black bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent animate-gradient">
        Biglietti
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
        Acquista i tuoi biglietti online e accedi al parco senza fare la coda. Risparmia tempo e denaro!
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-2xl p-4 shadow hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <stat.icon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>

  
</section>


        <div className="container px-4 py-8 md:px-6 md:py-12 mx-auto">
          <div className="mt-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 rounded-2xl p-2">
                <TabsTrigger
                  value="acquista"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <ShoppingCartIcon className="w-4 h-4 mr-2" />
                  Acquista
                </TabsTrigger>
                <TabsTrigger
                  value="verifica"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  Verifica
                </TabsTrigger>
                <TabsTrigger
                  value="biglietti"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <TicketIcon className="w-4 h-4 mr-2" />I miei biglietti
                </TabsTrigger>
              </TabsList>

              <TabsContent value="acquista" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl">
                      <CardHeader className="bg-gray-50 rounded-t-lg">
                        <CardTitle className="text-2xl font-bold text-gray-900">
                          Acquista biglietti
                        </CardTitle>
                        <CardDescription className="text-gray-500">
                          Seleziona il tipo di biglietto e la data della tua visita
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <form onSubmit={handleBuyTicket}>
                          <div className="space-y-8">
                            <div>
                              <Label htmlFor="ticket-type" className="text-lg font-semibold mb-4 block text-gray-700">
                                Tipo di biglietto
                              </Label>
                              <RadioGroup
                                id="ticket-type"
                                value={ticketType}
                                onValueChange={setTicketType}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                              >
                                <RadioOption value="adulto" icon={<UserIcon />} label="Adulto" desc="Età 12+ anni" price="€45,00" />
                                <RadioOption value="bambino" icon={<HeartIcon />} label="Bambino" desc="Età 3-11 anni" price="€30,00" />
                                <RadioOption value="senior" icon={<StarIcon />} label="Senior" desc="Età 65+ anni" price="€35,00" />
                                <RadioOption value="famiglia" icon={<UsersIcon />} label="Pacchetto Famiglia" badge="HOT" desc="2 adulti + 2 bambini" price="€120,00" />
                              </RadioGroup>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label htmlFor="quantity" className="text-lg font-semibold mb-2 block text-gray-700">
                                  Quantità
                                </Label>
                                <Select
                                  value={quantity.toString()}
                                  onValueChange={(value) => setQuantity(Number.parseInt(value))}
                                >
                                  <SelectTrigger
                                    id="quantity"
                                    className="bg-white border border-gray-200 rounded-xl h-12 hover:border-gray-300 transition-colors"
                                  >
                                    <SelectValue placeholder="Seleziona quantità" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                      <SelectItem key={num} value={num.toString()}>
                                        {num}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="date" className="text-lg font-semibold mb-2 block text-gray-700">
                                  Data della visita
                                </Label>
                                <Input
                                  id="date"
                                  type="date"
                                  value={date}
                                  onChange={(e) => setDate(e.target.value)}
                                  className="bg-white border border-gray-200 rounded-xl h-12 hover:border-gray-300 transition-colors"
                                  min={new Date().toISOString().split("T")[0]}
                                />
                              </div>
                            </div>
                            <div>
                              <Label className="text-lg font-semibold mb-4 block text-gray-700">Metodo di pagamento</Label>
                              <RadioGroup
                                value={paymentMethod}
                                onValueChange={setPaymentMethod}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                              >
                                <PaymentOption value="card" icon={<CreditCardIcon />} label="Carta di credito" />
                                <PaymentOption value="paypal" image="/img/logo-paypal.png" label="PayPal" />
                                <PaymentOption value="apple" image="/img/logo-apple.jpeg" label="Apple Pay" />
                              </RadioGroup>
                            </div>
                            {paymentMethod === "card" ? (
                              <div className="grid grid-cols-2 gap-4">
                                <InputCard label="Numero carta *" placeholder="1234 5678 9012 3456" id="card-number" pattern="[0-9\s]{13,19}" />
                                <InputCard label="Intestatario *" placeholder="Mario Rossi" id="card-name" pattern="[a-zA-Z\s]+" />
                                <InputCard label="Scadenza *" placeholder="MM/AA" id="card-expiry" pattern="(0[1-9]|1[0-2])\/([0-9]{2})" maxLength="5" />
                                <InputCard label="CVC *" placeholder="123" id="card-cvc" pattern="[0-9]{3,4}" maxLength="4" />
                              </div>
                            ) : (
                              <div className="space-y-6">
                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                  <div className="flex items-center gap-3 mb-4">
                                    {paymentMethod === "paypal" ? (
                                      <img src="/img/logo-paypal.png" alt="Logo PayPal" className="w-8 h-8 object-contain" />
                                    ) : (
                                      <img src="/img/logo-apple.jpeg" alt="Logo Apple" className="w-8 h-8 object-contain" />
                                    )}
                                    <div>
                                      <h3 className="text-lg font-semibold text-gray-900">
                                        {paymentMethod === "paypal" ? "Pagamento con PayPal" : "Pagamento con Apple Pay"}
                                      </h3>
                                      <p className="text-sm text-gray-500">
                                        {paymentMethod === "paypal"
                                          ? "Verrai reindirizzato a PayPal per completare il pagamento"
                                          : "Usa Touch ID o Face ID per completare il pagamento"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="owner-name" className="font-semibold mb-2 block text-gray-700">
                                    Nome proprietario biglietto *
                                  </Label>
                                  <Input
                                    id="owner-name"
                                    placeholder="Mario Rossi"
                                    required
                                    pattern="[a-zA-Z\s]+"
                                    className="bg-white border border-gray-200 rounded-xl h-12 hover:border-gray-300 transition-colors"
                                  />
                                  <p className="text-sm text-gray-500 mt-2">
                                    Questo nome apparirà sul biglietto e dovrà corrispondere a un documento d'identità valido
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                          <Button
                            type="submit"
                            className="w-full mt-8 h-14 text-lg font-semibold bg-gray-900 text-white hover:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          >
                            <ShoppingCartIcon className="w-5 h-5 mr-2" />
                            Acquista ora - €{calculatePrice().toFixed(2)}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                  <div>
                    <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl sticky top-8">
                      <CardHeader className="bg-gray-50 rounded-t-lg">
                        <CardTitle className="text-xl font-semibold text-gray-900">
                          📋 Riepilogo ordine
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                            <span className="font-medium">
                              {ticketType === "famiglia"
                                ? "Pacchetto Famiglia"
                                : `Biglietto ${ticketType === "adulto" ? "Adulto" : ticketType === "bambino" ? "Bambino" : "Senior"}`}
                            </span>
                            <span className="font-semibold">x{quantity}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span>Totale</span>
                            <span className="text-2xl text-gray-900">
                              €{calculatePrice().toFixed(2)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-400 text-center">
                            * I prezzi includono IVA
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col gap-4 p-6">
                        <OrderInfo icon={<TicketIcon className="h-5 w-5 text-gray-500" />} text="Accesso illimitato a tutte le attrazioni" />
                        <OrderInfo icon={<CalendarIcon className="h-5 w-5 text-gray-500" />} text="Valido per la data selezionata" />
                        <OrderInfo icon={<QrCodeIcon className="h-5 w-5 text-gray-600" />} text="QR Code per accesso rapido" />
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="verifica" className="mt-8">
                <Card className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl">
                  <CardHeader className="bg-gray-50 rounded-t-lg">
                    <CardTitle className="text-2xl font-semibold text-gray-900">
                      🔍 Verifica biglietto
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                      Inserisci il codice del tuo biglietto per verificarne la validità
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleCheckTicket}>
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="ticket-code" className="text-lg font-semibold mb-2 block text-gray-700">
                            Codice biglietto
                          </Label>
                          <Input
                            id="ticket-code"
                            placeholder="Inserisci il codice del biglietto"
                            value={ticketCode}
                            onChange={(e) => setTicketCode(e.target.value)}
                            className="bg-white border border-gray-200 rounded-xl h-14 text-lg hover:border-gray-300 transition-colors"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full h-14 text-lg font-semibold bg-gray-900 text-white hover:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                          <CheckCircleIcon className="w-5 h-5 mr-2" />
                          Verifica biglietto
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="biglietti" className="mt-8">
                {userTickets.length > 0 ? (
                  userTickets.map((ticket) => (
                    <Card key={ticket.code} className="max-w-2xl mx-auto mb-6 bg-white border border-gray-200 shadow-lg rounded-2xl">
                      <CardHeader className="bg-gray-50 rounded-t-lg">
                        <CardTitle className="text-2xl font-semibold text-gray-900">
                          Biglietto
                        </CardTitle>
                        <CardDescription className="text-gray-500">
                          Mostra questo QR Code all&apos;ingresso del parco
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center p-8">
                        <div className="w-72 h-72 bg-gray-50 p-6 rounded-2xl shadow flex items-center justify-center mb-6 hover:scale-105 transition-transform duration-300">
                          <div className="text-center">
                            <QrCodeIcon className="h-40 w-40 mx-auto mb-4 text-gray-800" />
                            <div className="font-mono text-xl font-bold text-gray-800">{ticket.code}</div>
                          </div>
                        </div>
                        <div className="w-full max-w-md space-y-4">
                          <TicketInfo label="Tipo:" value={ticket.type} />
                          <TicketInfo label="Data:" value={ticket.date} />
                          <TicketInfo label="Quantità:" value={ticket.quantity} />
                          <TicketInfo label="Stato:" value={<span className="text-green-600 font-bold flex items-center gap-2"><CheckCircleIcon className="w-5 h-5" />Valido</span>} />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-center p-6">
                        <Button
                          onClick={() => handleDownloadPDF(ticket)}
                          className="bg-gray-900 text-white hover:bg-gray-800 rounded-xl px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                          📄 Scarica PDF
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <Card className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl">
                    <CardHeader className="bg-gray-50 rounded-t-lg">
                      <CardTitle className="text-2xl font-semibold text-gray-900">
                        I tuoi biglietti
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        Non hai ancora acquistato nessun biglietto
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center py-12">
                      <TicketIcon className="h-24 w-24 text-gray-300 mb-6" />
                      <p className="text-gray-500 text-center max-w-md text-lg">
                        Acquista un biglietto o verifica un codice esistente per visualizzare i tuoi biglietti
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <Footer />
    </div>
  )
}

// --- COMPONENTI DI SUPPORTO ---
function RadioOption({ value, icon, label, badge, desc, price }) {
  return (
    <div className="relative group">
      <div className="flex items-center space-x-3 bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <RadioGroupItem value={value} id={value} className="border-gray-500" />
        <Label htmlFor={value} className="flex-1 cursor-pointer">
          <div className="flex items-center gap-2 mb-1">
            {icon}
            <span className="font-semibold text-gray-900">{label}</span>
            {badge && <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full">{badge}</span>}
          </div>
          <div className="text-sm text-gray-500">{desc}</div>
          <div className="font-bold text-lg text-gray-700 mt-2">{price}</div>
        </Label>
      </div>
    </div>
  )
}

function PaymentOption({ value, icon, image, label }) {
  return (
    <div className="flex items-center space-x-3 bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <RadioGroupItem value={value} id={value} />
      {icon && icon}
      {image && <img src={image} alt={label} className="w-5 h-5 object-contain" />}
      <Label htmlFor={value} className="font-medium cursor-pointer text-gray-900">{label}</Label>
    </div>
  )
}

function InputCard(props) {
  return (
    <div>
      <Label htmlFor={props.id} className="font-semibold mb-2 block text-gray-700">{props.label}</Label>
      <Input
        id={props.id}
        placeholder={props.placeholder}
        required
        pattern={props.pattern}
        maxLength={props.maxLength}
        className="bg-white border border-gray-200 rounded-xl h-12 hover:border-gray-300 focus:border-gray-400 transition-colors"
      />
    </div>
  )
}

function OrderInfo({ icon, text }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
      {icon}
      <span>{text}</span>
    </div>
  )
}

function TicketInfo({ label, value }) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
      <span className="font-medium">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}
