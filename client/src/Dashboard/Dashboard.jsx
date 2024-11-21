import React, { useState, useEffect } from 'react'
import { useUser } from "@clerk/clerk-react";
import Profile from './Profile'
import Earning from './Earning'
import Tabslist from './Tabslist'
import History from './History';

export default function Dashboard() {

  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    const checkUserExistence = async () => {
      if (isSignedIn && user) {
        try {
            console.log(user.emailAddresses[0].emailAddress)
            const userData = {
              userid: user.id,
              email: user.emailAddresses[0].emailAddress,
              name: user.fullName,
            };
            console.log(userData)
            const addUserResponse = await fetch('https://cycle-share.onrender.com/addUser', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            });

            if (!addUserResponse.ok) {
              throw new Error('Failed to add user');
            }

            const addUserData = await addUserResponse.json();
            console.log('User added:', addUserData);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    checkUserExistence();
  }, [isSignedIn, user]);

  return (
    <div className="flex flex-col min-h-screen bg-green-100">
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
          <Profile />
          <div className="space-y-6">
            <Earning />
            <Tabslist />
            <History />
          </div>
        </div>
      </main>
    </div>
  )
}