import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingListsContext } from "./ShoppingListsProvider";
import { UserContext } from "../Users/UserProvider";
import { Button, Form, ListGroup, Badge } from "react-bootstrap";
import ShoppingListModal from "./ShoppingListModal";

function ShoppingListDetails() {
  const { id } = useParams();
  const { shoppingLists, updateShoppingListName, removeItem, addItem, addMember, removeMember, toggleItem } = useContext(ShoppingListsContext);
  const { loggedInUser } = useContext(UserContext);
  const shoppingList = Object.values(shoppingLists).find(list => list._id === id);
  const [filter, setFilter] = useState("all");

  const [newItemName, setNewItemName] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  if (!shoppingList) {
    return (<div>Shopping List not found.</div>);
  }

  const handleAddItem = () => {
    addItem(shoppingList._id, newItemName);
    setNewItemName("");
  };

  const handleSaveName = (newName) => {
    updateShoppingListName(shoppingList._id, newName);
  };

  const handleLeaveList = () => {
    removeMember(shoppingList._id, loggedInUser);
  };

  const filteredItems = Object.keys(shoppingList.items).filter((itemKey) => {
    if (filter === "resolved") {
      return shoppingList.items[itemKey].status === "Resolved";
    } else if (filter === "unresolved") {
      return shoppingList.items[itemKey].status === "To Resolve";
    }
    return true;
  });

  return (
    <div className="container my-4">
      <h1 className="mb-4">{shoppingList.name}</h1>
      {shoppingList.creator === loggedInUser && (
        <div className="mb-4">
          <Button variant="primary" onClick={() => setShowModal(true)}>Edit</Button>
        </div>
      )}
      <div className="mb-4">
        <Button variant="secondary" onClick={() => setFilter("all")}>All</Button>
        <Button variant="success" onClick={() => setFilter("resolved")}>Resolved</Button>
        <Button variant="warning" onClick={() => setFilter("unresolved")}>Unresolved</Button>
      </div>
      <ListGroup className="mb-4">
        {filteredItems.map((itemKey) => (
          <ListGroup.Item key={itemKey} className="d-flex justify-content-between align-items-center">
            <div>
              <span>{shoppingList.items[itemKey].name}</span> {""}
              <Badge variant={shoppingList.items[itemKey].status === "Resolved" ? "success" : "warning"}>
                {shoppingList.items[itemKey].status}
              </Badge>
            </div>
            <div>
              <Button variant="primary" className="mr-2" onClick={() => toggleItem(shoppingList._id, itemKey)}>Toggle</Button>
              <Button variant="danger" onClick={() => removeItem(shoppingList._id, itemKey)}>Remove</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form inline className="mb-4">
        <Form.Control
          type="text"
          placeholder="New item name"
          className="mr-2"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <Button variant="primary" onClick={handleAddItem}>Add Item</Button>
      </Form>
      <Button variant="secondary" onClick={handleLeaveList}>Leave Shopping List</Button>
      <ShoppingListModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveName}
        currentName={shoppingList.name}
        currentMembers={shoppingList.members}
        listId={shoppingList._id}
        removeMember={removeMember}
        addMember={addMember}
        handleDelete={() => console.log('Delete')}
      />
    </div>
  );
}

export default ShoppingListDetails;