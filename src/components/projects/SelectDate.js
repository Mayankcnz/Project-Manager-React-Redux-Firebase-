import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class SelectDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null
    };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
 
  render() {
    return (
      <DatePicker placeholderText={this.props.placeholder}
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}

export default SelectDate;