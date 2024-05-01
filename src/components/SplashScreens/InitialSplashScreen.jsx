import React from "react";
import "./SplashScreens.css";
import letter1 from "../../assets/letter1.svg";
import letter2 from "../../assets/letter2.svg";
import letter3 from "../../assets/letter3.svg";
import letter4 from "../../assets/letter4.svg";
import letter5 from "../../assets/letter5.svg";

function InitialSplashScreen() {
  return (
    <div className="initial-splash-screen bg-gradient-to-b from-floral-white to-whitee opacity-60 ">
      <div className="intro-wrapper">
        <div className="logo">
          <svg width="100vw" height="100vh" viewBox="0 0 100 100">
            <g id="animista-logo-outline">
              <image
                href={letter1}
                x="0"
                y="23"
                height="40"
                width="40"
                preserveAspectRatio="xMidYMid meet"
              />
              <image
                href={letter2}
                x="29"
                y="30"
                height="30"
                width="30"
                preserveAspectRatio="xMidYMid meet"
              />
              <image
                href={letter3}
                x="42"
                y="30"
                height="30"
                width="30"
                preserveAspectRatio="xMidYMid meet"
              />
              <image
                href={letter4}
                x="54"
                y="30"
                height="30"
                width="30"
                preserveAspectRatio="xMidYMid meet"
              />
              <image
                href={letter5}
                x="70"
                y="30"
                height="30"
                width="30"
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default InitialSplashScreen;
