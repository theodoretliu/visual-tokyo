/** @jsx jsx */
import { useState } from 'react';
import { jsx, css } from '@emotion/core';
import data from './static/data.json';

const imgStyle = css`
  max-height: 100vh;
  max-width: 100%;
  object-fit: cover;
`;

const hide = css`
  display: none;
`
export default function ImageView(props) {
  let [isFlipped, setFlip] = useState(false);

  let datum = data[props.match.params.image];

  console.log(datum);

  return (<div>
    <div>
      <img css={[imgStyle].concat(isFlipped ? [hide] : [])} src={require(`./static/${datum.src}`)}/>
      <img css={[imgStyle].concat(isFlipped ? [] : [hide])} src={require(`./static/${datum.src_back}`)} />
      <button onClick={() => setFlip(!isFlipped)} >Flip me</button>
    </div>
  </div>);
}
