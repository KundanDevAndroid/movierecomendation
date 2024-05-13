import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/logo5.png";
import Footer from "../footer/Footer";



const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { loginWithRedirect,  logout, isAuthenticated, user} = useAuth0();
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    useEffect(() => {
        // Check if user is logged out when the component initializes
        const checkLogoutStatus = () => {
            window.scrollTo(0, 0);
            const isAuthenticated = localStorage.getItem('isAuthenticated');
            if (!isAuthenticated) {
              setIsLoggedOut(true);
            }
        };
    
        checkLogoutStatus();
      }, [], [location]);
    
      const handleLogout = () => {
        // Clear authentication token and mark as logged out
        localStorage.removeItem('isAuthenticated');
        setIsLoggedOut(true);
        logout();
      };

    
    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        setMobileMenu(false);
    };

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                <ul className="menuItems">

                <li 
                        className="menuItem"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </li>

                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("movie")}
                    >
                        Movies
                    </li>
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("tv")}
                    >
                        TV Shows
                    </li>
                    
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
        
                </ul>
             
                {isAuthenticated ? (
            <li>
                <button id="loginbutton" style={{width: "80px", height: "30px", borderRadius:"15px", backgroundColor: "#041226", borderColor:"white", color:"white", marginLeft:"-59px", marginTop:"5px"}}onClick={()=>logout({ returnTo: window.location.origin })}>Logout</button> 
            </li>
          ) : (
            <li>
              <button id="loginbutton" style={{width: "80px", height: "30px", borderRadius:"15px", backgroundColor: "#041226", borderColor:"white", color:"white", marginLeft:"-59px", marginTop:"5px"}}onClick={loginWithRedirect}>Login</button>
            </li>
          )}

        {isAuthenticated && (
            <li>
              <p style={{ marginTop:"-13px", textDecoration:"none", listStyle:"none", color:"white", marginLeft:"-87px"}}> {user.name} </p>
            </li>
          )}

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>

    );
};
export default Header;
