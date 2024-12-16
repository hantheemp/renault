import {
  PiUploadBold,
  PiFunnelBold,
  PiChartScatterBold,
  PiFilePdfBold,
} from "react-icons/pi";

import FilterComponent from "../FilterComponent";
import AnalysisComponent from "../AnalysisComponent";
import UploadComponent from "../UploadComponent";

export const navbar = [
  {
    header: "Upload Your Data",
    icon: <PiUploadBold size={30} />,
    body: <UploadComponent></UploadComponent>,
  },
  {
    header: "Apply Filters",
    icon: <PiFunnelBold size={30} />,
    body: <FilterComponent></FilterComponent>,
  },
  {
    header: "Create Analysis",
    icon: <PiChartScatterBold size={30} />,
    body: <AnalysisComponent></AnalysisComponent>,
  },
];
