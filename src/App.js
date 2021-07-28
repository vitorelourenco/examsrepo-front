import { Switch, BrowserRouter, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Home from './components/Home/Home';

export default function App() {
  return (
      <BrowserRouter>
        <GlobalStyles />
        <Switch>
          <Route
            exact
            path="/"
            component={Home}
          />
        </Switch>
      </BrowserRouter>
  );
}
