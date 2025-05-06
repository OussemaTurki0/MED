"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

import BottomNav from "./BottomNav";
import EmergencyModal from "./EmergencyModal";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AIPage from "./pages/AIPage";
import BraceletHolder from "./pages/BraceletHolder";
import GPSPage from "./pages/GPSPage";
import QRPage from "./pages/QRPage";
import LoginScreen from "./pages/LoginScreen";
import SignupScreen from "./pages/SignupScreen";
import logo from "../assets/logo1.png";

function MainComponent() {
  const { t } = useTranslation();
  const [appPhase, setAppPhase] = useState("initial-loading");
  const [dotIndex, setDotIndex] = useState(0);
  const dotsArray = ["", ".", "..", "..."];
  const [activePage, setActivePage] = useState("home");
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [vitals, setVitals] = useState({ heartRate: 75, oxygenLevel: 98, temperature: 36.8 });
  const [alerts, setAlerts] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [editMode, setEditMode] = useState(false);

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
    idNumber: "99561324",
    passportNumber: "H608952",
    homeLocation: "Rue du Lac Victoria, Les Berges du Lac 2, Tunis, Tunisia"
  });

  const [medicalInfo, setMedicalInfo] = useState({
    conditions: ["Type 2 Diabetes", "Hypertension"],
    allergies: ["Penicillin", "Peanuts"],
    medications: [
      { name: "Metformin", dosage: "500mg - 2x daily" },
      { name: "Lisinopril", dosage: "10mg - 1x daily" }
    ]
  });

  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "Dr. John Smith", relation: "Primary Doctor", phone: "+1 *** *** ****" },
    { id: 2, name: "Sarah Johnson", relation: "Daughter", phone: "+1 *** *** ****" }
  ]);

  const [sosAlerts, setSosAlerts] = useState([
    { id: 1, type: "Medical Alert", date: "03/15/2025", time: "14:30", location: "Home", status: "Resolved" },
    { id: 2, type: "Fall Detected", date: "03/10/2025", time: "09:15", location: "Home", status: "Resolved" }
  ]);

  const [pairedDevices, setPairedDevices] = useState([
    { id: 1, name: "Health Monitor 2.0", status: "Connected", lastSync: "5 minutes ago", location: { lat: 36.8065, lng: 10.1815 } }
  ]);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % dotsArray.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (appPhase === "initial-loading") {
      const timeout = setTimeout(() => setAppPhase("login"), 10000);
      return () => clearTimeout(timeout);
    }
    if (appPhase === "signing-in") {
      const timeout = setTimeout(() => setAppPhase("home"), 5000);
      return () => clearTimeout(timeout);
    }
  }, [appPhase]);

  useEffect(() => {
    setAlerts([
      { id: 1, messageKey: "alerts.normalHeartRate", time: "14:30", type: "info" },
      { id: 2, messageKey: "alerts.stableOxygen", time: "14:25", type: "success" }
    ]);
  }, [i18n.language]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const refreshHeartRate = useCallback(() => {
    const newHeartRate = Math.floor(Math.random() * (85 - 65) + 65);
    setVitals(prev => ({ ...prev, heartRate: newHeartRate }));
  }, []);

  const refreshOxygenAndTemp = useCallback(() => {
    const newOxygenLevel = Math.floor(Math.random() * (100 - 95) + 95);
    const newTemperature = (Math.random() * (37.2 - 36.5) + 36.5).toFixed(1);
    setVitals(prev => ({ ...prev, oxygenLevel: newOxygenLevel, temperature: newTemperature }));
  }, []);

  useEffect(() => {
    if (activePage === "home") {
      const interval1 = setInterval(refreshHeartRate, 2000);
      const interval2 = setInterval(refreshOxygenAndTemp, 10000);
      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
      };
    }
  }, [activePage, refreshHeartRate, refreshOxygenAndTemp]);

  const handleSOS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          setCurrentLocation({ lat: latitude, lng: longitude, accuracy: pos.coords.accuracy, timestamp: new Date().toLocaleTimeString() });
          setShowEmergencyModal(true);
        },
        err => {
          setLocationError("Location access denied");
          setShowEmergencyModal(true);
        }
      );
    } else {
      setLocationError("Geolocation not supported");
      setShowEmergencyModal(true);
    }
  };

  // ✅ LOADING SCREEN
  if (appPhase === "initial-loading" || appPhase === "signing-in") {
    return (
      <div className="min-h-screen bg-[#ef4444] flex flex-col items-center justify-center text-center px-4">
        <img src={logo} alt="App Logo" className="w-32 h-32 md:w-40 md:h-40 mb-6" />

        <p className="text-xl md:text-2xl font-roboto text-white mb-4">
          Protect your loved ones with GE2.0
        </p>

        <div className="heart-rate mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="150px" height="73px" viewBox="0 0 150 73">
            <polyline
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeMiterlimit="10"
              points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
            />
          </svg>
          <div className="fade-in" />
          <div className="fade-out" />
        </div>

        <p className="text-lg font-roboto text-white/80 mb-1">Loading{dotsArray[dotIndex]}</p>
      </div>
    );
  }

  if (appPhase === "login") return <LoginScreen onLogin={() => setAppPhase("signing-in")} goToSignup={() => setAppPhase("signup")} />;
  if (appPhase === "signup") return <SignupScreen goToLogin={() => setAppPhase("login")} />;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {activePage === "home" && <HomePage vitals={vitals} alerts={alerts} pairedDevices={pairedDevices} />}
      {activePage === "settings" && (
        <ProfilePage
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          profilePhoto={profilePhoto}
          setProfilePhoto={setProfilePhoto}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
      {activePage === "bracelet" && <BraceletHolder userInfo={userInfo} medicalInfo={medicalInfo} emergencyContacts={emergencyContacts} />}
      {activePage === "gps" && (
        <GPSPage
          pairedDevices={pairedDevices}
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          locationError={locationError}
          mapRef={mapRef}
        />
      )}
      {activePage === "qr" && <QRPage pairedDevices={pairedDevices} />}
      {activePage === "ai" && <AIPage />}
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
      {showEmergencyModal && <EmergencyModal setShowEmergencyModal={setShowEmergencyModal} handleSOS={handleSOS} />}
    </div>
  );
}

export default MainComponent;
