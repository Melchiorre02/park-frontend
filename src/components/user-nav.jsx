"use client"

import { useState, useEffect } from "react"
import { UserIcon, LogOutIcon, TicketIcon, CalendarIcon, SettingsIcon } from "lucide-react"

import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useNavigate } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"


export function UserNav() {
    const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // In a real app, this would use NextAuth session
    // For demo purposes, we'll use localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    // In a real app, this would use NextAuth signOut
    // For demo purposes, we'll just remove from localStorage
    localStorage.removeItem("user")
    setUser(null)
    navigate("/login")
  }

  if (!user) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate("/login")}
        className=" text-black hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-950"
      >
        <UserIcon className="h-4 w-4 mr-2" />
        Accedi
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-10 w-10">
            
            <AvatarFallback className="bg-black text-white">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-gray-500">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="/profilo" className="flex w-full items-center">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Il mio profilo</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/biglietti" className="flex w-full items-center">
            <TicketIcon className="mr-2 h-4 w-4" />
            <span>I miei biglietti</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/planner" className="flex w-full items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Il mio planner</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/impostazioni" className="flex w-full items-center">
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>Impostazioni</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Esci</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
