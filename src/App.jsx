import { useState } from "react";
import { sparks, fullMoonSparks, mondayTarotSparks, writingSparks } from "./data/sparks";
import "./App.css";
import { Moon } from "lunarphase-js";

function App() {
const [selectedSparks, setSelectedSparks] = useState(() => {
  const saved = localStorage.getItem("dailySparks");

  if (!saved) return [];

  const parsed = JSON.parse(saved);
  const today = new Date().toDateString();

  if (parsed.date === today) {
    return parsed.sparks;
  }

  return [];
});

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Full moon logic
  const now = new Date();
  const phase = Moon.lunarPhase(now);
  const isFullMoon = phase === "Full";

function generateSparks() {
  const chosen = [];

  const today = new Date();
  const isMonday = today.getDay() === 1;
  const isFriday = today.getDay() === 5;

  if (isMonday) {
    const tarotSpark =
      mondayTarotSparks[Math.floor(Math.random() * mondayTarotSparks.length)];
    chosen.push(tarotSpark);
  }

  if (isFriday) {
    const writingSpark =
      writingSparks[Math.floor(Math.random() * writingSparks.length)];
    chosen.push(writingSpark);
  }

  if (isFullMoon) {
    const randomFullMoonSpark =
      fullMoonSparks[Math.floor(Math.random() * fullMoonSparks.length)];
    chosen.push(randomFullMoonSpark);
  }

  const shuffled = [...sparks].sort(() => 0.5 - Math.random());
  const numberOfRegularSparks = (isFullMoon || isMonday || isFriday) ? 2 : 3;
  chosen.push(...shuffled.slice(0, numberOfRegularSparks));

  setSelectedSparks(chosen);

  localStorage.setItem(
    "dailySparks",
    JSON.stringify({
      date: new Date().toDateString(),
      sparks: chosen,
    })
  );
}

  return (
    <div className="page">
      <div className="sun"></div>
      <div className="mist mist-1"></div>
      <div className="mist mist-2"></div>
      <div className="mist mist-3"></div>
      <div className="shimmer"></div>

      <div className="mountains">
        <div className="mountain mountain-1"></div>
        <div className="mountain mountain-2"></div>
        <div className="mountain mountain-3"></div>
        <div className="mountain mountain-4"></div>
      </div>

      <div className="card">
        <div className="sparkle sparkle-1" aria-hidden="true">
          ✦
        </div>
        <div className="sparkle sparkle-2" aria-hidden="true">
          ✧
        </div>
        <div className="sparkle sparkle-3" aria-hidden="true">
          ✦
        </div>

        {/* <p className="date">{today}</p> */}
        <h1 className="title">Daily Spark</h1>
        <p className="subtitle">Pick one small spark for the day</p>

        {selectedSparks.length === 0 && (
          <button className="spark-button" onClick={generateSparks}>
            Reveal Your Sparks
          </button>
        )}

        {selectedSparks.length > 0 && (
          <>
            <div className="sparks-list">
              {selectedSparks.map((spark, index) => (
                <div
                  key={index}
                  className="spark-card"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {/* <span className="spark-icon">✦</span> */}
                  {spark}
                </div>
              ))}
            </div>

            <p className="spark-message">
              Today’s sparks revealed ✨  
              Come back tomorrow for new ones.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;