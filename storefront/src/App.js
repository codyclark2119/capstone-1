import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import theme from './theme';
import { UserProvider } from './utils/UserState';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Order from './pages/Order';

function App() {
  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={theme}>
          <UserProvider>
              <Navbar />
              <Container>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/order" component={Order} />
                </Switch>
              </Container>
          </UserProvider>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
