import styled from 'styled-components';
import Color from 'color';

const theme = {
  primary: `tomato`,
};

export const Wrapper = styled.div<{ background: string }>`
  background: url(${(props) => props.background}) #000;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  color: #fff;

  display: grid;
  place-items: center;

  user-select: none;
`;

export const Form = styled.div`
  background: #fff0;
  width: 320px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  theme: #ff754a;

  input {
    background: #fff;
    border: none;
    color: ${theme.primary};
    padding: 15px 20px;
    border-radius: 20px;
    outline: none;
    display: block;
    width: 100%;

    font-size: 1.05em;
    text-align: center;

    &::placeholder {
    }
  }

  button {
    border-radius: 20px;
    padding: 15px 20px;
    display: block;
    width: 100%;
    font-size: 1.1em;
    background: ${theme.primary};
    color: #fff;
    cursor: pointer;
    outline: none;
    border: none;

    &:hover {
      background: ${Color(theme.primary).darken(0.05).hex()};
    }
    &:active {
      background: ${Color(theme.primary).darken(0.1).hex()};
    }
  }

  h1 {
    margin-bottom: 20px;
    color: #fff;
  }
  img {
    width: 73px;
    pointer-events: none;
  }

  .link {
    color: ${theme.primary};
    text-decoration: underline;
    cursor: pointer;

    &.white {
      color: #fff9;
    }
  }

  .social-options {
    display: flex;
    /* background: magenta; */
    justify-content: center;
    width: 100%;
    padding: 30px 30px;
    gap: 30px;
  }

  .social-icon {
    font-size: 2em;
    background: #fff;
    color: ${theme.primary};
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    cursor: pointer;
    &:active {
      background: ${Color(theme.primary).darken(0.1).hex()};
      color: #fff;
    }
  }

  .source {
    /* letter-spacing: 3px; */
    text-align: center;
    font-size: 0.9em;
  }

  .company-name {
    color: ${theme.primary};
    font-weight: bold;
  }
`;
