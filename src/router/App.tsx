/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Questions from "src/pages/Questions";

import StartPage from "src/pages/StartPage";
const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/questions" component={Questions} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
