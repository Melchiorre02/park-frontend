"use client"

import { useState } from "react"
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon, MailIcon } from "lucide-react"
import { Navbar } from "../../components/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Footer } from "../../components/footer"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Login state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  // Register state
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")
  const [registerError, setRegisterError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError("")

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      })

      const data = await res.json()
      console.log("Login response:", data)
      if (!res.ok) {
        setLoginError(data.message || "Email o password errati")
      } else {
        if (data.token) {
          localStorage.setItem("user", JSON.stringify(data.user))
          localStorage.setItem("token", data.token)
          navigate("/profilo")
        } else {
          setLoginError("Token mancante nella risposta dal server.")
        }
      }
    } catch (error) {
      console.error(error)
      setLoginError("Errore di connessione al server")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setRegisterError("")

    if (registerPassword !== registerConfirmPassword) {
      setRegisterError("Le password non corrispondono")
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
          confermaPassword: registerConfirmPassword
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setRegisterError(data.message || "Errore durante la registrazione")
      } else {
        localStorage.setItem("user", JSON.stringify(data.user))
        navigate("/")
      }
    } catch (error) {
      console.error(error)
      setRegisterError("Errore di connessione al server")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 md:px-6">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Accedi</TabsTrigger>
              <TabsTrigger value="register">Registrati</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center">Accedi al tuo account</CardTitle>
                  <CardDescription className="text-center">Inserisci le tue credenziali per accedere</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loginError && <div className="p-3 rounded-md bg-gray-100 text-gray-700 text-sm">{loginError}</div>}
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MailIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          placeholder="nome@esempio.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <LockIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOffIcon className="h-4 w-4 text-gray-400" /> : <EyeIcon className="h-4 w-4 text-gray-400" />}
                        </button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Accesso in corso..." : "Accedi"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* REGISTRAZIONE */}
            <TabsContent value="register">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center">Crea un account</CardTitle>
                  <CardDescription className="text-center">Inserisci i tuoi dati per registrarti</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {registerError && <div className="p-3 rounded-md bg-gray-100 text-gray-700 text-sm">{registerError}</div>}
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <UserIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Mario Rossi"
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MailIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="nome@esempio.com"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <LockIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Conferma password</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <LockIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={registerConfirmPassword}
                          onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Registrazione in corso..." : "Registrati"}
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
