import '../src/less/input-moment.less';
import './app.less';
import moment from 'moment';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InputMoment from '../src/input-moment';
import packageJson from '../package.json';

class App extends Component {
  state = {
    m: moment(),
    value: false
  };

  // set valuse based on the current time
  

  handleChange = (m, value) => {
    if(value == 'changeAMPM') {
      this.setState({ value: !this.state.value });  
    } else if ( value == 'hours' || value == 'minutes'){
      if(this.state.value){
        this.setState({ m });
      } else {
        this.setState({ m });
      }
    } 
  };

  handleSave = () => {
    console.log('saved', this.state.m.format('llll'));
  };


  render() {
    return (
      <div className="app">
        <h1>
          {packageJson.name}: {packageJson.version}
        </h1>
        <h2>{packageJson.description}</h2>
        <form>
          <div className="input">
            {this.state.value ? 'AM' : 'PM'}
            <input type="text" value={this.state.m.format('llll')} readOnly />
          </div>
          <InputMoment
            moment={this.state.m}
            onChange={this.handleChange}
            minStep={5}
            onSave={this.handleSave}
            onToggle={this.onToggle}
            is12Hr={true}
          />
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
