import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function FilterComponent({ onFilterSubmit  = () => {} }) {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:3000/",
    });
  
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
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Object UAI</span>
                </label>
                <Field
                  name="pub_objectuai"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                />
                {touched.pub_objectuai && errors.pub_objectuai && (
                  <span className="text-red-500 text-sm">
                    {errors.pub_objectuai}
                  </span>
                )}
              </div>
  
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Program Name</span>
                </label>
                <Field
                  name="software_activeprogramname"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                />
                {touched.software_activeprogramname &&
                  errors.software_activeprogramname && (
                    <span className="text-red-500 text-sm">
                      {errors.software_activeprogramname}
                    </span>
                  )}
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