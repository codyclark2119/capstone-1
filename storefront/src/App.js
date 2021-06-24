import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { UserProvider } from './utils/UserState';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Order from './pages/Order';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Theme Provider for Material UI */}
        <ThemeProvider theme={theme}>
          {/* User Provider for the User State */}
          <UserProvider>
              <Navbar />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/order" component={Order} />
                </Switch>
          </UserProvider>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
