"use client"

import { useState } from "react"



import {
  MenuIcon,
  MapIcon,
  CalendarIcon,
  ClockIcon,
  ListTodoIcon,
  TicketIcon,
  HomeIcon,
  InfoIcon,
  SparklesIcon,
  RollerCoasterIcon,
} from "lucide-react"
import { UserNav } from "./user-nav"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/mappa", label: "Mappa", icon: MapIcon },
    { href: "/attrazioni", label: "Attrazioni", icon: ClockIcon },
    { href: "/spettacoli", label: "Spettacoli", icon: CalendarIcon },
    { href: "/planner", label: "Planner", icon: ListTodoIcon },
    { href: "/biglietti", label: "Biglietti", icon: TicketIcon },
    { href: "/info", label: "Info", icon: InfoIcon },
  ]

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-green-200/50 dark:border-green-800/50 shadow-lg shadow-green-100/20 dark:shadow-green-900/20">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              {/* <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl shadow-lg">
                <RollerCoasterIcon className="h-8 w-8 text-white" />
              </div> */}
            </div>
            <div className="flex flex-col">
              <img
                src="/img/logo.png"
                alt="Logo"
                className="h-30 w-auto" // Regola l'altezza a piacimento
                style={{ objectFit: 'contain' }}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium"></span>
            </div>

          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative group px-4 py-2 rounded-xl transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              <div className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-gray-500 group-hover:text-green-600 dark:text-gray-400 dark:group-hover:text-green-400 transition-colors duration-300" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 dark:text-gray-300 dark:group-hover:text-green-300 transition-colors duration-300">
                  {item.label}
                </span>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
            </a>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <UserNav />

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden relative overflow-hidden border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:border-green-700 dark:hover:bg-green-900/20 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <MenuIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-green-200/50 dark:border-green-800/50"
            >
              <div className="flex flex-col h-full">
                


                {/* Mobile Navigation */}
                <nav className="flex-1 py-6">
                  <div className="grid gap-2">
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-4 p-4 rounded-xl text-gray-700 hover:text-green-700 dark:text-gray-300 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative bg-gray-100 dark:bg-gray-800 p-2 rounded-lg group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors duration-300">
                            <item.icon className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.label}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {item.label === "Home" && "Pagina principale"}
                            {item.label === "Mappa" && "Esplora il parco"}
                            {item.label === "Attrazioni" && "Giostre e divertimento"}
                            {item.label === "Spettacoli" && "Eventi e show"}
                            {item.label === "Planner" && "Pianifica la visita"}
                            {item.label === "Biglietti" && "Acquista l'ingresso"}
                            {item.label === "Info" && "Informazioni utili"}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </nav>

                {/* Mobile Footer */}
                <div className="pt-6 border-t border-green-200/50 dark:border-green-800/50">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      🎢 Benvenuto a Divertlanda!
                    </p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
