import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import DataTable from 'react-data-table-component';
import callFetch from 'helpers/callFetch';
import deleteAlert from 'helpers/deleteAlert';

function OfferBannerIndexTable() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [roles, setRoles] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [searchKey, setSearchKey] = useState("")

  const tableHeadings = [
    {
      name: t('ID'),
      width: "150px",
      sortable: true,
      reorder: true,
      selector: row => <NavLink to={`/theme-customization/banner-slider/${row.id}/edit`} >{row.id}</NavLink>
    },
    {
      name: t('Banner Image'),
      width: "200px",
      sortable: true,
      reorder: true,
      selector: row => <div className="row mt-1 mb-1 d-flex align-items-center" style={{ width: '600px' }}>
        <div className="col-2 pe-0">
          <img className="avatar w-100" src={row?.banner_image ? process.env.REACT_APP_STORAGE_URL + row?.banner_image : '/assets/img/placeholder.png'} alt="photo" />
        </div>
      </div>
    },
    {
      name: t('Banner Title'),
      sortable: true,
      reorder: true,
      selector: row => row.banner_title
    },
    {
      name: t('Button Link'),
      sortable: true,
      reorder: true,
      selector: row => row.button_link
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
            <NavLink to={'/theme-customization/banner-slider/' + row.id + '/edit'} className="dropdown-item">
              {t('Edit')}
            </NavLink>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'promotion', row?.id, t).then(res => setRefresh(refresh + 1))}>{t('Delete')}</a></li>
        </ul>
      </div>
    }
  ];

  useEffect(() => {
    callFetch("promotion?page=" + pageNumber, "GET", []).then((res) => {
      setData(res.data)
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
        setData(res.data)
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

    const pages = data.last_page;
    const pageItems = toPages(pages);
    const nextDisabled = currentPage === data.last_page;
    const previosDisabled = currentPage === 1;

    return (
      <>
        <br />
        <p className="float-md-start pt-2 text-secondary text-xs font-weight-bolder ms-3">{t('Showing')} {data.from} {t('to')} {data.to} {t('of')} {data.total} {t('entries')}</p>
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
    data={data?.data}
    noDataComponent={t('There are no records to display')}
    pagination
    highlightOnHover
    paginationComponentOptions={{ noRowsPerPage: true }}
    paginationServer
    paginationTotalRows={data?.total}
    onChangePage={handlePageChange}
    paginationComponent={BootyPagination}
    subHeader
    subHeaderComponent={<input type="text" placeholder='Search...' className=' form-control w-15' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />}
  />;
}


export default OfferBannerIndexTable 