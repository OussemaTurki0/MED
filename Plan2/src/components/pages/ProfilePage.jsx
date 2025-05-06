import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n"; // Adjust path as needed

function ProfilePage({
  userInfo,
  setUserInfo,
  profilePhoto,
  setProfilePhoto,
  editMode,
  setEditMode,
}) {
  const { t } = useTranslation();

  const handleInputChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  const handleSave = () => {
    const confirmed = window.confirm(t("confirmSave"));
    if (confirmed) {
      setEditMode(false);
      alert(t("changesSaved"));
    }
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    handleInputChange("language", lang);
    i18n.changeLanguage(
      lang === "العربية" ? "ar" :
      lang === "Français" ? "fr" :
      "en"
    );
  };

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#dc2626] font-roboto">
            {t("myProfile")}
          </h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="text-[#dc2626] hover:text-red-700"
          >
            <i className={`fas ${editMode ? "fa-save" : "fa-edit"} text-xl`}></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-6 relative">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center relative group">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
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
                {t("personalInformation")}
              </h3>
              {editMode ? (
                <div className="space-y-3">
                  {["firstName", "lastName", "email", "phone"].map((field) => (
                    <div key={field}>
                      <label className="text-sm text-gray-600">
                        {t(field)}
                      </label>
                      <input
                        type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                        value={userInfo[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">
                    {t("name")}: {userInfo.firstName} {userInfo.lastName}
                  </p>
                  <p className="text-gray-600 text-sm">{t("email")}: {userInfo.email}</p>
                  <p className="text-gray-600 text-sm">{t("phone")}: {userInfo.phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-base border-b pb-2">
                {t("accountSettings")}
              </h3>

              {/* Language Dropdown */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t("language")}</span>
                <select
                  disabled={!editMode}
                  value={userInfo.language}
                  onChange={handleLanguageChange}
                  className="p-1 border rounded"
                >
                  <option value="English">English</option>
                  <option value="Français">Français</option>
                  <option value="العربية">العربية</option>
                </select>
              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t("notifications")}</span>
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
                  } relative transition-colors duration-200 ${
                    !editMode && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                      userInfo.notifications ? "right-1" : "left-1"
                    }`}
                  ></div>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-base border-b pb-2">{t("security")}</h3>
              <button disabled={!editMode} className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded flex justify-between">
                <span className="text-sm">{t("changePassword")}</span>
                <i className="fas fa-chevron-right text-xs"></i>
              </button>
              <button disabled={!editMode} className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded flex justify-between">
                <span className="text-sm">{t("twoFactor")}</span>
                <i className="fas fa-chevron-right text-xs"></i>
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-base border-b pb-2">{t("dataManagement")}</h3>
              <button disabled={!editMode} className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded flex justify-between">
                <span className="text-sm">{t("exportData")}</span>
                <i className="fas fa-download text-xs"></i>
              </button>
              <button disabled={!editMode} className="w-full bg-red-50 text-red-600 py-2 px-4 rounded flex justify-between">
                <span className="text-sm">{t("deleteAccount")}</span>
                <i className="fas fa-trash text-xs"></i>
              </button>
            </div>
          </div>
        </div>

        {editMode && (
          <div className="mt-6">
            <button
              onClick={handleSave}
              className="w-full bg-[#dc2626] text-white py-2 rounded-lg hover:bg-red-700"
            >
              {t("saveChanges")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
