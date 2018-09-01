import React, { Component } from 'react'

export default class SendMessageForm extends Component {
  state = {
    text: ''
  }

  handleChange = event => this.setState({ text: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    const { text } = this.state;
    this.props.sendMessage(text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="send-message-form">
        <input
          onChange={this.handleChange}
          value={this.state.text}   // control value can only from the text value
          type="text"
          placeholder="Enter message..." />
      </form>
    )
  }
}
