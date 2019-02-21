import React, { useState, useEffect } from "react";
import "./App.css";

const svgDimensionsFromWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
});

const App = () => {
  const [{ width, height }, setSvgDimensions] = useState(
    svgDimensionsFromWindowSize()
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSvgDimensions(svgDimensionsFromWindowSize);
    });
  }, []);

  const r = 100;
  return (
    <div id="App">
      <svg {...{ width, height }}>
        <circle cx={width / 2} cy={height / 2} r={r} />
        {Array.from({ length: 6 }).map((_, i) => {
          let angle = 60 * (i + 1);
          let radian = (angle * Math.PI) / 180;
          let cx = width / 2 + r * Math.cos(radian);
          let cy = height / 2 + r * Math.sin(radian);
          return (
            <circle
              {...{ cx, cy, r }}
              style={{ fill: `hsl(${angle}, 100%, 50%, 0.5)` }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default App;
