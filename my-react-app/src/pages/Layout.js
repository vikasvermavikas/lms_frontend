import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";

const Layout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    if (localStorage.getItem("USER")) {
      navigate('/user/dashboard');
    }
    setActivePath(location.pathname);
  }, [location]);

  return (
    <>
      {ReactSession.get("USER") ? ('') : (

        // <nav>
        //   <header className="d-flex justify-content-center py-3">

        //     <ul className="nav nav-pills">

        //       <li className="nav-item">
        //         <Link to="/" className={activePath === "/" ? "nav-link active" : "nav-link"}>Home</Link>
        //       </li>

        //       <li className="nav-item">
        //         <Link to="/blogs" className={activePath === "/blogs" ? "nav-link active" : "nav-link"}>Blogs</Link>
        //       </li>
        //       <li className="nav-item">
        //         <Link to="/contact" className={activePath === "/contact" ? "nav-link active" : "nav-link"}>Contact</Link>
        //       </li>
        //       <li className="nav-item">
        //         <Link to={ReactSession.get("USER") ? '/logout' : '/login'} className={activePath === "/login" ? "nav-link active" : "nav-link"}>Login</Link>
        //       </li>
        //     </ul>

        //   </header>
        // </nav>

        <div>
          <head>
            <link href={process.env.PUBLIC_URL + "assets/img/favicon.png"} rel="icon" />
            <link href={process.env.PUBLIC_URL + "assets/img/apple-touch-icon.png"} rel="apple-touch-icon" />
            <link href={process.env.PUBLIC_URL + "assets/vendor/aos/aos.css"} rel="stylesheet" />
            <link href={process.env.PUBLIC_URL + "assets/vendor/bootstrap/css/bootstrap.min.css"} rel="stylesheet" />
            <link href={process.env.PUBLIC_URL + "assets/vendor/bootstrap-icons/bootstrap-icons.css"} rel="stylesheet" />
            <link href={process.env.PUBLIC_URL + "assets/vendor/boxicons/css/boxicons.min.css"} rel="stylesheet" />
            <link href={process.env.PUBLIC_URL + "assets/vendor/glightbox/css/glightbox.min.css"} rel="stylesheet" />
            <link href={process.env.PUBLIC_URL + "assets/vendor/swiper/swiper-bundle.min.css"} rel="stylesheet" />
            <link href={process.env.PUBLIC_URL + "/assets2/css/style.css"} rel="stylesheet"></link>
          </head>
          <section id="topbar" className="d-flex align-items-center">
            <div className="container d-flex justify-content-center justify-content-md-between">
              <div className="contact-info d-flex align-items-center">
                <i className="bi bi-envelope d-flex align-items-center"><a href="mailto:contact@example.com">vikas.verma@prakharsoftwares.com</a></i>
                <i className="bi bi-phone d-flex align-items-center ms-4"><span>+91 9354788287</span></i>
              </div>
              <div className="social-links d-none d-md-flex align-items-center">
                <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </section>
          <header id="header" className="d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">

              <h1 className="logo"><a href="index.html">Library Management System<span>.</span></a></h1>

              <nav id="navbar" className="navbar">
                <ul>
                  <li className="nav-item">
                    <Link to='/' className={activePath === "/" ? "nav-link active" : "nav-link"}>Home</Link></li>
                  <li className="nav-item">
                    <Link to='/login' className={activePath === "/login" ? "nav-link active" : "nav-link"}>Login</Link>
                  </li>
                </ul>
                <i className="bi bi-list mobile-nav-toggle"></i>
              </nav>

            </div>
          </header>
        </div>
      )}

      <Outlet />
    </>
  )
};

export default Layout;