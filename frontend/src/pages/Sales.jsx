import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getProductsForSale,
  checkoutSale,
} from "../services/salesService";
import { toast } from "react-toastify";

function Sales() {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  const [discount, setDiscount] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState("CASH");


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProductsForSale();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (product) => {
  const existingItem = cart.find(
    (item) => item.id === product.id
  );

  if (existingItem) {
    setCart(
      cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  } else {
    setCart([
      ...cart,
      {
        ...product,
        quantity: 1,
      },
    ]);
  }
};

const increaseQuantity = (id) => {
  setCart(
    cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQuantity = (id) => {
  setCart(
    cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const removeFromCart = (id) => {
  setCart(cart.filter((item) => item.id !== id));
};

const handleCheckout = async () => {
  if (cart.length === 0) {
    toast.warning("Cart is empty.");
    return;
  }

  try {
    const payload = {
      payment_method: paymentMethod,
      discount: discount,
      items: cart.map((item) => ({
        product: item.id,
        quantity: item.quantity,
      })),
    };

    const response = await checkoutSale(payload);

    toast.success(response.message);

    // Clear cart
    setCart([]);

    // Reset discount
    setDiscount(0);

    // Reset payment method
    setPaymentMethod("CASH");

    // Refresh products
    fetchProducts();

  } catch (error) {
    console.log(error.response);

    toast.error(
      error.response?.data?.error ||
      JSON.stringify(error.response?.data) ||
      error.message
  );
}
};

const subtotal = cart.reduce(
  (total, item) =>
    total + item.quantity * Number(item.selling_price),
  0
);

const total = Math.max(0, subtotal - discount);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Sales
        </h1>

        <p className="mt-2 text-slate-500">
          Create and manage sales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Products */}

        <div className="lg:col-span-2">

          <div className="bg-white rounded-xl border p-6">

            <h2 className="text-xl font-semibold mb-4">
              Products
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              {products.map((product) => (

                    <div
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="border rounded-xl p-4 hover:border-blue-500 transition cursor-pointer"
                    >

                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-36 w-full object-cover rounded-lg mb-3"
                    />
                  )}

                  <h3 className="font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-slate-500 text-sm">
                    {product.category_name}
                  </p>

                  <p className="mt-2 text-blue-600 font-bold">
                    ₦{Number(product.selling_price).toLocaleString()}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Cart */}

        <div>

          <div className="bg-white rounded-xl border p-6">

            <h2 className="text-xl font-semibold">
              Cart
            </h2>

                {cart.length === 0 ? (
                        <p className="text-slate-500 mt-3">
                            No products added.
                        </p>
                        ) : (
                        <div className="space-y-4 mt-4">

                            {cart.map((item) => (
                            <div
                                key={item.id}
                                className="border rounded-lg p-4"
                            >
                                <div className="flex justify-between items-start">

                                <div>
                                    <h3 className="font-semibold">
                                    {item.name}
                                    </h3>

                                    <p className="text-blue-600 font-bold mt-1">
                                    ₦{Number(item.selling_price).toLocaleString()}
                                    </p>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    Remove
                                </button>

                                </div>

                                <div className="flex items-center gap-3 mt-4">

                                <button
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="w-8 h-8 rounded bg-slate-200 hover:bg-slate-300"
                                >
                                    -
                                </button>

                                <span className="font-semibold">
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() => increaseQuantity(item.id)}
                                    className="w-8 h-8 rounded bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    +
                                </button>

                                </div>

                                <p className="mt-4 font-bold">
                                ₦
                                {(
                                    item.quantity *
                                    Number(item.selling_price)
                                ).toLocaleString()}
                                </p>

                            </div>
                            ))}

                            {/* Checkout Section */}

                            <div className="border-t pt-6">

                            {/* Subtotal */}

                            <div className="flex justify-between text-lg font-semibold">
                                <span>Subtotal</span>
                                <span>₦{subtotal.toLocaleString()}</span>
                            </div>

                            {/* Discount */}

                            <div className="mt-6">

                                <label className="block text-sm font-medium mb-2">
                                Discount
                                </label>

                                <input
                                type="number"
                                min="0"
                                value={discount}
                                onChange={(e) =>
                                    setDiscount(Number(e.target.value))
                                }
                                className="w-full border rounded-lg px-3 py-2"
                                />

                            </div>

                            {/* Payment */}

                            <div className="mt-4">

                                <label className="block text-sm font-medium mb-2">
                                Payment Method
                                </label>

                                <select
                                value={paymentMethod}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                                className="w-full border rounded-lg px-3 py-2"
                                >

                                <option value="CASH">
                                    Cash
                                </option>

                                <option value="POS">
                                    POS
                                </option>

                                <option value="TRANSFER">
                                    Transfer
                                </option>

                                <option value="MULTIPLE">
                                    Multiple
                                </option>

                                </select>

                            </div>

                            {/* Total */}

                            <div className="flex justify-between mt-6 text-2xl font-bold">

                                <span>Total</span>

                                <span>
                                ₦{total.toLocaleString()}
                                </span>

                            </div>

                            {/* Checkout Button */}

                                <button
                                  onClick={handleCheckout}
                                  disabled={cart.length === 0}
                                  className={`mt-6 w-full py-3 rounded-xl font-semibold transition ${
                                    cart.length === 0
                                      ? "bg-slate-300 cursor-not-allowed"
                                      : "bg-blue-600 hover:bg-blue-700 text-white"
                                  }`}
                                >
                                  Complete Sale
                                </button>

                            </div>

                        </div>
                        )}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Sales;