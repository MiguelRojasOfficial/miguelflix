"use client"

import Link from "next/link";
import { Button } from "@/components/ui/Button"

export default function Hero() {
  return (
    <section
      className="relative h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.ctfassets.net/hnno7xdmslpl/hLYAr6xDX7aOWgH4bcdJO/3993624ce0290af8d857a6f60c323b26/ChatGPT_Image_26_ago_2025__03_09_46_p.m..png')",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          Tu cine en un solo lugar
        </h1>
        <p className="text-xl md:text-2xl mb-6 text-white">
          Películas y series
        </p>
        <Link href="/catalog">
          <Button
            size="lg"
            className="shadow-lg"
            onClick={() => {
              document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Explorar
          </Button>
        </Link>
      </div>
    </section>
  )
}
