import React from "react";
import { useTranslation } from "react-i18next";

function QRPage({ pairedDevices, showScanner, setShowScanner }) {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-[#dc2626] font-roboto mb-6">
          {t("qrScannerTitle")}
        </h2>

        <div className="space-y-6">
          {/* QR Scanner */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">{t("scanQRCode")}</h3>
            {showScanner ? (
              <div className="aspect-square w-full max-w-md mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-camera text-4xl text-gray-400 mb-2"></i>
                  <p className="text-sm text-gray-500">
                    {t("cameraActivating")}
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowScanner(true)}
                className="w-full bg-[#dc2626] text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <i className="fas fa-qrcode"></i>
                <span>{t("scanNewDevice")}</span>
              </button>
            )}
          </div>

          {/* Device List */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("associatedDevices")}</h3>
            <div className="space-y-4">
              {pairedDevices.map((device) => (
                <div key={device.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{device.name}</h4>
                      <p className="text-sm text-gray-600">
                        {t("lastSync")}: {device.lastSync}
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
  );
}

export default QRPage;
