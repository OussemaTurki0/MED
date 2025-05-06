// All the imports remain unchanged
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslation } from "react-i18next";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function HomePage({ vitals, alerts, pairedDevices }) {
  const { t } = useTranslation();
  const [aiFeedback, setAiFeedback] = useState("");
  const [dailyTip, setDailyTip] = useState("");
  const [weatherTip, setWeatherTip] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [weatherDesc, setWeatherDesc] = useState("");

  const API_KEY = "d7c68eb817e94c66121f99425efb80e5"; // Replace with your key

  useEffect(() => {
    const { heartRate, oxygenLevel, temperature } = vitals;
    let feedback = t("aiFeedback.normal");

    if (heartRate > 100) feedback = t("aiFeedback.highHeartRate");
    else if (heartRate < 60) feedback = t("aiFeedback.lowHeartRate");

    if (oxygenLevel < 95) feedback += `\n${t("aiFeedback.lowOxygen")}`;
    if (temperature > 37.8) feedback += `\n${t("aiFeedback.fever")}`;

    setAiFeedback(feedback);
  }, [vitals, t]);

  useEffect(() => {
    const tips = [
      t("tips.drinkWater"),
      t("tips.walk"),
      t("tips.lightMeal"),
      t("tips.breathe"),
    ];
    const todayIndex = new Date().getDay() % tips.length;
    setDailyTip(tips[todayIndex]);
  }, [t]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        const temp = data.main.temp;
        const description = data.weather[0].description;

        setTemperature(temp);
        setWeatherDesc(description);

        if (temp > 32) {
          setWeatherTip("☀️ It's very hot today. Stay hydrated and avoid sunlight.");
        } else if (temp < 10) {
          setWeatherTip("❄️ It's cold. Wear warm clothes to stay safe.");
        } else if (description.includes("rain")) {
          setWeatherTip("🌧️ It's rainy. Carry an umbrella and avoid slippery places.");
        } else {
          setWeatherTip("🌤️ Weather is moderate. Enjoy your day, but stay alert.");
        }
      } catch (error) {
        setWeatherTip("🌍 Unable to load weather info.");
      }
    });
  }, []);

  const chartData = {
    labels: [
      t("days.mon"),
      t("days.tue"),
      t("days.wed"),
      t("days.thu"),
      t("days.fri"),
      t("days.sat"),
      t("days.sun"),
    ],
    datasets: [
      {
        label: t("heartRate"),
        data: [78, 80, 76, 85, 74, 82, vitals.heartRate],
        borderColor: "#dc2626",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true, max: 120 },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-xl font-bold text-[#dc2626] font-roboto mb-6 text-center flex items-center justify-center gap-2">
        <i className="fas fa-heartbeat"></i>
        {t("healthMonitor")}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Weekly Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-lg mb-4">{t("weeklyChart")}</h3>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[3px] bg-[#dc2626] animate-pulse rounded-full"></div>
            <span className="text-sm text-gray-600">{t("heartRate")}</span>
          </div>
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Health Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold font-roboto text-gray-800">{t("healthOverview")}</h2>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <i className="fas fa-circle text-green-500 animate-pulse text-[6px]" />
              {t("liveMonitoring")}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <i className="fas fa-heartbeat text-[#dc2626] text-xl"></i>
              <div className="text-base font-semibold">{vitals.heartRate} BPM</div>
              <div className="text-xs text-gray-600">{t("heartRate")}</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <i className="fas fa-lungs text-[#dc2626] text-xl"></i>
              <div className="text-base font-semibold">{vitals.oxygenLevel}%</div>
              <div className="text-xs text-gray-600">{t("oxygenLevel")}</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <i className="fas fa-thermometer-half text-[#dc2626] text-xl"></i>
              <div className="text-base font-semibold">{vitals.temperature}°C</div>
              <div className="text-xs text-gray-600">{t("temperature")}</div>
            </div>
          </div>
        </div>

        {/* Health Standards */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold font-roboto text-gray-800 mb-4">{t("healthStandardsText.title")}</h2>
          <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside">
            <li><strong>{t("healthStandardsText.heartTitle")}</strong></li>
            <li>{t("healthStandardsText.heartBelow")}</li>
            <li>{t("healthStandardsText.heartAbove")}</li>
            <li><strong>{t("healthStandardsText.oxygenTitle")}</strong></li>
            <li>{t("healthStandardsText.oxygenDrop")}</li>
            <li><strong>{t("healthStandardsText.temperatureTitle")}</strong></li>
            <li>{t("healthStandardsText.feverAbove")}</li>
          </ul>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-semibold text-base mb-3">{t("recentAlerts")}</h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg flex items-center justify-between transform hover:translate-x-2 transition-transform duration-200 ${
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
                  <span className="text-sm">{t(alert.messageKey)}</span>
                </div>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Time Device Updates */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold font-roboto text-gray-800 mb-4">{t("realTimeUpdates")}</h2>
          <div className="space-y-4">
            {pairedDevices.map((device) => (
              <div key={device.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{device.name}</h4>
                    <p className="text-sm text-gray-600">{t("lastUpdate")}: {device.lastSync}</p>
                  </div>
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <i className="fas fa-circle text-xs animate-pulse"></i>
                    {t("connected")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Feedback */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold font-roboto text-gray-800 mb-4">{t("aiAdvisor")}</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line">{aiFeedback}</p>
        </div>

        {/* Daily Tip */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-semibold text-lg mb-2">🩺 {t("dailyTip")}</h3>
          <p className="text-sm text-gray-600">{dailyTip}</p>
        </div>

        {/* Weather Tip */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-semibold text-lg mb-2">🌍 {t("weatherTip")}</h3>
          <p className="text-sm text-gray-600">
            {temperature !== null && `${temperature}°C - ${weatherDesc}`}
          </p>
          <p className="text-sm text-gray-600">{weatherTip}</p>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
