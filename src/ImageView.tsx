/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react";
import React from "react";
import { css } from "@emotion/react";
import data from "./static/data.json";
import Gallery from "react-photo-album";
import { stripUrl } from "./utils";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";

const imgFlex = css`
  display: flex;
  align-items: center;
  margin: 0px 0px;
  height: 100%;
  width: 100%;
  padding: 50px 20px;
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

interface Props extends RouteComponentProps {
  currentIndex: number;
}

function ImageInteraction({ currentIndex, history }: Props) {
  let [isFlipped, setFlip] = useState(false);

  let galleryRef = useRef<HTMLDivElement>(null);
  let infoRef = useRef<HTMLDivElement>(null);

  let datum = data[currentIndex];

  let nextIndex = (currentIndex + 1) % data.length;
  let previousIndex = (currentIndex - 1 + data.length) % data.length;

  let nextImage = data[nextIndex].src;
  let prevImage = data[previousIndex].src;

  function flip() {
    setFlip(!isFlipped);
  }

  function previousPage() {
    history.push(`/${prevImage}`);
    setFlip(false);
  }

  function nextPage() {
    history.push(`/${nextImage}`);
    setFlip(false);
  }

  function goHome() {
    history.push("/");
  }

  function scrollToImage() {
    if (galleryRef) {
      galleryRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function scrollToInfo() {
    if (infoRef) {
      infoRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    window.onkeydown = (e: KeyboardEvent) => {
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

  let relatedImages = data
    .filter((idatum) => {
      if (datum === idatum) {
        return false;
      }

      for (let subject of datum.subjects) {
        if (idatum.subjects.includes(subject)) {
          return true;
        }
      }

      return false;
    })
    .map((datum) => ({
      src: `/static/thumbs/${datum.src}`,
      height: datum.height,
      width: datum.width,
    }));
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
            src={`/static/${datum.src}`}
            onClick={flip}
            alt={datum.title_english}
          />
          <img
            css={[imgStyle].concat(isFlipped ? [] : [hide])}
            src={`/static/${datum.src_back}`}
            onClick={flip}
            alt={datum.title_english}
          />
          <i
            css={css`
              position: absolute;
              left: calc(50% - 26.25px / 2);
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
        {relatedImages.length === 0 ? null : (
          <React.Fragment>
            <h2>Related Images</h2>
            <Gallery
              spacing={5}
              photos={relatedImages}
              onClick={({ photo }) => {
                history.push(`/${stripUrl(photo.src)}`);
                window.scrollTo({
                  top: 0,
                  left: 0,
                });
                setFlip(false);
              }}
              layout="rows"
            />{" "}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

const ImageInteractionWithRouter = withRouter(ImageInteraction);

interface ImageViewProps extends RouteComponentProps<{ image: string }> {}
export default function ImageView(props: ImageViewProps) {
  let currentImage = `${props.match.params.image}`;

  let currentIndex = -1;

  for (let i = 0; i < data.length; ++i) {
    if (data[i].src === currentImage) {
      currentIndex = i;
      break;
    }
  }

  if (currentIndex === -1) {
    return <Redirect to="/" />;
  }

  return <ImageInteractionWithRouter currentIndex={currentIndex} />;
}
