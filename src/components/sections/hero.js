import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { email } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    &:hover {
      background-position: left;
    }
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
// const Button = styled.button`
//   ${({ theme }) => theme.mixins.smallButton};
//   margin: 1em;
//   font-size: var(--fz-xs);
//   &:hover {
//     background-position: left;
//   }
// `;
const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Zaid Qureshi.</h2>;
  const three = <h3 className="big-heading">I Manage data for the web.</h3>;
  const four = (
    <>
      <p>
        I’m a software engineer who loves exploring and creating work behind web apps. I'm a
        lifelong learner 🎓 and loves to learn new technologies 🚀. I build and maintain the
        algorithms that process data and perform actions on web apps.
      </p>
    </>
  );
  const five = <p>Here are a few technologies I’ve been working with recently:</p>;
  const skills = [
    'JavaScript (ES6+)',
    'TypeScript',
    'Node.JS',
    'MongoDB',
    'MySQL',
    'Docker',
    'Kubernetes',
    'AWS',
    'Microservices',
    'Redis',
  ];
  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
          <ul className="skills-list">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
          <ul className="skills-list">
            {isMounted &&
              skills.map((skill, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <li key={i} style={{ transitionDelay: `${i + 1}00ms` }}>
                    {skill}
                  </li>
                </CSSTransition>
              ))}
          </ul>
          <CSSTransition classNames="fadeup" timeout={loaderDelay}>
            <div style={{ transitionDelay: `1000ms` }}>
              <a className="email-link" href={`mailto:${email}`}>
                Hire Me!
              </a>
              {/* <Button>Hire Me!</Button>
              <Button>Primary</Button> */}
            </div>
          </CSSTransition>
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
