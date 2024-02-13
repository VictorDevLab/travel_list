import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);
  //set Items based on the current items
  const handleAddItem = (item) => {
    setItems((items) => [...items, item]);
  };
  const handleDeleteItem = (id) => {
    //set Items based on the current items
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        // you can also do item instead of {...item}
        item.id === id ? { ...item, packed: !item.packed } : { ...item }
      )
    );
  };
  const clearList = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear the entire list?"
    );
    if (confirmed) setItems([]);
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        clearList={clearList}
      />
      <Stats items={items} />
    </div>
  );
}
