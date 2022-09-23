import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: magenta;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 258px 52px 1fr 110px;

  .row:nth-child(1) {
    background: #ff8a00;
  }
  .row:nth-child(2) {
    background: #383838;
  }
  .row:nth-child(3) {
    background: #fff;
  }
  .row:nth-child(4) {
    background: #fff;
  }

  .row .row-content {
    width: 100vw;
    max-width: 428px;
    margin: 0 auto;
    display: grid;
    place-items: center;
    height: 100%;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;

  .circle.picture {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background: #fff;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    display: grid;
    place-content: center;

    img {
      width: 100%;
    }
  }

  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;

  .column-right {
    display: flex;
    flex-direction: column;
    color: #fff;
    font-size: 26px;
    line-height: 100%;
    font-family: 'Gotham';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 36px;
    letter-spacing: -0.07em;

    span.username {
      font-size: 38px;
      font-weight: bold;
    }
  }
`;
