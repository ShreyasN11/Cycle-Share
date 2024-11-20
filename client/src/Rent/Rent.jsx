import React from "react";
import { useUser } from "@clerk/clerk-react";  // Import useUser hook
import Notloggedin from "../Signedout/Signedout";
import Rental from "./Rental";

function Rent() {
  const { isSignedIn } = useUser(); 

  return (
    <div>
      {isSignedIn ? ( 
        <div>
          <Rental />
        </div>
      ) : (
        <Notloggedin />
      )}
    </div>
  );
}

export default Rent;
