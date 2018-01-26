import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import MainContent from './MainContent';

class App extends Component {
  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [] 
  };
  
  lastGuestId = 0;
  
  newGuestId = () => {
    const id = this.lastGuestId;
    this.lastGuestId += 1;
    return id;
  };
  
  toggleGuestProperty = (property, id) => 
    this.setState({
      guests: this.state.guests.map(guest => {
        if (id === guest.id) {
          return { 
            ...guest,
            [property]: !guest[property]
          }
        }
        return guest;
      })
    });
  
  toggleConfirmation = id => 
    this.toggleGuestProperty("isConfirmed", id);
    
  removeGuest = id =>
    this.setState({
      guests: this.state.guests.filter(guest => id !== guest.id)
    });
    
  toggleEditing = id => 
    this.toggleGuestProperty("isEditing", id);
  
  setName = (name, id) => 
    this.setState({
      guests: this.state.guests.map((guest) => {
        if (id === guest.id) {
          return { 
            ...guest,
          name
          }
        }
        return guest;
      })
    });
    
  toggleFilter = () => 
    this.setState({ isFiltered: !this.state.isFiltered });
  
  handleNameAddition = e => 
    this.setState({ pendingGuest: e.target.value });
    
  newGuestSubmitHandler = e => {
    e.preventDefault();
    const id = this.newGuestId();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
          id
        },
        ...this.state.guests
        ],
        pendingGuest: '',
    });
  }
  
  getTotalInvited = () => this.state.guests.length;
  getAttendingGuests = () => 
    this.state.guests.reduce((total, guest) => guest.isConfirmed ? total + 1 : total, 
    0);
    
  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    return (
    <div className="App">
      
      <Header 
      newGuestSubmitHandler={this.newGuestSubmitHandler}
      pendingGuest={this.state.pendingGuest}
      handleNameAddition={this.handleNameAddition} />
      
      <MainContent
      toggleFilter={this.toggleFilter}
      isFiltered={this.state.isFiltered}
      numberTotal={totalInvited}
      numberAttending={numberAttending}
      numberUnconfirmed={numberUnconfirmed}
      guests={this.state.guests} 
      toggleConfirmationAt={this.toggleConfirmation} 
      toggleEditingAt={this.toggleEditing}
      removeGuestAt={this.removeGuest}
      setNameAt={this.setName} 
      pendingGuest={this.state.pendingGuest} />
      
    </div>
    );
  }
}

export default App;
