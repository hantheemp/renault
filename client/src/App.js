import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Navbar from "./Components/Navbar";

function App() {
  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    {name: "Page B", uv: 800, pv: 1200, amt: 800}
  ];

  return (
    <div>
      <Navbar></Navbar>
     </div>
  );
}

export default App;
