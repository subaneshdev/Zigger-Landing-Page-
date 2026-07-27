import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, X, Loader2 } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { reverseGeocode } from '../lib/geo';

const DEFAULT_CENTER = { lat: 13.0827, lng: 80.2707 };

function createMarkerIcon() {
  return L.divIcon({
    className: 'location-map-marker',
    html: '<div class="location-map-marker-pin"></div>',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });
}

export default function LocationMapPicker({ open, onClose, initialLocation, onConfirm }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [picked, setPicked] = useState(null);
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    if (!open || !mapContainerRef.current) return undefined;

    const start = initialLocation || DEFAULT_CENTER;

    const map = L.map(mapContainerRef.current, {
      center: [start.lat, start.lng],
      zoom: initialLocation ? 14 : 11,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([start.lat, start.lng], {
      draggable: true,
      icon: createMarkerIcon(),
    }).addTo(map);

    const updatePicked = async (lat, lng) => {
      setPicked({ lat, lng, label: `${lat.toFixed(5)}, ${lng.toFixed(5)}` });
      setResolving(true);
      try {
        const resolved = await reverseGeocode(lat, lng);
        if (resolved) setPicked(resolved);
      } finally {
        setResolving(false);
      }
    };

    updatePicked(start.lat, start.lng);

    marker.on('dragend', () => {
      const { lat, lng } = marker.getLatLng();
      updatePicked(lat, lng);
    });

    map.on('click', (event) => {
      marker.setLatLng(event.latlng);
      updatePicked(event.latlng.lat, event.latlng.lng);
    });

    mapRef.current = map;
    markerRef.current = marker;

    const resizeTimer = setTimeout(() => map.invalidateSize(), 120);

    return () => {
      clearTimeout(resizeTimer);
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [open, initialLocation]);

  if (!open) return null;

  const handleConfirm = () => {
    if (picked) onConfirm(picked);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(13,10,8,0.55)',
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '640px',
          background: '#fff',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-strong)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(61,43,31,0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} color="var(--color-gold)" />
            <h3 style={{ fontSize: '18px', margin: 0 }}>Pick location on map</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close map picker"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid rgba(61,43,31,0.12)',
              background: 'var(--color-linen)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div ref={mapContainerRef} style={{ height: '360px', width: '100%' }} />

        <div style={{ padding: '16px 20px 20px' }}>
          <p style={{ fontSize: '13px', color: 'var(--color-muted)', marginBottom: '8px' }}>
            Tap the map or drag the pin to choose your area.
          </p>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-espresso)',
              marginBottom: '16px',
              minHeight: '42px',
              lineHeight: 1.5,
            }}
          >
            {resolving ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Loader2 size={16} className="spin" /> Resolving address...
              </span>
            ) : (
              picked?.label || 'Select a point on the map'
            )}
          </p>

          <button
            type="button"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={!picked || resolving}
            onClick={handleConfirm}
          >
            Use this location
          </button>
        </div>
      </motion.div>

      <style>{`
        .location-map-marker { background: transparent; border: none; }
        .location-map-marker-pin {
          width: 28px;
          height: 28px;
          border-radius: 50% 50% 50% 0;
          background: var(--color-gold);
          transform: rotate(-45deg);
          border: 3px solid #fff;
          box-shadow: 0 4px 12px rgba(61,43,31,0.25);
        }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </motion.div>
  );
}
