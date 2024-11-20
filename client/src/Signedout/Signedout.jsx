import React from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function Notloggedin() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center space-y-6 p-6 rounded-lg bg-white shadow-md dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          You are Logged Out
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Please log in to access your account and explore more features.
        </p>
        <Button className="flex items-center space-x-2 bg-black text-white rounded border-solid hover:bg-green-600 mx-auto" >
        <SignInButton className=" p-2" />
        </Button>
      </div>
    </div>
  );
}

export default Notloggedin;
