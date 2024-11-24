import React, { useContext } from "react";
import { ShoppingListsContext } from "./ShoppingListsProvider";
import { UserContext } from "../Users/UserProvider";
import { Link } from "react-router-dom";
import ShoppingListUsers from "./ShoppingListUsers";
import 'bootstrap/dist/css/bootstrap.min.css';

function ShoppingListsView() {
  const { shoppingLists, removeShoppingList } = useContext(ShoppingListsContext);
  const { loggedInUser } = useContext(UserContext);

  const handleRemove = (listId) => {
    removeShoppingList(listId);
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Shopping Lists Overview</h1>
      <div className="d-flex justify-content-center mb-4">
        <ShoppingListUsers />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(shoppingLists).map((listkey) => (
            <tr key={shoppingLists[listkey]._id}>
              <td>{shoppingLists[listkey].name}</td>
              <td className="text-center">
                <Link to={`/details/${shoppingLists[listkey]._id}`}>
                  <button className="btn btn-primary mr-2">View</button>
                </Link>
                {loggedInUser === shoppingLists[listkey].creator && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(shoppingLists[listkey]._id)}
                  >
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShoppingListsView;