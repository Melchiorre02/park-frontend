"use client"

import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
} from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-16 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Divertlanda</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Un parco divertimenti dove ogni momento è un ricordo indelebile. Emozione, magia e adrenalina per tutta la famiglia.
            </p>
          </div>

          {/* Navigazione */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Esplora</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/mappa" className="hover:text-white transition">Mappa del Parco</a></li>
              <li><a href="/attrazioni" className="hover:text-white transition">Attrazioni</a></li>
              <li><a href="/spettacoli" className="hover:text-white transition">Spettacoli</a></li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Contatti</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPinIcon className="w-5 h-5 text-green-400 mt-1" />
                <span>Via del Divertimento 123, Roma, Italia</span>
              </li>
              <li className="flex items-start gap-2">
                <PhoneIcon className="w-5 h-5 text-green-400 mt-1" />
                <span>+39 06 1234 5678</span>
              </li>
              <li className="flex items-start gap-2">
                <MailIcon className="w-5 h-5 text-green-400 mt-1" />
                <span>info@Divertlanda.it</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Seguici</h4>
            <div className="flex space-x-4">
              {[FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 rounded-md bg-gray-800 hover:bg-green-500 hover:text-white transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <span>&copy; {new Date().getFullYear()} Divertlanda. Tutti i diritti riservati.</span>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-white transition">Privacy</a>
            <a href="/termini" className="hover:text-white transition">Termini</a>
            <a href="/cookie" className="hover:text-white transition">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
