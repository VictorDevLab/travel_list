import { useState } from "react";

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
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🪐Far Away🧳</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    //if the user does not enter the item do nothing
    if (!description) return;
    //object
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  };
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🤪trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item...."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, handleDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onToggleItem={onToggleItem}
            handleDeleteItem={handleDeleteItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, handleDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <em>
      <footer className="stats">
        You have x items on your list and you already pacled X(x%)
      </footer>
    </em>
  );
}
