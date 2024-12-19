import React from "react";
import { Modal } from 'react-bootstrap';

const MembersModal = ({ isOpen, closeModal, userStatus, formatDate }) => {
  if (!isOpen) return null;

  return (    
    <Modal show={isOpen} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton>
            <div className="d-flex justify-content-center w-100">
            <h4 className="text-dark">Group Members</h4>
            </div>
        </Modal.Header>
        <Modal.Body className="overflow-auto" style={{ maxHeight: '400px' }}>
            {userStatus.map((user, index) => (
            <div key={index} className="user-item d-flex justify-content-between align-items-center mb-4 py-2 border-bottom">
                <div className="d-flex align-items-center">
                <div
                    className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center me-3"
                    style={{ width: "40px", height: "40px" }}
                >
                    {user.nameSurname.charAt(0).toUpperCase()}
                </div>
                <p className="name-surname font-weight-bold mb-0 text-dark">{user.nameSurname}</p>
                </div>
                <div>
                {user.isOnline ? (
                    <small className="text-success d-flex align-items-center">
                    <i className="fa fa-circle online me-1"></i> Online
                    </small>
                ) : (
                    <small className="text-muted">
                    Last seen: {formatDate(new Date(user.lastSeenDate))}
                    </small>
                )}
                </div>
            </div>
            ))}
        </Modal.Body>
    </Modal>
  );
};

export default MembersModal;
