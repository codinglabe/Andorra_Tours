import React, { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import callFetch from "helpers/callFetch";
import SoftEditor from "components/SoftEditor";
import { useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

const ProductInfo = ({ formData }) => {
    const params = useParams();
    const { register, handleSubmit, setError, setValue, getValues, errors, data } = formData;
    const [description, setDescription] = useState("");
    const { t } = useTranslation();
    const [refresh, setRefresh] = useState(0);
    const [veranos, setVeranos] = useState([]);
    const [veranoId, setVeranoId] = useState(0);
    const [files, setFiles] = useState([]);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [removedPhotos, setRemovedPhotos] = useState([])
    const inputRef = useRef(null);
    const [metaTags, setMetaTags] = useState([]);

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFiles([...files, file])
    };

    useEffect(() => {
        if (params?.id) {
            callFetch("multiples/" + params?.id + "?product_for=" + params?.slug, "GET", []).then((res) => {
                for (let [key, value] of Object.entries(res.data)) {
                    if (key === "meta_tags") {
                        // Ensure meta_tags is an array
                        if (key === "meta_tags") {
                            // Ensure meta_tags is an array
                            const tagsArray = Array.isArray(value)
                                ? value
                                : typeof value === "string"
                                    ? value.split(",")
                                    : [];

                            setMetaTags(tagsArray.map(tag => ({ value: tag, label: tag })));
                            setValue("meta_tags", tagsArray);
                        }
                    }
                }
            });
        }
    }, [params?.id]);

    const handleMetaTagsChange = (selectedOptions) => {
        const tagsArray = selectedOptions ? selectedOptions.map(tag => tag.value) : [];
        setMetaTags(selectedOptions);
        setValue("meta_tags", tagsArray);
    };

    useEffect(() => {
        if (files) {
            const updatedFileList = new DataTransfer();
            files.forEach((file) => {
                updatedFileList.items.add(file);
            });
            setValue('photos', updatedFileList.files);
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    }, [files])

    useEffect(() => {
        callFetch("multiple/" + params?.slug, "GET", []).then((res) => {
            setVeranos(res?.data);
        });

        setVeranoId(data?.inverano_id)
        if (params?.slug === "inverano") {
            setValue(params?.slug, data?.inverano_id)
        }
        if (params?.slug === "verano") {
            setValue(params?.slug, data?.verano_id)
        }
        setDescription(data?.description)
        if (data?.photos) {
            const photosJson = JSON.parse(data?.photos);
            setUploadedPhotos(photosJson)
        }

    }, [formData?.params?.id, formData.data, getValues]);


    const handleDeleteFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleRemoveUploadedFile = (index) => {
        const photoToRemove = uploadedPhotos[index];
        setRemovedPhotos((prevRemovedPhotos) => {
            const updatedRemovedPhotos = [...prevRemovedPhotos, photoToRemove];
            setValue('remove_photos', updatedRemovedPhotos.join(','));
            return updatedRemovedPhotos;
        });
        setUploadedPhotos((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };
    return (
        <>
            <div className="row g-3">
                <div className="col-md-6">
                    <div class="form-group">
                        <label className="text-capitalize">{t(params?.slug)} *</label>
                        <select placeholder={t(params?.slug)}
                            {...register(`${params?.slug}`, {
                                required: true,
                            })}
                            required className=" form-control" value={veranoId} onChange={(e) => {
                                setVeranoId(e.target.value)
                                setValue(`${params?.slug}`, e.target.value)
                            }}>
                            <option>{t("--Select--")}</option>
                            {
                                veranos && veranos?.map((verano, i) => (
                                    <option key={verano?.id} value={verano?.id}>{verano?.title}</option>
                                ))
                            }
                        </select>
                        <div className="invalid-feedback">
                            {errors.verano && errors.verano.message}
                        </div>

                    </div>
                </div>
                <div className="col-md-6">
                    <div class="form-group">
                        <label>{t("Status")} *</label>
                        <select placeholder={t("status")}
                            {...register("status", {
                                required: true,
                            })}
                            required className=" form-control">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <div className="invalid-feedback">
                            {errors.status && errors.status.message}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex align-items-center w-100">
                        <div class="form-group w-100">
                            <label>{t("Title")} *</label>
                            <input
                                type="text"
                                className="form-control "
                                {...register("title", {
                                    required: true,
                                })}
                                required
                                placeholder={t("Title")}
                            />
                            <div className="invalid-feedback">
                                {errors.title && errors.title.message}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div class="form-group w-100">
                        <label>{t("Photos")} *</label>
                        <input
                            type="file"
                            ref={inputRef}
                            className="form-control mb-1"
                            onChange={handleFileChange}
                        />
                        {(uploadedPhotos?.length > 0 || files?.length > 0) && <div className="bg-light rounded p-2 d-flex align-items-center justify-content-center w-100">
                            {
                                uploadedPhotos?.length > 0 && (
                                    <div className=" d-flex align-items-center justify-content-center">
                                        {uploadedPhotos?.map((photo, i) => (
                                            <div className="d-flex align-items-center gap-2 position-relative" key={i}>
                                                <img
                                                    src={process.env.REACT_APP_STORAGE_URL + photo}
                                                    alt={`preview-${i}`}
                                                    className="img-thumbnail"
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                                <i
                                                    className="fa-solid fa-circle-xmark text-danger cursor-pointer position-absolute top-0 end-0"
                                                    onClick={() => handleRemoveUploadedFile(i)}
                                                ></i>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                            {files?.length > 0 && (
                                <div className="d-flex align-items-center justify-content-center">
                                    {files.map((file, i) => (
                                        <div className="d-flex align-items-center gap-2 position-relative" key={i}>
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`preview-${i}`}
                                                className="img-thumbnail"
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />
                                            <i
                                                className="fa-solid fa-circle-xmark text-danger cursor-pointer position-absolute top-0 end-0"
                                                onClick={() => handleDeleteFile(i)}
                                            ></i>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>}
                        <div className="invalid-feedback">
                            {errors.photos && errors.photos.message}
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div class="form-group">
                        <label>{t("Description")} *</label>
                        <SoftEditor value={description} onChange={(e) => {
                            setDescription(e)
                            setValue("description", e)
                        }} />
                        <div className="invalid-feedback">
                            {errors.description && errors.description.message}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                <h5 className="mt-4">Seo Settings</h5>
                <div className="col-md-6">
                    <label>{t("Meta Title")} *</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t("Meta Title")}
                        {...register("meta_title", {
                            required: true,
                        })}
                        required
                    />
                    <div className="invalid-feedback">
                        {errors.meta_title && errors.meta_title.message}
                    </div>
                </div>
                <div className="col-md-6">
                    <label>{t("Meta Tags")} (Optional)</label>
                    <CreatableSelect
                        isMulti
                        value={metaTags}
                        onChange={handleMetaTagsChange}
                        className={`basic-multi-select ${errors.meta_tags ? "is-invalid" : ""}`}
                        classNamePrefix="select"
                        placeholder={t("Type and press Enter")}
                    />
                    {errors.meta_tags && <div className="invalid-feedback d-block">{errors.meta_tags.message}</div>}
                </div>
                <div className="col-md-6 mb-3">
                    <label>{t("Meta Description")} *</label>
                    <textarea
                        className="form-control"
                        placeholder={t("Enter Meta Description")}
                        {...register("meta_description", { required: true })}
                        required
                    ></textarea>
                    <div className="invalid-feedback">
                        {errors.meta_description && errors.meta_description.message}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductInfo