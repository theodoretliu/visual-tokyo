/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
import data from "./static/data.json";

const imgFlex = css`
  display: flex;
  align-items: center;
  margin: 0px 0px;
  height: 100%;
  width: 100%;
  padding: 40px 20px;
  box-sizing: border-box;
`;

const imgStyle = css`
  max-height: 100%;
  max-width: 100%;
  display: block;
  margin: 0px auto;
  cursor: pointer;
`;

const hide = css`
  display: none;
`;

const imageContainer = css`
  display: flex;
  background: black;
  flex-direction: row;
  align-items: center;
  justify-contents: space-between;
  height: 100vh;
  width: 100%;
  font-size: 50px;
  color: white;

  i {
    padding: 20px;
    display: block;
    cursor: pointer;
  }
`;

const infoContainer = css`
  box-sizing: border-box;
  padding: 0px 20px;
  max-width: 1000px;
  margin: 0px auto;
`;

const hint = css`
  position: absolute;
  bottom: 0px;
  color: white;
  padding: 5px;
`;

export default function ImageView(props) {
  let [isFlipped, setFlip] = useState(false);
  let currentIndex = parseInt(props.match.params.image);
  let nextIndex = (currentIndex + 1) % data.length;
  let previousIndex = (currentIndex - 1 + data.length) % data.length;

  function flip() {
    setFlip(!isFlipped);
  }

  function previousPage() {
    props.history.push(`/${previousIndex}`);
    setFlip(false);
  }

  function nextPage() {
    props.history.push(`/${nextIndex}`);
    setFlip(false);
  }

  function goHome() {
    props.history.push("/");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    window.onkeydown = e => {
      switch (e.key) {
        case " ": // spacebar
        case "ArrowUp": // up arrow
        case "ArrowDown": // down arrow
          flip();
          return false;
        case "ArrowLeft": // left arrow
          previousPage();
          return false;
        case "ArrowRight": // right arrow
          nextPage();
          return false;
        case "Escape":
          goHome();
          return false;
        default:
          return true;
      }
    };

    return () => {
      window.onkeydown = null;
    };
  });

  let datum = data[props.match.params.image];

  return (
    <div>
      <div css={imageContainer}>
        <i className="fas fa-chevron-left" onClick={previousPage} />
        <div css={imgFlex}>
          <img
            css={[imgStyle].concat(isFlipped ? [hide] : [])}
            src={require(`./static/${datum.src}`)}
            key={require(`./static/${datum.src}`)}
            onClick={flip}
          />
          <img
            css={[imgStyle].concat(isFlipped ? [] : [hide])}
            src={require(`./static/${datum.src_back}`)}
            onClick={flip}
          />
        </div>
        <i className="fas fa-chevron-right" onClick={nextPage} />
      </div>
      <div css={infoContainer}>
        <h1>
          {datum.title_japanese} ({datum.title_english})
        </h1>
      </div>
    </div>
  );
}
