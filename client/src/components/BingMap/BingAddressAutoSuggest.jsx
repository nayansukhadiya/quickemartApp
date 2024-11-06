import React, { useState, useContext } from "react";
import axios from "axios";
import "./locationPage.css";
import UserContext from "../../context/UserContext";

const BingAddressAutoSuggest = () => {
  const { locationBox, setLocationBox,setUserLocationName } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [locationName, setLocationName] = useState();
  const [loading, setLoading] = useState(false); // Added loading state
  const apiKey =
    "AtRpXiSIPHgN5ROpHoHL4le6jIAXXZmw3fLg3zMGz50M_BHkQwK5NoxVa8DrPgwL";

  const fetchSuggestions = async (text) => {
    if (!text) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    const endpoint = `https://dev.virtualearth.net/REST/v1/Autosuggest?query=${text}&key=${apiKey}`;

    try {
      const { data } = await axios.get(endpoint);
      const resources = data?.resourceSets?.[0]?.resources[0].value;
      console.log(data?.resourceSets?.[0]?.resources);

      if (resources.length > 0) {
        const addressSuggestions = [];
        for (const element of resources) {
          addressSuggestions.push({
            formattedAddress: element.name || element.address.formattedAddress,
            locality: element.address.adminDistrict ||  element.address.adminDistrict2 || element.address.locality  , // Provide fallback for locality
          });
        }
        setSuggestions(addressSuggestions);
        console.log("Address Suggestions:", addressSuggestions);
        console.log("setSuggestions Suggestions:", suggestions);
      } else {
        setSuggestions([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const fetchSuggestionsByLocation = async (latitude, longitude) => {
    setLoading(true); // Start the loader
    const endpoint = `https://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}?key=${apiKey}`;

    try {
      const response = await axios.get(endpoint);

      console.log("Full Response Data:", response.data);

      const resourceSets = response.data.resourceSets?.[0]?.resources || [];
      console.log("Resource Sets:", resourceSets);

      if (resourceSets.length > 0) {
        // Assuming the first resource is what you're looking for
        const address = resourceSets[0].address; // Correct way to access the address object
        console.log("Address:", address);

        // Creating address suggestions array
        const addressSuggestions = 
          {
            formattedAddress: address.formattedAddress,
            locality: address.locality || "N/A", 
          }
        setUserLocationName(addressSuggestions);
        setLocationName(addressSuggestions);
        setLocationBox(false);
        setQuery("");
        console.log("Address Suggestions:", addressSuggestions);
      } else {
        setSuggestions([]);
        console.log("No suggestions found.");
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }

    setTimeout(() => {
      setLoading(false); // Hide the loader after 1 second
    }, 1000);
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setQuery(text);
    fetchSuggestions(text);
  };

  const handleSuggestionClick = (suggestion) => {
    setSuggestions([]);
    setUserLocationName(suggestion)
    setLocationName(suggestion);
    setLocationBox(false);
    setQuery("");
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchSuggestionsByLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
const  CloseBox = () => {
  setLocationBox(false)
}
  return (
    <>
    { locationBox && (
    <div className="locationPage">
      <div className="locationBox">
        <div className="upperSecLocation">
          <p>Location</p>
          <button onClick={CloseBox}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
        </div>
        {locationName &&
        <div className="CurrentLocation">
          <h1>Current Location</h1>
          <p>{locationName.formattedAddress}</p><p>{locationName.locality}</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
        </div>}
        <div className="InputAndBtnLocation">
          <button onClick={handleGetLocation}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-locate-fixed"
            >
              <line x1="2" x2="5" y1="12" y2="12" />
              <line x1="19" x2="22" y1="12" y2="12" />
              <line x1="12" x2="12" y1="2" y2="5" />
              <line x1="12" x2="12" y1="19" y2="22" />
              <circle cx="12" cy="12" r="7" />
              <circle cx="12" cy="12" r="3" />
            </svg>{" "}
            Use Current Location
          </button>
          <div className="orSec"><span>OR</span></div>
          <div className="SearchSecLocation">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-search"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search delivery location"
            />
          </div>
        </div>

        {loading && (
          <div className="center-body">
            <div className="loader-shape-3"></div>
          </div>
        )}

        {suggestions.length > 0 && !loading && (
          <div className="SuggestionList">
            {suggestions.map((suggestion, index) => (
              <div
                className="suggestionBox"
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="iconSecSuggestion">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-map-pin"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3>{suggestion.formattedAddress}</h3>
                  <p>{suggestion.locality && `${suggestion.locality}`}</p>
                </div>
              </div>
            ))}
          </div>
        )}

       
      </div>
    </div>
  )}</>
  );
};

export default BingAddressAutoSuggest;
