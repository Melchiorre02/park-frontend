"use client"

import { useState, useEffect } from "react"


import { UserIcon, MailIcon, LockIcon, CameraIcon, SaveIcon } from "lucide-react"
import { Navbar } from "../../components/navbar"
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Footer } from "../../components/footer"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"

export default function ProfilePage() {
    const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Form states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    // In a real app, this would use NextAuth session
    // For demo purposes, we'll use localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setName(userData.name)
      setEmail(userData.email)
    } else {
      // Redirect to login if not authenticated
      navigate("/login")
    }
  }, [navigate])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would call an API to update the user profile
      // For demo purposes, we'll just update localStorage
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedUser = {
        ...user,
        name,
        email,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      alert("Profilo aggiornato con successo!")
    } catch (error) {
      console.error("Errore durante l'aggiornamento del profilo:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setPasswordError("")
  
    if (newPassword !== confirmPassword) {
      setPasswordError("Le password non corrispondono")
      setIsLoading(false)
      return
    }
  
    
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:3000/api/auth/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      })
  
      const data = await response.json()
      console.log("Response:", data)
  
      if (!response.ok) {
        setPasswordError(data.message || "Errore durante l'aggiornamento")
      } else {
        alert("Password aggiornata con successo!")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch (error) {
      console.error(error)
      setPasswordError("Errore di rete")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return null // Or a loading spinner
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="bg-green-100 text-green-600 text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white border-green-200"
              >
                <CameraIcon className="h-4 w-4" />
                <span className="sr-only">Cambia immagine</span>
              </Button>
            </div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="profile">Profilo</TabsTrigger>
              <TabsTrigger value="security">Sicurezza</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informazioni Profilo</CardTitle>
                  <CardDescription>Aggiorna le tue informazioni personali</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <UserIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MailIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                      {isLoading ? (
                        "Salvataggio in corso..."
                      ) : (
                        <>
                          <SaveIcon className="mr-2 h-4 w-4" />
                          Salva modifiche
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Sicurezza</CardTitle>
                  <CardDescription>Aggiorna la tua password</CardDescription>
                </CardHeader>
                <CardContent>
                  {passwordError && (
                    <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm mb-4">{passwordError}</div>
                  )}
                  <form onSubmit={handlePasswordUpdate} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Password attuale</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <LockIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          id="current-password"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nuova password</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <LockIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Conferma nuova password</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <LockIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                      {isLoading ? "Aggiornamento in corso..." : "Aggiorna password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
