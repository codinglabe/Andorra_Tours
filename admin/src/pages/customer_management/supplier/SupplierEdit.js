import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { callFetch } from "../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import CustomerCategoryModal from "./CustomerCategoryModal";

function SupplierEdit() {
    let params = useParams();
    const { t } = useTranslation();
    const [supplierType, setSupplierType] = useState('Private Person');
    const [customerCategories, setCustomerCategories] = useState([]);
    const [contactPersons, setContactPersons] = useState([{ name: '', gender: '', emails: [''], phones: [''] }]);
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [editDelay, setEditDelay] = useState(0);
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => { }, [contactPersons]);

    useEffect(() => {
        callFetch("customer-categories", "GET", []).then((res) => {
            setCustomerCategories(res.data);
            setEditDelay(editDelay + 1);
        });
    }, [refresh]);

    useEffect(() => {
        if (editDelay == 1)
            callFetch("suppliers/" + params.id + "/edit", "GET", []).then((res) => {
                for (let [key, value] of Object.entries(res.data)) {
                    setValue(key, value);
                }
                let cp = JSON.parse(res.data.contact_person);
                setContactPersons(cp);
            });
    }, [editDelay,params.id]);

    const onSubmit = (formData) => {
        setSaving(true);
        let cp = [];
        for (let i = 0; i < contactPersons.length; i++) {
            if (!contactPersons[i])
                continue;
            cp.push(contactPersons[i]);
        }
        formData.contact_person = JSON.stringify(cp);
        callFetch("suppliers/" + params.id, "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };

    return submitSuccess ? <Navigate to='/product-management/suppliers' /> :
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t('Edit Supplier')}</h6>
                    </div>
                    <div className="card-body">
                        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <input type="hidden" defaultValue="PUT" {...register("_method")} />

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Supplier Type')} *
                                        </label>
                                        <select
                                            className="form-control"
                                            {...register("type", {
                                                required: true
                                            })}
                                            onChange={(e) => setSupplierType(e.target.value)}
                                            required
                                        >
                                            <option value="Private Person">{t('Private Person')}</option>
                                            <option value="Company">{t('Company')}</option>
                                        </select>
                                        <div className="invalid-feedback">{errors.type && errors.type.message}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>
                                        {t('Supplier Number')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. 123')}
                                        {...register("identity_number", {
                                            required: true,
                                        })}
                                        readOnly
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.identity_number && errors.identity_number.message}</div>
                                </div>
                                <div className="col-md-6">
                                    <label>
                                        {supplierType == 'Company' ? t('Supplier Company') : t('Supplier Name/Surname')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. Google')}
                                        {...register("name", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.name && errors.name.message}</div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>
                                        {t('Email')}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. email@mail.com')}
                                        {...register("email")}
                                    />
                                    <div className="invalid-feedback">{errors.email && errors.email.message}</div>
                                </div>
                                <div className="col-md-6">
                                    <label>
                                        {t('Phone')}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. 98765432')}
                                        {...register("phone")}
                                    />
                                    <div className="invalid-feedback">{errors.phone && errors.phone.message}</div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Supplier Category')} *
                                        </label>
                                        <br />
                                        <select
                                            className="form-control"
                                            {...register("customer_category_id", {
                                                required: true,
                                            })}
                                            style={{ float: 'left', width: '65%' }}
                                            required
                                        >
                                            <option value="">--</option>
                                            {customerCategories && customerCategories.map((category) => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                        &nbsp;
                                        <button className="btn btn-outline-secondary" type="button" data-bs-toggle="modal" data-bs-target="#customerCategoryModal" style={{ padding: '11px 25px' }}>{t('Add')}</button>
                                        <div className="invalid-feedback">{errors.customer_category_id && errors.customer_category_id.message}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label>{t('Logo')}</label>
                                    <input type="file" className="form-control mb-4" {...register("logo")} />
                                    <div className="invalid-feedback">{errors.logo && errors.logo.message}</div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-3">
                                    <label>
                                        {t('Country')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. Germany')}
                                        {...register("country", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.country && errors.country.message}</div>
                                </div>
                                <div className="col-md-3">
                                    <label>
                                        {t('State')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. State')}
                                        {...register("state", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.state && errors.state.message}</div>
                                </div>
                                <div className="col-md-3">
                                    <label>
                                        {t('Zip Code')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. Zip Code')}
                                        {...register("zip_code", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.zip_code && errors.zip_code.message}</div>
                                </div>
                                <div className="col-md-3">
                                    <label>
                                        {t('City')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. City')}
                                        {...register("city", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.city && errors.city.message}</div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-3">
                                    <label>
                                        {t('Street')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. 123 street')}
                                        {...register("street", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.street && errors.street.message}</div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>
                                            {t('Status')}
                                        </label>
                                        <select
                                            className="form-control"
                                            {...register("status", {
                                                required: true
                                            })}
                                            required
                                        >
                                            <option value="">--</option>
                                            <option value="Active">{t('Active')}</option>
                                            <option value="Inactive">{t('Inactive')}</option>
                                        </select>
                                        <div className="invalid-feedback">{errors.status && errors.status.message}</div>
                                    </div>
                                </div>
                            </div>

                            {contactPersons && contactPersons.map((contactPerson, i) => (
                                <div className="border rounded p-3 mb-4" key={i}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5>{t('Contact Person')}</h5>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="button" onClick={() => { delete contactPersons[i]; setRefresh(refresh + 1); }} className="btn btn-danger float-end">{t('Delete')}</button>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label>
                                                {t('Contact Person')}
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mb-4"
                                                placeholder={t('eg. Jhon Doe')}
                                                defaultValue={contactPerson.name}
                                                onKeyUp={e => { contactPersons[i].name = e.target.value; setContactPersons(contactPersons); }}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>
                                                    {t('Gender')}
                                                </label>
                                                <select
                                                    className="form-control" value={contactPerson.gender}
                                                    onChange={e => { contactPersons[i].gender = e.target.value; setContactPersons(contactPersons); }}
                                                >
                                                    <option value="">--</option>
                                                    <option value="Male">{t('Male')}</option>
                                                    <option value="Female">{t('Female')}</option>
                                                    <option value="Other">{t('Others')}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label>
                                                {t('Email')}
                                            </label>
                                            {contactPerson.emails.map((email, j) => (
                                                <div key={j}>
                                                    <input
                                                        style={{ width: '97%' }}
                                                        type="email"
                                                        className="form-control mb-1 float-start"
                                                        placeholder={t('eg. email@mail.com')}
                                                        defaultValue={email}
                                                        onKeyUp={e => { contactPersons[i].emails[j] = e.target.value; setContactPersons(contactPersons); }}
                                                    />
                                                    {j > 0 && <p className="float-end" onClick={() => { delete contactPersons[i].emails[j]; setContactPersons(contactPersons); setRefresh(refresh + 1) }} style={{ cursor: 'pointer' }}>x</p>}
                                                    <div className="clearfix"></div>
                                                </div>
                                            ))}
                                            <p style={{ cursor: 'pointer' }} onClick={() => { contactPersons[i].emails.push(''); setRefresh(refresh + 1) }}>
                                                <i className="fa-solid fa-circle-plus"></i>
                                                Add
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <label>
                                                {t('Phone')}
                                            </label>
                                            {contactPerson.phones.map((phone, j) => (
                                                <div key={j}>
                                                    <input
                                                        style={{ width: '97%' }}
                                                        type="text"
                                                        className="form-control mb-1 float-start"
                                                        placeholder={t('eg. 98765432')}
                                                        defaultValue={phone}
                                                        onKeyUp={e => { contactPersons[i].phones[j] = e.target.value; setContactPersons(contactPersons); }}
                                                    />
                                                    {j > 0 && <p className="float-end" onClick={() => { delete contactPersons[i].phones[j]; setContactPersons(contactPersons); setRefresh(refresh + 1) }} style={{ cursor: 'pointer' }}>x</p>}
                                                    <div className="clearfix"></div>
                                                </div>
                                            ))}
                                            <p style={{ cursor: 'pointer' }} onClick={() => { contactPersons[i].phones.push(''); setRefresh(refresh + 1) }}>
                                                <i className="fa-solid fa-circle-plus"></i>
                                                Add
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <p className="btn btn-dark float-end" style={{ cursor: 'pointer' }} onClick={() => { contactPersons.push({ name: '', gender: '', emails: [''], phones: [''] }); setRefresh(refresh + 1) }}>
                                <i className="fa-solid fa-circle-plus"></i>
                                &nbsp;{t('Add contact person')}
                            </p>

                            <div className="col-12 mb-4">
                                {!saving && (
                                    <button type="submit" className="btn btn-primary">
                                        {t('Save')}
                                    </button>
                                )}
                                {saving && (
                                    <button type="submit" className="btn btn-disabled" disabled>
                                        {t('Saving ...')}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <CustomerCategoryModal refreshParent={() => setRefresh(refresh + 1)} />
            </div>
        </div>;
}

export default SupplierEdit;
