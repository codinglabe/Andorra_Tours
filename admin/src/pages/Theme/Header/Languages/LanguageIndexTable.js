import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import DataTable from 'react-data-table-component';
import Cookies from 'js-cookie';
import callFetch from 'helpers/callFetch';
import deleteAlert from 'helpers/deleteAlert';
import LanguageCreateModal from './LanguageCreateModal';

function LanguageIndexTable({modalTitle}) {
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);
    const [modalData, setModalData] = useState({modalTitle: modalTitle?.modalTitle, id:""})
    const [pageNumber, setPageNumber] = useState(1);
    const [roles, setRoles] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [searchKey, setSearchKey] = useState("")
    useEffect(() => {
        setModalData({modalTitle: modalTitle?.modalTitle})
    }, [modalTitle]);
    const tableHeadings = [
        {
            name: t('ID'),
            sortable: true,
            reorder: true,
            selector: row => <NavLink to={`/categories/category/${row.id}/edit`} >{row.id}</NavLink>
        },
        {
            name: t('Name'),
            sortable: true,
            reorder: true,
            selector: row => row.name
        },

        {
            name: t('Status'),
            sortable: true,
            reorder: true,
            selector: row => row.status
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
                        <button type="button" data-bs-toggle="modal" data-bs-target="#customerCategoryModal" onClick={()=>setModalData({modalTitle:"Language Edit",id:row?.id})} className="dropdown-item">
                            {t('Edit')}
                        </button>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'languages', row?.id, t).then(res => setRefresh(refresh + 1))}>{t('Delete')}</a></li>
                </ul>
            </div>
        }
    ];

    useEffect(() => {
        callFetch("languages?page=" + pageNumber, "GET", []).then((res) => {
            setCategories(res?.data)
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

        const pages = categories.last_page;
        const pageItems = toPages(pages);
        const nextDisabled = currentPage === categories.last_page;
        const previosDisabled = currentPage === 1;

        return (
            <>
                <br />
                <p className="float-md-start pt-2 text-secondary text-xs font-weight-bolder ms-3">{t('Showing')} {categories.from} {t('to')} {categories.to} {t('of')} {categories.total} {t('entries')}</p>
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

    return <><DataTable
        columns={tableHeadings}
        data={categories?.data}
        noDataComponent={t('There are no records to display')}
        pagination
        highlightOnHover
        paginationComponentOptions={{ noRowsPerPage: true }}
        paginationServer
        paginationTotalRows={categories?.total}
        onChangePage={handlePageChange}
        paginationComponent={BootyPagination}

    />
        <LanguageCreateModal modalData={modalData} refreshParent={() => setRefresh(refresh + 1)} />
    </>
}
export default LanguageIndexTable