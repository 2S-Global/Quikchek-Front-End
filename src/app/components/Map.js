'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x.src,
    iconUrl: markerIcon.src,
    shadowUrl: markerShadow.src,
});

export default function MapComponent() {
    useEffect(() => {
        const mapContainer = L.DomUtil.get('map');

        // Remove the existing map instance if any
        if (mapContainer && mapContainer._leaflet_id) {
            mapContainer._leaflet_id = null; // manually reset id
        }

        const map = L.map('map').setView([20.5937, 78.9629], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        // const locations = [
        //   { name: 'Mumbai', lat: 19.076, lng: 72.8777 },
        //   { name: 'Delhi', lat: 28.6139, lng: 77.209 },
        //   { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
        // ];

        const locations = [
            {
                name: `2S Global Technologies Limited
                108, Webel IT Park (Phase‑II),
                DH Block, Action Area 1D, New Town,
                Kolkata‑700160`, lat: 22.5887, lng: 88.4840
            },
            {
                name: `2S Global Technologies Inc.
                971 US Highway 202N STE N
                Branchburg NJ 08876
                `, lat: 40.5787, lng: -74.7096
            },
            {
                name: `2S Global Technologies UK Limited
                    27, Old Gloucester Street, London
                    WC1N 3AX, United Kingdom
                    `, lat: 51.5210, lng: -0.1216
            },
            {
                name: `2S Global Consular and Visa Facilitation Services FZC LLC
                Business Centre, Sharjah Publishing City Free Zone, Sharjah, UAE
                `, lat: 25.3191, lng: 55.4915
            },
            {
                name: `RM 1504, 15/F Kwong Fat Comm Building
                582-588 Canton Road Yau Ma Tei KLN
                Hong Kong
                `, lat: 22.3129, lng: 114.1707
            },
            {
                name: `111, Noya Paltan, 6th Floor, 
                Paltan, Dhaka-1000
                `, lat: 23.73565, lng: 90.41321
            }
        ];



        locations.forEach((loc) => {
            L.marker([loc.lat, loc.lng])
                .addTo(map)
                .bindPopup(loc.name);
        });

        // Cleanup when component unmounts
        return () => {
            map.remove();
        };
    }, []);

    return <div id="map" style={{ height: '400px', width: '100%' }} />;
}
