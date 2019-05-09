import React from "react";
import ReactGallery from "react-photo-gallery";
import data from "./static/data.json";

export default function Gallery(props) {
  return (
    <div>
      <h1>Shufunotomo</h1>
      <ReactGallery
        photos={data.map(datum => ({
          src: require(`./static/${datum.src}`),
          height: datum.height,
          width: datum.width
        }))}
        onClick={(e, photos) => {
          props.history.push(`/${photos.index}`);
        }}
      />
    </div>
  );
}
