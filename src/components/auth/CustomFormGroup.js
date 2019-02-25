import React from 'react';
import {FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import './SignIn.css';


const CustomFormGroup = props =>{


    const {formError} = props;
    return (

<FormGroup

    bsSize={props.buttonSize}
    validationState={props.message}
>
    <ControlLabel className="text">{props.query}</ControlLabel>
    <FormControl id="type"
    autoFocus
    id={props.id}
    type={props.type}
    value={props.value === null ? "":props.value}
    placeholder={props.instructions}
    className="form-control"
    onChange={props.handleChange}
    /> {formError && formError.length > 0 &&(
                            <span  className="errorMessage"  >{formError}</span>
                          )}
    </FormGroup>

    );
}

export default CustomFormGroup;


