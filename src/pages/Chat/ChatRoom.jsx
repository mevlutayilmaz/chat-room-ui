import React, { useEffect, useState, useCallback } from 'react';
import Chat from "./Chat"
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService'
import { getAllChats } from '../../api/chatRooms'
import ChatModal from './ChatModal'
import signalRService from '../../services/SignalRService';

const ChatRoom = () => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (!AuthService.getAccessToken()) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const setupSignalR = async () => {
      try {
        await signalRService.startConnection();
        const connection = signalRService.getConnection();

        connection.on("chatRoomCreated", fetchChats);
        
      } catch (error) {
        console.error("SignalR setup failed:", error);
      }
    };

    setupSignalR();

    return () => {
      signalRService.stopConnection();
    };
  }, []);

  const fetchChats = useCallback(async () => {
    try {
      const data = await getAllChats();
      setChatRooms(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const createDirectChat = async (username) => {
    try {
      const connection = signalRService.getConnection();
      await connection.invoke("CreateDirectChatAsync", username);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const createGroupChat = async (name, imageUrl, usernameList) => {
    try {
      const connection = signalRService.getConnection();
      await connection.invoke("CreateGroupChatAsync", name, imageUrl, usernameList);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleCreateChat = async (chatData) => {
    chatData.type === 'direct'
      ? await createDirectChat(chatData.username)
      : await createGroupChat(chatData.name, chatData.imageUrl, chatData.usernameList)
    setModalShow(false);
  };

  const handleSelectChat = (value) => {
    setChatRooms((prevChatRooms) =>
      prevChatRooms.map((chatRoom) =>
        chatRoom.id === value.id ? { ...chatRoom, unreadMessageCount: 0 } : chatRoom
      )
    );
    setSelectedChat(value);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
  
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="container">
      <h1 className="text-center display-4 fw-bold">Welcome to ChatRoom</h1>
        <div className="row clearfix">
            <div className="col-lg-12">
                <div className="card chat-app">
                    <div id="plist" className="people-list">
                        <div className="input-group">
                            <div className="input-group mb-3 mt-3">
                                <span className="input-group-text"><i className="fa fa-search"></i></span>
                                <input type="text" className="form-control" placeholder="Search rooms" id="groupInput"/>
                                <button className="btn btn-dark ms-2" onClick={() => setModalShow(true)}><i className="fa fa-plus"></i></button>
                            </div>
                        </div>

                        <ul className="list-unstyled chat-list mt-2 mb-0">
                            {chatRooms.map((value, index) => (
                                <li key={index}
                                    className={`clearfix ${selectedChat && selectedChat.id === value.id ? "active" : ""}`}
                                    onClick={() => handleSelectChat(value)}
                                >
                                    <img src={value.imageUrl} alt="avatar"/>
                                    <div className="about">
                                        <div className="name">{value.name}</div>
                                        <div className="status">{formatDate(value.updatedDate)}</div>
                                    </div>
                                    {value.unreadMessageCount > 0 && (
                                      <span className="badge bg-dark rounded-pill float-right position-relative" style={{ top: "10px" }}>{value.unreadMessageCount}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Chat chat={selectedChat} setChatRooms={setChatRooms} />
                </div>
            </div>
        </div>
        <ChatModal
            show={modalShow}
            onClose={() => setModalShow(false)}
            onCreateChat={handleCreateChat}
        />
    </div>
  );
};

export default ChatRoom;
