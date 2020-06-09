import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignupPage from './pages/signup-page';

const App: React.FC = () => (
    <Router>
        <Switch>
            <Route component={SignupPage} />
        </Switch>
    </Router>
);

export default App;
