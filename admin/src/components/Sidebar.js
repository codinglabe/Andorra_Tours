import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import callFetch from "helpers/callFetch";
import Cookies from "js-cookie";

function Sidebar() {
    const { t } = useTranslation();
    const [lastMessage, setLastMessage] = useState([]);
    const [authId, setAuthId] = useState('');
    const [nowDrop, setNowDrop] = useState(window.location.href.split('/')[3]);
    let navClassName = "nav-link";
    let activeClassName = "nav-link active";
    let dropdownClass = "collapse";
    let dropdownClassShow = "collapse show";

    const allowedEmail = process.env.REACT_APP_ALLOWED_EMAIL;
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    const canAccessCategories = user?.email === allowedEmail;

    useEffect(() => {
        callFetch("chatuser-sidebar", "GET", []).then((res) => {
            setLastMessage(res.lastMessage);
            setAuthId(res.authId);
        });
    }, [])

    return (
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
                <a className="navbar-brand text-center m-0" href="/">
                    <img src="/assets/img/tours_andorra.png" className="navbar-brand-img" alt="main_logo" />
                </a>
            </div>
            <hr className="horizontal dark mt-0" />
            <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/dashboard" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                            <i className="fa-solid fa-dashboard icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                            <span className="nav-link-text ms-1">{t('Dashboard')}</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        {lastMessage && (
                            <NavLink to={lastMessage.sender_id == authId ? '/chat/message/' + lastMessage.receiver_id : '/chat/message/' + lastMessage.sender_id} onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                <i className="fa-solid fa-envelope icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                                <span className="nav-link-text ms-1">{t('Message')}</span>
                            </NavLink>
                        )}
                        {!lastMessage && (
                            <NavLink to='/chat' onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                <i className="fa-solid fa-envelope icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                                <span className="nav-link-text ms-1">{t('Message')}</span>
                            </NavLink>
                        )}
                    </li>
                    <li className="nav-item">
                        <NavLink to="/customer-management/customers" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                            <i className="fa-solid fa-user-group icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                            <span className="nav-link-text ms-1">{t('Customers')}</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/booking-management/bookings" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                            <i className="fa-solid fa-basket-shopping icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                            <span className="nav-link-text ms-1">{t('Bookings')}</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/coupons" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                            <i className="fa-solid fa-ticket icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                            <span className="nav-link-text ms-1">{t('Cupons')}</span>
                        </NavLink>
                    </li>


                    <li className="nav-item" style={{ display: canAccessCategories ? "block" : "none" }}>
                        <a data-bs-toggle="collapse" href="#categories" className={nowDrop === 'categories' ? activeClassName : navClassName} aria-controls="categories" role="button" aria-expanded={nowDrop === 'categories'}>
                            <i className="fa-solid fa-folder-tree icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"></i>
                            <span className="nav-link-text ms-1">{t('Categories')}</span>
                        </a>
                        <div className={nowDrop === 'categories' ? dropdownClassShow : dropdownClass} id="categories">
                            <ul className="nav ms-4 ps-3">
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/categories/category" onClick={(e) => setNowDrop('categories')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Category')}</span>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/categories/sub-category" onClick={(e) => setNowDrop('categories')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Sub Category')}</span>
                                        </NavLink>
                                    </li>
                                </>
                            </ul>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a data-bs-toggle="collapse" href="#theme-customization" className={nowDrop === 'theme-customization' ? activeClassName : navClassName} aria-controls="theme-customization" role="button" aria-expanded={nowDrop === 'theme-customization'}>
                            <i className="fa-solid fa-wand-magic-sparkles icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"></i>
                            <span className="nav-link-text ms-1">{t('Customization')}</span>
                        </a>
                        <div className={nowDrop === 'theme-customization' ? dropdownClassShow : dropdownClass} id="theme-customization">
                            <ul className="nav ms-4 ps-3">
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/theme-customization/header" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Header')}</span>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/theme-customization/hero" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Hero Section')}</span>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/theme-customization/verano" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Verano')}</span>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/theme-customization/inverano" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Inverano')}</span>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/theme-customization/banner-slider" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Banner Slider')}</span>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/theme-customization/servcios-exclusivos" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Servcios Exclusivos')}</span>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/theme-customization/category-slider" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Category Slider')}</span>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/theme-customization/advertisement" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Advertisement')}</span>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/theme-customization/why-travels" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Why Travel')}</span>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/theme-customization/testimonials" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Testimonials')}</span>
                                        </NavLink>
                                    </li>
                                </>
                            </ul>
                        </div>
                    </li>


                    <li className="nav-item">
                        <a data-bs-toggle="collapse" href="#details" className={nowDrop === 'details' ? activeClassName : navClassName} aria-controls="details" role="button" aria-expanded={nowDrop === 'details'}>
                            <i className="fa-solid fa-newspaper icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"></i>
                            <span className="nav-link-text ms-1">{t('Details')}</span>
                        </a>
                        <div className={nowDrop === 'details' ? dropdownClassShow : dropdownClass} id="details">
                            <ul className="nav ms-4 ps-3">
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/details/verano" onClick={(e) => setNowDrop('details')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Verano')}</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/details/inverano" onClick={(e) => setNowDrop('details')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Inverano')}</span>
                                        </NavLink>
                                    </li>
                                </>
                            </ul>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a data-bs-toggle="collapse" href="#hotels" className={nowDrop === 'hotels' ? activeClassName : navClassName} aria-controls="hotels" role="button" aria-expanded={nowDrop === 'hotels'}>
                            <i className="fa-solid fa-hotel icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"></i>
                            <span className="nav-link-text ms-1">{t('Hotel')}</span>
                        </a>
                        <div className={nowDrop === 'hotels' ? dropdownClassShow : dropdownClass} id="hotels">
                            <ul className="nav ms-4 ps-3">
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/hotels" onClick={(e) => setNowDrop('hotels')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Hotels')}</span>
                                        </NavLink>
                                    </li>
                                </>
                            </ul>
                        </div>
                    </li>


                    <li className="nav-item">
                        <a data-bs-toggle="collapse" href="#products" className={nowDrop === 'products' ? activeClassName : navClassName} aria-controls="products" role="button" aria-expanded={nowDrop === 'products'}>
                            <i className="fa-solid fa-cart-flatbed icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"></i>
                            <span className="nav-link-text ms-1">{t('Products')}</span>
                        </a>
                        <div className={nowDrop === 'products' ? dropdownClassShow : dropdownClass} id="products">
                            <ul className="nav ms-4 ps-3">
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/products/verano/product" onClick={(e) => setNowDrop('products')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Verano Products')}</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/products/inverano/product" onClick={(e) => setNowDrop('products')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Inverano Products')}</span>
                                        </NavLink>
                                    </li>
                                </>
                            </ul>
                        </div>
                    </li>


                    <li className="nav-item">
                        <NavLink to="/blogs" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                            <i className="fa-solid fa-blog icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                            <span className="nav-link-text ms-1">{t('Blogs')}</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/service-newsletter" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                            <i className="fa-solid fa-envelope-open-text icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                            <span className="nav-link-text ms-1">{t('Service Newsletter')}</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <a data-bs-toggle="collapse" href="#others" className={nowDrop === 'others' ? activeClassName : navClassName} aria-controls="others" role="button" aria-expanded={nowDrop === 'others'}>
                            <i className="fa-solid fa-arrows-to-dot icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"></i>
                            <span className="nav-link-text ms-1">{t('Others')}</span>
                        </a>
                        <div className={nowDrop === 'others' ? dropdownClassShow : dropdownClass} id="others">
                            <ul className="nav ms-4 ps-3">
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/others/partners" onClick={(e) => setNowDrop('others')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Partners')}</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/others/providers" onClick={(e) => setNowDrop('others')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Providers')}</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/others/webcams" onClick={(e) => setNowDrop('others')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Webcams')}</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/others/resorts" onClick={(e) => setNowDrop('others')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Resorts')}</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/others/maps" onClick={(e) => setNowDrop('others')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Maps')}</span>
                                        </NavLink>
                                    </li>
                                </>
                            </ul>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a data-bs-toggle="collapse" href="#footer" className={nowDrop === 'footer' ? activeClassName : navClassName} aria-controls="footer" role="button" aria-expanded={nowDrop === 'footer'}>
                            <i className="fa-solid fa-copyright icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"></i>
                            <span className="nav-link-text ms-1">{t('Footer')}</span>
                        </a>
                        <div className={nowDrop === 'footer' ? dropdownClassShow : dropdownClass} id="footer">
                            <ul className="nav ms-4 ps-3">
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/footer/details" onClick={(e) => setNowDrop('footer')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Details')}</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/footer/page-category" onClick={(e) => setNowDrop('footer')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Page Category')}</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/footer/pages" onClick={(e) => setNowDrop('footer')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Pages')}</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/footer/partners" onClick={(e) => setNowDrop('footer')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Partners')}</span>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/footer/social-links" onClick={(e) => setNowDrop('footer')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Social Links')}</span>
                                        </NavLink>
                                    </li>
                                </>
                            </ul>
                        </div>
                    </li>


                    {/* Seo Settings */}
                    <li className="nav-item">
                        <NavLink to="/seo-settings" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                            <i className="fa-solid fa-magnifying-glass-chart icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                            <span className="nav-link-text ms-1">{t('Seo Settings')}</span>
                        </NavLink>
                    </li>



                    {/* <li className="nav-item">
                        <NavLink to="/translations" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                            <i className="fa-solid fa-language icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                            <span className="nav-link-text ms-1">{t('Translations')}</span>
                        </NavLink>
                    </li> */}

                    {/* <li className="nav-item">
                        <a data-bs-toggle="collapse" href="#user-settings" className={nowDrop === 'user-settings' ? activeClassName : navClassName} aria-controls="user-settings" role="button" aria-expanded={nowDrop === 'user-settings'}>
                            <i className="fa-solid fa-gear icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"></i>
                            <span className="nav-link-text ms-1">{t('Settings')}</span>
                        </a>
                        <div className={nowDrop === 'user-settings' ? dropdownClassShow : dropdownClass} id="user-settings">
                            <ul className="nav ms-4 ps-3">
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/user-settings/roles" onClick={(e) => setNowDrop('user-settings')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Settings')}</span>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/user-settings/smtp/1/edit" onClick={(e) => setNowDrop('user-settings')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                            <span className="sidenav-normal">{t('Email Setup')}</span>
                                        </NavLink>
                                    </li>
                                </>
                            </ul>
                        </div>
                    </li> */}
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
