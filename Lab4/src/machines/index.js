import React, {Component} from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SingleMachine from './single/SingleMachine.js';
import PagedMachines from './page/PagedMachines.js';

class Machines extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;
    return (
      <Router>
        <Switch>
          <Route path={`${url}/page/:page`} component={PagedMachines}/>
          <Route path={`${url}/:id`} component={SingleMachine}/>
        </Switch>
      </Router>
    );
  }
}

export default Machines;
