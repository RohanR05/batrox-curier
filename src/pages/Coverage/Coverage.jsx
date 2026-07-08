import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.6364];
  const data = useLoaderData();
  const mapRef = useRef();

  const handleSearchInput = (e) => {
    e.preventDefault();
    const location = e.target.search.value;
    const district = data.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase()),
    );
    if (district) {
      const coor = [district.latitude, district.longitude];
      mapRef.current.flyTo(coor, 12);
    }
  };
  return (
    <div className="m-2 md:m-0">
      <h2 className="text-2xl font-medium my-4">
        We are available in 64 district
      </h2>
      <form onSubmit={handleSearchInput} className="input mb-4">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          className="grow"
          placeholder="Search"
          name="search"
        />
        <input type="submit"  className=""/>
        <h1 className="text-3xl">hii</h1>
      </form>
      <div className="w-full h-[700px] border-3 border-secondary">
        <MapContainer
          className="rounded-2xl w-full h-full"
          center={position}
          zoom={8}
          scrollWheelZoom={true}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data.map((center, index) => {
            return (
              <Marker
                key={index}
                position={[center.latitude, center.longitude]}
              >
                <Popup className="font-bold text-lg">
                  <strong>District: {center.district}</strong>
                  <p className="text-secondary text-lg">
                    Service Area:{center.covered_area.join(", ")}
                  </p>{" "}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
