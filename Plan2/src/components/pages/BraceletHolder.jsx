import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function BraceletHolder({ userInfo, medicalInfo, emergencyContacts }) {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);

  const [localUser, setLocalUser] = useState({ ...userInfo });
  const [localMedical, setLocalMedical] = useState({ ...medicalInfo });
  const [localContacts, setLocalContacts] = useState([...emergencyContacts]);

  const handleInputChange = (field, value) => {
    setLocalUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saved data:", localUser, localMedical, localContacts);
    setEditMode(false);
  };

  const handleCancel = () => {
    setLocalUser({ ...userInfo });
    setLocalMedical({ ...medicalInfo });
    setLocalContacts([...emergencyContacts]);
    setEditMode(false);
  };

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#dc2626] font-roboto flex items-center gap-2">
            <i className="fas fa-id-card"></i>
            {t("wearerInfo.title")}
          </h2>
          <button
            className="text-sm px-4 py-1 border rounded-md text-[#dc2626] border-[#dc2626] hover:bg-[#dc2626] hover:text-white transition"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? t("cancel") : t("edit")}
          </button>
        </div>

        <div className="space-y-8">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h3 className="font-semibold text-lg border-b pb-2">{t("personalInformation")}</h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {/* First Name */}
                <div>
                  <p className="text-sm text-gray-600">{t("firstName")}</p>
                  {editMode ? (
                    <input className="input" value={localUser.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} />
                  ) : (
                    <p className="font-medium">{localUser.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <p className="text-sm text-gray-600">{t("lastName")}</p>
                  {editMode ? (
                    <input className="input" value={localUser.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} />
                  ) : (
                    <p className="font-medium">{localUser.lastName}</p>
                  )}
                </div>

                {/* Age */}
                <div>
                  <p className="text-sm text-gray-600">{t("age")}</p>
                  {editMode ? (
                    <input type="number" className="input" value={localUser.age} onChange={(e) => handleInputChange("age", e.target.value)} />
                  ) : (
                    <p className="font-medium">{localUser.age} {t("years")}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <p className="text-sm text-gray-600">{t("gender")}</p>
                  {editMode ? (
                    <select className="input" value={localUser.gender} onChange={(e) => handleInputChange("gender", e.target.value)}>
                      <option value="male">{t("male")}</option>
                      <option value="female">{t("female")}</option>
                    </select>
                  ) : (
                    <p className="font-medium">{t(localUser.gender)}</p>
                  )}
                </div>

                {/* Blood Type */}
                <div>
                  <p className="text-sm text-gray-600">{t("bloodType")}</p>
                  {editMode ? (
                    <input className="input" value={localUser.bloodType} onChange={(e) => handleInputChange("bloodType", e.target.value)} />
                  ) : (
                    <p className="font-medium">{localUser.bloodType}</p>
                  )}
                </div>

                {/* ID Number */}
                <div>
                  <p className="text-sm text-gray-600">{t("idNumber")}</p>
                  {editMode ? (
                    <input className="input" value={localUser.idNumber} onChange={(e) => handleInputChange("idNumber", e.target.value)} />
                  ) : (
                    <p className="font-medium">{localUser.idNumber}</p>
                  )}
                </div>

                {/* Passport Number */}
                <div>
                  <p className="text-sm text-gray-600">{t("passportNumber")}</p>
                  {editMode ? (
                    <input className="input" value={localUser.passportNumber} onChange={(e) => handleInputChange("passportNumber", e.target.value)} />
                  ) : (
                    <p className="font-medium">{localUser.passportNumber}</p>
                  )}
                </div>

                {/* Home Location */}
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">{t("homeLocation")}</p>
                  {editMode ? (
                    <input className="input w-full" value={localUser.homeLocation} onChange={(e) => handleInputChange("homeLocation", e.target.value)} />
                  ) : (
                    <p className="font-medium">{localUser.homeLocation}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Medical Info */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg border-b pb-2">{t("medicalInfo.title")}</h3>

              {/* Conditions */}
              <div>
                <p className="text-sm text-gray-600">{t("medicalInfo.conditions")}</p>
                {editMode ? (
                  <textarea className="input w-full mt-2" rows={2} value={localMedical.conditions.join(", ")} onChange={(e) => setLocalMedical((prev) => ({ ...prev, conditions: e.target.value.split(",").map((i) => i.trim()) }))} />
                ) : (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {localMedical.conditions.map((cond, index) => (
                      <span key={index} className="px-3 py-1 bg-red-50 text-[#dc2626] rounded-full text-sm">{t(cond)}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Allergies */}
              <div>
                <p className="text-sm text-gray-600">{t("medicalInfo.allergies")}</p>
                {editMode ? (
                  <textarea className="input w-full mt-2" rows={2} value={localMedical.allergies.join(", ")} onChange={(e) => setLocalMedical((prev) => ({ ...prev, allergies: e.target.value.split(",").map((i) => i.trim()) }))} />
                ) : (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {localMedical.allergies.map((allergy, index) => (
                      <span key={index} className="px-3 py-1 bg-red-50 text-[#dc2626] rounded-full text-sm">{t(allergy)}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Medications */}
              <div>
                <p className="text-sm text-gray-600">{t("medicalInfo.medications")}</p>
                <div className="mt-2 space-y-2">
                  {localMedical.medications.map((med, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      {editMode ? (
                        <>
                          <input className="input mb-1 w-full" value={med.name} placeholder={t("name")} onChange={(e) => {
                            const updated = [...localMedical.medications];
                            updated[index].name = e.target.value;
                            setLocalMedical({ ...localMedical, medications: updated });
                          }} />
                          <input className="input w-full" value={med.dosage} placeholder={t("dosage")} onChange={(e) => {
                            const updated = [...localMedical.medications];
                            updated[index].dosage = e.target.value;
                            setLocalMedical({ ...localMedical, medications: updated });
                          }} />
                        </>
                      ) : (
                        <>
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-gray-600">{med.dosage}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="font-semibold text-lg border-b pb-2 mb-4">{t("emergencyContacts")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localContacts.map((contact, index) => (
                <div key={contact.id} className="p-4 bg-gray-50 rounded-lg space-y-2">
                  {editMode ? (
                    <>
                      <input className="input w-full" value={contact.name} placeholder={t("name")} onChange={(e) => {
                        const updated = [...localContacts];
                        updated[index].name = e.target.value;
                        setLocalContacts(updated);
                      }} />
                      <input className="input w-full" value={contact.relation} placeholder={t("relation")} onChange={(e) => {
                        const updated = [...localContacts];
                        updated[index].relation = e.target.value;
                        setLocalContacts(updated);
                      }} />
                      <input className="input w-full" value={contact.phone} placeholder={t("phone")} onChange={(e) => {
                        const updated = [...localContacts];
                        updated[index].phone = e.target.value;
                        setLocalContacts(updated);
                      }} />
                    </>
                  ) : (
                    <>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-600">{t(contact.relation)}</p>
                      <p className="text-sm text-gray-600">{contact.phone}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Save/Cancel Buttons */}
          {editMode && (
            <div className="flex justify-end gap-4 mt-6">
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={handleCancel}>
                {t("cancel")}
              </button>
              <button className="px-4 py-2 bg-[#dc2626] text-white rounded hover:bg-[#b91c1c]" onClick={handleSave}>
                {t("save")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BraceletHolder;
