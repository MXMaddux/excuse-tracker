import "../index.css";
import { useAuth } from "../store/auth-context";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const AuthReg = () => {
  const {
    register,
    signIn,
    signInWithGoogle,
    logout,
    setEmail,
    setPassword,
    setSignInEmail,
    setSignInPassword,
    user,
    errorMessage,
  } = useAuth();

  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="main">
        {!user && (
          <div className="container">
            <div className="register">
              <h4>Register</h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("User registered");
                  register();
                }}
              >
                <input
                  placeholder="Email For Register"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder="Password for Register"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn-register" type="submit">
                  {" "}
                  Register{" "}
                </button>
              </form>
              <div className="already-registered">
                Already registered?{" "}
                {/* <button
                  className="btn btn-register"
                  onClick={() => navigate("/signin")}
                >Sign In
                  </button> */}
                <a href="/signin">Sign In</a>
              </div>
            </div>
          </div>
        )}

        {user && <button onClick={logout}> Logout </button>}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    color: var(--clr-secondary-5);
  }

  a:hover {
    color: var(--clr-primary-5);
    transition: var(--transition);
  }

  .already-registered {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 0.5rem;
  }

  .btn-register {
    width: 100%;
    background-color: var(--clr-secondary-4);
    color: var(--clr-primary-10);
  }

  .btn-register:hover {
    background-color: var(--clr-secondary-2);
    transition: var(--transition);
  }

  button {
    background-color: var(--clr-primary-7);
    padding: 3px 5px;
    color: var(--clr-primary-2);
    width: 200px;
  }

  button:hover {
    background-color: var(--clr-primary-5);
    cursor: pointer;
    transition: var(--transition);
  }

  button,
  .btn-sign-in,
  input {
    border-radius: 4px;
    border: 1px solid var(--clr-primary-2);
  }

  .btn-sign-in {
    margin-bottom: 10px;
  }

  .btn-google {
    background-color: var(--clr-primary-7);
    margin-bottom: 10px;
  }

  .container {
    display: flex;
    width: 800px;
    height: 100vh;
    margin: auto;
    justify-content: center;
    align-items: center;
  }

  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  h4 {
    color: var(--clr-primary-2);
  }

  .hidden {
    display: none;
    visibility: hidden;
  }

  input {
    margin-bottom: 10px;
    padding: 3px;
    width: 100%;
    height: 20px;
  }

  .register {
    display: flex;
    flex-direction: column;
    width: 260px;
    margin-bottom: 20px;
  }

  .sign-in {
    display: flex;
    flex-direction: column;
    width: 250px;
  }

  @media (max-width: 697px) {
    .container {
      display: flex;
      flex-direction: column;
    }

    .sign-in {
      /* margin-top: 20px; */
    }
  }
`;
