import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { MapPin, Clock, DollarSign } from 'lucide-react'
import { format, differenceInHours } from "date-fns"

export default function Rental() {
  const [searchQuery, setSearchQuery] = useState("")
  const [reservationDate, setReservationDate] = useState(null)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [totalCost, setTotalCost] = useState(0)
  const [reservingCycle, setReservingCycle] = useState(null)

  const availableCycles = [
    { id: 1, name: "Mountain Explorer", type: "Mountain Bike", rate: 25, location: "Central Park", description: "Perfect for off-road adventures" },
    { id: 2, name: "City Cruiser", type: "City Bike", rate: 15, location: "Downtown", description: "Comfortable ride for city tours" },
    { id: 3, name: "Speed Demon", type: "Road Bike", rate: 30, location: "Riverside", description: "High-performance bike for long rides" },
    { id: 4, name: "Electric Dream", type: "Electric Bike", rate: 35, location: "Uptown", description: "Effortless riding with electric assist" },
  ]

  const rentedCycles = [
    { id: 5, name: "Foldable Commuter", type: "Folding Bike", rate: 20, location: "Train Station", rentedUntil: "2023-11-30" },
    { id: 6, name: "Tandem Joy", type: "Tandem Bike", rate: 40, location: "Beachfront", rentedUntil: "2023-12-05" },
  ]

  const filteredAvailableCycles = availableCycles.filter(cycle =>
    cycle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cycle.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cycle.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleReserve = (cycle) => {
    setReservingCycle(cycle)
  }

  const handleConfirmReservation = () => {
    console.log("Reservation confirmed for:", reservingCycle, "on", format(reservationDate, "PPP"), "from", startTime, "to", endTime)
    setReservingCycle(null)
    setReservationDate(null)
    setStartTime("")
    setEndTime("")
  }

  useEffect(() => {
    if (startTime && endTime && reservationDate) {
      const start = new Date(reservationDate)
      const end = new Date(reservationDate)
      
      const [startHours, startMinutes] = startTime.split(':')
      const [endHours, endMinutes] = endTime.split(':')

      start.setHours(startHours, startMinutes)
      end.setHours(endHours, endMinutes)

      const hours = differenceInHours(end, start)
      
      if (hours > 0) {
        const cost = hours * reservingCycle?.rate
        setTotalCost(cost)
      } else {
        setTotalCost(0)
      }
    }
  }, [startTime, endTime, reservationDate, reservingCycle])

  const CycleCard = ({ cycle, isRented = false }) => (
    <Card>
      <CardHeader>
        <CardTitle>{cycle.name}</CardTitle>
        <CardDescription>{cycle.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{cycle.location}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            <span>${cycle.rate}/hour</span>
          </div>
          {isRented ? (
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>Rented until: {cycle.rentedUntil}</span>
            </div>
          ) : (
            <p>{cycle.description}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {!isRented && (
          <Button onClick={() => handleReserve(cycle)}>Reserve</Button>
        )}
      </CardFooter>
    </Card>
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rent a Cycle</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search cycles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Tabs defaultValue="available">
        <TabsList>
          <TabsTrigger value="available">Available Cycles</TabsTrigger>
          <TabsTrigger value="rented">Your Rented Cycles</TabsTrigger>
        </TabsList>
        <TabsContent value="available">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAvailableCycles.map(cycle => (
              <CycleCard key={cycle.id} cycle={cycle} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="rented">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rentedCycles.map(cycle => (
              <CycleCard key={cycle.id} cycle={cycle} isRented={true} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!reservingCycle} onOpenChange={() => setReservingCycle(null)}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Reserve {reservingCycle?.name}</DialogTitle>
      <DialogDescription>
        Choose your rental date and time.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4 grid-cols-1 sm:grid-cols-2">
      <div className="grid gap-2 mx-auto">
        <Label htmlFor="date">Date</Label>
        <Calendar
          mode="single"
          selected={reservationDate}
          onSelect={setReservationDate}
          className="rounded-md border"
        />
      </div>
      <div className="grid">
        <div className='p-2'>
        <div className="grid p-2">
          <Label htmlFor="startTime" className="p-2">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="grid p-2">
          <Label htmlFor="endTime" className="p-2">End Time</Label>
          <Input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        </div>
      </div>
    </div>
    {totalCost > 0 && (
      <div className="mt-4">
        <span className="font-bold">Total Cost: ${totalCost}</span>
      </div>
    )}
    <DialogFooter>
      <Button onClick={handleConfirmReservation} disabled={!reservationDate || !startTime || !endTime || totalCost === 0}>
        Confirm Reservation
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </div>
  )
}
