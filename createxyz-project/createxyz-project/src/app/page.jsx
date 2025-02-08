"use client";
import React from "react";

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
      message: "Fréquence cardiaque normale",
      time: "14:30",
      type: "info",
    },
    {
      id: 2,
      message: "Niveau d'oxygène stable",
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
      name: "Dr. Ahmed Ben Salem",
      relation: "Médecin traitant",
      phone: "+216 ** *** ***",
    },
    {
      id: 2,
      name: "Sarah Zayani",
      relation: "Fille",
      phone: "+216 ** *** ***",
    },
  ]);
  const [sosAlerts, setSosAlerts] = useState([
    {
      id: 1,
      type: "Alerte Médicale",
      date: "15/03/2025",
      time: "14:30",
      location: "Ariana, Tunisie",
      status: "Résolu",
    },
    {
      id: 2,
      type: "Chute Détectée",
      date: "10/03/2025",
      time: "09:15",
      location: "Domicile",
      status: "Résolu",
    },
  ]);
  const [userInfo, setUserInfo] = useState({
    firstName: "Mahdi",
    lastName: "Zayani",
    age: "45",
    gender: "Male",
    bloodType: "A+",
    email: "mahdi.zayani@email.com",
    phone: "+216 ** *** ***",
    language: "Français",
    notifications: true,
    darkMode: false,
  });
  const [medicalInfo, setMedicalInfo] = useState({
    conditions: ["Diabète Type 2", "Hypertension"],
    allergies: ["Pénicilline", "Arachides"],
    medications: [
      { name: "Metformine", dosage: "500mg - 2x par jour" },
      { name: "Lisinopril", dosage: "10mg - 1x par jour" },
    ],
  });
  const [pairedDevices, setPairedDevices] = useState([
    {
      id: 1,
      name: "Bracelet GE.2.0",
      status: "Connecté",
      lastSync: "Il y a 5 minutes",
      location: { lat: 36.8065, lng: 10.1815 },
    },
  ]);
  const [showScanner, setShowScanner] = useState(false);
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

  if (showBraceletHolder) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#dc2626] font-roboto mb-6 flex items-center gap-2">
            <i className="fas fa-id-card"></i>
            Information du Porteur
          </h2>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg border-b pb-2">
                    Informations Personnelles
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-center relative mb-6">
                      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                        {profilePhoto ? (
                          <img
                            src={profilePhoto}
                            alt="Photo d'identification"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <i className="fas fa-user text-3xl text-gray-400"></i>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Prénom</p>
                        <p className="font-medium">{userInfo.firstName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Nom</p>
                        <p className="font-medium">{userInfo.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Âge</p>
                        <p className="font-medium">{userInfo.age} ans</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Genre</p>
                        <p className="font-medium">{userInfo.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Groupe Sanguin</p>
                        <p className="font-medium">{userInfo.bloodType}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg border-b pb-2">
                    Informations Médicales
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        Conditions Médicales
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
                      <p className="text-sm text-gray-600">Médicaments</p>
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
                Contacts d'Urgence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyContacts.map((contact) => (
                  <div key={contact.id} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.relation}</p>
                    <p className="text-sm text-gray-600">{contact.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowBraceletHolder(false)}
            className="w-full bg-[#dc2626] text-white py-2 rounded-lg mt-6"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  if (showSOS) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#dc2626] font-roboto mb-6 flex items-center gap-2">
            <i className="fas fa-exclamation-triangle"></i>
            SOS & Urgences
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
                Dernières Alertes
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
                        <p className="text-xs text-gray-500">{alert.date}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {alert.time}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <p className="text-gray-600">Statut: {alert.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Contacts d'Urgence</h3>
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
                      <p className="text-sm text-gray-600">{contact.phone}</p>
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
                    <span>Ajouter un contact</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSOS(false)}
            className="w-full bg-[#dc2626] text-white py-2 rounded-lg mt-6"
          >
            Retour
          </button>
        </div>

        {showAddContactModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Ajouter un Contact</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Nom</label>
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
                      setNewContact({ ...newContact, relation: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full mt-1 p-2 border rounded"
                    value={newContact.phone}
                    onChange={(e) =>
                      setNewContact({ ...newContact, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowAddContactModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button
                  onClick={addEmergencyContact}
                  className="px-4 py-2 bg-[#dc2626] text-white rounded hover:bg-red-700"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (showGPS) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#dc2626] font-roboto mb-6">
            Localisation GPS
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                Suivi en temps réel
              </h3>
              <div className="aspect-video w-full bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-map-marker-alt text-4xl text-gray-400 mb-2"></i>
                  <p className="text-sm text-gray-500">
                    Carte en cours de chargement...
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Appareils GPS connectés
              </h3>
              <div className="space-y-4">
                {pairedDevices.map((device) => (
                  <div key={device.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{device.name}</h4>
                        <p className="text-sm text-gray-600">
                          Dernière position: {device.location.lat.toFixed(4)},{" "}
                          {device.location.lng.toFixed(4)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Dernière mise à jour: {device.lastSync}
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

          <button
            onClick={() => setShowGPS(false)}
            className="w-full bg-[#dc2626] text-white py-2 rounded-lg mt-6 text-sm"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  if (showQR) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#dc2626] font-roboto mb-6">
            Scanner QR & Appareils
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Scanner un QR Code</h3>
              {showScanner ? (
                <div className="aspect-square w-full max-w-md mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <i className="fas fa-camera text-4xl text-gray-400 mb-2"></i>
                    <p className="text-sm text-gray-500">
                      Caméra en cours d'activation...
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowScanner(true)}
                  className="w-full bg-[#dc2626] text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <i className="fas fa-qrcode"></i>
                  <span>Scanner un nouveau dispositif</span>
                </button>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Appareils associés</h3>
              <div className="space-y-4">
                {pairedDevices.map((device) => (
                  <div key={device.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{device.name}</h4>
                        <p className="text-sm text-gray-600">
                          Dernière synchro: {device.lastSync}
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

          <button
            onClick={() => {
              setShowQR(false);
              setShowScanner(false);
            }}
            className="w-full bg-[#dc2626] text-white py-2 rounded-lg mt-6 text-sm"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  if (showProfile) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#dc2626] font-roboto">
              Mon Profil
            </h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="text-[#dc2626] hover:text-red-700"
            >
              <i
                className={`fas ${editMode ? "fa-save" : "fa-edit"} text-xl`}
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
                      alt="Photo de profil"
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
                  Informations Personnelles
                </h3>
                {editMode ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Prénom</label>
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
                      <label className="text-sm text-gray-600">Nom</label>
                      <input
                        type="text"
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, lastName: e.target.value })
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
                          setUserInfo({ ...userInfo, email: e.target.value })
                        }
                        className="w-full mt-1 p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={userInfo.phone}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, phone: e.target.value })
                        }
                        className="w-full mt-1 p-2 border rounded"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">
                      Nom: {userInfo.firstName} {userInfo.lastName}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Email: {userInfo.email}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Téléphone: {userInfo.phone}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-base border-b pb-2">
                  Paramètres du Compte
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Langue</span>
                    <select
                      disabled={!editMode}
                      value={userInfo.language}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, language: e.target.value })
                      }
                      className="p-1 border rounded"
                    >
                      <option value="Français">Français</option>
                      <option value="English">English</option>
                      <option value="العربية">العربية</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Notifications</span>
                    <button
                      onClick={() =>
                        editMode &&
                        setUserInfo({
                          ...userInfo,
                          notifications: !userInfo.notifications,
                        })
                      }
                      className={`w-12 h-6 rounded-full ${
                        userInfo.notifications ? "bg-green-500" : "bg-gray-300"
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
                  Sécurité
                </h3>
                <div className="space-y-3">
                  <button
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded flex items-center justify-between"
                    disabled={!editMode}
                  >
                    <span className="text-sm">Changer le mot de passe</span>
                    <i className="fas fa-chevron-right text-xs"></i>
                  </button>
                  <button
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded flex items-center justify-between"
                    disabled={!editMode}
                  >
                    <span className="text-sm">Vérification en deux étapes</span>
                    <i className="fas fa-chevron-right text-xs"></i>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-base border-b pb-2">
                  Gestion des données
                </h3>
                <div className="space-y-3">
                  <button
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded flex items-center justify-between"
                    disabled={!editMode}
                  >
                    <span className="text-sm">Exporter mes données</span>
                    <i className="fas fa-download text-xs"></i>
                  </button>
                  <button
                    className="w-full bg-red-50 text-red-600 py-2 px-4 rounded flex items-center justify-between"
                    disabled={!editMode}
                  >
                    <span className="text-sm">Supprimer mon compte</span>
                    <i className="fas fa-trash text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setShowProfile(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
            >
              Retour
            </button>
            {editMode && (
              <button
                onClick={() => setEditMode(false)}
                className="flex-1 bg-[#dc2626] text-white py-2 rounded-lg hover:bg-red-700"
              >
                Enregistrer les modifications
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 mb-16">
        <div className="text-xl font-bold text-[#dc2626] font-roboto mb-6 text-center flex items-center justify-center gap-2">
          <i className="fas fa-heartbeat"></i>
          GE.2.0
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold text-lg mb-4">Accès rapide</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => setShowQR(true)}
                className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100"
              >
                <i className="fas fa-qrcode text-[#dc2626] text-2xl mb-2"></i>
                <span className="text-sm">Scanner QR</span>
              </button>
              <button
                onClick={() => setShowGPS(true)}
                className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100"
              >
                <i className="fas fa-map-marker-alt text-[#dc2626] text-2xl mb-2"></i>
                <span className="text-sm">Suivi GPS</span>
              </button>
              <button
                onClick={triggerSOS}
                className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100"
              >
                <i className="fas fa-exclamation-triangle text-[#dc2626] text-2xl mb-2"></i>
                <span className="text-sm">Alerte SOS</span>
              </button>
              <button
                onClick={() => setShowBraceletHolder(true)}
                className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100"
              >
                <i className="fas fa-id-card text-[#dc2626] text-2xl mb-2"></i>
                <span className="text-sm">Info Porteur</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold font-roboto text-gray-800">
                Vue d'ensemble de la santé
              </h2>
              <button className="text-sm text-[#dc2626] hover:text-red-700">
                <i className="fas fa-sync-alt mr-1"></i>
                Actualiser
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <i className="fas fa-heartbeat text-[#dc2626] text-xl"></i>
                  <span className="text-base font-semibold text-gray-800">
                    {vitals.heartRate} BPM
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">Rythme Cardiaque</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <i className="fas fa-lungs text-[#dc2626] text-xl"></i>
                  <span className="text-base font-semibold text-gray-800">
                    {vitals.oxygenLevel}%
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">Niveau d'Oxygène</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <i className="fas fa-thermometer-half text-[#dc2626] text-xl"></i>
                  <span className="text-base font-semibold text-gray-800">
                    {vitals.temperature}°C
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">Température</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-base mb-3">Alertes récentes</h3>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg flex items-center justify-between
                    ${alert.type === "info" ? "bg-blue-50" : "bg-green-50"}`}
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
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold font-roboto text-gray-800">
                Mises à jour en temps réel
              </h2>
              <span className="text-xs text-green-600 flex items-center gap-1">
                <i className="fas fa-circle"></i>
                Connecté
              </span>
            </div>
            <div className="space-y-4">
              {pairedDevices.map((device) => (
                <div key={device.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{device.name}</h4>
                      <p className="text-sm text-gray-600">
                        Dernière mise à jour: {device.lastSync}
                      </p>
                    </div>
                    <span className="text-sm text-green-600">
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
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4 text-red-600">
                Alerte d'Urgence
              </h3>
              <p className="mb-4">
                Êtes-vous sûr de vouloir déclencher une alerte SOS ?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Confirmer SOS
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-[#dc2626] p-4 shadow-lg">
        <div className="flex items-center justify-between container mx-auto">
          <button className="text-white flex flex-col items-center opacity-100">
            <i className="fas fa-home text-xl"></i>
            <span className="text-xs mt-1">Accueil</span>
          </button>
          <button
            onClick={() => setShowProfile(true)}
            className="text-white flex flex-col items-center opacity-70 hover:opacity-100"
          >
            <i className="fas fa-user text-xl"></i>
            <span className="text-xs mt-1">Profil</span>
          </button>
          <button
            onClick={() => setShowBraceletHolder(true)}
            className="text-white flex flex-col items-center opacity-70 hover:opacity-100"
          >
            <i className="fas fa-id-card text-xl"></i>
            <span className="text-xs mt-1">Porteur</span>
          </button>
          <button
            onClick={() => setShowGPS(true)}
            className="text-white flex flex-col items-center opacity-70 hover:opacity-100"
          >
            <i className="fas fa-map-marker-alt text-xl"></i>
            <span className="text-xs mt-1">GPS</span>
          </button>
          <button
            onClick={() => setShowQR(true)}
            className="text-white flex flex-col items-center opacity-70 hover:opacity-100"
          >
            <i className="fas fa-qrcode text-xl"></i>
            <span className="text-xs mt-1">QR</span>
          </button>
          <button
            onClick={triggerSOS}
            className="text-white flex flex-col items-center opacity-70 hover:opacity-100"
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