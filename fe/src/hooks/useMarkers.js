import { useState, useEffect } from 'react';

export const useMarkers = () => {
  const [markers, setMarkers] = useState([]);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/plants');
        if (!res.ok) throw new Error('Chyba při načítání rostlin');
        const data = await res.json();
        setPlants(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlants();
  }, []);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/records');
        if (!res.ok) throw new Error('Chyba při načítání markerů');
        const data = await res.json();
        setMarkers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMarkers();
  }, []);

  return { markers, setMarkers, plants };
};