import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import productMethods from "../services/product.service";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const { isLoggedIn, isLoading, expire } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchInvoices = async () => {
        try {
          const response = await productMethods.getInvoices();
          console.log(response);
          setInvoices(response);
        } catch (error) {
          console.error(error);
        }
      };
      fetchInvoices();
    }
  }, [isLoggedIn]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (expire) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-center">Token expired</h1>
      </div>
    );
  }

  return (
    isLoggedIn && (
      <div>
        {invoices.map((invoice) => (
          <div key={invoice?._id} className="border p-4 mb-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="text-xl font-semibold">Products</h3>
                <ul>
                  {invoice?.product.map((product) => (
                    <li key={product}>{product}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Prices</h3>
                <ul>
                  {invoice?.price.map((price) => (
                    <li key={price}>{price}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Quantities</h3>
                <ul>
                  {invoice?.quantity.map((quantity) => (
                    <li key={quantity}>{quantity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default InvoicesPage;

