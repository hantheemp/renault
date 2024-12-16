import { useState } from "react";
import axios from "axios";

export default function UploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setSelectedFile(file);
      setUploadStatus("");
    } else {
      setSelectedFile(null);
      setUploadStatus("Please select a valid .xlsx file");
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:3000/file/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setUploadStatus("File uploaded and converted successfully!");
      } else {
        setUploadStatus("Failed to upload or convert!");
      }
    } catch (error) {
      console.error("Failed to upload or convert file: ", error);
      setUploadStatus("failed to upload or convert file!");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <input
        type="file"
        accept=".xlsx"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={handleFileChange}
      />
      <button
        onClick={handleFileUpload}
        className="btn btn-primary w-full max-w-xs mt-4"
        disabled={!selectedFile}
      >
        Upload File
      </button>
      {uploadStatus && <p className="mt-2 text-sm text-gray-600">{uploadStatus}</p>}
    </div>
  );
}
