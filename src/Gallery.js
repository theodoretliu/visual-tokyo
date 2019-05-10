/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ReactGallery from "react-photo-gallery";
import data from "./static/data.json";
import { stripUrl } from "./utils";

const wrapper = css`
  box-sizing: border-box;
  max-width: 1300px;
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
          props.history.push(`/${stripUrl(photos.photo.src)}`);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
        }}
      />
    </div>
  );
}
