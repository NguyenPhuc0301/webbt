import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  updateQuantity,
} from "../features/cart/cartSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../src/app/hooks";

export default function Cart() {
  const dispatch = useAppDispatch();

  const items = useAppSelector(
    (state) => state.cart.items
  );

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1>Giỏ hàng</h1>

      {items.length === 0 ? (
        <p>Giỏ hàng đang trống</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                borderBottom: "1px solid #ddd",
                padding: "15px",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                }}
              />

              <div style={{ flex: 1 }}>
                <h3>{item.title}</h3>

                <p>
                  Giá: ${item.price}
                </p>

                <div>
                  <button
                    onClick={() =>
                      dispatch(
                        decreaseQuantity(item.id)
                      )
                    }
                  >
                    -
                  </button>

                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: Number(
                            e.target.value
                          ),
                        })
                      )
                    }
                    style={{
                      width: "50px",
                      margin: "0 10px",
                    }}
                  />

                  <button
                    onClick={() =>
                      dispatch(
                        increaseQuantity(item.id)
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() =>
                  dispatch(
                    removeFromCart(item.id)
                  )
                }
              >
                Xóa
              </button>
            </div>
          ))}

          <h2>
            Tổng tiền: ${total.toFixed(2)}
          </h2>
        </>
      )}
    </div>
  );
}