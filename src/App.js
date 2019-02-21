import React, { useState, useEffect } from "react";
import "./App.css";

const svgDimensionsFromWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
});

const r = 50;

const App = () => {
  const [{ width, height }, setSvgDimensions] = useState(
    svgDimensionsFromWindowSize()
  );

  const [spinAngle, setSpinAngle] = useState(0);

  let timeout;
  useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      requestAnimationFrame(() => setSpinAngle(spinAngle + 1));
    }, 1);
    return () => {
      clearTimeout(timeout);
    };
  }, [spinAngle]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSvgDimensions(svgDimensionsFromWindowSize);
    });
  }, []);

  return (
    <div id="App">
      <svg {...{ width, height }}>
        <g style={{ transform: `rotate(${-spinAngle}deg)` }}>
          {Array.from({ length: 6 }).map((_, i) => {
            let angle = 60 * (i + 1);
            let radian = (angle * Math.PI) / 180;
            let center = {
              x: width / 2 + r * 3 * Math.cos(radian),
              y: height / 2 + r * 3 * Math.sin(radian)
            };
            return (
              <SixCircleGroup
                key={i}
                center={center}
                rotate={-spinAngle + 60 * i}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

const SixCircleGroup = ({ center, rotate }) => {
  return (
    <g
      style={{
        transformOrigin: `${center.x}px ${center.y}px`,
        transform: `rotate(${rotate}deg)`
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => {
        let angle = 60 * (i + 1);
        let radian = (angle * Math.PI) / 180;
        let cx = center.x + r * Math.cos(radian);
        let cy = center.y + r * Math.sin(radian);
        return (
          <circle
            key={i}
            {...{ cx, cy, r }}
            style={{
              fill: `hsla(${angle / 6}, 100%, 25%, 0.1)`,
              stroke: `hsl(${angle / 6}, 100%, 50%)`
            }}
          />
        );
      })}
      ;
    </g>
  );
};
export default App;
