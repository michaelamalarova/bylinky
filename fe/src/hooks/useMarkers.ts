import { useState, useEffect } from 'react';

export type MarkerData = {
  id: number;
  lat: number;
  lng: number;
  plant: {
    _id: string;
    name: string;
  } | null;
};

export type Plant = {
  _id: string;
  name: string;
};

export const useMarkers = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/plants`);
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
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/records`);
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