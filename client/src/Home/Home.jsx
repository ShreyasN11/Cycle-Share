import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bike, MapPin, Clock, Shield, ListPlus } from 'lucide-react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import cycle1 from '../assets/cycle-1.jpg'
import cycle2 from '../assets/cycle-2.jpg'
import cycle3 from '../assets/cycle-3.jpg'
import cycle4 from '../assets/cycle-4.jpg'

  
    
function Home() {
    const carouselImages = [
        cycle1,
        cycle2,
        cycle3,
        cycle2
      ]
  
  return (
    <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-green-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Ride or Rent with CycleShare
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Rent a bike for your adventure or list your cycle to earn. Affordable, convenient, and eco-friendly.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button>Rent a Bike</Button>
                  <Button variant="outline">List Your Bike</Button>
                </div>
              </div>
              <div className="lg:block">
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {carouselImages.map((src, index) => (
                      <CarouselItem key={index}>
                        <img
                          src={src}
                          alt={`Cycle image ${index + 1}`}
                          width={400}
                          height={300}
                          className="rounded-lg object-cover"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose CycleShare</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <MapPin className="h-10 w-10 text-green-500" />
                <h3 className="font-bold">Convenient Locations</h3>
                <p className="text-sm text-gray-500 text-center">Multiple pickup points across the city</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <Clock className="h-10 w-10 text-green-500" />
                <h3 className="font-bold">Flexible Rentals</h3>
                <p className="text-sm text-gray-500 text-center">Hourly, daily, or weekly rental options</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <Shield className="h-10 w-10 text-green-500" />
                <h3 className="font-bold">Safety First</h3>
                <p className="text-sm text-gray-500 text-center">Well-maintained bikes and safety gear provided</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <ListPlus className="h-10 w-10 text-green-500" />
                <h3 className="font-bold">List Your Bike</h3>
                <p className="text-sm text-gray-500 text-center">Earn by renting out your unused bicycle</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Ride?</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of happy cyclists. Rent a bike today and start your adventure!
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sign up to receive updates and special offers.{" "}
                  <a className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}

export default Home