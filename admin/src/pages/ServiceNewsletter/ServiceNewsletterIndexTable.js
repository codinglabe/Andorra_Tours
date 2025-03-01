import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import DataTable from 'react-data-table-component';
import Cookies from 'js-cookie';
import callFetch from 'helpers/callFetch';
import deleteAlert from 'helpers/deleteAlert';

function ServiceNewsletterIndexTable() {
    const { t } = useTranslation();
    const [serviceNewsletter, setServiceNewsletter] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [roles, setRoles] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [searchKey, setSearchKey] = useState("")

    const tableHeadings = [
        {
            name: t('ID'),
            sortable: true,
            reorder: true,
            selector: row => <NavLink to={`/service-newsletter/${row.id}/edit`} >{row.id}</NavLink>
        },
        {
            name: t('Service Image'),
            width: "200px",
            sortable: true,
            reorder: true,
            selector: row => <div>
                <img className="avatar avatar-sm" src={row?.get_service?.service_image ? process.env.REACT_APP_STORAGE_URL + row?.get_service?.service_image : '/assets/img/placeholder.png'} alt="photo" />
            </div>
        },
        {
            name: t('Service Name'),
            sortable: true,
            reorder: true,
            selector: row => row.get_service.service_name
        },
        {
            name: t('Actions'),
            sortable: true,
            reorder: true,
            cell: row => <div className="text-center dropstart">
                <a href="/" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-ellipsis-v text-xs"></i>
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <NavLink to={'/service-newsletter/' + row.id + '/view'} className="dropdown-item">
                            {t('View')}
                        </NavLink>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'service-newsletter', row?.id, t).then(res => setRefresh(refresh + 1))}>{t('Delete')}</a></li>
                </ul>
            </div>
        }
    ];

    useEffect(() => {
        callFetch("service-newsletter?page=" + pageNumber, "GET", []).then((res) => {
            console.log(res.data);
            setServiceNewsletter(res.data)
        });
    }, [pageNumber, refresh]);

    const handlePageChange = page => {
        setPageNumber(page);
    }

    function toPages(pages) {
        const results = [];

        for (let i = 1; i <= pages; i++) {
            results.push(i);
        }

        return results;
    }


    useEffect(() => {
        if (searchKey.length > 0) {
            callFetch('employee/serach/' + searchKey, "GET", []).then((res) => {
                setServiceNewsletter(res.data)
            })

        } else {
            setRefresh(refresh + 1)
        }
    }, [searchKey])

    // RDT exposes the following internal pagination properties
    const BootyPagination = ({
        onChangePage,
        currentPage
    }) => {
        const handleBackButtonClick = () => {
            onChangePage(currentPage - 1);
        };

        const handleNextButtonClick = () => {
            onChangePage(currentPage + 1);
        };

        const handlePageNumber = (e) => {
            onChangePage(Number(e.target.value));
        };

        const pages = serviceNewsletter.last_page;
        const pageItems = toPages(pages);
        const nextDisabled = currentPage === serviceNewsletter.last_page;
        const previosDisabled = currentPage === 1;

        return (
            <>
                <br />
                <p className="float-md-start pt-2 text-secondary text-xs font-weight-bolder ms-3">{t('Showing')} {serviceNewsletter.from} {t('to')} {serviceNewsletter.to} {t('of')} {serviceNewsletter.total} {t('entries')}</p>
                <nav className="float-md-end me-2">
                    <ul className="pagination">
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={handleBackButtonClick}
                                disabled={previosDisabled}
                                aria-disabled={previosDisabled}
                                aria-label="previous page"
                            >
                                &#60;
                            </button>
                        </li>
                        {pageItems.map((page) => {
                            const className =
                                page === currentPage ? "page-item active" : "page-item";

                            return (
                                <li key={page} className={className}>
                                    <button
                                        className="page-link"
                                        onClick={handlePageNumber}
                                        value={page}
                                    >
                                        {page}
                                    </button>
                                </li>
                            );
                        })}
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={handleNextButtonClick}
                                disabled={nextDisabled}
                                aria-disabled={nextDisabled}
                                aria-label="next page"
                            >
                                &#62;
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="clearfix"></div>
            </>
        );
    };

    return <DataTable
        columns={tableHeadings}
        data={serviceNewsletter?.data}
        noDataComponent={t('There are no records to display')}
        pagination
        highlightOnHover
        paginationComponentOptions={{ noRowsPerPage: true }}
        paginationServer
        paginationTotalRows={serviceNewsletter?.total}
        onChangePage={handlePageChange}
        paginationComponent={BootyPagination}
        subHeader
        subHeaderComponent={<input type="text" placeholder='Search...' className=' form-control w-15' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />}
    />;
}

export default ServiceNewsletterIndexTable