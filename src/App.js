import React, { useState, useEffect } from "react";
import {  FormControl, Input } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function App() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);

  const [username, setUsername] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setMessages([...messages, { username: username, text: input }]);
    setInput("");
  };

  useEffect(() => {
    // onSnapshot her değişikilği anında kaydeder. Api isteği yapmadan snapshot değişkeni ile verilerimize ulaşabiliriz.
    // snapshot.docs oluturduğum documentleri verir(firebase consoleda). doc ise docs alt bileşeni verir. doc.data direk verileri verir(message,username)
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  return (
    <div className="App">
      <img
        style={{ width: "10%" }}
        src="https://www.kartal24.com/dosyalar/2020/03/facebook-messenger-768x576.jpg"
        alt=" "
      />
      <h1>Hello</h1>
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
          className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton
          className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
