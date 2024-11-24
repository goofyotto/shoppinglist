import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { UserContext } from "../Users/UserProvider";

function ShoppingListModal({ show, handleClose, handleSave, currentName, currentMembers, listId, removeMember, addMember, handleDelete }) {
  const { userList } = useContext(UserContext);
  const [newName, setNewName] = useState(currentName);
  const [newMemberId, setNewMemberId] = useState("");

  useEffect(() => {
    setNewName(currentName);
  }, [currentName]);

  const handleAddMember = () => {
    if (newMemberId && !currentMembers.includes(newMemberId)) {
      addMember(listId, newMemberId);
      setNewMemberId("");
    }
  };

  const handleSubmit = () => {
    handleSave(newName);
    handleClose();
  };

  const availableUsers = userList.filter(user => user._id !== listId && !currentMembers.includes(user._id));

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Shopping List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNewName">
            <Form.Label>New Name</Form.Label>
            <Form.Control
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </Form.Group>
        </Form>
        <h5>Current Members</h5>
        <ul>
          {currentMembers.map((memberId) => (
            <li key={memberId}>
              <span>{userList?.find(user => user._id === memberId)?.username || memberId}</span>
              <Button variant="danger" onClick={() => removeMember(listId, memberId)}>Kick</Button>
            </li>
          ))}
        </ul>
        <Form>
          <Form.Group controlId="formNewMember">
            <Form.Label>Add New Member</Form.Label>
            <Form.Control
              as="select"
              value={newMemberId}
              onChange={(e) => setNewMemberId(e.target.value)}
            >
              <option value="">Select a user</option>
              {availableUsers.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={handleAddMember}>
            Add Member
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ShoppingListModal;