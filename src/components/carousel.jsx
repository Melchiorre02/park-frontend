"use client"

import { useState, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "./ui/button"

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [images, setImages] = useState([])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  useEffect(() => {
    // 🔁 Recupera attrazioni dal backend
    const fetchAttractions = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/attractions")
        const data = await res.json()
        setImages(
          data.map((item) => ({
            src: item.image,
            alt: item.name,
            caption: item.name,
          }))
        )
      } catch (err) {
        console.error("Errore nel caricamento delle immagini:", err)
      }
    }

    fetchAttractions()

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (images.length === 0) return null // oppure uno spinner

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-lg aspect-[16/9]">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full h-full relative">
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p className="text-center">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-[-20px] left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}