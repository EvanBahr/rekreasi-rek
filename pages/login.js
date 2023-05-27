import { useState } from "react";
import axios from "axios";
import Serializer from "../components/serializer";
import Cookies from "js-cookie";
import { headers } from "next/dist/client/components/headers";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDetail, setuserDetail] = useState({});
  const [Wishlist, setWishlist] = useState([]);
  const [liked, setLiked] = useState([]);
  const [Draft, SetDraft] = useState([]);

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

      const session = await axios.get(
        "https://api.rekreasi.com/api/auth/session",
        header
      );
      const myId = session.data.data.user.id;
      const myDetail = await axios.get(
        `https://api.rekreasi.com/api/users/${myId}?include=activities,participating,wishlists,followers,following,avatar`
      );

      const deserialized = Serializer.deserialize("users", myDetail.data);
      setuserDetail(deserialized);

      console.log("session", session.data);
      console.log("myDetail", myDetail.data);

      const wishlistRes = await axios.get(
        "https://api.rekreasi.com/api/users/1?include=wishlists",
        header
      );
      const deserializedWish = Serializer.deserialize(
        "users",
        wishlistRes.data
      );
      console.log("users", wishlistRes.data);
      setuserDetail(deserializedWish);

      const listh = deserializedWish.wishlists;
      setWishlist(listh);
      console.log("List", listh);
      console.log("wislis", Wishlist);

      setLiked(deserialized.wishlists);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddWishlist = async (id) => {
    let idItem = id.toString();
    let token = document.cookie.match(/(?<=RekreasiToken=)[^;]*/)[0];
    try {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const payload = { data: [{ id: idItem }] };
      console.log("pay", payload);
      const AddWishlist = await axios.post(
        `https://api.rekreasi.com/api/users/7/relationships/wishlists`,
        payload,
        header
      );
      console.log("daftar wishlist", AddWishlist.data.data);
      const session = await axios.get(
        "https://api.rekreasi.com/api/auth/session",
        header
      );
      const myId = session.data.data.user.id;
      const myDetail = await axios.get(
        `https://api.rekreasi.com/api/users/${myId}?include=activities,participating,wishlists,followers,following,avatar`
      );

      const deserialized = Serializer.deserialize("users", myDetail.data);
      setuserDetail(deserialized);
      const wishlistRes = await axios.get(
        "https://api.rekreasi.com/api/users/1?include=wishlists",
        header
      );
      const deserializedWish = Serializer.deserialize(
        "users",
        wishlistRes.data
      );
      console.log("users", wishlistRes.data);
      setuserDetail(deserializedWish);

      const listh = deserializedWish.wishlists;
      setWishlist(listh);
      console.log("List", listh);
      console.log("wislis", Wishlist);

      setLiked(deserialized.wishlists);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    let idItem = id.toString();
    let token = document.cookie.match(/(?<=RekreasiToken=)[^;]*/)[0];
    try {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { data: [{ id: idItem }] },
      };
      const DeleteWishllist = await axios.delete(
        `https://api.rekreasi.com/api/users/7/relationships/wishlists`,
        config
      );
      console.log("daftar wishlist", DeleteWishllist.data.data);
      const session = await axios.get(
        "https://api.rekreasi.com/api/auth/session",
        header
      );
      const myId = session.data.data.user.id;
      const myDetail = await axios.get(
        `https://api.rekreasi.com/api/users/${myId}?include=activities,participating,wishlists,followers,following,avatar`
      );

      const deserialized = Serializer.deserialize("users", myDetail.data);
      setuserDetail(deserialized);
      const wishlistRes = await axios.get(
        "https://api.rekreasi.com/api/users/1?include=wishlists",
        header
      );
      const deserializedWish = Serializer.deserialize(
        "users",
        wishlistRes.data
      );
      console.log("users", wishlistRes.data);
      setuserDetail(deserializedWish);

      const listh = deserializedWish.wishlists;
      setWishlist(listh);
      console.log("List", listh);
      console.log("wislis", Wishlist);

      setLiked(deserialized.wishlists);
    } catch (error) {
      console.error(error);
    }
  };

  const ShowDraft = async (e) => {
    e.preventDefault();
    let token = document.cookie.match(/(?<=RekreasiToken=)[^;]*/)[0];

    try {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const draft = await axios.get(
        `https://api.rekreasi.com/api/activities?filter[creator][]=7&filter[status]=draft&include=media,schedules,costs,participants&sort=start_at&page[number]=1&page[size]=100`,
        header
      );
      console.log("draft", draft.data.data);
      SetDraft(draft.data.data);
      // console.log("data aktivitas", activities.data);
    } catch (error) {
      console.log("errornya adalah : ", error);
    }
  };
  const DeleteActiviti = async (v, e) => {
    e.preventDefault();
    let token = document.cookie.match(/(?<=RekreasiToken=)[^;]*/)[0];

    try {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const Hapus = await axios.delete(
        `https://api.rekreasi.com/api/activities/${v.id}`,
        header
      );
      console.log("hapus", Hapus.data);
    } catch (error) {}
  };
  return (
    <div>
      <div>
        {Wishlist.map((item, i) => {
          const suka = liked.map((objek) => objek.id);
          // console.log("suka", suka);
          const isLiked = suka.includes(item.id);

          return (
            <div
              key={i}
              className={`grid grid-cols-5 w-[500px] max-h-20 border  border-black p-2`}
              onClick={() => {
                isLiked ? handleDelete(item.id) : handleAddWishlist(item.id);
              }}
            >
              <div className="col-span-3">{item.title}</div>
              <div>{item.id}</div>
              <div
                className={` ${
                  isLiked && "bg-blue-400"
                } p-2 w-10 h-10 bg-blue-100`}
              ></div>
            </div>
          );
        })}
      </div>
      <div
        className=" mt-10 flex items-center justify-center h-20 w-screen bg-blue-200 hover:bg-blue-300 cursor-pointer border border-black"
        onClick={ShowDraft}
      >
        tampilkan aktivitas
      </div>
      {Draft.map((v, i) => {
        console.log("state draft :", Draft);
        return (
          <div
            key={i}
            className="grid grid-cols-4 w-[600px] h-[150px] border ml-14 border-black mt-5 "
          >
            <div className="col-span-3 p-2 overflow-auto">
              {/* <input value={v.attributes.title} className="font-bold" /> */}
              <div className="font-bold">{v.attributes.title}</div>
              <div className="">{v.attributes.description}</div>
            </div>
            <div className="grid">
              <div className="border flex justify-center items-center font-extrabold font-serif cursor-pointer border-black bg-blue-100 hover:bg-blue-200 ">
                Edit
              </div>
              <div
                className="border flex justify-center items-center font-extrabold font-serif cursor-pointer border-black bg-blue-100 hover:bg-blue-200 "
                onClick={(e) => DeleteActiviti(v.id)}
              >
                Hapus
              </div>
            </div>
          </div>
        );
      })}
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
      </div>
    </div>
  );
};

export default Login;
