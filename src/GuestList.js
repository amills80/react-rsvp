import React from 'react';
import PropTypes from 'prop-types';
import Guest from './Guest';

const GuestList = props => 
    <ul>
      {props.guests.map((guest, index) =>
        <Guest key={index} 
        name={guest.name} 
        isConfirmed={guest.isConfirmed}
        isEditing={guest.isEditing} 
        handleConfirmation={() => props.toggleconfirmationAt(index)}
        handleToggleEditing={() => props.toggleEditingAt(index)} />
      )}
    </ul>;

GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  toggleconfirmationAt: PropTypes.func.isRequired,
  toggleEditingAt: PropTypes.func.isRequired
}


export default GuestList;