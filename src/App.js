import { Switch, BrowserRouter, Route } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import LayoutInterface from "./components/LayoutInterface/LayoutInterface";
import Home from './components/Home/Home';
import Create from './components/Create/Create';
import Find from "./components/Find/Find";

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
            <Route
              exact
              path="/create"
              component={Create}
            />
            <Route
              exact
              path="/find/:findBy?"
              component={Find}
            />
          </LayoutInterface>
        </Switch>
      </BrowserRouter>
  );
}
