import React, { useState, useEffect } from "react";
import "./App.css";

const svgDimensionsFromWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
});

const r = 100;

const App = () => {
  const [{ width, height }, setSvgDimensions] = useState(
    svgDimensionsFromWindowSize()
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSvgDimensions(svgDimensionsFromWindowSize);
    });
  }, []);

  return (
    <div id="App">
      <svg {...{ width, height }}>
        {Array.from({ length: 6 }).map((_, i) => {
          let angle = 60 * (i + 1);
          let radian = (angle * Math.PI) / 180;
          let center = {
            x: width / 2 + r * 3 * Math.cos(radian),
            y: height / 2 + r * 3 * Math.sin(radian)
          };
          return <SixCircleGroup center={center} rotate={angle} />;
        })}
      </svg>
    </div>
  );
};

const SixCircleGroup = ({ center, rotate }) => {
  return (
    <g
      style={{
        transformOrigin: `${center.x}px ${center.y}px`,
        transform: `rotate(${rotate - 60}deg)`
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => {
        let angle = 60 * (i + 1);
        let radian = (angle * Math.PI) / 180;
        let cx = center.x + r * Math.cos(radian);
        let cy = center.y + r * Math.sin(radian);
        return (
          <circle
            {...{ cx, cy, r }}
            style={{
              fill: `hsla(${angle}, 100%, 50%, 0.5)`
            }}
          />
        );
      })}
      ;
    </g>
  );
};
export default App;
