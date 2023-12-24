import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth-context";

const Navbar = () => {
  const { user, logout } = useAuth(); // Access user state
  return (
    <Wrapper>
      <div className="main">
        {/* <div className="logo"> */}
        <a href="/">
          <h3>
            Excuse<span>Tracker</span>
          </h3>
          <p className="slogan">Keep track of your BS.</p>
        </a>
        {/* </div> */}
        <div className="nav">
          <NavbarLink to="/">
            <p className="nav-links">Home</p>
          </NavbarLink>
          <NavbarLink to="/scenarios">
            <p className="nav-links">List</p>
          </NavbarLink>
          <NavbarLink to="/scenarioform">
            <p className="nav-links">Form</p>
          </NavbarLink>
          {!user && (
            <NavbarLink to="/register">
              <p className="nav-links">Signup/Login</p>
            </NavbarLink>
          )}
          {user && (
            <NavbarLink to="/" onClick={logout}>
              <p className="nav-links">Logout</p>
            </NavbarLink>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  width: 100%;
  height: 79px;
  background: var(--clr-white);

  h3 {
    color: var(--clr-primary-5);
    margin-top: 10px;
    margin-bottom: -3px;
  }
  h3 span {
    color: var(--clr-secondary-3);
  }

  img {
    height: 7rem;
  }
  .logo {
    margin-left: 80px;
    height: 20px;
  }
  .main {
    display: flex;
    width: 100%;
    height: 100%;
    background-color: #fbfaf9;
    border-bottom: 1px solid var(--clr-primary-1);
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
  }
  .nav {
    display: flex;
    width: 50%;
    justify-content: space-evenly;
  }
  .slogan {
    font-size: 13px;
    color: var(--clr-secondary-4);
  }
  @media (max-width: 800px) {
    .main {
      display: flex;
      flex-direction: column;
      margin: auto;
      height: 129px;
      z-index: 1;
    }
    .logo {
      display: flex;
      margin: auto;
    }
    /* .nav {
      display: flex;
      margin: auto;
      justify-content: space-around;
    } */
  }
`;

const NavbarLink = styled(Link)`
  .nav-links {
    font-size: 18px;
    color: var(--clr-secondary-2);
  }
  .nav-links:hover {
    color: var(--clr-secondary-5);
    transition: var(--transition);
  }
  @media (max-width: 800px) {
    .nav-links {
      margin-right: 10px;
    }
  }
`;
