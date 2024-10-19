export const fetchCoordinates = async (location) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
  
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { latitude: parseFloat(lat), longitude: parseFloat(lon) }; // Return lat and lon as a number
      } else {
        throw new Error("Location not found.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null; // Return null in case of an error
    }
  };

  export const fetchSoilData = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://rest.soilgrids.org/query?lon=${longitude}&lat=${latitude}`);
      if (!response.ok) {
        throw new Error("Failed to fetch soil data");
      }
      const data = await response.json();
      return data; // Returns the soil data object
    } catch (error) {
      console.error("Error fetching soil data:", error);
      return null; // Handle the error gracefully
    }
  };