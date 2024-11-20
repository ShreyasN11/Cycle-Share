import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bike, DollarSign, Calendar, MapPin, User, Settings } from 'lucide-react'
import { useUser } from "@clerk/clerk-react";

function History() {

    const rentalHistory = [
        { id: 1, cycleName: 'Mountain Bike', date: '2023-11-01', amount: 50, type: 'Rented' },
        { id: 2, cycleName: 'Road Bike', date: '2023-10-25', amount: 30, type: 'Listed' },
        { id: 3, cycleName: 'City Cruiser', date: '2023-11-10', amount: 30, type: 'Rented' },
        { id: 4, cycleName: 'Electric Bike', date: '2023-11-05', amount: 40, type: 'Listed' },
      ]  
  return (
    
    <Card>
              <CardHeader>
                <CardTitle>Rental History</CardTitle>
                <CardDescription>Your recent rental activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rentalHistory.map((rental) => (
                    <div key={rental.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${rental.type === 'Rented' ? 'bg-blue-100' : 'bg-green-100'}`}>
                          {rental.type === 'Rented' ? (
                            <Bike className="h-4 w-4 text-blue-600" />
                          ) : (
                            <MapPin className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{rental.cycleName}</p>
                          <p className="text-sm text-muted-foreground">{rental.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${rental.amount}</p>
                        <p className={`text-sm ${rental.type === 'Rented' ? 'text-blue-600' : 'text-green-600'}`}>
                          {rental.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
  )
}

export default History