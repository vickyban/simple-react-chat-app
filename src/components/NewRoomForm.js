import React, { Component } from 'react'

export default class NewRoomForm extends Component {
  state = {
    roomName: ''
  };

  handleChange = (e) => {
    this.setState({
      roomName: e.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createRoom(this.state.roomName);
    this.setState({ roomName: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.roomName}
          onChange={this.handleChange}
          type="text"
          placeholder="New Room"
          required
        />
        <button id="create-room-btn" type="submit">+</button>
      </form>
    )
  }
}
