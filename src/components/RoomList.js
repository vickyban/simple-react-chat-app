import React, { Component } from 'react'

export default class RoomList extends Component {
  render() {
    const { rooms, subscribeToRoom, activeRoom } = this.props;
    const orderedRooms = rooms.sort((a, b) => a.id - b.id)
    return (
      <div>
        <h3>Your rooms:</h3>
        <ul>
          {orderedRooms.map(room => (
            <li key={room.id} id={room.id} className={room.id === activeRoom ? "active" : ""}>
              <a href="#"
                onClick={() => subscribeToRoom(room.id)}>
                #{room.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
