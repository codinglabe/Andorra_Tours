import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import callFetch from "helpers/callFetch";
const PartnerEdit = () => {
    const params = useParams();
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
        if (params?.id) {
            callFetch("footer-partners/" + params.id, "GET", []).then((res) => {
                for (let [key, value] of Object.entries(res.data)) {
                    if (key !== "partner_logo") {
                        setValue(key, value);
                    }

                }
            });
        }
    }, [params?.id]);

    const onSubmit = (formData) => {
        setSaving(true);
        callFetch("footer-partners/" + params.id, "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };
    return submitSuccess ? <Navigate to="/footer/partners" /> : (
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t("Create Partner")}</h6>
                    </div>
                    <div className="card-body">
                        <form
                            className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""
                                }`}
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            autoComplete="off"
                        >

                            <input type="hidden" defaultValue="PUT" {...register("_method")} />


                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>{t("Partner Name")} *</label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t("Partner name")}
                                        {...register("partner_name", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {errors.partner_name && errors.partner_name.message}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label>{t("Status")} *</label>
                                    <select
                                        class="form-control"
                                        {...register("status", { required: true })}
                                        required
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        {errors.status && errors.status.message}
                                    </div>
                                </div>
                            </div>

                            <div className="row g-3">
                                <div className="col-md-12">
                                    <label>{t("Partner Logo")} *</label>
                                    <input
                                        type="file"
                                        className="form-control mb-4"
                                        placeholder={t("Page title")}
                                        {...register("partner_logo")}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.partner_logo && errors.partner_logo.message}
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

export default PartnerEdit