import React, { Fragment, useState, useEffect } from 'react';
import { ADMINMENUITEMS, USERMENUITEMS } from './Menu';
import { ArrowRight, ArrowLeft, Grid } from 'react-feather';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import configDB from '../../../data/customizer/config';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';

const Sidebar = ({ logout, rest, Auth: { userType } }) => {
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split('/');
  // ADMINMENUITEMS
  const [mainmenu, setMainMenu] = useState(
    userType === 'Superadmin' ? ADMINMENUITEMS : USERMENUITEMS
  );
  const [margin, setMargin] = useState(0);
  const [width, setWidth] = useState(0);
  const [sidebartoogle, setSidebartoogle] = useState(true);
  const wrapper =
    useSelector((content) => content.Customizer.sidebar_types.type) ||
    configDB.data.settings.sidebar.type;

  useEffect(() => {
    document.querySelector('.left-arrow').classList.add('d-none');

    window.addEventListener('resize', handleResize);
    handleResize();

    const currentUrl = window.location.pathname;
    mainmenu.map((items) => {
      items.Items.filter((Items) => {
        if (Items.path === currentUrl) setNavActive(Items);
        if (!Items.children) return false;
        Items.children.filter((subItems) => {
          if (subItems.path === currentUrl) setNavActive(subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems);
              return true;
            } else {
              return false;
            }
          });
          return subItems;
        });
        return Items;
      });
      return items;
    });

    return () => {
      window.removeEventListener('resize', handleResize);
    };

    // eslint-disable-next-line
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth - 500);
  };

  const setNavActive = (item) => {
    if (userType === 'Superadmin') {
      ADMINMENUITEMS.map((menuItems) => {
        menuItems.Items.filter((Items) => {
          if (Items !== item) Items.active = false;
          if (Items.children && Items.children.includes(item))
            Items.active = true;
          if (Items.children) {
            Items.children.filter((submenuItems) => {
              if (
                submenuItems.children &&
                submenuItems.children.includes(item)
              ) {
                Items.active = true;
                submenuItems.active = true;
                return true;
              } else {
                return false;
              }
            });
          }
          return Items;
        });
        return menuItems;
      });
      item.active = !item.active;
      setMainMenu({ mainmenu: ADMINMENUITEMS });
    } else {
      USERMENUITEMS.map((menuItems) => {
        menuItems.Items.filter((Items) => {
          if (Items !== item) Items.active = false;
          if (Items.children && Items.children.includes(item))
            Items.active = true;
          if (Items.children) {
            Items.children.filter((submenuItems) => {
              if (
                submenuItems.children &&
                submenuItems.children.includes(item)
              ) {
                Items.active = true;
                submenuItems.active = true;
                return true;
              } else {
                return false;
              }
            });
          }
          return Items;
        });
        return menuItems;
      });
      item.active = !item.active;
      setMainMenu({ mainmenu: USERMENUITEMS });
    }
  };

  const toggletNavActive = (item) => {
    if (window.innerWidth <= 991) {
      document.querySelector('.page-header').className =
        'page-header close_icon';
      document.querySelector('.sidebar-wrapper').className =
        'sidebar-wrapper close_icon ';
      if (item.type === 'sub') {
        document.querySelector('.page-header').className = 'page-header ';
        document.querySelector('.sidebar-wrapper').className =
          'sidebar-wrapper ';
      }
    }

    if (userType === 'Superadmin') {
      if (!item.active) {
        ADMINMENUITEMS.map((a) => {
          a.Items.filter((Items) => {
            if (a.Items.includes(item)) Items.active = false;
            if (!Items.children) return false;
            Items.children.forEach((b) => {
              if (Items.children.includes(item)) {
                b.active = false;
              }
              if (!b.children) return false;
              b.children.forEach((c) => {
                if (b.children.includes(item)) {
                  c.active = false;
                }
              });
            });
            return Items;
          });
          return a;
        });
      }
      item.active = !item.active;
      setMainMenu({ mainmenu: ADMINMENUITEMS });
    } else {
      if (!item.active) {
        USERMENUITEMS.map((a) => {
          a.Items.filter((Items) => {
            if (a.Items.includes(item)) Items.active = false;
            if (!Items.children) return false;
            Items.children.forEach((b) => {
              if (Items.children.includes(item)) {
                b.active = false;
              }
              if (!b.children) return false;
              b.children.forEach((c) => {
                if (b.children.includes(item)) {
                  c.active = false;
                }
              });
            });
            return Items;
          });
          return a;
        });
      }
      item.active = !item.active;
      setMainMenu({ mainmenu: USERMENUITEMS });
    }
  };

  const scrollToRight = () => {
    if (margin <= -2598 || margin <= -2034) {
      if (width === 492) {
        setMargin(-3570);
      } else {
        setMargin(-3464);
      }
      document.querySelector('.right-arrow').classList.add('d-none');
      document.querySelector('.left-arrow').classList.remove('d-none');
    } else {
      setMargin((margin) => (margin += -width));
      document.querySelector('.left-arrow').classList.remove('d-none');
    }
  };

  const scrollToLeft = () => {
    if (margin >= -width) {
      setMargin(0);
      document.querySelector('.left-arrow').classList.add('d-none');
      document.querySelector('.right-arrow').classList.remove('d-none');
    } else {
      setMargin((margin) => (margin += width));
      document.querySelector('.right-arrow').classList.remove('d-none');
    }
  };

  const openCloseSidebar = (toggle) => {
    if (toggle) {
      setSidebartoogle(!toggle);
      document.querySelector('.page-header').className =
        'page-header close_icon';
      document.querySelector('.sidebar-wrapper').className =
        'sidebar-wrapper close_icon ';
    } else {
      setSidebartoogle(!toggle);
      document.querySelector('.page-header').className = 'page-header';
      document.querySelector('.sidebar-wrapper').className = 'sidebar-wrapper ';
    }
  };

  const responsiveSidebar = () => {
    document.querySelector('.page-header').className = 'page-header close_icon';
    document.querySelector('.sidebar-wrapper').className =
      'sidebar-wrapper close_icon';
  };

  const onLogout = () => {
    console.log('logout ');
    logout();
  };

  console.log('splitLocation:', splitLocation);

  return (
    <Fragment>
      <div className='sidebar-wrapper'>
        <div className='logo-wrapper'>
          <Link to={'/virtualsoft/admin/dashboard'}>
            <img
              className='img-fluid for-light'
              src={require('../../../assets/images/logo/logo.png')}
              alt=''
            />
            <img
              className='img-fluid for-dark'
              src={require('../../../assets/images/logo/logo_dark.png')}
              alt=''
            />
          </Link>
          <div className='back-btn' onClick={() => responsiveSidebar()}>
            <i className='fa fa-angle-left'></i>
          </div>
          <div
            className='toggle-sidebar'
            onClick={() => openCloseSidebar(sidebartoogle)}
          >
            <Grid className='status_toggle middle sidebar-toggle' />
          </div>
        </div>
        <div className='logo-icon-wrapper'>
          <Link to={'/virtualsoft/admin/dashboard'}>
            <img
              className='img-fluid'
              src={require('../../../assets/images/logo/logo-icon.png')}
              alt=''
            />
          </Link>
        </div>
        <nav className='sidebar-main'>
          <div className='left-arrow' onClick={scrollToLeft}>
            <ArrowLeft />
          </div>
          <div
            id='sidebar-menu'
            style={
              wrapper === 'horizontal-wrapper'
                ? { marginLeft: margin + 'px' }
                : { margin: '0px' }
            }
          >
            <ul
              className='sidebar-links custom-scrollbar'
              style={{
                paddingLeft: '0px',
                listStyleType: 'none',
                marginBottom: '0',
                maxHeight: 'calc(100vh - 150px)',
              }}
            >
              <li className='back-btn'>
                <div className='mobile-back text-right'>
                  <span>{'Back'}</span>
                  <i className='fa fa-angle-right pl-2' aria-hidden='true'></i>
                </div>
              </li>

              <Fragment>
                {userType === 'Superadmin'
                  ? ADMINMENUITEMS.map((Item, i) => (
                      <Fragment key={i}>
                        <li className='sidebar-main-title'>
                          <div>
                            <h6 className='lan-1'>{Item.menutitle}</h6>
                            <p className='lan-2'>{Item.menucontent}</p>
                          </div>
                        </li>
                        {Item.Items.map((menuItem, i) => (
                          <li className='sidebar-list' key={i}>
                            {menuItem.type === 'sub' ? (
                              <a
                                style={{ cursor: 'pointer' }}
                                className={`sidebar-link sidebar-title  ${
                                  splitLocation[3] === menuItem.path
                                    ? 'active'
                                    : ''
                                }`}
                                href={rest.pathname}
                                onClick={() => toggletNavActive(menuItem)}
                              >
                                <menuItem.icon />
                                <span>{menuItem.title}</span>
                                {menuItem.badge ? (
                                  <label className={menuItem.badge}>
                                    {menuItem.badgetxt}
                                  </label>
                                ) : (
                                  ''
                                )}
                                <div className='according-menu'>
                                  {menuItem.active ? (
                                    <i className='fa fa-angle-down'></i>
                                  ) : (
                                    <i className='fa fa-angle-right'></i>
                                  )}
                                </div>
                              </a>
                            ) : (
                              ''
                            )}

                            {menuItem.type === 'link' ? (
                              <Link
                                to={menuItem.path}
                                className={`sidebar-link sidebar-title link-nav  ${
                                  splitLocation[3] === menuItem.url
                                    ? 'active'
                                    : ''
                                }`}
                                href={rest.pathname}
                              >
                                <menuItem.icon />
                                <span>{menuItem.title}</span>
                                {menuItem.badge ? (
                                  <label className={menuItem.badge}>
                                    {menuItem.badgetxt}
                                  </label>
                                ) : (
                                  ''
                                )}
                              </Link>
                            ) : (
                              ''
                            )}

                            {menuItem.children ? (
                              <ul
                                className='sidebar-submenu'
                                style={
                                  menuItem.active
                                    ? sidebartoogle
                                      ? {
                                          opacity: 1,
                                          transition: 'opacity 500ms ease-in',
                                        }
                                      : { display: 'block' }
                                    : { display: 'none' }
                                }
                              >
                                {menuItem.children.map(
                                  (childrenItem, index) => {
                                    return (
                                      <li key={index}>
                                        {childrenItem.type === 'sub' ? (
                                          <a
                                            style={{ cursor: 'pointer' }}
                                            className={`${
                                              splitLocation[4] ===
                                              childrenItem.path
                                                ? 'active'
                                                : ''
                                            }`}
                                            href={rest.pathname}
                                            onClick={() =>
                                              toggletNavActive(childrenItem)
                                            }
                                          >
                                            {' '}
                                            {childrenItem.title}
                                            <span className='sub-arrow'>
                                              <i className='fa fa-chevron-right'></i>
                                            </span>
                                            <div className='according-menu'>
                                              {childrenItem.active ? (
                                                <i className='fa fa-angle-down'></i>
                                              ) : (
                                                <i className='fa fa-angle-right'></i>
                                              )}
                                            </div>
                                          </a>
                                        ) : (
                                          ''
                                        )}

                                        {childrenItem.type === 'link' ? (
                                          <Fragment>
                                            {childrenItem.function ? (
                                              <a
                                                style={{ cursor: 'pointer' }}
                                                href={rest.pathname}
                                                onClick={onLogout}
                                              >
                                                {childrenItem.title}
                                              </a>
                                            ) : (
                                              <Link
                                                to={childrenItem.path}
                                                className={`${
                                                  splitLocation[4] ===
                                                  childrenItem.url
                                                    ? 'active'
                                                    : ''
                                                }`}
                                              >
                                                {childrenItem.title}
                                              </Link>
                                            )}
                                          </Fragment>
                                        ) : (
                                          ''
                                        )}

                                        {childrenItem.children ? (
                                          <ul
                                            className='nav-sub-childmenu submenu-content'
                                            style={
                                              childrenItem.active
                                                ? { display: 'block' }
                                                : { display: 'none' }
                                            }
                                          >
                                            {childrenItem.children.map(
                                              (childrenSubItem, key) => (
                                                <li key={key}>
                                                  {childrenSubItem.type ===
                                                  'link' ? (
                                                    <Link
                                                      to={childrenSubItem.path}
                                                      className={`${
                                                        pathname ===
                                                        childrenSubItem.path
                                                          ? 'active'
                                                          : ''
                                                      }`}
                                                    >
                                                      {childrenSubItem.title}
                                                    </Link>
                                                  ) : (
                                                    ''
                                                  )}
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        ) : (
                                          ''
                                        )}
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            ) : (
                              ''
                            )}
                          </li>
                        ))}
                      </Fragment>
                    ))
                  : USERMENUITEMS.map((Item, i) => (
                      <Fragment key={i}>
                        <li className='sidebar-main-title'>
                          <div>
                            <h6 className='lan-1'>{Item.menutitle}</h6>
                            <p className='lan-2'>{Item.menucontent}</p>
                          </div>
                        </li>
                        {Item.Items.map((menuItem, i) => (
                          <li className='sidebar-list' key={i}>
                            {menuItem.type === 'sub' ? (
                              <a
                                style={{ cursor: 'pointer' }}
                                className={`sidebar-link sidebar-title  ${
                                  splitLocation[1] === menuItem.path
                                    ? 'active'
                                    : ''
                                }`}
                                href={rest.pathname}
                                onClick={() => toggletNavActive(menuItem)}
                              >
                                <menuItem.icon />
                                <span>{menuItem.title}</span>
                                {menuItem.badge ? (
                                  <label className={menuItem.badge}>
                                    {menuItem.badgetxt}
                                  </label>
                                ) : (
                                  ''
                                )}
                                <div className='according-menu'>
                                  {menuItem.active ? (
                                    <i className='fa fa-angle-down'></i>
                                  ) : (
                                    <i className='fa fa-angle-right'></i>
                                  )}
                                </div>
                              </a>
                            ) : (
                              ''
                            )}

                            {menuItem.type === 'link' ? (
                              <Link
                                to={menuItem.path}
                                className={`sidebar-link sidebar-title link-nav  ${
                                  splitLocation[1] === menuItem.url
                                    ? 'active'
                                    : ''
                                }`}
                                href={rest.pathname}
                              >
                                <menuItem.icon />
                                <span>{menuItem.title}</span>
                                {menuItem.badge ? (
                                  <label className={menuItem.badge}>
                                    {menuItem.badgetxt}
                                  </label>
                                ) : (
                                  ''
                                )}
                              </Link>
                            ) : (
                              ''
                            )}

                            {menuItem.children ? (
                              <ul
                                className='sidebar-submenu'
                                style={
                                  menuItem.active
                                    ? sidebartoogle
                                      ? {
                                          opacity: 1,
                                          transition: 'opacity 500ms ease-in',
                                        }
                                      : { display: 'block' }
                                    : { display: 'none' }
                                }
                              >
                                {menuItem.children.map(
                                  (childrenItem, index) => {
                                    return (
                                      <li key={index}>
                                        {childrenItem.type === 'sub' ? (
                                          <a
                                            style={{ cursor: 'pointer' }}
                                            className={`${
                                              splitLocation[2] ===
                                              childrenItem.path
                                                ? 'active'
                                                : ''
                                            }`}
                                            href={rest.pathname}
                                            onClick={() =>
                                              toggletNavActive(childrenItem)
                                            }
                                          >
                                            {' '}
                                            {childrenItem.title}
                                            <span className='sub-arrow'>
                                              <i className='fa fa-chevron-right'></i>
                                            </span>
                                            <div className='according-menu'>
                                              {childrenItem.active ? (
                                                <i className='fa fa-angle-down'></i>
                                              ) : (
                                                <i className='fa fa-angle-right'></i>
                                              )}
                                            </div>
                                          </a>
                                        ) : (
                                          ''
                                        )}

                                        {childrenItem.type === 'link' ? (
                                          <Fragment>
                                            {childrenItem.function ? (
                                              <a
                                                style={{ cursor: 'pointer' }}
                                                href={rest.pathname}
                                                onClick={onLogout}
                                              >
                                                {childrenItem.title}
                                              </a>
                                            ) : (
                                              <Link
                                                to={childrenItem.path}
                                                className={`${
                                                  splitLocation[2] ===
                                                  childrenItem.url
                                                    ? 'active'
                                                    : ''
                                                }`}
                                              >
                                                {childrenItem.title}
                                              </Link>
                                            )}
                                          </Fragment>
                                        ) : (
                                          ''
                                        )}

                                        {childrenItem.children ? (
                                          <ul
                                            className='nav-sub-childmenu submenu-content'
                                            style={
                                              childrenItem.active
                                                ? { display: 'block' }
                                                : { display: 'none' }
                                            }
                                          >
                                            {childrenItem.children.map(
                                              (childrenSubItem, key) => (
                                                <li key={key}>
                                                  {childrenSubItem.type ===
                                                  'link' ? (
                                                    <Link
                                                      to={childrenSubItem.path}
                                                      className={`${
                                                        pathname ===
                                                        childrenSubItem.path
                                                          ? 'active'
                                                          : ''
                                                      }`}
                                                    >
                                                      {childrenSubItem.title}
                                                    </Link>
                                                  ) : (
                                                    ''
                                                  )}
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        ) : (
                                          ''
                                        )}
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            ) : (
                              ''
                            )}
                          </li>
                        ))}
                      </Fragment>
                    ))}
              </Fragment>
            </ul>
          </div>
          <div className='right-arrow' onClick={scrollToRight}>
            <ArrowRight />
          </div>
        </nav>
      </div>
    </Fragment>
  );
};
Sidebar.propTypes = {
  Auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});
export default connect(mapStateToProps, { logout })(Sidebar);
