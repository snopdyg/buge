"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function BugePage() {
  const [noteModalOpen, setNoteModalOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const dogRef = useRef<HTMLImageElement>(null)
  const footerImageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const getLetterTransform = (element: HTMLElement | null, index: number) => {
    if (!element) return "translate(0px, 0px)"

    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distance = Math.sqrt(Math.pow(mousePosition.x - centerX, 2) + Math.pow(mousePosition.y - centerY, 2))

    if (distance < 200) {
      const moveX = (centerX - mousePosition.x) * 0.1
      const moveY = (centerY - mousePosition.y) * 0.1
      return `translate(${moveX}px, ${moveY}px)`
    }

    return "translate(0px, 0px)"
  }

  const WordByWordText = ({ text, className = "" }: { text: string; className?: string }) => {
    const [visibleWords, setVisibleWords] = useState<number>(0)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            const words = text.split(" ")
            words.forEach((_, index) => {
              setTimeout(() => {
                setVisibleWords(index + 1)
              }, index * 50)
            })
          }
        },
        { threshold: 0.3 },
      )

      if (textRef.current) {
        observer.observe(textRef.current)
      }

      return () => observer.disconnect()
    }, [text])

    const words = text.split(" ")

    return (
      <div ref={textRef} className={className}>
        {words.map((word, index) => (
          <span
            key={index}
            className={`inline-block mr-1 transition-all duration-300 ${
              index < visibleWords ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    )
  }

  const AnimatedTitle = ({ text, className = "" }: { text: string; className?: string }) => {
    return (
      <h1 className={className}>
        {text.split("").map((letter, index) => (
          <span
            key={index}
            className="inline-block animate-pulse"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: `${2 + (index % 3)}s`,
              transform: `rotate(${Math.sin(index) * 2}deg)`,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </h1>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/buge-background.png')`,
        }}
      />

      {/* Top Navigation */}
      <div className="fixed top-5 right-5 flex gap-3 z-50">
        <Button variant="outline" size="sm" className="bg-white shadow-lg hover:shadow-xl transition-all">
          <Link href="https://t.me/bugecoins" className="flex items-center gap-2">
            <span className="font-bold text-black">TELEGRAM</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="bg-white shadow-lg hover:shadow-xl transition-all">
          <Link href="https://x.com/bugecoins" className="flex items-center gap-2">
            <span className="font-bold text-black">X</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="bg-white shadow-lg hover:shadow-xl transition-all">
          <Link href="#" className="font-bold text-black">
            CHART
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="bg-white shadow-lg hover:shadow-xl transition-all">
          <Link href="#" className="font-bold text-black">
            BUY $BUGE
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-blue-200 via-pink-200 to-purple-200 border-2 border-black shadow-lg hover:shadow-xl transition-all animate-pulse"
        >
          <Link href="#" className="font-bold text-black">
            APE STORE
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4">
        <div ref={heroRef} className="flex gap-5 mb-20 relative">
          {["B", "U", "G", "E"].map((letter, index) => (
            <div
              key={letter}
              className="text-[200px] md:text-[320px] font-black text-white cursor-pointer transition-all duration-100 select-none"
              style={{
                WebkitTextStroke: "0.3rem black",
                WebkitTextFillColor: "white",
                transform: getLetterTransform(heroRef.current?.children[index] as HTMLElement, index),
                animation: `subtleTilt${index + 1} ${3.5 + index * 0.3}s ease-in-out infinite`,
              }}
            >
              {letter}
            </div>
          ))}
        </div>

        <Image
          ref={dogRef}
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/buge.PNG-E2XmW559YUKvdRZs5eoQGYXd9uHg2v.png"
          alt="Buge Dog"
          width={600}
          height={850}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-100"
          style={{
            transform: `translateX(-50%) ${
              mousePosition.x && dogRef.current
                ? (
                    () => {
                      const rect = dogRef.current.getBoundingClientRect()
                      const centerX = rect.left + rect.width / 2
                      const centerY = rect.top + rect.height / 2
                      const distance = Math.sqrt(
                        Math.pow(mousePosition.x - centerX, 2) + Math.pow(mousePosition.y - centerY, 2),
                      )
                      if (distance < 300) {
                        const moveX = (centerX - mousePosition.x) * 0.05
                        const moveY = (centerY - mousePosition.y) * 0.05
                        return `translate(${moveX}px, ${moveY}px)`
                      }
                      return "translate(0px, 0px)"
                    }
                  )()
                : "translate(0px, 0px)"
            }`,
          }}
        />
      </section>

      {/* About Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 py-20">
        <AnimatedTitle
          text="ABOUT BUGE"
          className="text-6xl md:text-8xl font-black text-white mb-10 text-center"
          style={{ WebkitTextStroke: "2px black", WebkitTextFillColor: "white" }}
        />

        <div className="mb-10">
          <div
            className="w-80 h-80 rounded-3xl shadow-lg bg-cover bg-center animate-pulse"
            style={{
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20250706_123812_197.PNG-odimhr0VLqZDBm9Q8BvsaLucKfQJmz.png')`,
            }}
          />
        </div>

        <WordByWordText
          text="BUGE is a digital pug born on Base Network. He exists to bring back what's been missing—real internet culture with soul. He doesn't make promises. He simply reminds us that a meme, if it hits right, can move people more than any roadmap ever could. He was made for the ones who remember when crypto was fun. When coins felt alive because the people behind them cared. BUGE is for the artists, the internet chads, the ones who stick around when everyone else moves on. Join the journey. Help build the legacy."
          className="text-xl md:text-2xl text-white max-w-4xl text-center leading-relaxed"
          style={{ WebkitTextStroke: "1px black", WebkitTextFillColor: "white" }}
        />
      </section>

      {/* Envelope Section */}
      <section className="min-h-[30vh] flex items-center justify-center relative z-10 px-4">
        <Button
          variant="ghost"
          className="p-0 hover:scale-110 transition-transform duration-200"
          onClick={() => setNoteModalOpen(true)}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/buge3-ugiJofWfgDV9VeLYE6XaL0rAtKRg9A.png"
            alt="Envelope"
            width={300}
            height={300}
            className="transition-all duration-500"
          />
        </Button>
      </section>

      {/* Note Modal */}
      {noteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[10000] p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
            <Button
              variant="ghost"
              className="absolute top-4 right-4 text-3xl font-bold hover:scale-120 transition-transform text-black"
              onClick={() => setNoteModalOpen(false)}
            >
              ×
            </Button>
            <div className="mt-8 text-lg leading-relaxed text-black">
              Buge is a meme. It exists because something has been lost in crypto. Something that once felt inevitable.
              We used to hold tokens like they mattered. We used to believe in dumb things that became real things,
              simply because enough of us refused to let them die. We used to make culture, not chase it.
              <br />
              <br />
              BUGE doesn't come with a promise, a plan, or a pitch. It's not a product of utility, and it's not trying
              to impress you. It exists because some of us are still here. People who remember what this was, and who
              are tired of watching everything become a copy of a copy of a copy. BUGE is what happens when you stop
              trying to manufacture virality and start cultivating belief again.
              <br />
              <br />
              It was never made to be perfect. It was made to endure. A coin for the best of us. For the quietly
              optimistic. For the ones who are still here.
              <br />
              <br />
              There is no roadmap. There is no leash. Only the Pug.
            </div>
          </div>
        </div>
      )}

      {/* Bugenomics Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 py-20">
        <AnimatedTitle
          text="BUGENOMICS"
          className="text-6xl md:text-8xl font-black text-white mb-10 text-center"
          style={{ WebkitTextStroke: "2px black", WebkitTextFillColor: "white" }}
        />

        <WordByWordText
          text="Buge is on a mission to become the face of internet culture on Base Network. Not a copy. Not a gimmick. A new original. An internet pug for the digital age."
          className="text-2xl md:text-3xl text-white max-w-3xl text-center mb-12 leading-relaxed"
          style={{ WebkitTextStroke: "1px black", WebkitTextFillColor: "white" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
          {[
            {
              title: "NAME",
              text: "Four letters. One dog. Zero fucks given. Clean, and impossible to forget. Just like the goodest boy himself.",
              bg: "from-blue-200 to-blue-300",
            },
            {
              title: "SUPPLY",
              text: "A trillion. Because why not? Big numbers look cool and nobody wants to deal with tiny decimals.",
              bg: "from-green-200 to-green-300",
            },
            {
              title: "LIQUIDITY",
              text: "Gone. Poof. Vanished into the void. Sent to a dead wallet that nobody can touch. Not us, not you, not anyone.",
              bg: "from-purple-200 to-purple-300",
            },
            {
              title: "TAXES",
              text: "What taxes? Trade as much as you want. Buy high, sell low, buy again. We don't take a cut. Your money, your problem.",
              bg: "from-pink-200 to-pink-300",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.bg} rounded-3xl shadow-lg p-6 hover:transform hover:-translate-y-2 hover:rotate-1 hover:scale-105 transition-all duration-200 cursor-pointer`}
            >
              <h3 className="text-2xl font-black text-black mb-4 text-center">{card.title}</h3>
              <p className="text-lg text-black text-center leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Buy Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 py-20">
        <AnimatedTitle
          text="HOW TO BUY"
          className="text-6xl md:text-8xl font-black text-white mb-16 text-center"
          style={{ WebkitTextStroke: "2px black", WebkitTextFillColor: "white" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl w-full">
          {[
            {
              title: "GET A WALLET",
              text: "Download and set up MetaMask or any Base-compatible wallet. Make sure your wallet is connected to the Base network.",
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20250706_123812_553.PNG-psMb7ClciY6lDZyhEROpBIFDFigJbV.png",
            },
            {
              title: "ADD ETH",
              text: "Bridge ETH to Base network or buy ETH directly on Base. You'll need it to swap for $BUGE and pay gas fees.",
              image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/puge6-2gz7vMTDCqUa1i9Hl135utGamAnvbu.png",
            },
            {
              title: "VISIT DEX",
              text: "Go to Uniswap or any Base DEX, connect your wallet, and import the $BUGE token using the official contract address.",
              image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/puge5-8gl7S86UR31NAoO0qOtONDkBLVPswM.png",
            },
            {
              title: "NOW SWAP",
              text: "Enter the amount of ETH you want to trade, approve the swap, and confirm the transaction in your wallet.",
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opuge7-EUu6XWsvrOdddjKGpoOuFIJ8v3dW2y.png",
            },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Image
                src={step.image || "/placeholder.svg"}
                alt={step.title}
                width={300}
                height={300}
                className="mb-6 rounded-2xl shadow-lg"
              />
              <AnimatedTitle
                text={step.title}
                className="text-3xl font-black text-white mb-4"
                style={{ WebkitTextStroke: "1px black", WebkitTextFillColor: "white" }}
              />
              <p
                className="text-xl text-white leading-relaxed"
                style={{ WebkitTextStroke: "1px black", WebkitTextFillColor: "white" }}
              >
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Join Section */}
      <section className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl w-full gap-16">
          <div className="flex-1 flex justify-center">
            <Image
              ref={footerImageRef}
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/puge8-q2vHtKwsXZoH75xAsLK28p4OkwH4TC.png"
              alt="Cool Buge with Sunglasses"
              width={500}
              height={600}
              className="transition-all duration-100"
              style={{
                transform:
                  mousePosition.x && footerImageRef.current
                    ? (() => {
                        const rect = footerImageRef.current.getBoundingClientRect()
                        const centerX = rect.left + rect.width / 2
                        const centerY = rect.top + rect.height / 2
                        const distance = Math.sqrt(
                          Math.pow(mousePosition.x - centerX, 2) + Math.pow(mousePosition.y - centerY, 2),
                        )
                        if (distance < 400) {
                          const moveX = (centerX - mousePosition.x) * 0.15
                          const moveY = (centerY - mousePosition.y) * 0.15
                          return `translate(${moveX}px, ${moveY}px)`
                        }
                        return "translate(0px, 0px)"
                      })()
                    : "translate(0px, 0px)",
              }}
            />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <AnimatedTitle
              text="JOIN THE BUGE ARMY"
              className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight"
              style={{ WebkitTextStroke: "2px black", WebkitTextFillColor: "white" }}
            />

            <WordByWordText
              text="THE GOODEST BOY IS WAITING FOR YOU ON BASE NETWORK."
              className="text-3xl md:text-4xl text-white mb-8 leading-relaxed"
              style={{ WebkitTextStroke: "1px black", WebkitTextFillColor: "white" }}
            />

            <Button
              size="lg"
              className="bg-white text-black font-black text-2xl px-8 py-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <Link href="#" className="text-black font-black">
                JOIN $BUGE
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <section className="py-12 px-4 text-center relative z-10 mb-20">
        <div className="max-w-4xl mx-auto">
          <div className="pt-8">
            <p className="text-lg text-black mb-2 font-bold">© 2025 BUGE. All Rights Reserved.</p>
            <p className="text-sm text-black mb-4">
              BUGE™ is a registered trademark. Base Network integration and community-driven development.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-black">
              <span>Terms of Service</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Community Guidelines</span>
              <span>•</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ribbon */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-white z-50 flex items-center overflow-hidden">
        <div className="flex items-center animate-scroll whitespace-nowrap gap-10">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="flex items-center gap-10 text-2xl font-black text-black">
              <span>
                THE GOODEST BOY ON <span className="text-blue-600">BASE!</span>
              </span>
              <span>
                ARF <span className="text-blue-600">ARF!</span>
              </span>
              <span>
                NOW ON <span className="text-blue-600">BASE NETWORK!</span>
              </span>
              <span>
                WHO'S A <span className="text-blue-600">GOOD BOY?</span>
              </span>
              <span>WOOF!</span>
              <span>
                <span className="text-blue-600">APE STORE</span> READY!
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
