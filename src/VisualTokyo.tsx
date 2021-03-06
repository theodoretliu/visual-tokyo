/** @jsxImportSource @emotion/react */
import Gallery from "./Gallery";
import ImageView from "./ImageView";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./normalize.css";
import "./index.css";

function VisualTokyo() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Gallery} />
        <Route path="/:image" component={ImageView} />
      </Switch>
    </BrowserRouter>
  );
}

export default VisualTokyo;
