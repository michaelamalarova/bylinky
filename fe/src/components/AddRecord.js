import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddRecord = ({ marker, onSave }) => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState('');
  console.log("addrecord.js loaded");

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        console.log('Fetching plants');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/plants`);
        setPlants(response.data);
        console.log('Plants fetched:', response.data);
      } catch (error) {
        console.error('Error fetching plants', error);
      }
    };

    fetchPlants();
  }, []);

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Předpokládáme, že uživatelské ID je uloženo v localStorage
      const newRecord = {
        userId,
        plantId: selectedPlant,
        latitude: marker.lat,
        longitude: marker.lng,
      };
      await axios.post(`${process.env.REACT_APP_API_URL}/api/records`, newRecord);
      onSave();
      alert('Record saved successfully');
    } catch (error) {
      console.error('Error saving record', error);
      alert('Failed to save record');
    }
  };

  return (
    <div>
      <h2>New Record</h2>
      <select onChange={(e) => setSelectedPlant(e.target.value)} value={selectedPlant}>
        <option value="">Select Plant</option>
        {plants.map((plant) => (
          <option key={plant._id} value={plant._id}>{plant.name}</option>
        ))}
      </select>
      <button onClick={handleSave} disabled={!selectedPlant}>Save</button>
    </div>
  );
};

export default AddRecord;
