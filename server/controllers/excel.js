const path = require("path");
const XLSX = require("xlsx");
const fs = require("fs");

const excelDateToJSDate = (excelDate) => {
  const epoch = new Date(1900, 0, 1);
  const days = Math.floor(excelDate - 1); 
  const result = new Date(epoch.getTime() + days * 24 * 60 * 60 * 1000);
  return result.toISOString().split("T")[0];
};

const readExcelFile = () => {
  const filePath = path.join(__dirname, "../data/Dataset.xlsx");
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  const data = XLSX.utils.sheet_to_json(sheet);
  
  return data.map((row) => {
    if (row.pub_sourcetimestamp) {
      row.pub_sourcetimestamp = excelDateToJSDate(row.pub_sourcetimestamp);
    }
    return row;
  });
};

const convertExcelToJson = async (req, res) => {
  try {
    const jsonData = readExcelFile();
    const filePath = path.join(__dirname, '../data/output.json');

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
        return false;
      }
      return true;
    });
  } catch (error) {
    console.error("Error reading Excel file:", error);

    return false;
  }
};

module.exports = {
  convertExcelToJson,
};
