import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import DirectChatForm from './DirectChatForm';
import GroupChatForm from './GroupChatForm';
import { getAllUsers } from '../../api/users'

const ChatModal = ({ show, onClose, onCreateChat }) => {
    const [activeTab, setActiveTab] = useState('direct');
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const data = await getAllUsers();
            setUsers(data)
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
    
        fetchUsers();
    }, [])

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <div className="d-flex justify-content-center">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'direct' ? 'active bg-dark text-white' : 'bg-wihite text-dark '}`}
                                onClick={() => setActiveTab('direct')}
                            >
                                Direct Chat
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'group' ? 'active bg-dark text-white' : 'bg-wihite text-dark '}`}
                                onClick={() => setActiveTab('group')}
                            >
                                Group Chat
                            </button>
                        </li>
                    </ul>
                </div>

            </Modal.Header>
            <Modal.Body>
                <div className="p-3">
                    {activeTab === 'direct' && <DirectChatForm users={users} onCreateChat={onCreateChat} />}
                    {activeTab === 'group' && <GroupChatForm users={users} onCreateChat={onCreateChat} />}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ChatModal;