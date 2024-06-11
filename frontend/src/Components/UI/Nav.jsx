import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'reactstrap';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';
import '../../Styles/Header.css';

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/tracking", display: "Tracking" },
  { path: "/settings", display: "Settings" },
  { path: "/dockbooking", display: "Dock Booking" },
  { path: "/calendar", display: "Calendar" },
];

const settingsDropdownLinks = [
  { path: "/settings/company", display: "Company" },
  { path: "/settings/currency", display: "Currency" },
  { path: "/settings/country", display: "Country" },
  { path: "/settings/location", display: "Location" },
  { path: "/settings/dock", display: "Dock Location" },
  { path: "/settings/tenant", display: "cust/tenant/cons" },
  { path: "/settings/commodity", display: "Commodity" },
  { path: "/settings/trucktype", display: "Truck Type" },
  { path: "/settings/transporter", display: "Transporter" },
  { path: "/settings/useraccount", display: "User Account" },
  { path: "/settings/userrolerights", display: "User Role Rights" },
];

const Nav = () => {
  const menuRef = useRef(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  ;

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
        
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    navigate('/home');
  };

  const toggleSettingsDropdown = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  

  return (
    <div className="main__navbar">
      <Container>
        <div className="navigation__wrapper d-flex align-items-center justify-content-between">
          <span className="mobile__menu">
            <i className="ri-menu-line" onClick={toggleSettingsDropdown}></i>
          </span>

          <div className="navigation__wrapper">
            <div className="menu" ref={menuRef}>
              {navLinks.map((item, index) => (
                item.display === "Settings" ? (
                  <div className="nav_item dropdown" key={index}>
                    <span onClick={toggleSettingsDropdown}>{item.display}</span>
                    {isSettingsOpen && (
                      <div className="dropdown_menu">
                        {settingsDropdownLinks.map((dropdownItem, dropdownIndex) => (
                          <NavLink
                            to={dropdownItem.path}
                            className="dropdown_item"
                            key={dropdownIndex}
                            onClick={() => setIsSettingsOpen(false)}
                          >
                            {dropdownItem.display}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav_active nav_item" : "nav_item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                )
              ))}
            </div>
          </div>

          <div className="nav__right">
            <MDBBtn className="mb-4 px-5" style={{ background: '#4d7c8a', border:"white" }} size='lg' onClick={handleLogout}>Logout</MDBBtn>
          </div>
        </div>
      </Container>
      <Outlet />
    </div>
  );
};

export default Nav;
