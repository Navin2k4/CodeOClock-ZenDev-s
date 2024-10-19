import React, { useEffect, useState } from 'react';
import { fetchCoordinates } from '../../../api/utils/util';

const DisplayFertilizerData = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const coords = await fetchCoordinates("Madurai");
        if (coords) {
          setCoordinates(coords);
        } else {
          setError("Failed to fetch coordinates.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    getCoordinates();
    
  }, []); 
  

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {coordinates ? (
        <p>
          Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
        </p>
      ) : (
        <p>Loading coordinates...</p>
      )}
    </div>
  );
};

export default DisplayFertilizerData;
