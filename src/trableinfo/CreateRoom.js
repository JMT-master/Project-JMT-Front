import React, { useState } from 'react'

const CreateRoom = (props) => {

  const [item, setItem] = useState({
    roomId : "",
    roomName : ""
  });
  const addRoom = props.createRoom;

  const onInputChange = (e) => {
    setItem({
      roomName: e.target.value
    });
    console.log(item);
  }

  const onButtonClick = () => {
    addRoom(item);
    setItem({ roomName: "" })
  }

  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      onButtonClick();
    }
  }

  return (
    <div>
      <input
          type="text"
          value={item.roomName}
          id={item.id} name={item.id}
          onChange={onInputChange()}
          onKeyPress={enterKeyEventHandler()}
        />
        <button className="btn btn-primary" type="button" onClick={onButtonClick()}>
          채팅방 개설
        </button>
    </div>
  )
}

export default CreateRoom;