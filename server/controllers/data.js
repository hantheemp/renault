const fs = require("fs");
const path = require("path");

const getAllData = async () => {
  try {
    const filePath = path.join(__dirname, "../data/output.json");
    const data = await fs.promises.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    console.error("Error while fetching data: ", error);
    throw new Error("Failed to fetch data");
  }
};

const uniqueObjectUAI = async (req, res) => {
  try {
    const data = await getAllData();
    const uniqueValues = [...new Set(data.map((item) => item.pub_objectuai))];

    return res.status(200).json(uniqueValues);
  } catch (error) {
    console.error("Error while fetching unique Object UAI values: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch unique Object UAI values",
    });
  }
};

const relatedProgramName = async (req, res) => {
  try {
    const { pub_objectuai } = req.body;

    if (!pub_objectuai) {
      return res.status(400).json({
        success: false,
        message: "pub_objectuai is required",
      });
    }

    const data = await getAllData();

    const filteredProgramNames = data
      .filter((item) => item.pub_objectuai === pub_objectuai)
      .map((item) => item.Software_ActiveProgramName);

    const uniqueProgramNames = [...new Set(filteredProgramNames)];

    return res.status(200).json(uniqueProgramNames);
  } catch (error) {
    console.error("Error while fetching related program names: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch related program names",
    });
  }
};

const filterData = async (req, res) => {
  try {
    const { pub_objectuai, software_activeprogramname, startDate, endDate } =
      req.body;

    const data = await getAllData();

    const filteredData = data.filter((item) => {

      let matchesObjectUai = true;
      let matchesSoftware_ProgramName = true;
      let matchesDateRange = true;

      if (pub_objectuai && item.pub_objectuai !== pub_objectuai) {
        matchesObjectUai = false;
      }

      if (
        software_activeprogramname &&
        item.Software_ActiveProgramName !== software_activeprogramname
      ) {
        matchesSoftware_ProgramName = false;
      }

      if (startDate || endDate) {
        const itemDate = new Date(item.pub_sourcetimestamp);
        if (startDate && itemDate < new Date(startDate)) {
          matchesDateRange = false;
        }
        if (endDate && itemDate > new Date(endDate)) {
          matchesDateRange = false;
        }
      }

      return (
        matchesObjectUai && matchesSoftware_ProgramName && matchesDateRange
      );
    });

    if (filteredData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data found matching the provided filters.",
      });
    }

    return res.status(200).json({
      success: true,
      data: filteredData,
    });
  } catch (error) {
    console.error("Error while fetching filtered data: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch filtered data",
    });
  }
};

module.exports = {
  getAllData,
  filterData,
  relatedProgramName,
  uniqueObjectUAI,
};
