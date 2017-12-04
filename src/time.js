import cx from 'classnames';
import React, { Component } from 'react';
import InputSlider from 'react-input-slider';
import Toggle from 'react-toggle';

export default class extends Component {
  
  changeHours = pos => {
    const m = this.props.moment;
    m.hours(pos.x);
    this.props.onChange(m, 'hours');
  };

  changeMinutes = pos => {
    const m = this.props.moment;
    m.minutes(pos.x);
    this.props.onChange(m, 'minutes');
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value }) 
  }

  onToggle = (e) => {
    const m = this.props.moment;
    this.setState({
      value: !this.state.value,
    })
    this.props.onChange(m, 'changeAMPM');
  }

  render() {
    const m = this.props.moment;

    return (
      <div className={cx('m-time', this.props.className)}>
        <div className="showtime">
          {
            this.props.is12Hr ?
            <span className="time">{m.format('hh')}</span>
            :
            <span className="time">{m.format('HH')}</span>
          }
          <span className="separater">:</span>
          <span className="time">{m.format('mm')}</span>
        </div>

        <div className="sliders">
          <div className="time-text">Hours:</div>
            <InputSlider
                className="u-slider-time"
                xmin={0}
                xmax={ this.props.is12Hr ? 11 : 23 }
                xstep={this.props.hourStep}
                x={m.hour()}
                onChange={this.changeHours}
              />
          <div className="time-text">Minutes:</div>
          <InputSlider
            className="u-slider-time"
            xmin={0}
            xmax={59}
            xstep={this.props.minStep}
            x={m.minute()}
            onChange={this.changeMinutes}
          />
          {
            this.props.is12Hr ?
               <Toggle
                defaultChecked={this.props.value}
                icons={{
                  checked: 'AM',
                  unchecked: 'PM',
                }}
                onChange={this.onToggle} />
            :
              ''
          }
         
        </div>
      </div>
    );
  }
}
