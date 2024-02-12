import "../index.css";
import { useAuth } from "../store/auth-context";
import styled from "styled-components";

export const AuthSign = () => {
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

  return (
    <Wrapper>
      <div className="main">
        {!user && (
          <div className="container">
            <div className="sign-in">
              <h4>Sign In</h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Form submitted");
                  signIn();
                }}
              >
                <input
                  placeholder="Email for Sign In..."
                  type="email"
                  onChange={(e) => setSignInEmail(e.target.value)}
                />
                {console.log(errorMessage)}
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
                <input
                  placeholder="Password for Sign In..."
                  type="password"
                  onChange={(e) => setSignInPassword(e.target.value)}
                />
                {console.log(errorMessage)}
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Form submitted");
                    signIn();
                  }}
                  className="btn-sign-in"
                >
                  Sign In
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Google Form submitted");
                    signInWithGoogle();
                  }}
                  className="btn-google"
                >
                  Sign In with Google
                </button>
              </form>
              <p>Don't have an account?</p> <a href="/register">Register</a>
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
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
  }

  a {
    color: var(--clr-primary-3);
    margin-top: -1rem;
  }

  a:hover {
    color: var(--clr-secondary-5);
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
    width: 100%;
  }

  .btn-google {
    background-color: var(--clr-secondary-5);
    color: white;
    font-weight: 400;
    width: 100%;
  }

  .btn-google:hover {
    background-color: var(--clr-secondary-7);
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 50%;
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

  input {
    margin-bottom: 10px;
    padding: 3px;
    width: 100%;
    height: 20px;
  }

  .sign-in {
    display: flex;
    flex-direction: column;
    width: 250px;
    margin-bottom: 20px;
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
