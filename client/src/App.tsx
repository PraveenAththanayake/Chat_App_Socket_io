import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

interface Message {
  user: string;
  content: string;
}

const App = () => {
  const [messages, setMessage] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on("message", (message: Message) => {
      setMessage([...messages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [messages]);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div>
      <h1>Simple Chat App</h1>
      <input
        type="text"
        value={messageInput}
        placeholder="Type your message"
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      {/*
        Display the messages in a list
      */}

      <section>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </section>
    </div>
  );
};

export default App;
