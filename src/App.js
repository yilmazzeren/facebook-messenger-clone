import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase"

function App() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);

  const [username, setUsername] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message:input,
      username : username,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    // setMessages([...messages, { username: username, text: input }]);
    setInput("");
  };

  useEffect(() => {
    // onSnapshot her değişikilği anında kaydeder. Api isteği yapmadan snapshot değişkeni ile verilerimize ulaşabiliriz.
    // snapshot.docs oluturduğum documentleri verir(firebase consoleda). doc ise docs alt bileşeni verir. doc.data direk verileri verir(message,username)
    db.collection("messages")
      .orderBy('timestamp','desc')
      .onSnapshot((snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
      console.log(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
      <h2>Welcome {username}</h2>
      <form>
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </Button>
        </FormControl>
      </form>
      {messages.map((message, key) => (
        <Message key={key} username={username} message={message} />
      ))}
    </div>
  );
}

export default App;
