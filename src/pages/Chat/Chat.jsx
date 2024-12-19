import React, { useEffect, useState, useRef  } from 'react';
import { getMessagesByChatId } from '../../api/messages'
import AuthService from '../../services/AuthService';
import signalRService from '../../services/SignalRService';
import { getUserOnlineStatus } from '../../api/users';
import MembersModal from './MembersModal';

const Chat = (prop) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userStatus, setUserStatus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chatHistoryRef = useRef(null);
  const chatRoomRef = useRef(prop.chat);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessagesByChatId(prop.chat.id);
        setMessages(data)

        const status = await getUserOnlineStatus(prop.chat.id);        
        setUserStatus(status);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    chatRoomRef.current = prop.chat;
    prop.chat ? fetchMessages() : null;
  }, [prop]);
  
  useEffect(() => {
      if (chatHistoryRef.current) {
          chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
      }
  }, [messages]);

  useEffect(() => {
    const setupSignalR = async () => {
      try {
        await signalRService.startConnection();
        const connection = signalRService.getConnection();

        connection.on("receiveMessage", (message, chatId) => {          
          if (chatRoomRef.current && chatId === chatRoomRef.current.id) {
              setMessages((prevMessages) => [...prevMessages, message]);
          } else {
              prop.setChatRooms((prevChatRooms) =>
                  prevChatRooms.map((chatRoom) =>
                      chatRoom.id === chatId
                          ? { ...chatRoom, unreadMessageCount: chatRoom.unreadMessageCount + 1 }
                          : chatRoom
                  )
              );
          }

          prop.setChatRooms((prevChatRooms) => [prevChatRooms.find(room => room.id === chatId), ...prevChatRooms.filter(room => room.id !== chatId)]);
          prop.setChatRooms((prevChatRooms) =>
            prevChatRooms.map((chatRoom) =>
                chatRoom.id === chatId
                    ? { ...chatRoom, updatedDate: new Date() }
                    : chatRoom
            )
          );       
        });
        
      } catch (error) {
        console.error("SignalR setup failed:", error);
      }
    };

    setupSignalR();
  }, []);

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const connection = signalRService.getConnection();
        await connection.invoke("SendMessageAsync", message, prop.chat.id);
        setMessage('');
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

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

  if(!prop.chat) return null;

  return (
    <div className="chat">
        <div className="chat-header clearfix">
            <div className="row">
                <div className="col-lg-6" id="header-user">
                    <img src={prop.chat.imageUrl} alt="avatar"/>
                    <div className="chat-about">
                        <h6 className="mb-0">{prop.chat.name}</h6>
                        {prop.chat.chatRoomType === 0
                          ? (
                            <>
                              <a href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setIsModalOpen(true);
                              }}
                              className="link-secondary link-offset-2 link-underline-opacity-50 link-underline-opacity-100-hover"
                            >
                              <small>Members</small>
                            </a>
                            <MembersModal isOpen={isModalOpen} userStatus={userStatus} closeModal={() => setIsModalOpen(false)} formatDate={formatDate}/>
                            </>
                          )                        
                          : userStatus[0].isOnline
                            ? <small className='text-secondary'><i className="fa fa-circle online"></i> Online</small>
                            : <small className='text-secondary'>Last seen: {formatDate(new Date(userStatus[0].lastSeenDate))} </small>}
                    </div>
                </div>
                <div className="col-lg-6 hidden-sm text-end">
                    <a href="#" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></a>
                    <a href="#" className="btn btn-outline-primary"><i className="fa fa-image"></i></a>
                    <a href="#" className="btn btn-outline-info"><i className="fa fa-cogs"></i></a>
                    <a href="#" className="btn btn-outline-warning"><i className="fa fa-question"></i></a>
                </div>
            </div>
        </div>
        <div className="chat-history" ref={chatHistoryRef}>
            <ul className="mb-0">
                {messages.map((value, index) => (
                    value.senderUsername === AuthService.getUsername()
                        ?
                    <li key={index} className="clearfix">
                        <div className="message-data text-end">
                            <span className="message-data-time">{new Date(value.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, You</span>
                        </div>
                        <div className="message other-message float-right">{value.content}</div>
                    </li>
                        : 
                    <li key={index} className="clearfix">
                        <div className="message-data">
                            <span className="message-data-time">{value.senderName}, {new Date(value.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="message my-message">{value.content}</div>                                    
                    </li>
                ))}
            </ul>
        </div>
        <div className="chat-message clearfix">
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa fa-send" onClick={handleSendMessage}></i></span>
                <input type="text" className="form-control" placeholder="Enter text here..." id="messageInput" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyPress}/>
            </div>
        </div>
    </div>
  );
};

export default Chat;
