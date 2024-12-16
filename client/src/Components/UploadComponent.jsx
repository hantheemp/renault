import { useState } from "react";
import axios from "axios";

export default function UploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
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

    setLoading(true);
    setUploadStatus("");

    try {
      const response = await axios.post(
        "http://localhost:3000/file/uploadFile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setUploadStatus("File uploaded and converted successfully!");
      } else {
        setUploadStatus("Failed to upload or convert!");
      }
    } catch (error) {
      console.error("Failed to upload or convert file: ", error);
      setUploadStatus("Failed to upload or convert file!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center text-center rounded-md space-y-8">
        <input
          type="file"
          accept=".xlsx"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileChange}
        />
        <button
          onClick={handleFileUpload}
          className={`btn btn-primary w-full max-w-xs ${
            loading ? "btn-disabled" : ""
          }`}
          disabled={!selectedFile || loading}
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
        {uploadStatus && (
          <p className="mt-2 text-sm text-gray-600">{uploadStatus}</p>
        )}
        {loading && (
          <p className="mt-2 text-sm text-blue-500">Uploading, please wait...</p>
        )}
      </div>
    </div>
  );
}
