import { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function FilterComponent({ onFilterSubmit = () => {} }) {
  const [objectUaiOptions, setObjectUaiOptions] = useState([]);
  const [programNameOptions, setProgramNameOptions] = useState([]);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
  });

  useEffect(() => {
    const fetchObjectUaiOptions = async () => {
      try {
        const response = await axiosInstance.get("data/uniqueObjectUAI");
        setObjectUaiOptions(response.data);
      } catch (error) {
        console.error("Error fetching unique Object UAI:", error.message);
      }
    };

    fetchObjectUaiOptions();
  }, []);

  const fetchProgramNames = async (pub_objectuai) => {
    try {
      if (!pub_objectuai) {
        setProgramNameOptions([]);
        return;
      }

      const response = await axiosInstance.post(
        "data/relatedProgramName",
        { pub_objectuai },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setProgramNameOptions(response.data);
    } catch (error) {
      console.error("Error fetching related program names:", error.message);
    }
  };

  const handleFilterSubmit = async (values) => {
    try {
      const response = await axiosInstance.post("data/filterData", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        onFilterSubmit(response.data.data);
      } else {
        console.log("Failure:", response.data.success);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <Formik
        initialValues={{
          pub_objectuai: "",
          software_activeprogramname: "",
        }}
        onSubmit={(values, { resetForm }) => {
          handleFilterSubmit(values);
          resetForm();
        }}
        validationSchema={Yup.object({
          pub_objectuai: Yup.string().required("Object UAI is required"),
          software_activeprogramname: Yup.string(),
        })}
      >
        {({ handleSubmit, values, setFieldValue, errors, touched }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Object UAI</span>
              </label>
              <Field
                name="pub_objectuai"
                as="select"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                  const selectedUAI = e.target.value;
                  setFieldValue("pub_objectuai", selectedUAI);
                  fetchProgramNames(selectedUAI);
                }}
              >
                <option value="">Select an option</option>
                {objectUaiOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Field>

              {touched.pub_objectuai && errors.pub_objectuai && (
                <span className="text-red-500 text-sm">
                  {errors.pub_objectuai}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Software Program Name</span>
              </label>
              <Field
                name="software_activeprogramname"
                as="select"
                className="input input-bordered w-full max-w-xs"
              >
                <option value="">Select an option</option>
                {programNameOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Field>
            </div>

            <button type="submit" className="btn btn-primary w-full max-w-xs">
              Submit Filters
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
