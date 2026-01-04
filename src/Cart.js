function Cart({ cart, updateQty, removeItem }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return <p>Cart is empty</p>;
  }

  return (
    <div className="cart">
      <h3>Cart</h3>

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <span>{item.name}</span>

          <input
            type="number"
            min="1"
            max={item.stock}
            value={item.qty}
            onChange={(e) =>
              updateQty(item.id, Number(e.target.value))
            }
          />

          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}

      <h4>Total: ₹ {total}</h4>
    </div>
  );
}

export default Cart;
