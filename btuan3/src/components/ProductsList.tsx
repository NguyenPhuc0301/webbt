import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../src/app/hooks";
import {
  fetchProducts,
} from "../../features/products/productsSlice";
import {
  addToCart,
} from "../../features/cart/cartSlice";

export default function ProductList() {
  const dispatch = useAppDispatch();

  const {
    products,
    loading,
    error,
  } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <h2>Đang tải sản phẩm...</h2>;
  }

  if (error) {
    return <h2>Lỗi: {error}</h2>;
  }

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "contain",
              }}
            />

            <h3>{product.title}</h3>

            <p>
              ${product.price}
            </p>

            <button
              onClick={() =>
                dispatch(addToCart(product))
              }
            >
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}