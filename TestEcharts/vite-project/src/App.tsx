import React, { Profiler } from "react";
import Page from "./Page";
import Pie from "./Pie";

// function onRenderCallback(
//   id: string,
//   phase: "mount" | "update" | "nested-update",
//   actualDuration: number
// ) {
//   console.log(
//     `Component: ${id}, Phase: ${phase}, Render Time: ${actualDuration}ms`
//   );
// }

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginTop: "50px",
          marginLeft: "50px",
        }}
      >
        <h1>Bar Chart</h1>
        <div style={{ width: "50%" }}>
          <Page />
        </div>

        <h1>Pie Chart</h1>
        <div style={{ width: "50%" }}>
          <Pie />
        </div>
      </div>
    </>
  );
}

export default App;
