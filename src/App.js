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
function PackingList({ items, handleDeleteItem, onToggleItem, clearList }) {
  //more derived state
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onToggleItem={onToggleItem}
            handleDeleteItem={handleDeleteItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={clearList}>Clear List</button>
      </div>
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
function Stats({ items }) {
  //early return
  if (!items.length) {
    return (
      <p className="stats">
        <em>📣Start adding items to your packing list </em>
      </p>
    );
  }
  //deriving state
  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / numItems) * 100);

  return (
    <em>
      <footer className="stats">
        <em>
          {percentage === 100
            ? "You have everything ready to go 🛫✈️"
            : //if you dont want to use template literals you can write two different em tags
              `You have ${numItems} items on your list and you already packed
  ${packedItems}(${percentage}%) `}
        </em>
      </footer>
    </em>
  );
}
