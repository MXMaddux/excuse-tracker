import "../index.css";
import { useAuth } from "../store/auth-context";
import styled from "styled-components";

export const Auth = () => {
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
              </form>
            </div>

            <div className="register">
              <h4>Register</h4>
              <form onSubmit={(e) => {
                e.preventDefault()
                console.log("User registered")
                register()
              }}>
                <input
                  placeholder="Email..."
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder="Password..."
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit"> Register </button>
              </form>
            </div>
          </div>
        )}
        {/* {user && (
        <div>
        <form onSubmit={onSubmitScenario}>
          <input
            type="text"
            placeholder="Scenario"
            onChange={(e) => setNewScenario(e.target.value)}
            value={newScenario}
          />
          <input
            type="text"
            placeholder="Excuse Used"
            onChange={(e) => setExcuseUsed(e.target.value)}
            value={excuseUsed}
          />
          <input
            type="date"
            placeholder="Date Used"
            onChange={(e) => setDateUsed(e.target.value)}
            value={dateUsed}
          />
          <input
            type="text"
            placeholder="Given To"
            onChange={(e) => setGivenTo(e.target.value)}
            value={givenTo}
          />
          </form>
          <button type="submit" onClick={onSubmitScenario}>
            Submit
          </button>
        </div>
      )} */}
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

  h4 {
    color: var(--clr-primary-2);
  }

  input {
    margin-bottom: 10px;
    padding: 3px;
    width: 200px;
    height: 20px;
  }

  .register {
    display: flex;
    flex-direction: column;
    width: 250px;
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
