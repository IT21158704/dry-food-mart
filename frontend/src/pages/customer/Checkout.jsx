import { useState, useEffect } from "react";
import { apiUrl } from "../../utils/Constants";
import authAxios from "../../utils/authAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, MenuItem, Select, Typography } from "@mui/material";

export default function Checkout() {

  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState([]);
  const navigate = useNavigate();

  const getAddress = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/address`);
      setAddress(res.data.addressData);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Products not found');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  const getCart = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/cart`);
      const cartData = res.data.Data;
      setCart(cartData);
      // Extracting itemIds from cartData
      const item = cartData.map(item => ({ itemId: item.itemId._id }));
      setItems(item);
      // If needed, you can set this 'items' array to your state or use it further
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Cart is Empty');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    getCart();
  }, []);



  const total = cart.reduce((total, item) => {
    return total + item.itemId.price * item.quantity;
  }, 0);

  const [formData, setFormData] = useState({
    items: items,
    price: total,
    email: '',
    cardNo: '',
    mm: '',
    yy: '',
    address: '',
    name: ''
  });

  const handleSubmit = async () => {
    try {
      const result = await authAxios.post(`${apiUrl}/order`, formData)
      if (result) {
        toast.success(result.data.message);
        navigate('/orders');
      }

      getUsers();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCreate = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <div class="relative mx-auto w-full bg-white">
      <div class="grid min-h-screen grid-cols-10">
        <div class="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <div class="mx-auto w-full max-w-lg">
            <h1 class="relative text-2xl font-medium text-gray-700 sm:text-3xl">Checkout<span class="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span></h1>
            <form action="" class="mt-10 flex flex-col space-y-4" onSubmit={handleSubmit}>
              <div>
                <label for="email" class="text-xs font-semibold text-gray-500">Email</label>
                <input type="email" id="email" name="email" placeholder="john.capler@fang.com" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  value={formData.email}
                  onChange={(e) => handleCreate('email', e.target.value)} /></div>
              <div class="relative">
                <label for="card-number" class="text-xs font-semibold text-gray-500">Card number</label>
                <input type="text" id="card-number" name="card-number" placeholder="1234-5678-XXXX-XXXX" class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  value={formData.cardNo}
                  onChange={(e) => handleCreate('cardNo', e.target.value)}
                />
                <img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" class="absolute bottom-3 right-3 max-h-4" />
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-500">Expiration date</p>
                <div class="mr-6 flex flex-wrap">
                  <div class="my-1">
                    <label for="month" class="sr-only">Select expiration month</label
                    >
                    <input type="text" id="security-code" name="security-code" placeholder="Month" class="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      value={formData.mm}
                      onChange={(e) => handleCreate('mm', e.target.value)} />
                  </div>
                  <div class="my-1 ml-3 mr-6">
                    <label for="year" class="sr-only">Select expiration year</label><label for="year" class="sr-only">Year</label>
                    <input type="text" id="security-code" name="security-code" placeholder="Year" class="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      value={formData.yy}
                      onChange={(e) => handleCreate('yy', e.target.value)} />
                  </div>
                  <div class="relative my-1"><label for="security-code" class="sr-only">Security code</label>
                    <input type="text" id="security-code" name="security-code" placeholder="Security code" class="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                  </div>
                </div>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-500">Name on the card</p>
                <label for="card-name" class="sr-only">Card name</label>
                <input type="text" id="card-name" name="card-name" placeholder="Name on the card" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  value={formData.name}
                  onChange={(e) => handleCreate('name', e.target.value)} />
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-500">Address</p>
                {address.length >= 1 ?
                  <FormControl fullWidth variant="outlined">
                    <Select
                      labelId="category-label"
                      value={formData.address}
                      onChange={(e) => handleCreate('address', e.target.value)}

                    >
                      {address.map((user, index) => (
                        <MenuItem key={index} value={user.address}>{user.address}</MenuItem> // Update this line
                      ))}
                    </Select>
                  </FormControl>
                  : <Button onClick={() => { navigate('/customer/address') }}> Add Address</Button>}

              </div>

              <button type="submit" class="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">
                Place Order
              </button>
            </form>
            <p class="mt-10 text-center text-sm font-semibold text-gray-500">By placing this order you agree to the <a href="#" class="whitespace-nowrap text-teal-400 underline hover:text-teal-600">Terms and Conditions</a></p>
          </div>
        </div>
        <div class="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 class="sr-only">Order summary</h2>
          <div>
            <img src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" class="absolute inset-0 h-full w-full object-cover" />
            <div class="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
          </div>
          <div class="relative">
            {cart.map((item, index) => {
              return (
                <ul class="space-y-5 mb-2">
                  <li class="flex justify-between">
                    <div class="inline-flex">
                      <img src={item.itemId.img} alt="" class="max-h-16" />
                      <div class="ml-3">
                        <p class="text-base font-semibold text-white">{item.itemId.itemName}</p>
                        <p class="text-sm font-medium text-white text-opacity-80">Pdf, doc Kindle</p>
                      </div>
                    </div>
                    <p class="text-sm font-semibold text-white">Rs. {item.itemId.price}.00</p>
                  </li>
                </ul>
              )
            })}

            <div class="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
            <div class="space-y-2">
              <p class="flex justify-between text-lg font-bold text-white"><span>Total price:</span><span>Rs. {total}.00</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
