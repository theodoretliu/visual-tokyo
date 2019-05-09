/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ReactGallery from "react-photo-gallery";
import data from "./static/data.json";

const wrapper = css`
  box-sizing: border-box;
  max-width: 1000px;
  padding: 0px 20px;
  margin: 0px auto;
`;

export default function Gallery(props) {
  return (
    <div css={wrapper}>
      <h1>Shufu no Tomo</h1>
      <ReactGallery
        photos={data.map(datum => ({
          src: require(`./static/${datum.src}`),
          height: datum.height,
          width: datum.width
        }))}
        onClick={(_e, photos) => {
          props.history.push(`/${photos.index}`);
        }}
      />
    </div>
  );
}
