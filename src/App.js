import { Switch, BrowserRouter, Route } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import LayoutInterface from "./components/LayoutInterface/LayoutInterface";
import Home from './components/Home/Home';

export default function App() {
  return (
      <BrowserRouter>
        <GlobalStyles />
        <Switch>
          <LayoutInterface>
            <Route
              exact
              path="/"
              component={Home}
            />
          </LayoutInterface>
        </Switch>
      </BrowserRouter>
  );
}
