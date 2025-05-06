"use client";
import React, { useState } from "react";
import HealthOverview from "./components/HealthOverview";
import EmergencyModal from "./components/EmergencyModal";
import BraceletHolder from "./components/BraceletHolder";
import SOSPage from "./components/SOSPage";
import GPSPage from "./components/GPSPage";
import QRPage from "./components/QRPage";
import ProfilePage from "./components/ProfilePage";
import BottomNav from "./components/BottomNav";

function MainComponent() {
  const [userRole, setUserRole] = useState("patient");
  const [vitals, setVitals] = useState({ heartRate: 75, oxygenLevel: 98, temperature: 36.8 });
  const [alerts, setAlerts] = useState([
    { id: 1, message: "Fréquence cardiaque normale", time: "14:30", type: "info" },
    { id: 2, message: "Niveau d'oxygène stable", time: "14:25", type: "success" },
  ]);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [activeTab, setActiveTab] = useState("health");
  const [showProfile, setShowProfile] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showGPS, setShowGPS] = useState(false);
  const [showSOS, setShowSOS] = useState(false);
  const [showBraceletHolder, setShowBraceletHolder] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {showEmergencyModal && <EmergencyModal onClose={() => setShowEmergencyModal(false)} />}
      {showBraceletHolder ? (
        <BraceletHolder onBack={() => setShowBraceletHolder(false)} />
      ) : showSOS ? (
        <SOSPage onBack={() => setShowSOS(false)} />
      ) : showGPS ? (
        <GPSPage onBack={() => setShowGPS(false)} />
      ) : showQR ? (
        <QRPage onBack={() => setShowQR(false)} />
      ) : showProfile ? (
        <ProfilePage onBack={() => setShowProfile(false)} />
      ) : (
        <HealthOverview vitals={vitals} alerts={alerts} />
      )}
      <BottomNav
        onHome={() => {
          setShowProfile(false);
          setShowBraceletHolder(false);
          setShowGPS(false);
          setShowQR(false);
          setShowSOS(false);
        }}
        onProfile={() => setShowProfile(true)}
        onBraceletHolder={() => setShowBraceletHolder(true)}
        onGPS={() => setShowGPS(true)}
        onQR={() => setShowQR(true)}
        onSOS={() => setShowEmergencyModal(true)}
      />
    </div>
  );
}

export default MainComponent;
