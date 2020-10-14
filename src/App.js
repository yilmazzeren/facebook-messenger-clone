import React, { useState } from "react";
import { Button ,FormControl,InputLabel,Input} from '@material-ui/core';
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(["hello", "hi", "whats up"]);

  console.log(input);
  console.log(messages);
  const sendMessage = (event) => {
    event.preventDefault()
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="App">
      <h1>Hello</h1>
      
      <FormControl>
        <InputLabel >Enter a message...</InputLabel>
        <Input value={input} onChange={(event) => setInput(event.target.value)} />
        <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>Send Message</Button>
      </FormControl>
      
      

      {
        messages.map((message,key) => (
        <p key={key}>{message}</p>
        ))
      }
    </div>
  );
}

export default App;
