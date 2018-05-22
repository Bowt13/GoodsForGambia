import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

//Containers
  import Navbar from './containers/navbar/Navbar.js'
  import Homepage from './containers/home/Homepage.js'
  import PackageSendForm from './containers/forms/PackageSendForm.js'
  import PackageSendComplete from './containers/forms/PackageSendComplete.js'

//MaterialUI
  import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

//Styling
  import './App.css'

class App extends Component {
  render() {
    return (
      <Router className='centered'>
        <MuiThemeProvider>
          <div className="App">
            <Navbar/>
            <Route exact path="/GoodsForGambia" component={Homepage} />
            <Route exact path="/GoodsForGambia/formulieren/aanmeldingsformulier-pakketten" component={PackageSendForm} />
            <Route exact path="/GoodsForGambia/formulieren/aanmeldingsformulier-succes" component={PackageSendComplete} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
