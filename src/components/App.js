import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import setUpStore from '../store'
import Notes from './Notes.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      store: null
    }
  }


  componentWillMount = () => {
    const store = setUpStore();
    this.setState({ store });
    store.subscribe(this.localStorageChange);
  };

  localStorageChange = () => {
    const jsonStore = JSON.stringify(this.state.store.getState());
    localStorage.setItem('storeState', jsonStore);
  }


  render() {

    if (!this.state.store) return null

    return (
      <Provider store={this.state.store}>
        <div className="App">

          <BrowserRouter>
            <Switch>
              <Route path='/' component={Notes} />
            </Switch>
          </BrowserRouter>

        </div>
      </Provider>
    );
  }
}

export default App;
