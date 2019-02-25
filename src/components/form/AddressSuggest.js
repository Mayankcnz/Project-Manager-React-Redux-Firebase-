import React, { Component } from 'react';
import AddressField from './AddressField';


class AddressSuggest extends Component {
  render() {
    return (
        <AddressField
          label="Address"
          value={this.props.query}
          onChange={this.props.onChange}
          placeholder="Start Typing Address" />
    );
  }
}

export default AddressSuggest;