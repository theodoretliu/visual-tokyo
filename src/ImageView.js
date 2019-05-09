/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
import data from "./static/data.json";

const imgStyle = css`
  max-height: 100vh;
  max-width: 100%;
  object-fit: cover;
`;

const hide = css`
  display: none;
`;

export default function ImageView(props) {
  let [isFlipped, setFlip] = useState(false);
  let currentIndex = parseInt(props.match.params.image);
  let nextIndex = (currentIndex + 1) % data.length;
  let previousIndex = (currentIndex - 1 + data.length) % data.length;

  useEffect(() => {
    window.scrollTo(0, 0);
    window.onkeydown = e => {
      switch (e.key) {
        case " ": // spacebar
        case "ArrowUp": // up arrow
        case "ArrowDown": // down arrow
          setFlip(!isFlipped);
          return false;
        case "ArrowLeft": // left arrow
          props.history.push(`/${previousIndex}`);
          setFlip(false);
          return false;
        case "ArrowRight": // right arrow
          props.history.push(`/${nextIndex}`);
          setFlip(false);
          return false;
        case "Escape":
          props.history.push("/");
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
      <div>
        <img
          css={[imgStyle].concat(isFlipped ? [hide] : [])}
          src={require(`./static/${datum.src}`)}
          key={require(`./static/${datum.src}`)}
        />
        <img
          css={[imgStyle].concat(isFlipped ? [] : [hide])}
          src={require(`./static/${datum.src_back}`)}
        />
      </div>
      <div>
        <h1>{datum.title_japanese}</h1>
      </div>
    </div>
  );
}
