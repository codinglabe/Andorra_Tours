import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";

const FooterDetails = () => {
  const [editorValue, setEditorValue] = useState("");
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [title, setTitle] = useState([{ title: "" }]);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    callFetch("footer-details", "GET", []).then((res) => {
      if (res.data){
        for (let [key, value] of Object.entries(res.data)) {
          if (key !== "image" && key !== "tag") {
            setValue(key, value);
          }
  
        }
      }
    });
  }, [submitSuccess]);
  
  const onSubmit = (formData) => {
    setSaving(true);
    callFetch("footer-details", "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };
  return(
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Footer Details")}</h6>
          </div>
          <div className="card-body">
            <form
              className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""
                }`}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              {/* top_sub_title */}
              <div className="row g-3">
                <div className="col-md-4">
                  <label>{t("Location")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("AD500, Andorra la Vella, la Margineda")}
                    {...register("location")}
                  />
                  <div className="invalid-feedback">
                    {errors.location && errors.location.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Schedule")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("Hours: 8:00 - 17:00, Mon - Sat")}
                    {...register("schedule")}
                  />
                  <div className="invalid-feedback">
                    {errors.schedule && errors.schedule.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Status")} *</label>
                  <select
                    class="form-control"
                    {...register("status")}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <div className="invalid-feedback">
                    {errors.status && errors.status.message}
                  </div>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label>{t("Email")} *</label>
                  <input type="text" className="form-control" placeholder={t("support@andorra.com")}
                    {...register("email")} />
                  <div className="invalid-feedback">
                    {errors.email && errors.email.message}
                  </div>
                </div>

                <div className="col-md-6">
                  <label>{t("Help Number")} *</label>
                  <input type="text" className="form-control" placeholder="+37600000000"
                    {...register("help_number")} />
                  <div className="invalid-feedback">
                    {errors.help_number && errors.help_number.message}
                  </div>
                </div>

              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label>{t("Footer")} &copy; *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("Copyright © 2024 Tours Andorra. All Rights Reserved. Design by AD700 Management")}
                    {...register("copyright", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.copyright && errors.copyright.message}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>{t("Contact Title")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("Need help? Call us")}
                    {...register("contact_title")}
                  />
                  <div className="invalid-feedback">
                    {errors.contact_title && errors.contact_title.message}
                  </div>
                </div>
              </div>

              <div className="col-12 mb-4 mt-3">
                {!saving && (
                  <button type="submit" className="btn btn-primary float-end">
                    {t("Save")}
                  </button>
                )}
                {saving && (
                  <button type="submit" className="btn btn-disabled float-end" disabled>
                    {t("Saving ...")}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterDetails 