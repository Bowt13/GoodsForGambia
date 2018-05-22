import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'

//Styling
  import './navbar.css'

//MaterialUI
  import Button from '@material-ui/core/Button';

class Navbar extends PureComponent {
  state = {
    searchBar: false,
    donatePackage: false,
    home: false,
    homeButton: 'flat',
    donateButton: 'raised',
  }

focusOn = () => {
  setTimeout(function(){ document.getElementById('navbarSearch').focus() }, 30)
}

handleSearchIconClick = () => {
  switch (this.state.searchBar) {
    case true:
      this.setState({
        searchBar: false
      })
      break;
    case false:
      this.setState({
        searchBar: true
      })
      break;
    default:
      break;
  }
  if(!this.state.searchBar){
  this.focusOn()}
}

handleRedirect = (location) => {
  switch (location) {
    case 'home':
      this.setState({
        home: true,
        donatePackage: false,
        homeButton: 'flat',
        donateButton: 'raised',
      })
      break;
    case 'donate':
      this.setState({
        home: false,
        donatePackage: true,
        homeButton: 'raised',
        donateButton: 'flat',
      })
      break;
    default:
  }
  this.forceUpdate()
}

componentDidMount(){
  this.setState({
    searchBar: false,
    donatePackage: false,
    home: true,
    homeButton: 'flat',
    donateButton: 'raised',
  })
}

  render() {
    const {searchBar, donatePackage, home} = this.state
    return (
      <div className='navbar'>
        {donatePackage &&
          <Redirect
            to={{
              pathname: "/formulieren/aanmeldingsformulier-pakketten",
            }}
          />
        }
        {home &&
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        }
        Stichting Goods for Gambia
        <Button
          className='nav-button'
          variant={this.state.homeButton}
          size='large'
          style={{
            marginTop: "0.4%",
            marginRight: 10,
          }}
          onClick={_ => this.handleRedirect('home')}
        >
        home
        </Button>
        <Button
          className='nav-button'
          variant={this.state.donateButton}
          size='large'
          style={{
            marginTop: "0.4%",
            marginRight: 10,
          }}
          onClick={_ => this.handleRedirect('donate')}
        >
        Doneer
        </Button>
      </div>
    );
  }
}

export default Navbar;
