import axios from "axios";
import React from "react";
import Cookies from "js-cookie";

import { useRouter } from "next/router";
import Serializer from "../components/serializer";

export default function Login() {
  const router = useRouter();

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

      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const session = await axios.get(
        "https://api.rekreasi.com/api/auth/session",
        header
      );
      const myId = session.data.data.user.id;
      const myDetail = await axios.get(
        `https://api.rekreasi.com/api/users/${myId}?include=wishlists`
      );

      const deserialized = Serializer.deserialize("users", myDetail.data);

      localStorage.setItem("detail", JSON.stringify(deserialized));

      Cookies.set("token", token);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              className="border border-gray-300 rounded-md py-2 px-3 w-full"
              name="password"
              type="password"
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
  );
}
