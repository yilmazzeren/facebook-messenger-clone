import React, { useState,useEffect } from "react";
import { Button ,FormControl,InputLabel,Input} from '@material-ui/core';
import "./App.css";
import Message from "./Message";

function App() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {username : "Yılmaz" , text : "Hey"},
    {username : "Özlem" , text : "Hey Yılmaz"}]);

  const [username,setUsername] = useState('');


  const sendMessage = (event) => {
    event.preventDefault()
    setMessages([...messages, {username : username , text : input}]);
    setInput("");
  };

  useEffect (() => {
    setUsername(prompt("Please enter your name"))
    
  },[])

  return (
    <div className="App">
      <h1>Hello</h1>
      <h2>Welcome {username}</h2>
      <form >
        <FormControl>
          <InputLabel >Enter a message...</InputLabel>
          <Input value={input} onChange={(event) => setInput(event.target.value)} />
          <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>Send Message</Button>
        </FormControl>
      </form>
      {
        messages.map((message,key) => (
          <Message key={key} username = {message.username} text={message.text} />
        ))
      }
    </div>
  );
}

export default App;
