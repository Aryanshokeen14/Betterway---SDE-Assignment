import { useEffect, useMemo, useState, useCallback } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          category: item.category,
          stock: Math.floor(Math.random() * 10) + 1,
        }));
        setProducts(formatted);
      })
      .catch((err) => console.log(err));
  }, []);

  const addToCart = useCallback((product) => {
  setCart((prev) => {
    const found = prev.find((item) => item.id === product.id);
    if (found) {
      if (found.qty < product.stock) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return prev;
    }
    return [...prev, { ...product, qty: 1 }];
  });
}, []);

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      list = list.filter((p) => p.category === category);
    }

    if (sort === "low") {
      list.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, search, category, sort]);

  const cartQtyMap = useMemo(() => {
    const map = {};
    cart.forEach((item) => {
      map[item.id] = item.qty;
    });
    return map;
  }, [cart]);

  return (
    <div className="app">
      <h2>Mini E-Commerce developed by ARYAN SHOKEEN(2K22/EE/62) DTU college</h2>

      <div className="filters">
        <input
          placeholder="Search product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {[...new Set(products.map((p) => p.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

        <button
          onClick={() => {
            setSearch("");
            setCategory("");
            setSort("");
          }}
        >
          Clear
        </button>
      </div>

      <ProductList
        products={filteredProducts}
        cartQtyMap={cartQtyMap}
        addToCart={addToCart}
      />

      <Cart cart={cart} updateQty={updateQty} removeItem={removeItem} />
    </div>
  );
}

export default App;
