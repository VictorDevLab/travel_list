export default function Stats({ items }) {
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
