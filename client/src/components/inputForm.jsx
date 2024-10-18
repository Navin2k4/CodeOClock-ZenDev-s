import React, { useState } from 'react';

const FarmerDataForm = () => {
  const [farmerName, setFarmerName] = useState('');
  const [location, setLocation] = useState('');
  const [cropType, setCropType] = useState('');
  const [soilType, setSoilType] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [recentIrrigation, setRecentIrrigation] = useState('');
  const [fertilizationPractices, setFertilizationPractices] = useState('');
  const [pestObservations, setPestObservations] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      farmerName,
      location,
      cropType,
      soilType,
      growthStage,
      recentIrrigation,
      fertilizationPractices,
      pestObservations,
    };
    console.log("Collected Farmer Data: ", formData);
    // Add API call here
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f0f9f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '600px',
    },
    header: {
      backgroundColor: '#2e7d32',
      color: 'white',
      padding: '20px',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
    },
    title: {
      margin: '0',
      fontSize: '24px',
      display: 'flex',
      alignItems: 'center',
    },
    description: {
      margin: '10px 0 0',
      fontSize: '14px',
      color: '#a5d6a7',
    },
    form: {
      padding: '20px',
    },
    inputGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    select: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      backgroundColor: 'white',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#2e7d32',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    '@media (max-width: 600px)': {
      card: {
        width: '100%',
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            <span style={{ marginRight: '10px' }}>🍃</span>
            Farmer Data Collection Form
          </h2>
          <p style={styles.description}>Please fill in the details about your farm and crops</p>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="farmerName">Farmer Name</label>
            <input
              id="farmerName"
              style={styles.input}
              type="text"
              value={farmerName}
              onChange={(e) => setFarmerName(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="location">Location</label>
            <input
              id="location"
              style={styles.input}
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="cropType">Crop Type</label>
            <select
              id="cropType"
              style={styles.select}
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              required
            >
              <option value="">Select Crop Type</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="maize">Maize</option>
              <option value="soybeans">Soybeans</option>
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="soilType">Soil Type</label>
            <select
              id="soilType"
              style={styles.select}
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              required
            >
              <option value="">Select Soil Type</option>
              <option value="clay">Clay</option>
              <option value="sandy">Sandy</option>
              <option value="loamy">Loamy</option>
              <option value="silt">Silt</option>
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="growthStage">Growth Stage</label>
            <select
              id="growthStage"
              style={styles.select}
              value={growthStage}
              onChange={(e) => setGrowthStage(e.target.value)}
              required
            >
              <option value="">Select Growth Stage</option>
              <option value="germination">Germination</option>
              <option value="vegetative">Vegetative</option>
              <option value="reproductive">Reproductive</option>
              <option value="ripening">Ripening</option>
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="recentIrrigation">Recent Irrigation (in mm)</label>
            <input
              id="recentIrrigation"
              style={styles.input}
              type="number"
              value={recentIrrigation}
              onChange={(e) => setRecentIrrigation(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="fertilizationPractices">Fertilization Practices</label>
            <textarea
              id="fertilizationPractices"
              style={styles.input}
              value={fertilizationPractices}
              onChange={(e) => setFertilizationPractices(e.target.value)}
              placeholder="e.g., 50kg Nitrogen applied"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="pestObservations">Pest/Disease Observations (if any)</label>
            <textarea
              id="pestObservations"
              style={styles.input}
              value={pestObservations}
              onChange={(e) => setPestObservations(e.target.value)}
              placeholder="e.g., Signs of pest attack on leaves"
            />
          </div>
          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FarmerDataForm;