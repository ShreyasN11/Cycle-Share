import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Bike, MapPin, Clock, DollarSign } from 'lucide-react'
import { useUser } from "@clerk/clerk-react";

export default function Listing() {
  const { toast } = useToast()
  const { user } = useUser()
  const [listings, setListings] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    pickupLocation: '',
    dropLocation: '',
    costPerHour: '',
    description: '',
  })

  const [editingCycle, setEditingCycle] = useState(null)

  // Fetch listings from the API
  useEffect(() => {
    const fetchListings = async () => {
      if (user?.id) {
        try {
          console.log(user.id)
          const response = await fetch(`https://cycle-share.onrender.com/${user.id}`)
          if (response.ok) {
            const data = await response.json()
            console.log(data);
            setListings(data.cycles)
          } else {
            toast({
              title: "Error",
              description: "Failed to fetch your cycle listings.",
              variant: "destructive",
            })
          }
        } catch (error) {
          console.error("Error fetching listings:", error)
        }
      }
    }

    fetchListings()
  }, [user?.id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleEditCycle = (cycle) => {
    setEditingCycle(cycle)
    setFormData({
      name: cycle.name,
      pickupLocation: cycle.pickupLocation,
      dropLocation: cycle.dropLocation,
      costPerHour: cycle.costPerHour.toString(),
      description: cycle.description,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.pickupLocation || !formData.dropLocation || !formData.costPerHour) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    try {
      if (editingCycle) {
        // Edit cycle functionality (assuming API supports this)
        toast({
          title: "Error",
          description: "Editing functionality not yet implemented.",
          variant: "destructive",
        })
      } else {
        // Add new listing
        const response = await fetch('https://cycle-share.onrender.com/addListedCycle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cycleid: listings.length + 1, // Temporary ID logic
            ownerid: user.id,
            name: formData.name,
            pickup: formData.pickupLocation,
            drop: formData.dropLocation,
            cost: parseFloat(formData.costPerHour),
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setListings(prevListings => [...prevListings, data.cycle])
          toast({
            title: "Success",
            description: "Your cycle has been listed successfully!",
          })
        } else {
          toast({
            title: "Error",
            description: "Failed to list your cycle.",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Something went wrong while submitting the form.",
        variant: "destructive",
      })
    }

    setFormData({
      name: '',
      pickupLocation: '',
      dropLocation: '',
      costPerHour: '',
      description: '',
    })
    setEditingCycle(null)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">List Your Cycle</h1>

      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">List a New Cycle</TabsTrigger>
          <TabsTrigger value="view">View Your Listings</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>{editingCycle ? 'Edit Your Cycle Listing' : 'Add a New Cycle Listing'}</CardTitle>
              <CardDescription>Provide details about the cycle you want to list for rent.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Cycle Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Mountain Explorer"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupLocation">Pickup Location</Label>
                  <Input
                    id="pickupLocation"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    placeholder="e.g., Central Park"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dropLocation">Drop-off Location</Label>
                  <Input
                    id="dropLocation"
                    name="dropLocation"
                    value={formData.dropLocation}
                    onChange={handleInputChange}
                    placeholder="e.g., Central Park"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="costPerHour">Cost per Hour ($)</Label>
                  <Input
                    id="costPerHour"
                    name="costPerHour"
                    type="number"
                    value={formData.costPerHour}
                    onChange={handleInputChange}
                    placeholder="e.g., 10"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your cycle..."
                    rows={4}
                  />
                </div>
                <div className="flex justify-between">
                  <Button type="submit">{editingCycle ? 'Update Listing' : 'List Your Cycle'}</Button>
                  {editingCycle && (
                    <Button type="button" variant="outline" onClick={() => {
                      setEditingCycle(null)
                      setFormData({
                        name: '',
                        pickupLocation: '',
                        dropLocation: '',
                        costPerHour: '',
                        description: '',
                      })
                    }}>
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="view">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {listings.map(listing => (
              <Card key={listing.cycleid}>
                <CardHeader>
                  <CardTitle>{listing.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>Pickup: {listing.pickup}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>Drop-off: {listing.drop}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-4 w-4" />
                      <span>${listing.cost}/hour</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => handleEditCycle(listing)}>Edit Listing</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
