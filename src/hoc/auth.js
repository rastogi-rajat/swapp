import React from 'react';
import { browserHistory } from 'react-router';

const Authenticate = (WrapedComponent) =>{
	return class Authenticate extends React.Component {
		constructor(props){
			super(props)
		    if(localStorage.getItem('USER') === null || localStorage.getItem('USER').length === 0){
		      browserHistory.push('/')
		    }
	  	}
	  	render(){
	  		return (<WrapedComponent key="key"/>)
	  	}
	}
}

export default Authenticate;