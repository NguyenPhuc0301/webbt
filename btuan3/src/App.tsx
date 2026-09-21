import ProductList from "./src/components/ProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <ProductList />

      <hr
        style={{
          margin: "40px 0",
        }}
      />

      <Cart />
    </div>
  );
}

export default App;