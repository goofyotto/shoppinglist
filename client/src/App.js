import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ShoppingListsProvider from "./ShoppingLists/ShoppingListsProvider";
import UserProvider from "./Users/UserProvider";
import ShoppingListsView from "./ShoppingLists/ShoppingListsView";
import ShoppingListDetails from "./ShoppingLists/ShoppingListDetails";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ShoppingListsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<ShoppingListsView/>}/>
              <Route path="/details/:id" element={<ShoppingListDetails/>}/>
            </Routes>
          </Router>
        </ShoppingListsProvider>
      </UserProvider>
    </div>
  );
}

export default App;
