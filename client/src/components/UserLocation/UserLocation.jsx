import React, { useState, useContext, useEffect } from "react";
import "./userLocation.css";
import UserContext from "../../context/UserContext";

function UserLocation() {
  const [randomMin, setRandomMin] = useState(0);
  const { userLocationName, setLocationBox } = useContext(UserContext);

  // Effect hook to update randomMin when userLocationName changes
  useEffect(() => {
    // Check if there is a valid address
    if (userLocationName.formattedAddress) {
      const randomNumber = Math.floor(Math.random() * (19 - 8 + 1)) + 8;
      setRandomMin(randomNumber); // Generate and set the random number if address exists
    } else {
      setRandomMin(0); // Set to 0 if no address is present
    }
  }, [userLocationName.formattedAddress]); // This runs whenever the address changes

  const openLocation = () => {
    setLocationBox(true);
  };

  return (
    <div className="userLocationBox">
      <div className="deliveryMinSec">
        <div className="deliveryMinBox">
          {randomMin}
          <span>min</span>
        </div>
      </div>
      <div className="addressSec">
        <h4>{userLocationName.formattedAddress || "Please"}</h4>
        <p>{userLocationName.locality || "Set Location"}</p>
      </div>
      <button onClick={openLocation}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-down"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}

export default UserLocation;
