import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { MoreHoriz } from "@mui/icons-material";
import OnlineFriend from "../components/OnlineFriend";
import ChatComp from "../components/ChatComp";

// socket io
import { io } from "socket.io-client";

const Messenger = () => {
  const { state } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const socket = useRef();

  // socket server config
  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) =>
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    );
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", state.user._id);
    socket.current.on("getUsers", (users) => setOnlineUsers(users));
  }, [state]);

  // getting all the conversation current user have
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversations/${state.user._id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [state]);

  // getting current conversation messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  // for scroll ref
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // send new messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: state.user._id,
      text: newMessage,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== state.user._id
    );

    socket.current.emit("sendMessage", {
      senderId: state.user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50">
      {/* navbar */}
      <Navbar />
      {/* section */}
      <section className="max-w-7xl mx-auto grid grid-cols-5 gap-x-4 my-4">
        <Sidebar />
        {currentChat ? (
          <div className="col-span-3 max-w-2xl">
            {/* chat header */}
            <div className="flex justify-between items-center bg-white/80 backdrop-blur-md pr-4 rounded-md sticky top-20">
              <OnlineFriend />
              <MoreHoriz />
            </div>
            {/* chat screen */}
            <div className="space-y-8 my-8">
              {messages.map((message) => (
                <div ref={scrollRef} key={message._id}>
                  <ChatComp
                    self={message.sender === state.user._id}
                    message={message}
                  />
                </div>
              ))}
            </div>
            {/* type box */}
            <form
              className="sticky bottom-10 flex space-x-2"
              onSubmit={handleSubmit}>
              <textarea
                rows="2"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                placeholder="Type your message here..."
                className="px-4 py-2 outline-none border border-transparent   focus:border-teal-800 rounded-md w-full bg-white/80 backdrop-blur-md"></textarea>
              <button
                className="py-2 bg-teal-800 px-4 h-fit rounded-md text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={newMessage.trim() === ""}>
                Send
              </button>
            </form>
          </div>
        ) : (
          <div className="col-span-3 max-w-2xl grid place-content-center">
            <h1 className="text-2xl">Open a conversation to chat😊</h1>
          </div>
        )}

        {/* online friends for conversation */}
        <div className="col-span-1">
          <div className="sticky top-24 space-y-4">
            <h1 className="font-bold text-xl">Friend list</h1>
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => setCurrentChat(conversation)}>
                <OnlineFriend
                  conversation={conversation}
                  onlineUsers={onlineUsers}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Messenger;
