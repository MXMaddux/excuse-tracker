import React from "react";
import styled from "styled-components";

const Hero = () => {
  return (
    <Wrapper>
      <div className="main">
        <p>
          Are you a total flake? You know you are. But skip the embarrassment of
          giving someone an excuse you've already used for your flakiness.
          That's where <span>Excuse Tracker</span> comes in.
        </p>
        <br />
        <p>
          Fill out the <a href="/scenarioform">form</a>. Create a Scenario like
          "Didn't respond to message" or "Can't go camping". Then add the excuse
          you used, the date and to whom you told your excuse.{" "}
          <span>Excuse Tracker</span> keeps track of all your past excuses.
        </p>

        <br />
        <p>
          The next time you use an excuse, you can first check to ensure you
          haven't already used that same excuse.
        </p>
        <br />
        <p>
          You know you're full of it. Let <span>Excuse Tracker</span> keep your
          great aunt from dying more than once.
        </p>
      </div>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.section`
  display: flex;
  height: 100vh;

  a {
    color: var(--clr-primary-4);
    font-weight: bold;
  }
  a:hover {
    color: var(--clr-secondary-4);
  }
  .main {
    display: flex;
    flex-direction: column;
    width: 70%;
    max-width: 72ch;
    margin: auto;
    background-color: #fbfaf9;
    color: var(--clr-primary-3);
    padding: 1.5rem;
    border: 1px solid var(--clr-primary-2);
    margin-top: 5rem;
  }
  .main span {
    font-weight: bold;
    color: var(--clr-secondary-4);
    /* text-transform: uppercase; */
  }

  @media screen and (max-width: 792px) {
    .main {
      width: 90%;
      max-width: 72ch;
    }
  }
`;
