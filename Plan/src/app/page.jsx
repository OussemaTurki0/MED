"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function MainComponent() {
  const [userRole, setUserRole] = useState("patient");
  const [vitals, setVitals] = useState({
    heartRate: 75,
    oxygenLevel: 98,
    temperature: 36.8,
  });
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      message: "Normal heart rate",
      time: "14:30",
      type: "info",
    },
    {
      id: 2,
      message: "Stable oxygen level",
      time: "14:25",
      type: "success",
    },
  ]);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [activeTab, setActiveTab] = useState("health");
  const [showProfile, setShowProfile] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showGPS, setShowGPS] = useState(false);
  const [showSOS, setShowSOS] = useState(false);
  const [showBraceletHolder, setShowBraceletHolder] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingContacts, setEditingContacts] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    relation: "",
    phone: "",
  });
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: 1,
      name: "Dr. John Smith",
      relation: "Primary Doctor",
      phone: "+1 *** *** ****",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      relation: "Daughter",
      phone: "+1 *** *** ****",
    },
  ]);
  const [sosAlerts, setSosAlerts] = useState([
    {
      id: 1,
      type: "Medical Alert",
      date: "03/15/2025",
      time: "14:30",
      location: "Home",
      status: "Resolved",
    },
    {
      id: 2,
      type: "Fall Detected",
      date: "03/10/2025",
      time: "09:15",
      location: "Home",
      status: "Resolved",
    },
  ]);
  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    age: "45",
    gender: "Male",
    bloodType: "A+",
    email: "john.doe@email.com",
    phone: "+1 *** *** ****",
    language: "English",
    notifications: true,
    darkMode: false,
  });
  const [medicalInfo, setMedicalInfo] = useState({
    conditions: ["Type 2 Diabetes", "Hypertension"],
    allergies: ["Penicillin", "Peanuts"],
    medications: [
      { name: "Metformin", dosage: "500mg - 2x daily" },
      { name: "Lisinopril", dosage: "10mg - 1x daily" },
    ],
  });
  const [pairedDevices, setPairedDevices] = useState([
    {
      id: 1,
      name: "Health Monitor 2.0",
      status: "Connected",
      lastSync: "5 minutes ago",
      location: { lat: 36.8065, lng: 10.1815 },
    },
  ]);
  const [showScanner, setShowScanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());
  const [currentLocation, setCurrentLocation] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const triggerSOS = () => {
    setShowEmergencyModal(true);
  };

  const removeEmergencyContact = (id) => {
    setEmergencyContacts(
      emergencyContacts.filter((contact) => contact.id !== id)
    );
  };

  const addEmergencyContact = () => {
    if (newContact.name && newContact.phone) {
      setEmergencyContacts([
        ...emergencyContacts,
        {
          id: Date.now(),
          ...newContact,
        },
      ]);
      setNewContact({ name: "", relation: "", phone: "" });
      setShowAddContactModal(false);
    }
  };

  // Update refreshVitals to include smooth transitions
  const refreshHeartRate = useCallback(() => {
    const newHeartRate = Math.floor(Math.random() * (85 - 65) + 65);
    setVitals((prev) => ({
      ...prev,
      heartRate: prev.heartRate !== newHeartRate ? newHeartRate : prev.heartRate,
    }));
    setLastUpdate(new Date().toLocaleTimeString());
  }, []);
  
  const refreshOxygenAndTemp = useCallback(() => {
    const newOxygenLevel = Math.floor(Math.random() * (100 - 95) + 95);
    const newTemperature = (Math.random() * (37.2 - 36.5) + 36.5).toFixed(1);
  
    setVitals((prev) => ({
      ...prev,
      oxygenLevel:
        prev.oxygenLevel !== newOxygenLevel
          ? newOxygenLevel
          : prev.oxygenLevel,
      temperature:
        prev.temperature !== newTemperature
          ? newTemperature
          : prev.temperature,
    }));
    setLastUpdate(new Date().toLocaleTimeString());
  }, []);
  
  // Add auto-refresh effect
  useEffect(() => {
    if (
      !showProfile &&
      !showBraceletHolder &&
      !showGPS &&
      !showQR &&
      !showSOS
    ) {
      const heartRateInterval = setInterval(refreshHeartRate, 3000); // every 3s
      const oxygenTempInterval = setInterval(refreshOxygenAndTemp, 10000); // every 15s
  
      return () => {
        clearInterval(heartRateInterval);
        clearInterval(oxygenTempInterval);
      };
    }
  }, [
    showProfile,
    showBraceletHolder,
    showGPS,
    showQR,
    showSOS,
    refreshHeartRate,
    refreshOxygenAndTemp,
  ]);
  
  useEffect(() => {
    if (showGPS && currentLocation && !map) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=places`;
      script.async = true;
      script.onload = () => {
        const newMap = new window.google.maps.Map(mapRef.current, {
          center: { lat: currentLocation.lat, lng: currentLocation.lng },
          zoom: 15,
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#E3F2FD" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#FAFAFA" }],
            },
          ],
        });
        setMap(newMap);

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
        setMarker(newMarker);
      };
      document.head.appendChild(script);
    }
  }, [showGPS, currentLocation, map]);

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

  const handleProfileSave = useCallback(() => {
    const confirmed = window.confirm("Do you want to save these changes?");
    if (confirmed) {
      setEditMode(false);
      alert("Changes saved successfully!");
    }
  }, []);

  const handleSOS = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setShowEmergencyModal(true);
          // Store location for emergency
          console.log(`Emergency location: ${latitude}, ${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          setShowEmergencyModal(true);
        }
      );
    } else {
      setShowEmergencyModal(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-20">
        {showBraceletHolder ? (
          <div className="p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#dc2626] font-roboto mb-6 flex items-center gap-2">
                <i className="fas fa-id-card"></i>
                Wearer Information
              </h2>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg border-b pb-2">
                        Personal Information
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center justify-center relative mb-6">
                          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                            {profilePhoto ? (
                              <img
                                src={profilePhoto}
                                alt="ID Photo"
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <i className="fas fa-user text-3xl text-gray-400"></i>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">First Name</p>
                            <p className="font-medium">{userInfo.firstName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Last Name</p>
                            <p className="font-medium">{userInfo.lastName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Age</p>
                            <p className="font-medium">{userInfo.age} years</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Gender</p>
                            <p className="font-medium">{userInfo.gender}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Blood Type</p>
                            <p className="font-medium">{userInfo.bloodType}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg border-b pb-2">
                        Medical Information
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            Medical Conditions
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {medicalInfo.conditions.map((condition, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-red-50 text-[#dc2626] rounded-full text-sm"
                              >
                                {condition}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Allergies</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {medicalInfo.allergies.map((allergy, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-red-50 text-[#dc2626] rounded-full text-sm"
                              >
                                {allergy}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Medications</p>
                          <div className="mt-2 space-y-2">
                            {medicalInfo.medications.map((med, index) => (
                              <div
                                key={index}
                                className="p-3 bg-gray-50 rounded-lg"
                              >
                                <p className="font-medium">{med.name}</p>
                                <p className="text-sm text-gray-600">
                                  {med.dosage}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg border-b pb-2 mb-4">
                    Emergency Contacts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {emergencyContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-gray-600">
                          {contact.relation}
                        </p>
                        <p className="text-sm text-gray-600">{contact.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : showSOS ? (
          <div className="p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#dc2626] font-roboto mb-6 flex items-center gap-2">
                <i className="fas fa-exclamation-triangle"></i>
                SOS & Emergency
              </h2>
              <div className="space-y-8">
                <div className="text-center">
                  <button
                    onClick={() => setShowEmergencyModal(true)}
                    className="bg-[#dc2626] text-white text-xl font-bold rounded-full w-32 h-32 shadow-lg hover:bg-red-700 transition-colors flex flex-col items-center justify-center"
                  >
                    <i className="fas fa-exclamation-triangle text-3xl mb-2"></i>
                    SOS
                  </button>
                  <p className="text-sm text-gray-500 mt-4">
                    Appuyez pour déclencher une alerte d'urgence
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b pb-2">
                    Recent Alerts
                  </h3>
                  <div className="space-y-3">
                    {sosAlerts.map((alert) => (
                      <div key={alert.id} className="bg-red-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{alert.type}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {alert.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              {alert.date}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {alert.time}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 text-sm">
                          <p className="text-gray-600">
                            Status: {alert.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">
                      Emergency Contacts
                    </h3>
                    <button
                      onClick={() => setEditingContacts(!editingContacts)}
                      className="text-[#dc2626] hover:text-red-700"
                    >
                      <i
                        className={`fas ${
                          editingContacts ? "fa-save" : "fa-edit"
                        } text-xl`}
                      ></i>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {emergencyContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-600">
                            {contact.relation}
                          </p>
                          <p className="text-sm text-gray-600">
                            {contact.phone}
                          </p>
                        </div>
                        {editingContacts && (
                          <button
                            onClick={() => removeEmergencyContact(contact.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        )}
                      </div>
                    ))}
                    {editingContacts && (
                      <button
                        onClick={() => setShowAddContactModal(true)}
                        className="w-full bg-red-50 text-[#dc2626] py-3 rounded-lg flex items-center justify-center gap-2"
                      >
                        <i className="fas fa-plus"></i>
                        <span>Add a contact</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {showAddContactModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h3 className="text-xl font-bold mb-4">Add a Contact</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="w-full mt-1 p-2 border rounded"
                        value={newContact.name}
                        onChange={(e) =>
                          setNewContact({ ...newContact, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Relation</label>
                      <input
                        type="text"
                        name="relation"
                        className="w-full mt-1 p-2 border rounded"
                        value={newContact.relation}
                        onChange={(e) =>
                          setNewContact({
                            ...newContact,
                            relation: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full mt-1 p-2 border rounded"
                        value={newContact.phone}
                        onChange={(e) =>
                          setNewContact({
                            ...newContact,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => setShowAddContactModal(false)}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addEmergencyContact}
                      className="px-4 py-2 bg-[#dc2626] text-white rounded hover:bg-red-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : showGPS ? (
          <div className="p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#dc2626] font-roboto mb-6">
                GPS Tracking
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    Real-time Location
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
                            <p className="text-sm text-gray-600">Latitude</p>
                            <p className="font-medium">
                              {currentLocation.lat.toFixed(6)}°
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Longitude</p>
                            <p className="font-medium">
                              {currentLocation.lng.toFixed(6)}°
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Accuracy</p>
                            <p className="font-medium">
                              ±{Math.round(currentLocation.accuracy)}m
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Last Update</p>
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
                          <span>Open in Google Maps</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <div className="animate-spin text-[#dc2626] text-3xl mb-4">
                        <i className="fas fa-circle-notch"></i>
                      </div>
                      <p className="text-gray-600">Getting your location...</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Connected Devices
                  </h3>
                  <div className="space-y-4">
                    {pairedDevices.map((device) => (
                      <div
                        key={device.id}
                        className="bg-gray-50 p-4 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{device.name}</h4>
                            <p className="text-sm text-gray-600">
                              Last position: {device.location.lat.toFixed(4)},{" "}
                              {device.location.lng.toFixed(4)}
                            </p>
                            <p className="text-sm text-gray-600">
                              Last sync: {device.lastSync}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <button className="text-[#dc2626] hover:text-red-700">
                              <i className="fas fa-location-arrow"></i>
                            </button>
                            <span className="text-sm text-green-600">
                              {device.status}
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
        ) : showQR ? (
          <div className="p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#dc2626] font-roboto mb-6">
                QR Scanner & Devices
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Scan a QR Code</h3>
                  {showScanner ? (
                    <div className="aspect-square w-full max-w-md mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <i className="fas fa-camera text-4xl text-gray-400 mb-2"></i>
                        <p className="text-sm text-gray-500">
                          Camera is activating...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowScanner(true)}
                      className="w-full bg-[#dc2626] text-white py-3 rounded-lg flex items-center justify-center gap-2"
                    >
                      <i className="fas fa-qrcode"></i>
                      <span>Scan a new device</span>
                    </button>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Associated Devices
                  </h3>
                  <div className="space-y-4">
                    {pairedDevices.map((device) => (
                      <div
                        key={device.id}
                        className="bg-gray-50 p-4 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{device.name}</h4>
                            <p className="text-sm text-gray-600">
                              Last sync: {device.lastSync}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-green-600">
                              {device.status}
                            </span>
                            <button className="text-gray-400 hover:text-gray-600">
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : showProfile ? (
          <div className="p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#dc2626] font-roboto">
                  My Profile
                </h2>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="text-[#dc2626] hover:text-red-700"
                >
                  <i
                    className={`fas ${
                      editMode ? "fa-save" : "fa-edit"
                    } text-xl`}
                  ></i>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-center mb-6 relative">
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center relative group">
                      {profilePhoto ? (
                        <img
                          src={profilePhoto}
                          alt="Profile Photo"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <i className="fas fa-user text-3xl text-gray-400"></i>
                      )}
                      {editMode && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <label className="cursor-pointer text-white">
                            <i className="fas fa-camera text-xl"></i>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  setProfilePhoto(
                                    URL.createObjectURL(e.target.files[0])
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-base border-b pb-2">
                      Personal Information
                    </h3>
                    {editMode ? (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-600">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={userInfo.firstName}
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                firstName: e.target.value,
                              })
                            }
                            className="w-full mt-1 p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={userInfo.lastName}
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                lastName: e.target.value,
                              })
                            }
                            className="w-full mt-1 p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                email: e.target.value,
                              })
                            }
                            className="w-full mt-1 p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={userInfo.phone}
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                phone: e.target.value,
                              })
                            }
                            className="w-full mt-1 p-2 border rounded"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-gray-600 text-sm">
                          Name: {userInfo.firstName} {userInfo.lastName}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Email: {userInfo.email}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Phone: {userInfo.phone}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-base border-b pb-2">
                      Account Settings
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Language</span>
                        <select
                          disabled={!editMode}
                          value={userInfo.language}
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              language: e.target.value,
                            })
                          }
                          className="p-1 border rounded"
                        >
                          <option value="English">English</option>
                          <option value="Français">Français</option>
                          <option value="العربية">العربية</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Notifications
                        </span>
                        <button
                          onClick={() =>
                            editMode &&
                            setUserInfo({
                              ...userInfo,
                              notifications: !userInfo.notifications,
                            })
                          }
                          className={`w-12 h-6 rounded-full ${
                            userInfo.notifications
                              ? "bg-green-500"
                              : "bg-gray-300"
                          } 
                            relative transition-colors duration-200 ${
                              !editMode && "opacity-50 cursor-not-allowed"
                            }`}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200
                            ${userInfo.notifications ? "right-1" : "left-1"}`}
                          ></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-base border-b pb-2">
                      Security
                    </h3>
                    <div className="space-y-3">
                      <button
                        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded flex items-center justify-between"
                        disabled={!editMode}
                      >
                        <span className="text-sm">Change password</span>
                        <i className="fas fa-chevron-right text-xs"></i>
                      </button>
                      <button
                        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded flex items-center justify-between"
                        disabled={!editMode}
                      >
                        <span className="text-sm">
                          Two-factor authentication
                        </span>
                        <i className="fas fa-chevron-right text-xs"></i>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-base border-b pb-2">
                      Data Management
                    </h3>
                    <div className="space-y-3">
                      <button
                        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded flex items-center justify-between"
                        disabled={!editMode}
                      >
                        <span className="text-sm">Export data</span>
                        <i className="fas fa-download text-xs"></i>
                      </button>
                      <button
                        className="w-full bg-red-50 text-red-600 py-2 px-4 rounded flex items-center justify-between"
                        disabled={!editMode}
                      >
                        <span className="text-sm">Delete account</span>
                        <i className="fas fa-trash text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {editMode && (
                <div className="mt-6">
                  <button
                    onClick={handleProfileSave}
                    className="w-full bg-[#dc2626] text-white py-2 rounded-lg hover:bg-red-700"
                  >
                    Save changes
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <main className="container mx-auto px-4 py-8">
            <div className="text-xl font-bold text-[#dc2626] font-roboto mb-6 text-center flex items-center justify-center gap-2">
              <i className="fas fa-heartbeat"></i>
              Health Monitor 2.0
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg mb-4">Quick Access</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => setShowQR(true)}
                    className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                  >
                    <i className="fas fa-qrcode text-[#dc2626] text-2xl mb-2"></i>
                    <span className="text-sm">Scan QR</span>
                  </button>
                  <button
                    onClick={() => setShowGPS(true)}
                    className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                  >
                    <i className="fas fa-map-marker-alt text-[#dc2626] text-2xl mb-2"></i>
                    <span className="text-sm">GPS Tracking</span>
                  </button>
                  <button
                    onClick={triggerSOS}
                    className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                  >
                    <i className="fas fa-exclamation-triangle text-[#dc2626] text-2xl mb-2"></i>
                    <span className="text-sm">SOS Alert</span>
                  </button>
                  <button
                    onClick={() => setShowBraceletHolder(true)}
                    className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                  >
                    <i className="fas fa-id-card text-[#dc2626] text-2xl mb-2"></i>
                    <span className="text-sm">Wearer Info</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold font-roboto text-gray-800">
                    Health Overview
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <i className="fas fa-circle text-green-500 animate-pulse text-[6px]"></i>
                      Live monitoring
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg relative overflow-hidden group">
                    <div className="flex items-center justify-between relative z-10">
                      <i className="fas fa-heartbeat text-[#dc2626] text-xl animate-pulse"></i>
                      <span className="text-base font-semibold text-gray-800 transition-transform duration-300 transform">
                        {vitals.heartRate} BPM
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 relative z-10">
                      Heart Rate
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg relative overflow-hidden group">
                    <div className="flex items-center justify-between relative z-10">
                      <i className="fas fa-lungs text-[#dc2626] text-xl"></i>
                      <span className="text-base font-semibold text-gray-800 transition-transform duration-300 transform">
                        {vitals.oxygenLevel}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 relative z-10">
                      Oxygen Level
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg relative overflow-hidden group">
                    <div className="flex items-center justify-between relative z-10">
                      <i className="fas fa-thermometer-half text-[#dc2626] text-xl"></i>
                      <span className="text-base font-semibold text-gray-800 transition-transform duration-300 transform">
                        {vitals.temperature}°C
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 relative z-10">
                      Temperature
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-base mb-3">
                    Recent Alerts
                  </h3>
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-3 rounded-lg flex items-center justify-between transform hover:translate-x-2 transition-transform duration-200
                        ${
                          alert.type === "info" ? "bg-blue-50" : "bg-green-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <i
                            className={`fas ${
                              alert.type === "info"
                                ? "fa-info-circle text-blue-500"
                                : "fa-check-circle text-green-500"
                            }`}
                          ></i>
                          <span className="text-sm">{alert.message}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {alert.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold font-roboto text-gray-800">
                    Real-time Updates
                  </h2>
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <i className="fas fa-circle animate-pulse"></i>
                    Connected
                  </span>
                </div>
                <div className="space-y-4">
                  {pairedDevices.map((device) => (
                    <div
                      key={device.id}
                      className="bg-gray-50 p-4 rounded-lg transform hover:scale-102 transition-transform duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{device.name}</h4>
                          <p className="text-sm text-gray-600">
                            Last update: {device.lastSync}
                          </p>
                        </div>
                        <span className="text-sm text-green-600 flex items-center gap-1">
                          <i className="fas fa-circle text-xs animate-pulse"></i>
                          {device.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {showEmergencyModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full transform scale-100 animate-bounce-once">
                  <div className="text-center mb-4">
                    <i className="fas fa-exclamation-triangle text-4xl text-red-600"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-red-600 text-center">
                    Emergency Alert
                  </h3>
                  <p className="mb-4 text-center">
                    Are you sure you want to trigger an SOS alert?
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setShowEmergencyModal(false)}
                      className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSOS}
                      className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
                    >
                      <i className="fas fa-exclamation-circle"></i>
                      Confirm SOS
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        )}
      </div>

      {/* Bottom Navigation - Always visible */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#dc2626] p-4 shadow-lg">
        <div className="flex items-center justify-between container mx-auto">
          <button
            onClick={() => {
              setShowProfile(false);
              setShowBraceletHolder(false);
              setShowGPS(false);
              setShowQR(false);
              setShowSOS(false);
            }}
            className={`text-white flex flex-col items-center ${
              !showProfile &&
              !showBraceletHolder &&
              !showGPS &&
              !showQR &&
              !showSOS
                ? "opacity-100"
                : "opacity-70"
            } hover:opacity-100 transform hover:scale-110 transition-transform duration-200`}
          >
            <i className="fas fa-home text-xl"></i>
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => {
              setShowProfile(true);
              setShowBraceletHolder(false);
              setShowGPS(false);
              setShowQR(false);
              setShowSOS(false);
            }}
            className={`text-white flex flex-col items-center ${
              showProfile ? "opacity-100" : "opacity-70"
            } hover:opacity-100`}
          >
            <i className="fas fa-user text-xl"></i>
            <span className="text-xs mt-1">Profile</span>
          </button>
          <button
            onClick={() => {
              setShowProfile(false);
              setShowBraceletHolder(true);
              setShowGPS(false);
              setShowQR(false);
              setShowSOS(false);
            }}
            className={`text-white flex flex-col items-center ${
              showBraceletHolder ? "opacity-100" : "opacity-70"
            } hover:opacity-100`}
          >
            <i className="fas fa-id-card text-xl"></i>
            <span className="text-xs mt-1">Wearer</span>
          </button>
          <button
            onClick={() => {
              setShowProfile(false);
              setShowBraceletHolder(false);
              setShowGPS(true);
              setShowQR(false);
              setShowSOS(false);
            }}
            className={`text-white flex flex-col items-center ${
              showGPS ? "opacity-100" : "opacity-70"
            } hover:opacity-100`}
          >
            <i className="fas fa-map-marker-alt text-xl"></i>
            <span className="text-xs mt-1">GPS</span>
          </button>
          <button
            onClick={() => {
              setShowProfile(false);
              setShowBraceletHolder(false);
              setShowGPS(false);
              setShowQR(true);
              setShowSOS(false);
            }}
            className={`text-white flex flex-col items-center ${
              showQR ? "opacity-100" : "opacity-70"
            } hover:opacity-100`}
          >
            <i className="fas fa-qrcode text-xl"></i>
            <span className="text-xs mt-1">QR</span>
          </button>
          <button
            onClick={() => {
              setShowProfile(false);
              setShowBraceletHolder(false);
              setShowGPS(false);
              setShowQR(false);
              setShowSOS(true);
            }}
            className={`text-white flex flex-col items-center ${
              showSOS ? "opacity-100" : "opacity-70"
            } hover:opacity-100`}
          >
            <i className="fas fa-exclamation-triangle text-xl"></i>
            <span className="text-xs mt-1">SOS</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default MainComponent;