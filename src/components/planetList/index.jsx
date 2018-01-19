import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import LoaderHoc from '../../hoc/loader';

class PlanetList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			open: false,
			planet: {}
		}
	}
	getStyle = (population) => {
		let size = 15;
		let color = '#E3F2FD'
		if(parseInt(population, 10) >= 2000000000){
			size = 45;
			color = '#1976D2'
		} else if(parseInt(population, 10) > 10000000){
			color = '#1E88E5'
			size = 40;
		} else if(parseInt(population, 10) > 1000000){
			color = '#2196F3'
			size = 30;
		} else if(parseInt(population, 10) > 500000){
			color = '#42A5F5'
			size = 27;
		} else if(parseInt(population, 10) > 50000){
			color = '#64B5F6'
			size = 25;
		} else if(parseInt(population, 10) > 10000){
			color = '#90CAF9'
			size = 22;
		} else if(parseInt(population, 10) > 1000){
			color = '#BBDEFB'
			size = 20;
		}
		let style = {
			display : "inline-block",
			backgroundColor: color,
			margin: 5,
			float:"left",
			width: `${size}%`,
			height: 66,
		    textAlign: 'center',
		    fontWeight: 'bold',
		    lineHeight: 4

		}
		return style;
	}
	handleOpen = (planet) => {
	    this.setState({open: true, planet});
  	};

  	handleClose = () => {
	    this.setState({open: false});
  	};
	render(){
		const {planetList} = this.props;
		const {planet} = this.state;
		const actions = [
	      <FlatButton
	        label="Ok"
	        primary={true}
	        keyboardFocused={true}
	        onClick={this.handleClose}
	      />,
	    ];
		return(
			[
				planetList.length > 0 ? planetList.map((planet, index)=>{
					return (
						<div onClick={()=> {this.handleOpen(planet)}} key={planet.name} style={this.getStyle(planet.population)}>{planet.name}</div>
					)
				}):<h3>No Data</h3>,
				<Dialog
		          title="Planet Info."
		          actions={actions}
		          modal={false}
		          open={this.state.open}
		          onRequestClose={this.handleClose}
		        >
	      			<b>Planet Name: </b>{planet.name}<br />
	      			<b>Planet Population: </b>{planet.population}<br />
	      			<b>Rotaion Period: </b>{planet.rotation_period}<br />
	      			<b>Orbital time: </b>{planet.orbital_period}<br />
	      			<b>Climate: </b>{planet.climate}
	        	</Dialog>
			]
		)
	}
}

export default LoaderHoc(PlanetList)