import React, { Component } from 'react';
import AddressSuggest from './AddressSuggest';
import AddressInput from './AddressInput';
import axios from 'axios';
import { connect } from 'react-redux';
import PopUp from '../projects/PopUp';




const APP_ID_HERE = process.env.REACT_APP_APP_ID;
const APP_CODE_HERE = process.env.REACT_APP_APP_CODE;

class AddressForm extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();

    // User has entered something in the address bar
    this.onQuery = this.onQuery.bind(this);
    // User has entered something in an address field
    this.onAddressChange = this.onAddressChange.bind(this);
    // User has clicked the check button
    this.onCheck = this.onCheck.bind(this);
    // User has clicked the clear button
    this.onClear = this.onClear.bind(this);
  }

  handleSave = () =>{
    this.onCheck();
    if(this.checkaddress()){
      this.props.errorInformation(""); // pass empty string indicating form error is empty
    }else {
      this.props.errorInformation("Address fields is invalid or incomplete!");
    }
  }


  onQuery(evt) {
    const query = evt.target.value;

    console.log(evt.target);

    if (!query.length > 0) {
      this.setState(this.getInitialState());
      return;
    }

    const self = this;
    axios.get('https://autocomplete.geocoder.api.here.com/6.2/suggest.json',
      {'params': {
        'app_id': APP_ID_HERE,
        'app_code': APP_CODE_HERE,
        'query': query,
        'maxresults': 1,
      }}).then(function (response) {
          if (response.data.suggestions.length > 0) {
            const id = response.data.suggestions[0].locationId;
            const address = response.data.suggestions[0].address;
            self.setState({
              'address' : address,
              'query' : query,
              'locationId': id
            })
          } else {
            const state = self.getInitialState();
            self.setState(state);
          }
      });
  }

  getInitialState() {
    return {
      'address': {
        'street': '',
        'city': '',
        'state': '',
        'postalCode': '',
        'country': ''
      },
      'query': '',
      'locationId': '',
      'isChecked': false,
      'coords': {
        'lat':'',
        'lon':''
      }
    }


  }

  onClear = (evt) => {
    const state = this.getInitialState();
    this.setState(state);
  }

  onAddressChange(evt) {
    const id = evt.target.id
    const val = evt.target.value

    let state = this.state
    state.address[id] = val;
    this.setState(state);
  }

  onCheck = (evt) => {
    //evt.preventDefault();

    let params = {
        'app_id': APP_ID_HERE,
        'app_code': APP_CODE_HERE,
    }

    if (this.state.locationId.length > 0) {
      params['locationId'] = this.state.locationId;
    } else {
      params['searchtext'] = this.state.address.street
        + this.state.address.city
        + this.state.address.state
        + this.state.address.postalCode
        + this.state.address.country;
    }

    const self = this;
    axios.get('https://geocoder.api.here.com/6.2/geocode.json',
      {'params': params }
      ).then(function (response) {
        const view = response.data.Response.View
        if (view.length > 0 && view[0].Result.length > 0) {
          console.log("FIRSDT");
          const location = view[0].Result[0].Location;

          self.setState({
            'isChecked': 'true',
            'locationId': '',
            'query': location.Address.Label,
            'address': {
              'street': location.Address.HouseNumber + ' ' + location.Address.Street,
              'city': location.Address.City,
              'state': location.Address.State,
              'postalCode': location.Address.PostalCode,
              'country': location.Address.Country
            },
            'coords': {
              'lat': location.DisplayPosition.Latitude,
              'lon': location.DisplayPosition.Longitude
            }
          }, function(){
            console.log("What is happing");
            this.props.createAddress(this.state);
          });
        }else {
          //  self.setState({
             //   'isChecked': true,
             //   'coords': null,
       // })
    }
      })
      .catch(function(error) {
        console.log('caught failed query');
        self.setState({
          'isChecked': true,
          'coords': null,
        });
      });

     
  }

  alert() {

    if (!this.state.isChecked) {
      return;
    }

    if (this.state.coords === null) {
      return (
        <div className="alert alert-warning" role="alert">
          <b>Invalid.</b> The address is not recognized.
        </div>
      );
    } else {
      return (
        <div className="alert alert-success" role="alert">
          <b>Valid Address.</b>  Location is {this.state.coords.lat}, {this.state.coords.lon}.
        </div>
      );
    }

  }
  
  checkaddress = () =>{

  ///  if (!this.state.isChecked) {
    ///  return false;
   /// }

    if (this.state.coords === null){
      return false;
    }

    return true;
  };

 

  render() {

    //<button  className="btn btn-warning" onClick={this.onCheck}>Check</button>

    // { result }
    // on save check if the address is valid
    // <button  className="btn btn-warning" onClick={this.onCheck}>Check</button>
    // <button  className="btn btn-outline-secondary" onClick={this.onClear}>Clear</button>
    let result = this.alert();
    return (
      <PopUp clear={this.onClear} save={this.handleSave} closeHandle={result === true ? true : false}  information={this.state.isChecked} buttonName={"Project Address"} title={"Project Address"} >
        <div className="container-fluid">
            <div className="row " >
            <div className="col-lg-12">

            <AddressSuggest
            query={this.state.query}
            onChange={this.onQuery}
            />
          <AddressInput
            street={this.state.address.street}
            city={this.state.address.city}
            state={this.state.address.state}
            postalCode={this.state.address.postalCode}
            country={this.state.address.country}
            onChange={this.onAddressChange}
            />
          <br/>
                   
          </div>
          </div>
          { result }
        </div>
        </PopUp>
      );
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    createAddress: (address) => dispatch({
      type: "CREATE_ADDRESS",
      address
    })
}
}




export default connect(null, mapDispatchToProps)(AddressForm);
