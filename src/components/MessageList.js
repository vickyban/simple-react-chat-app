import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';

const DUMMY_DATA = [
  {
    senderId: 'perbor',
    text: 'Hey, how is it going?',
  }, {
    senderId: 'Jane',
    text: 'Great! How about you?',
  }, {
    senderId: 'perbor',
    text: 'Good to hear! I\'m great as well'
  }
];

export default class MessageList extends Component {
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom = node.scrollTop + node.client >= node.scrollHeight
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this)
      node.scrollTop = node.scrollHeight;
    }
  };

  render() {
    const { messages } = this.props;
    return (
      <div className="message-list">
        {messages.map((msg, index) => (
          <Message message={msg} key={index} />
        ))}
      </div>
    )
  }
}
