import React from 'react';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import Api from '../../api';
import PlanetList from '../planetList';
//Luke Skywalker, 19BBY
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	planetList: [],
    	open: false,
    	message: ""
    }
    this.count = 0;
    this.callResetTimeout = null;
    this.debounceTimeout = null;
  }

  componentWillMount(){
    if(localStorage.getItem('USER') !== null && localStorage.getItem('USER').length > 0){
      browserHistory.push('/dashboard')
    }
    this.getData("")
  }
  getData = async (value) => {
    if (value || value === "") {
      try {
        let response = await Api.get(`https://swapi.co/api/planets/?search=${value.trim()}&format=json`);
        let result = response.results ? response.results : [];
        this.setState({planetList: result});
      } catch (err) {
        console.log(err);
      }
    }
  };

  logout = () => {
  	localStorage.removeItem('USER');
  	browserHistory.push('/')
  }

  onSearch = event => {
  	let value = event.target.value;
  	console.log("value ", event.target.value)
    if (this.count >= 15 && this.props.username !== "Luke Skywalker") {
    	this.setState({
    		open: true,
    		message:"More then 15 search not allowed"
    	})
      return;
    }
    if(this.debounceTimeout){
    	clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {
      this.debounceTimeout = null;
      this.count++;
      this.getData(value);
      if(this.callResetTimeout){
      	clearTimeout(this.callResetTimeout);
      }
      this.callResetTimeout = setTimeout(() => {
        this.callResetTimeout = null;
        this.count = 0;
      }, 60 * 1000);
    }, 200);
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    let { open, message, planetList } = this.state;
    const styles = {
      cardStyle: {
        width: '35%',
        position: 'absolute',
        top:'32%',
        left: '32%',
        backgroundColor:'rgba(2, 166, 242, 0.39)'
      },
      centerStyle: {
        textAlign: 'center'
      },
      m10: {
        marginBottom: 10
      },
      errorStyle: {
        color:"red"
      }
    }

    return (
      [
      	<AppBar
		    iconElementLeft={<TextField
              hintText="Search"
              onChange ={this.onSearch}
              name="search"
            />}
		    iconElementRight={<FlatButton onClick={this.logout} label="Logout" />}
		/>,
		<PlanetList planetList={planetList} />,
		<Snackbar
          open={open}
          message={message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      ]
    )
  }
}
