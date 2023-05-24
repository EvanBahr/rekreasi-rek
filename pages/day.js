import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";

export default function Day1() {
  useEffect(() => {
    const token =
      " Y2xpMTBhMWhpMmg1Zm9sejcyZjZlZGtmcw.vN9QpdgFJbEKfPYdV37gcmsvkfE1hg9fiXvXetQ2wI0Mu1Fb_LPXPLeMSpSZ";
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.rekreasi.com/api/users/1?include=activities,participating,wishlists,followers,following,avatar",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Cookies.set("Rekreasi_Token", );
        console.log(response.data.data); // Lakukan sesuatu dengan data yang diterima
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();



  }, []);




  

  return (
    <div>
      <form className=" mt-10 p-10">
        <div className="border border-black ">
          <input type=" email" placeholder=" email" />
        </div>
        <br />
        <div className="border border-black ">
          <input type=" password" placeholder=" password" />
        </div>
        <button type="submit" className="border border-black mt-2">
          submit
        </button>
      </form>
      <div className=" border border-black w-5 h-5 p-10 ml-10 bg-red-500">
      </div>
    </div>
  );
}
