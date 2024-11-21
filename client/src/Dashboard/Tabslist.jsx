import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/clerk-react";

function Tabslist() {
  const { user } = useUser(); // Clerk's user context
  const [rentedCycles, setRentedCycles] = useState([
    { id: 1, name: 'Mountain Bike', rentedFrom: '2023-11-01', rentedUntil: '2023-11-07', cost: 50 },
    { id: 2, name: 'City Cruiser', rentedFrom: '2023-11-10', rentedUntil: '2023-11-12', cost: 30 },
  ]);

  const [listedCycles, setListedCycles] = useState([]);
  const [editingCycle, setEditingCycle] = useState(null);

  useEffect(() => {
    // Fetch listed cycles from the backend
    const fetchListedCycles = async () => {
      try {
        const response = await fetch(`https://cycle-share.onrender.com/getListedCycle/${user.id}`); // Fetch listed cycles by user ID
        if (!response.ok) {
          throw new Error('Failed to fetch listed cycles');
        }
        const data = await response.json();
        setListedCycles(data.cycles || []);
      } catch (error) {
        console.error('Error fetching listed cycles:', error);
      }
    };

    if (user) {
      fetchListedCycles();
    }
  }, [user]);

  const handleEditCycle = (cycle) => {
    setEditingCycle(cycle);
  };

  const handleSaveCycle = (updatedCycle) => {
    setListedCycles(
      listedCycles.map((cycle) =>
        cycle._id === updatedCycle._id ? updatedCycle : cycle
      )
    );
    setEditingCycle(null);
  };

  return (
    <Tabs defaultValue="rented">
      <TabsList>
        <TabsTrigger value="rented">Rented Cycles</TabsTrigger>
        <TabsTrigger value="listed">Listed Cycles</TabsTrigger>
      </TabsList>
      <TabsContent value="rented">
        <Card>
          <CardHeader>
            <CardTitle>Your Rented Cycles</CardTitle>
            <CardDescription>Cycles you are currently renting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rentedCycles.map((cycle) => (
                <div
                  key={cycle.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <h3 className="font-semibold">{cycle.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cycle.rentedFrom} to {cycle.rentedUntil}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${cycle.cost}</p>
                    <Button variant="outline" size="sm">
                      Extend Rental
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="listed">
        <Card>
          <CardHeader>
            <CardTitle>Your Listed Cycles</CardTitle>
            <CardDescription>Cycles you have listed for rent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {listedCycles.length > 0 ? (
                listedCycles.map((cycle) => (
                  <div
                    key={cycle._id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div>
                      <h3 className="font-semibold">{cycle.name}</h3>
                      <p className="text-sm">
                        {cycle.description || 'No description provided'}
                      </p>
                      <p className="text-sm">Pickup: {cycle.pickup || 'Not specified'}</p>
                      <p className="text-sm">Drop-off: {cycle.drop || 'Not specified'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${cycle.total || 0} earned</p>
                      <p className="text-sm text-muted-foreground">
                        {cycle.count || 0} total rentals
                      </p>
                      <p className="text-sm">Hourly rate: ${cycle.cost}</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditCycle(cycle)}
                          >
                            Edit Listing
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Cycle Listing</DialogTitle>
                            <DialogDescription>
                              Update the details of your listed cycle
                            </DialogDescription>
                          </DialogHeader>
                          {editingCycle && (
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="cycleName">Cycle Name</Label>
                                <Input
                                  id="cycleName"
                                  defaultValue={editingCycle.name}
                                  onChange={(e) =>
                                    setEditingCycle({
                                      ...editingCycle,
                                      name: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="cycleDescription">
                                  Description
                                </Label>
                                <Textarea
                                  id="cycleDescription"
                                  defaultValue={editingCycle.description}
                                  onChange={(e) =>
                                    setEditingCycle({
                                      ...editingCycle,
                                      description: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="cyclehourlyRate">
                                  Hourly Rate ($)
                                </Label>
                                <Input
                                  id="cyclehourlyRate"
                                  type="number"
                                  defaultValue={editingCycle.cost}
                                  onChange={(e) =>
                                    setEditingCycle({
                                      ...editingCycle,
                                      cost: parseFloat(e.target.value),
                                    })
                                  }
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="cyclePickupPoint">
                                  Pickup Point
                                </Label>
                                <Input
                                  id="cyclePickupPoint"
                                  defaultValue={editingCycle.pickup}
                                  onChange={(e) =>
                                    setEditingCycle({
                                      ...editingCycle,
                                      pickup: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="cycleDropPoint">
                                  Drop-off Point
                                </Label>
                                <Input
                                  id="cycleDropPoint"
                                  defaultValue={editingCycle.drop}
                                  onChange={(e) =>
                                    setEditingCycle({
                                      ...editingCycle,
                                      drop: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <Button onClick={() => handleSaveCycle(editingCycle)}>
                                Save Changes
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground">
                  No cycles listed yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default Tabslist;
