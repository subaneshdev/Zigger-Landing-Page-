import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Loader2, Search } from 'lucide-react';
import { geocodeLocation, getCurrentPosition, searchLocationSuggestions } from '../lib/geo';
import LocationMapPicker from './LocationMapPicker';

export default function LocationSearchInput({
  value,
  onChange,
  onLocationSelect,
  onSearchQuery,
  onSearchComplete,
  selectedLocation = null,
  placeholder = 'Enter location',
  disabled = false,
  layout = 'compact',
  showSubmitButton = true,
  formId,
  inputId,
  onBusyChange,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState('');
  const [showMapPicker, setShowMapPicker] = useState(false);
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = value.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      return undefined;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchLocationSuggestions(trimmed);
        setSuggestions(results);
      } catch {
        setSuggestions([]);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  const applyLocation = (location) => {
    onLocationSelect(location);
    onChange(location.label.split(',')[0].trim() || location.label);
    onSearchQuery?.(location.label.split(',')[0].trim() || location.label);
    setShowSuggestions(false);
    setSuggestions([]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearching(true);
    setError('');
    setShowSuggestions(false);
    onSearchQuery?.(value.trim());

    try {
      const result = await geocodeLocation(value);
      if (!result) {
        setError('Location not found. Showing name matches if available.');
        return;
      }
      applyLocation(result);
      onSearchComplete?.(result);
    } catch {
      setError('Could not search that location.');
    } finally {
      setSearching(false);
    }
  };

  const handleUseMyLocation = async () => {
    setLocating(true);
    setError('');
    setShowSuggestions(false);

    try {
      const result = await getCurrentPosition();
      applyLocation(result);
      onChange('Current location');
    } catch {
      setError('Enable location access or enter an area manually.');
    } finally {
      setLocating(false);
    }
  };

  const handleOpenMapPicker = () => {
    setShowSuggestions(false);
    setShowMapPicker(true);
  };

  const busy = disabled || searching || locating;

  useEffect(() => {
    onBusyChange?.(busy);
  }, [busy, onBusyChange]);

  const rowClass = layout === 'compact'
    ? 'location-search-row location-search-row--compact'
    : layout === 'input-only'
      ? 'location-search-row location-search-row--input-only'
      : 'location-search-row';

  return (
    <div ref={wrapperRef}>
      <form id={formId} onSubmit={handleSubmit} style={{ marginBottom: error ? '12px' : 0 }}>
        <div className={rowClass}>
          <div className="location-search-input-wrap">
            <MapPin size={18} className="location-search-icon" />
            <input
              id={inputId}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder={placeholder}
              disabled={busy}
              autoComplete="off"
              className="location-search-input"
            />

            {showSuggestions && (
              <ul className="location-suggestions">
                <li>
                  <button
                    type="button"
                    className="location-suggestion-item location-suggestion-action"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleUseMyLocation}
                    disabled={busy}
                  >
                    {locating ? <Loader2 size={16} className="spin" /> : <Navigation size={16} />}
                    <span>Use current location</span>
                  </button>
                </li>

                {suggestions.length > 0 && <li className="location-suggestions-divider" aria-hidden="true" />}

                {suggestions.map((item) => (
                  <li key={`${item.lat}-${item.lng}-${item.label}`}>
                    <button
                      type="button"
                      className="location-suggestion-item"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => applyLocation(item)}
                    >
                      <MapPin size={14} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}

                <li className="location-suggestions-divider" aria-hidden="true" />

                <li>
                  <button
                    type="button"
                    className="location-suggestion-item location-suggestion-action"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleOpenMapPicker}
                    disabled={busy}
                  >
                    <MapPin size={16} />
                    <span>Choose from map</span>
                  </button>
                </li>
              </ul>
            )}
          </div>

          {showSubmitButton && (
            <button type="submit" disabled={busy} className="btn-primary location-search-submit">
              {searching ? <Loader2 size={16} className="spin" /> : <Search size={16} />}
              <span>Search</span>
            </button>
          )}
        </div>
      </form>

      {error && <p className="location-search-error">{error}</p>}

      <LocationMapPicker
        open={showMapPicker}
        onClose={() => setShowMapPicker(false)}
        initialLocation={selectedLocation}
        onConfirm={applyLocation}
      />

      <style>{`
        .location-search-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .location-search-row--compact {
          flex-wrap: nowrap;
        }
        .location-search-row--input-only {
          flex-wrap: nowrap;
        }
        .location-search-row--input-only .location-search-input-wrap {
          flex: 1 1 100%;
        }
        .location-search-input-wrap {
          position: relative;
          flex: 1 1 240px;
          min-width: 0;
        }
        .location-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-muted);
          pointer-events: none;
          z-index: 1;
        }
        .location-search-input {
          width: 100%;
          padding: 12px 14px 12px 40px;
          border-radius: 100px;
          border: 1.5px solid rgba(61, 43, 31, 0.12);
          font-size: 15px;
          outline: none;
          background: var(--color-linen);
          height: 46px;
        }
        .location-search-input:focus {
          border-color: var(--color-gold);
        }
        .location-search-submit {
          flex-shrink: 0;
          height: 46px;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .location-suggestions {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: #fff;
          border: 1px solid rgba(61, 43, 31, 0.12);
          border-radius: 16px;
          box-shadow: var(--shadow-strong);
          max-height: 280px;
          overflow-y: auto;
          z-index: 40;
          list-style: none;
          padding: 6px;
          margin: 0;
        }
        .location-suggestions-divider {
          height: 1px;
          background: rgba(61, 43, 31, 0.08);
          margin: 4px 8px;
        }
        .location-suggestion-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
          padding: 10px 12px;
          border-radius: 12px;
          background: transparent;
          color: var(--color-espresso);
          font-size: 13px;
          line-height: 1.4;
        }
        .location-suggestion-action {
          font-weight: 600;
        }
        .location-suggestion-item:hover:not(:disabled) {
          background: var(--color-linen);
        }
        .location-suggestion-item:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .location-suggestion-item svg {
          flex-shrink: 0;
          color: var(--color-gold);
        }
        .location-suggestion-item:not(.location-suggestion-action) svg {
          margin-top: 2px;
          align-self: flex-start;
        }
        .location-search-error {
          font-size: 14px;
          color: var(--color-espresso);
          background: rgba(196,160,82,0.15);
          padding: 12px;
          border-radius: 12px;
          margin-top: 12px;
        }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .location-search-row--compact {
            flex-wrap: wrap;
          }
          .location-search-submit span {
            display: none;
          }
          .location-search-submit {
            padding: 0 14px;
          }
        }
      `}</style>
    </div>
  );
}
