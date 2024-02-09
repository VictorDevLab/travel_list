import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "ToothBrush", quantity: 2, packed: true },
  { id: 4, description: "Boots", quantity: 1, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🪐Far Away🧳</h1>;
}
function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();
    //if the user does not enter the item do nothing
    if (!description) return;
    //object
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    setDescription("");
    setQuantity(1);
    // initialItems.push(newItem);
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
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button>❌</button>
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
