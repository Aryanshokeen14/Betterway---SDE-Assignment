import React from "react";

function ProductList({ products, cartQtyMap, addToCart }) {
  const getRemainingStock = (product) => {
    const qtyInCart = cartQtyMap[product.id] || 0;
    return product.stock - qtyInCart;
  };

  if (products.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <div className="grid">
      {products.map((p) => {
        const remainingStock = getRemainingStock(p);

        return (
          <div className="card" key={p.id}>
            <h4>{p.name}</h4>
            <p>₹ {p.price}</p>
            <p>{p.category}</p>

            <p>
              {remainingStock > 0
                ? `In Stock (${remainingStock})`
                : "Out of Stock"}
            </p>

            <button
              disabled={remainingStock === 0}
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(ProductList);
