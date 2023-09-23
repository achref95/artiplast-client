import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const generate = async ({/*invoicenumber,*/ product, price, quantity}) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.post(`/invoice/generate`, {/*invoicenumber,*/ product, price, quantity}, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

const productMethods = {
    generate,
};

export default productMethods;