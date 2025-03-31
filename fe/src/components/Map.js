// src/pages/Map.js
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import '../styles/Map.css'
import { useMarkers } from '../hooks/useMarkers';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = () => {
  const { markers, setMarkers, plants } = useMarkers();
  const [newMarker, setNewMarker] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState('');
  const [openDetail, setOpenDetail] = useState(false);

  const AddMarker = () => {
    useMapEvents({
      click(e) {
        setNewMarker({
          id: Date.now(),
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          plant: null,
        });
      },
    });

    return null;
  };

  return (
    <MapContainer center={[50.0755, 14.4378]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <AddMarker />
      {markers.map((marker) => (
        <MarkerWithPopupDetail
          marker={marker}
          openDetail={openDetail}
          setOpenDetail={setOpenDetail}
        />
      ))}
      {newMarker &&
        <MarkerWithPopupForm
          marker={newMarker}
          plants={plants}
          selectedPlant={selectedPlant}
          setSelectedPlant={setSelectedPlant}
          setMarkers={setMarkers}
          setNewMarker={setNewMarker}
          setOpenDetail={setOpenDetail}
        />}
    </MapContainer>
  );
};

const MarkerWithPopupForm = ({ marker, plants, selectedPlant, setSelectedPlant, setMarkers, setNewMarker, setOpenDetail }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    markerRef.current.openPopup();

  }, []);

  const saveMarker = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat: marker.lat, lng: marker.lng, plant: { _id: selectedPlant._id, name: selectedPlant.name } }),
    });

    if (!response.ok) {
      console.error('Chyba při ukládání markeru');
    }
  };

  return (
    <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={defaultIcon} ref={markerRef}>
      <Popup className='popup-content-wrapper'
        eventHandlers={{
          remove: () => {
            setNewMarker(null);
          }
        }}
      >
        <form className='form'
          onSubmit={(e) => {
            e.preventDefault();
            if (!selectedPlant) {
              alert("Musíte vybrat rostlinu!");
              return; // Zastaví odeslání formuláře
            }            const newMarker = { ...marker, plant: selectedPlant };
            setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
            saveMarker()

            setNewMarker(null)
            setOpenDetail(true);
            setSelectedPlant(null);
          }}
        >
          <label>
            Výběr rostliny
            <select value={selectedPlant ? `${selectedPlant._id}|${selectedPlant.name}` : ""} onChange={(e) => {
              const [id, name] = e.target.value.split("|");
              setSelectedPlant({ _id: id, name: name });
            }}>
              <option value="">Vyberte rostlinu:</option>
              {plants.map((plant) => (
                <option key={plant._id} value={`${plant._id}|${plant.name}`}>{plant.name}</option>
              ))}
            </select>
          </label>
          <button type="submit">Uložit</button>
        </form>
      </Popup>
    </Marker>
  );
};

const MarkerWithPopupDetail = ({ marker, openDetail, setOpenDetail }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (openDetail) {
      markerRef.current.openPopup();
    }
  }, [openDetail]);

  return (
    <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={defaultIcon} ref={markerRef}>
      <Popup onClose={setOpenDetail(false)}>
        <div className='popup-detail'>
          <h2>{marker.plant ? marker.plant.name : "stary zaznam Žádná rostlina"}</h2>
          <p>blaaa blaaa blaaa</p>
          <a href={`/detail/${marker.id}`}>Zobrazit detail</a>
        </div>
      </Popup>
    </Marker>
  );
};

export default Map;