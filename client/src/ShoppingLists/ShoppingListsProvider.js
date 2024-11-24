import { createContext, useState } from "react";

export const ShoppingListsContext = createContext();

function ShoppingListsProvider({ children }) {
  const [shoppingLists, setShoppingLists] = useState([
    {
    _id: "672660c1aa72db8c5a0cd7a9",
    creator: "67265e0baa72db8c5a0cd791",
    name: "Vánoce 2024",
    members: ['67265e0baa72db8c5a0cd792'],
    items: {
      i01: {
        name: "Vanoční stromek",
        status: "Resolved"
      },
      i02: {
        name: "Vanoční ozdoby",
        status: "To Resolve"
      }
    },
  },
  {
    _id: "672660c1aa72db8c5a0cd7aa",
    creator: "67265e0baa72db8c5a0cd792",
    name: "Oslava",
    members: [],
    items: {
      i01: {
        name: "Darek",
        status: "Resolved"
      },
      i02: {
        name: "Pivo",
        status: "To Resolve"
      }
    },
  },
  {
    _id: "672660c1aa72db8c5a0cd7ab",
    creator: "67265e0baa72db8c5a0cd791",
    name: "Výlet",
    members: ['67265e0baa72db8c5a0cd793','67265e0baa72db8c5a0cd794'],
    items: {
      i01: {
        name: "Párky",
        status: "Resolved"
      },
      i02: {
        name: "Pivo",
        status: "Resolved"
      }
    },
  },
  {
    _id: "672660c1aa72db8c5a0cd7ac",
    creator: "67265e0baa72db8c5a0cd792",
    name: "Narozeniny Petr",
    members: ['67265e0baa72db8c5a0cd794'],
    items: {},
  },
]);

  const updateShoppingListName = (id, newName) => {
    setShoppingLists((current) =>{
      const updateList = current.map(list => list._id === id ? { ...list, name: newName } : list);
      return updateList;
    });
  };

  const addMember = (id, memberId) => {
    setShoppingLists((current) =>{
      const updateList = current.map(list => list._id === id ? { ...list, members: [...list.members, memberId] } : list);
      return updateList;
    });
  };

  const removeMember = (id, memberId) => {
    setShoppingLists((current) =>{
      const updateList = current.map(list => list._id === id ? { ...list, members: list.members.filter(member => member !== memberId) } : list);
      return updateList;
    });
  };

  const addItem = (id, itemName) => {
    setShoppingLists((current) => {
      const updatedList = current.map(list => {
        if (list._id === id) {
          const newItemId = `i${Object.keys(list.items).length + 1}`;
          return { ...list, items: { ...list.items, [newItemId]: { name: itemName, status: "To Resolve" } } };
        }
        return list;
      });
      return updatedList;
    });
  };


  const removeItem = (id, itemId) => {
    setShoppingLists((current) => {
      const updatedList = current.map(list => {
        if (list._id === id) {
          const updatedItems = { ...list.items };
          delete updatedItems[itemId];
          return { ...list, items: updatedItems };
        }
        return list;
      });
      return updatedList;
    });
  };

  const toggleItem = (id, itemId) => {
    setShoppingLists((current) => {
      const updatedList = current.map((list) => {
        if (list._id === id) {
          const updatedItems = { ...list.items };
          if (updatedItems[itemId]) {
            updatedItems[itemId].status = updatedItems[itemId].status === "Resolved" ? "To Resolve" : "Resolved";
          }
          return { ...list, items: updatedItems };
        }
        return list;
      });
      return updatedList;
    });
  };


  const removeShoppingList = (id) => {
    setShoppingLists((current) => current.filter(list => list._id !== id));
  };

  const value = {
    shoppingLists,
    updateShoppingListName,
    removeItem,
    addItem,
    addMember,
    removeMember,
    toggleItem,
    removeShoppingList
  };

  return <ShoppingListsContext.Provider value={value}>{children}</ShoppingListsContext.Provider>;
}

export default ShoppingListsProvider;
