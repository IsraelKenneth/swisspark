'use client'

import L from 'leaflet'
import MarkerIcon from '../../node_modules/leaflet/dist/images/marker-icon.png'
import MarkerShadow from '../../node_modules/leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'



import axios from 'axios';

import { useState, useEffect } from 'react'



const Map = () => {

  const [coord, setCoord] = useState([47.3769, 8.5417]); // Zurich coordinates
  const [parkingData, setParkingData] = useState([]);


  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.parkendd.de/Zuerich');
        const data = await response.json();
        // Filter out locations with null coordinates
        const filteredData = data.lots.filter((lot) => lot.coords !== null);
        setParkingData(filteredData);
      } catch (error) {
        console.error('Error fetching parking data:', error);
      }
    };

    fetchData();
  }, []);

  // const renderMarkers = () => {
  //   // Check if citiesData is an array
  //   if (!Array.isArray(citiesData)) {
  //     // Handle the case where citiesData is not an array (e.g., set default values or show an error message)
  //     console.log("not array")
  //     return null; // or handle accordingly
  //   }
  
  //   return citiesData.map((city, index) => (
  //     <Marker
  //       key={index}
  //       position={[city.coords.lat, city.coords.lng]}
  //       icon={
  //         new L.Icon({
  //           iconUrl: MarkerIcon.src,
  //           iconRetinaUrl: MarkerIcon.src,
  //           iconSize: [25, 41],
  //           iconAnchor: [12.5, 41],
  //           popupAnchor: [0, -41],
  //           shadowUrl: MarkerShadow.src,
  //           shadowSize: [41, 41],
  //         })
  //       }
  //     >
  //       <Popup>
  //         {city.name}<br />
  //         <a href={city.url} target="_blank" rel="noopener noreferrer">
  //           More Info
  //         </a>
  //       </Popup>
  //     </Marker>
  //   ));
  // };


  const SearchLocation = () => {
      return (
<div className="relative mx-auto max-w-fit">
  <div className="relative rounded-md shadow-md overflow-hidden">
    <input
      type="text"
      placeholder="Search Location"
      className="w-full py-2 px-4 border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
    />
  </div>
</div>
      )
  }





  const GetMyLocation = () => {
      const getMyLocation = () => {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                  setCoord([position.coords.latitude, position.coords.longitude])
              })
          } else {
              console.log("Geolocation is not supported by this browser.")
          }
      }

      return (
          <div className="relative mx-auto max-w-fit">
               <button
        onClick={getMyLocation}
        className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium my-2 py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
      >
        Get My Location
      </button>
          </div>
      )
  }

  return (
    <div className='w-full h-full'>
          <SearchLocation />
          <GetMyLocation />
          <MapContainer style={{
              height: '30rem',
              width: '50rem'
          }} center={coord} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker icon={
                  new L.Icon({
                      iconUrl: MarkerIcon.src,
                      iconRetinaUrl: MarkerIcon.src,
                      iconSize: [25, 41],
                      iconAnchor: [12.5, 41],
                      popupAnchor: [0, -41],
                      shadowUrl: MarkerShadow.src,
                      shadowSize: [41, 41],
                  })
              } position={[47.3769, 8.5417]}>
                   <Popup>
                    Current Location<br /> Easily customizable.
                  </Popup>
              </Marker>
              


                  {/* Map through parkingData and create Marker components */}
        {parkingData.map((lot) => (
          <Marker
            key={lot.id}
            icon={
              new L.Icon({
                iconUrl: '../swisspark.jpeg',
                iconRetinaUrl: '../swisspark.jpeg',
                iconSize: [25, 25],
                iconAnchor: [12.5, 41],
                popupAnchor: [0, -41],
                shadowUrl: MarkerShadow.src,
                shadowSize: [41, 41],
              })
            }
            position={[lot.coords.lat, lot.coords.lng]}
          >
            <Popup>
              {lot.name} - {lot.address}
              <br />
              Free Spaces: {lot.free}/{lot.total}
            </Popup>
          </Marker>
        ))}





          </MapContainer>
      </div>
  )
}

export default Map




















// import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet';



// const Map = () => {
//   const position = [51.505, -0.09]

//   render(
//     <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={position}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//     </MapContainer>,
//   )
// };

// export default Map
