import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from 'components/MessageList';
import SendMessageForm from 'components/SendMessageForm';
import RoomList from 'components/RoomList';
import NewRoomForm from 'components/NewRoomForm';

import './App.css';
import { tokenUrl, instanceLocator } from './config';

class App extends Component {
  state = {
    messages: [],
    joinableRooms: [],
    joinedRooms: [],
    subcribedRoom: {}
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'user1',
      tokenProvider: new Chatkit.TokenProvider({ url: tokenUrl })
    });

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
      }
      )

  }

  sendMessage = text => {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.subcribedRoom,
    });
  };

  getRooms = () => {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      }))
  }

  subscribeToRoom = roomId => {
    this.setState({
      messages: [],
    })
    this.currentUser.subscribeToRoom({
      roomId,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]  // Do not use array.push() to modidy the original array
          })
        }
      }
    }).then(room => {
      this.setState({ subcribedRoom: room.id })
      this.getRooms();
    })
      .catch(err => `error on subscribing to room ${err}`)
  };

  createRoom = (name, isPrivate = false) => {
    this.currentUser.createRoom({
      name,
      private: isPrivate,
    }).then(room => {
      console.log(`Created room called ${room.name}`);
      this.getRooms()
    })
      .catch(err => {
        console.log(`Error creating room ${err}`)
      })
  }

  render() {
    const { messages, joinableRooms, joinedRooms, subcribedRoom } = this.state;
    return (
      <div className="App">
        <RoomList
          activeRoom={subcribedRoom}
          rooms={[...joinableRooms, ...joinedRooms]}
          subscribeToRoom={this.subscribeToRoom}
        />
        <MessageList messages={messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default App;
