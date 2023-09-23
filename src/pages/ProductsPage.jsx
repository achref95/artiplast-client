import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import productMethods from "../services/product.service";

const ProductsPage = () => {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const { isLoggedIn, isLoading, expire } = useContext(AuthContext);

  const handleProduct = (e) => {
    setProduct(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(parseFloat(e.target.value));
  };

  const handleQuantity = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await productMethods.generate({
        product: product,
        price: price,
        quantity: quantity,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      // Handle and display the error to the user
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (expire) {
    return <div>Your token has expired</div>;
  }

  return (
    isLoggedIn && (
      <>
        <form onSubmit={handleSubmit} className="space-y-2">
          <h1>Add product:</h1>
          <input
            type="text"
            placeholder="Product"
            className="input input-bordered input-primary w-full max-w-xs"
            value={product}
            onChange={handleProduct}
            required
          />
          <h1>Add price:</h1>
          <input
            type="number" 
            placeholder="Price"
            className="input input-bordered input-primary w-full max-w-xs"
            value={price}
            onChange={handlePrice}
            required
          />
          <h1>Add quantity:</h1>
          <input
            type="number" 
            placeholder="Quantity"
            className="input input-bordered input-primary w-full max-w-xs"
            value={quantity}
            onChange={handleQuantity}
            required
          />
          <button
            className="btn btn-neutral"
            type="submit"
            disabled={isLoading} // Disable the button while submitting
          >
            Add
          </button>
        </form>
      </>
    )
  );
};

export default ProductsPage;
