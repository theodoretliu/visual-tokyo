/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ReactGallery from "react-photo-gallery";
import data from "./static/data.json";
import { stripUrl } from "./utils";
import { RouteComponentProps } from "react-router-dom";

const wrapper = css`
  box-sizing: border-box;
  max-width: 1300px;
  padding: 0px 20px;
  margin: 0px auto;
  padding-bottom: 20px;
`;

interface Props extends RouteComponentProps {}

export default function Gallery(props: Props) {
  return (
    <div css={wrapper}>
      <h1>Shufu no Tomo</h1>
      <ReactGallery
        photos={data.map((datum) => ({
          src: require(`./static/thumbs/${datum.src}`).default,
          height: datum.height,
          width: datum.width,
        }))}
        onClick={(_e, photos) => {
          props.history.push(`/${stripUrl(photos.photo.src)}`);
          window.scrollTo({
            top: 0,
            left: 0,
          });
        }}
      />
    </div>
  );
}
