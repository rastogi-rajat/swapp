import React from 'react';
import { browserHistory } from 'react-router';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Api from '../../api';

//Luke Skywalker, 19BBY
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }
  componentWillMount(){
    if(localStorage.getItem('USER') !== null && localStorage.getItem('USER').length > 0){
      browserHistory.push('/dashboard');
    }
  }

  submit = (event) => {
      event.preventDefault();
      console.log(event.target.username.value)
      const username = event.target.username.value;
      const password = event.target.password.value;

      if(!username) {
        this.setState({
          error:'Username is Required.'
        })
          return false;
      }

      if(!password) {
        this.setState({
          error:'Password is Required.'
        })
        return false;
      }

      this.setState({
        loading: true
      })

      return Api.get(`https://swapi.co/api/people/?search=${username}&format=json`)
      .then(responseJson => responseJson.results)
      .then(result => {
        result = result.filter(user => {
          return user.name === username && user.birth_year === password;
        });
        console.log("result ", result)
        if (result.length === 1) {
          localStorage.setItem("USER", result[0].name);
          this.setState({loading: false});
          browserHistory.push('/dashboard');
        } else {
          this.setState({loading: false, error: "Invalid username or password."});
        }
      }).catch(error => {
        this.setState({isLoading: false});
      });
  }

  render() {
    let { error, loading } = this.state;
    const styles = {
      cardStyle: {
        width: '35%',
        position: 'absolute',
        top:'32%',
        left: '32%',
        backgroundColor:'#1abcd499'
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
      <Card style={styles.cardStyle}>
        <CardTitle style={styles.centerStyle} titleColor="#fff" title="LOGIN" />
        <CardText style={styles.centerStyle}>
          <form onSubmit={this.submit}>
            <TextField
              hintText="Username"
              required={true}
              name="username"
            /><br />
            <TextField
              required={true}
              hintText="Password"
              type="password"
              name="password"
            /><br />
            <RaisedButton style={styles.m10}
              backgroundColor="#4caf50"
              type="submit"
              label="Login"
              fullWidth={true}
              labelColor="#fff"
              disabled={loading}
            />
            {
              error && <div><span style={styles.errorStyle}>{error}</span></div>
            }
          </form>
        </CardText>
      </Card>
    )
  }
}
