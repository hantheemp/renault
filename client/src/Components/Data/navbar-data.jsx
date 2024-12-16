import {
  PiFunnelBold,
  PiChartScatterBold,
} from "react-icons/pi";

import FilterComponent from "../FilterComponent";
import AnalysisComponent from "../AnalysisComponent";

export const navbar = [
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
