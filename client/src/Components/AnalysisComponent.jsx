import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

function AnalysisComponent({ filteredData = [] }) {
  const componentRef = useRef(null);

  const generatePDF = async () => {
    if (componentRef.current) {
      const canvas = await html2canvas(componentRef.current, {
        backgroundColor: null,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    }
  };

  if (!filteredData || filteredData.length === 0) {
    return <div>No Data to Visualize</div>;
  }

  const parsedData = filteredData.map((item) => ({
    ...item,
    ActTotalActivePower: parseFloat(item.ActTotalActivePower),
  }));

  return (
    <div>
      <button
        onClick={generatePDF}
        style={{
        }}
        className="bg-blue-500"
      >
        <p className="text-white text-xl font-bold italic cursor-pointer border-none p-4">Download as PDF</p>
      </button>

      <div ref={componentRef}>
        <div>
          <h2 className="text-xl italic my-4">
            Trends over time for ActTotalActivePower
          </h2>
          <div style={{ width: "100%", height: 600 }}>
            <ResponsiveContainer>
              <LineChart
                data={parsedData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="pub_sourcetimestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ActTotalActivePower"
                  stroke="#82ca9d"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h2 className="text-xl italic my-4">
            Compare ActTotalActivePower across different Software_LineNumber
          </h2>
          <div style={{ width: "100%", height: 600 }}>
            <ResponsiveContainer>
              <BarChart
                data={parsedData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Software_LineNumber" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ActTotalActivePower" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h2 className="text-xl italic my-4">
            Scatter Chart (Line Numbers vs Power)
          </h2>
          <div style={{ width: "100%", height: 600 }}>
            <ResponsiveContainer>
              <ScatterChart
                data={parsedData}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Software_LineNumber" name="Line Number" />
                <YAxis dataKey="ActTotalActivePower" name="Active Power" />
                <Tooltip />
                <Legend />
                <Scatter data={parsedData} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h2 className="text-xl italic my-4">
            Area Chart (Cumulative Power Over Time)
          </h2>
          <div style={{ width: "100%", height: 600 }}>
            <ResponsiveContainer>
              <AreaChart
                data={parsedData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="pub_sourcetimestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="ActTotalActivePower"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisComponent;
