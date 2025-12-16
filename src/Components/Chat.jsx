import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const {targetUserId} = useParams();
    console.log("Target User Id -> ",targetUserId);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const loggedInUser = useSelector(store => store?.user);
    const userId = loggedInUser?._id;
    
    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {withCredentials: true});

        console.log(chat.data.messages);

        const chatMessages = chat?.data?.messages?.map((message) => {
            return (
                {
                    firstName: message?.senderId?.firstName,
                    lastName: message?.senderId?.lastName,
                    text: message?.text
                }
            )
        });
        setMessages(chatMessages);
    }

    useEffect(() => {
        fetchChatMessages();
    },[]);

    useEffect(() => {

        if(!userId) return;
        const socket = createSocketConnection();
        // As soon as the page loaded the socket connection is made and joinChat event is emitted.
        console.log("Emit join chat before");
        socket.emit("joinChat",{firstName: loggedInUser.firstName,userId, targetUserId});
        console.log("Emit join chat after");

        socket.on("messageReceived",({firstName,lastName, text}) => {
            console.log(firstName + " : " + text);
            setMessages((messages) => [...messages, {firstName,lastName, text}]);
        })

        /* Whenever this component unloads we need to do the cleanup. 
            Else there will be a performance hit and 
            a lot of loose socket connections
        */

            // When the component unmounts this return will be called
        return () => {
            console.log("Socket is disconnected");
            socket.disconnect();
        }
    
    },[userId, targetUserId]);

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage",{
            firstName: loggedInUser.firstName, 
            lastName: loggedInUser.lastName,
            userId,
            targetUserId,
            text : newMessage
        });
        setNewMessage("");
    }

    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-scroll p-5">
            {/*Display Messages */}
            {messages.map((msg,index) => {
                return (
                    <div key={index} className={"chat" +(loggedInUser.firstName === msg.firstName ? "chat-end" : "chat-start")}>
                    <div className="chat-image avatar">
                      <div className="w-5 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src={loggedInUser.photoUrl} />
                      </div>
                    </div>
                    <div className="chat-header">
                      {msg.firstName + " " + msg.lastName} 
                      <time className="text-xs opacity-50">12:45</time>
                    </div>
                    <div className="chat-bubble">{msg.text}</div>
                    <div className="chat-footer opacity-50">Seen</div>
                  </div>
                )
            })}
            </div>
            <div className="p-5 border-t border-gray-600 flex gap-2 items-center">
                <input 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 border border-gray-600 rounded p-2"  />
                <button onClick={sendMessage} className="btn btn-secondary">Send</button>
            </div>
        </div>
    );
}

export default Chat;