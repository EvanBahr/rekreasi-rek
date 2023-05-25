import { useState } from "react";
import axios from "axios";
import Serializer from "../components/serializer";
import Cookies from "js-cookie";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDetail, setuserDetail] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const response = await axios.post(
        "https://api.rekreasi.com/api/auth/signin/password",
        payload
      );
      const token = response.data.token;
      Cookies.set("RekreasiToken", token);
      // console.log( 'a', response.data);
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // Lakukan sesuatu dengan data respons

      const session = await axios.get(
        "https://api.rekreasi.com/api/auth/session",
        header
      );
      const myId = session.data.data.user.id;
      const myDetail = await axios.get(
        `https://api.rekreasi.com/api/users/${myId}?include=activities,participating,wishlists,followers,following,avatar`
      );


      console.log('wh',whistlist);

      const deserialized = Serializer.deserialize("users", myDetail.data);
      setuserDetail(deserialized);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddToWishlist = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("RekreasiToken");
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const wishlistResponse = await axios.post(
        'https://api.rekreasi.com/api/users/1/relationships/wishlists', null,
        header
      );

      console.log('rawrr',wishlistResponse.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div>
      <div className="flex items-center justify-center h-screen font-serif">
        <div className="bg-gray-100 p-6">
          <h1 className="text-3xl font-bold mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email:</label>
              <input
                className="border border-gray-300 rounded-md py-2 px-3 w-full"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password:</label>
              <input
                className="border border-gray-300 rounded-md py-2 px-3 w-full"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div className=" flex items-center justify-center font-serif -mt-32">
        <div>
          <title>Tombol Wishlist</title>
        </div>
        <form onSubmit={handleAddToWishlist}>
          <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Tambahkan ke Wishlist
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
