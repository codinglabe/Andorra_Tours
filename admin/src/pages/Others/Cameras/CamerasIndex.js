import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import WebcamsTable from './WebcamsTable';

function CamerasIndex() {
    const { t } = useTranslation();
    useEffect(() => {
        document.title = "Tours Andorra . Travel";
    }, []);
    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    <NavLink to="/others/webcams/create" className="btn btn-icon btn-primary">
                        {t('Add Webcam')}
                    </NavLink>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6 className="text-capitalize">{t('Webcams')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <WebcamsTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CamerasIndex