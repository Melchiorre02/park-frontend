// src/App.jsx
import { Routes, Route } from "react-router-dom"
import Home from "./app/page"
import MapPage from "./app/mappa/page"
import AttractionsPage from "./app/attrazioni/page"
import ShowsPage from "./app/spettacoli/page"
import PlannerPage from "./app/planner/page"
import TicketsPage from "./app/biglietti/page"
import InfoPage from "./app/info/page"
import { Toaster } from "./components/ui/sonner"
import ProfilePage from "./app/profilo/page"
import LoginPage from "./app/login/page"

function App() {
  return (
   <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mappa" element={<MapPage />} />
        <Route path="/attrazioni" element={<AttractionsPage />} />
        <Route path="/spettacoli" element={<ShowsPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/biglietti" element={<TicketsPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profilo" element={<ProfilePage />} />
      </Routes>
    <Toaster />
      
   </>
  )
}

export default App