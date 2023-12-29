import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth-context";

const Navbar = () => {
  const { user, logout } = useAuth(); // Access user state
  return (
    <Wrapper className="wrapper">
      <div className="main">
        {/* <div className="logo"> */}
        <a href="/">
          <h3>
            Excuse<span>Tracker</span>
          </h3>
          <p className="slogan">Keep track of your alibies.</p>
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

const Wrapper = styled.section`
  width: 100%;
  height: auto;
  background: var(--clr-white);
  position: relative;

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
    height: 5rem;
    background-color: #fbfaf9;
    border-bottom: 1px solid var(--clr-primary-1);
    justify-content: space-between;
    align-items: center;
  }
  .nav {
    display: flex;
    width: 50%;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 16px;
  }
  .slogan {
    font-size: 13px;
    color: var(--clr-secondary-4);
  }
  @media (max-width: 1092px) {
    .main {
      display: flex;
      flex-direction: column;
      margin: auto;
      height: 120px;
    }

    .logo {
      display: flex;
      margin: auto;
    }
    .nav {
      display: flex;
      margin-top: -1rem;
      justify-content: space-around;
    }
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
