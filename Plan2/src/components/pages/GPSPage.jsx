import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function GPSPage({
  pairedDevices,
  currentLocation,
  setCurrentLocation,
  locationError,
  mapRef,
}) {
  const { t } = useTranslation();
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (navigator.geolocation && !currentLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setCurrentLocation({
            lat: latitude,
            lng: longitude,
            accuracy,
            timestamp: new Date().toLocaleTimeString(),
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [currentLocation, setCurrentLocation]);

  useEffect(() => {
    if (currentLocation && mapRef.current && !map) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=places`;
      script.async = true;
      script.onload = () => {
        const newMap = new window.google.maps.Map(mapRef.current, {
          center: { lat: currentLocation.lat, lng: currentLocation.lng },
          zoom: 15,
          styles: [
            { featureType: "all", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#E3F2FD" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#FAFAFA" }] },
          ],
        });

        const newMarker = new window.google.maps.Marker({
          position: { lat: currentLocation.lat, lng: currentLocation.lng },
          map: newMap,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#dc2626",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });

        setMap(newMap);
        setMarker(newMarker);
      };

      document.head.appendChild(script);
    }
  }, [currentLocation, map, mapRef]);

  useEffect(() => {
    if (map && marker && currentLocation) {
      const newPosition = {
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      };
      marker.setPosition(newPosition);
      map.panTo(newPosition);
    }
  }, [currentLocation, map, marker]);

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-[#dc2626] font-roboto mb-6">
          {t("gpsTracking")}
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              {t("realTimeLocation")}
            </h3>

            {locationError ? (
              <div className="text-red-600 text-center p-4 bg-red-50 rounded-lg">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {locationError}
              </div>
            ) : currentLocation ? (
              <div className="space-y-4">
                <div
                  ref={mapRef}
                  className="aspect-video w-full rounded-lg overflow-hidden"
                  style={{ height: "400px" }}
                ></div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">{t("latitude")}</p>
                      <p className="font-medium">
                        {currentLocation.lat.toFixed(6)}°
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("longitude")}</p>
                      <p className="font-medium">
                        {currentLocation.lng.toFixed(6)}°
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("accuracy")}</p>
                      <p className="font-medium">
                        ±{Math.round(currentLocation.accuracy)}m
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("lastUpdate")}</p>
                      <p className="font-medium">
                        {currentLocation.timestamp}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <a
                    href={`https://www.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#dc2626] hover:text-red-700 flex items-center gap-2"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    <span>{t("openInGoogleMaps")}</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <div className="animate-spin text-[#dc2626] text-3xl mb-4">
                  <i className="fas fa-circle-notch"></i>
                </div>
                <p className="text-gray-600">{t("gettingLocation")}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("connectedDevices")}
            </h3>
            <div className="space-y-4">
              {pairedDevices.map((device) => (
                <div key={device.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{device.name}</h4>
                      <p className="text-sm text-gray-600">
                        {t("lastPosition")}: {device.location.lat.toFixed(4)},{" "}
                        {device.location.lng.toFixed(4)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t("lastSync")}: {device.lastSync}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="text-[#dc2626] hover:text-red-700">
                        <i className="fas fa-location-arrow"></i>
                      </button>
                      <span className="text-sm text-green-600">
                        {t("connected")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GPSPage;
