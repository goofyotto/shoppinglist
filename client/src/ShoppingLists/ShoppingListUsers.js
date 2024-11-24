import { useContext } from "react";
import { UserContext } from "../Users/UserProvider.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function ShoppingListUsers() {
  const { userList, loggedInUser, setLoggedInUser, creator } = useContext(UserContext);

  const handleUserClick = (userId) => {
    if (loggedInUser !== userId) {
      setLoggedInUser(userId);
    }
  };

  return (
    <div className="my-4">
      <h2>My Shopping List</h2>
      <div className="btn-group" role="group" aria-label="User buttons">
        {userList.map((user) => (
          <button
            key={user._id}
            className={`btn btn-outline-primary ${loggedInUser === user._id ? 'active' : ''}`}
            onClick={() => handleUserClick(user._id)}
            disabled={user._id === creator}
          >
            {user.username}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ShoppingListUsers;