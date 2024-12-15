const fs = require("fs");
const path = require("path");

const getAllData = async () => {
  try {
    const filePath = path.join(__dirname, "../data/output.json");

    // Read the file asynchronously
    const data = await fs.promises.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    console.error("Error while fetching data: ", error);
    throw new Error("Failed to fetch data");
  }
};

const filterData = async (req, res) => {
  try {
    const { pub_objectuai, software_activeprogramname } = req.body;

    const data = await getAllData();

    const filteredData = data.filter((item) => {
      let matchesObjectUai = false;
      let matchesSoftware_ProgramName = false;

      if (
        software_activeprogramname &&
        item.Software_ActiveProgramName === software_activeprogramname
      ) {
        matchesSoftware_ProgramName = true;
      }

      if (pub_objectuai && item.pub_objectuai === pub_objectuai) {
        matchesObjectUai = true;
      }

      return matchesSoftware_ProgramName && matchesObjectUai;
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
};
