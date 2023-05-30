import { useEffect, useState } from "react";
import axios from "axios";
import Serializer from "../components/serializer";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Index = () => {
  const [user, setUser] = useState({ token: null, detail: {} });
  const [activities, setActivities] = useState([]);
  const router = useRouter();
  const token = Cookies.get("token");
  const [NewData, setNewData] = useState("");

  useEffect(() => {
    const detail = JSON.parse(localStorage.getItem("detail"));
    setUser({ token, detail });
  }, []);

  //jalankan use Effect untuk mendapat activity

  useEffect(() => {
    getActivities();
  }, []);
  // get activity merupakan function yang mengambil activities dari API rekreasi kemudian data dipjadikan state yang sudah didevinisikan di awal code
  const getActivities = async () => {
    try {
      const res = await axios.get("https://api.rekreasi.com/api/activities");
      const deserialized = Serializer.deserialize("activities", res.data);
      setActivities(deserialized);
    } catch (error) {}
  };

  const handleWishlist = async (isWishslist, id) => {
    try {
      const payload = { data: [{ id }] };
      const config = { headers: { Authorization: "Bearer " + token } };
      // const payload = ;

      !isWishslist
        ? await axios.post(
            "https://api.rekreasi.com/api/users/7/relationships/wishlists",
            payload,
            config
          )
        : await axios.delete(
            "https://api.rekreasi.com/api/users/7/relationships/wishlists",
            { data: payload, headers: config.headers }
          );

      const myDetail = await axios.get(
        `https://api.rekreasi.com/api/users/${user.detail.id}?include=wishlists`
      );

      const deserialized = Serializer.deserialize("users", myDetail.data);
      setUser({ ...user, detail: deserialized });
    } catch (error) {}
  };
  // use useEffect  yang menjalankan fungsi ketika user. detail id ada maka detail user akan terus diperbarui dengan syarat user memiliki id
  useEffect(() => {
    user.detail.id &&
      localStorage.setItem("detail", JSON.stringify(user.detail));
  }, [user.detail]);
  //jalankan Use effect yang berubah setiap token berubah, menjalankan logika : ketika tokwn tidak ada maka route di pushkan ke halaman login
  useEffect(() => {
    !token && router.push("/login");
    console.log("activiti", activities);
  }, [token]);
  const HandleDelete = async (id) => {
    try {
      const config = { headers: { Authorization: "Bearer " + token } };
      console.log("id", id);
      await axios.delete(
        `https://api.rekreasi.com/api/activities/${id}`,
        config
      );
      getActivities();
    } catch (error) {
      console.log("errore : ", error);
    }
  };

  const handleEdit = async (id, newTitle, idx, e) => {
    try {
      const UpdActivities = [...activities];
      UpdActivities[idx].title = newTitle;
      const config = { headers: { Authorization: "Bearer " + token } };
      const payload = { data: activities[idx] };

      // if (e.key === "Enter") {
      await axios.patch(
        `https://api.rekreasi.com/api/activities/${id}`,
        payload,
        config
      );
      console.log("hasil ter update", UpdActivities);
      // }
      setActivities(UpdActivities);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* mulai mereturn: ketika token masih belum di dapat maka akan ada loading yang muncul di html   */}
      {!user.token ? (
        <div className="text-red-500 text-5xl  text-center mt-10">
          LOADING....
        </div>
      ) : (
        //  ktika token sudah di dapat maka mulai mereturn lagi
        <div className="p-[10rem] space-y-10">
          {activities.map((item, idx) => {
            const isWishslist = user.detail?.wishlists?.find(
              ({ id }) => id === item.id
            );

            return (
              <div
                key={idx}
                className="flex flex-col items-center  w-full p-[5rem] bg-slate-500 rounded-2xl "
              >
                <div>{item.id}</div>
                <input
                  className="w-full bg-slate-500 text-center"
                  value={item.title}
                  onChange={(e) => {
                    handleEdit(item.id, e.target.value, idx, e);
                  }}
                  onKeyDown={(e) => {
                    e.key === "Enter" && e.target.blur();
                  }}
                />
                <button
                  onClick={() => handleWishlist(isWishslist, item.id)}
                  className={`${
                    isWishslist ? "bg-green-400" : "bg-yellow-500"
                  }`}
                >
                  wishlist
                </button>{" "}
                <button
                  onClick={() => {
                    HandleDelete(item.id);
                  }}
                  className={`mt-5 bg-red-400`}
                >
                  hapus
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Index;

// ULANGI
// COMPARE, KETIKA MASIH KURANG SIMPLE, PELAJARI DAN ULANGI
