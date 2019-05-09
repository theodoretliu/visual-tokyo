/** @jsx jsx */
import { useState, useEffect, useRef } from "react";
import { jsx, css } from "@emotion/core";
import data from "./static/data.json";

const imgFlex = css`
  display: flex;
  align-items: center;
  margin: 0px 0px;
  height: 100%;
  width: 100%;
  padding: 80px 20px;
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
  font-size: 30px;
  color: white;
`;

const iStyle = css`
  padding: 20px;
  display: block;
  cursor: pointer;
`;

const infoContainer = css`
  box-sizing: border-box;
  padding: 20px;
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
  let galleryRef = useRef(null);
  let infoRef = useRef(null);

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

  function scrollToImage() {
    if (galleryRef) {
      galleryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  function scrollToInfo() {
    if (infoRef) {
      infoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    window.onkeydown = e => {
      switch (e.key) {
        case " ":
          flip();
          return false;
        case "ArrowUp":
          scrollToImage();
          return false;
        case "ArrowDown":
          scrollToInfo();
          return false;
        case "ArrowLeft":
          previousPage();
          return false;
        case "ArrowRight":
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
      <div css={imageContainer} ref={galleryRef}>
        <i
          css={css`
            position: absolute;
            font-size: 20px;
            top: 0px;
            left: 0px;
            padding: 20px;
            cursor: pointer;
            color: white;
          `}
          className="fas fa-arrow-left"
          onClick={goHome}
        />
        <i
          css={iStyle}
          className="fas fa-chevron-left"
          onClick={previousPage}
        />
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
          <i
            css={css`
              position: absolute;
              left: calc(50% - 83.75px / 2);
              bottom: 10px;
              padding: 0px;
              cursor: pointer;
            `}
            className="fas fa-chevron-down"
            onClick={scrollToInfo}
          />
        </div>
        <i css={iStyle} className="fas fa-chevron-right" onClick={nextPage} />
      </div>
      <div css={infoContainer} ref={infoRef}>
        <h1
          css={css`
            margin: 0px;
            display: inline-block;
          `}
        >
          {datum.title_japanese} ({datum.title_english})
        </h1>{" "}
        <h2
          css={css`
            display: inline-block;
            margin: 0px;
          `}
        >
          {datum.year}
        </h2>
      </div>
    </div>
  );
}
