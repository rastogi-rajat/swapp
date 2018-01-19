import React from 'react';
import { browserHistory } from 'react-router';

const LoaderHoc = (WrapedComponent) =>{
	return class Loader extends React.Component {
	  	render(){
	  		const {fetching} = this.props;
	  		return (fetching ? <div class="loader"></div>:<WrapedComponent {...this.props} key="key"/>)
	  	}
	}
}

export default LoaderHoc;