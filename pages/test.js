import { useState } from "react";
import axios from "axios";
import { handleQueryingUrl } from "./utils";

export default function App() {
  const [dataTampil, setDataTampil] = useState([]);

  const ambilData = (filters) => {
    axios
      .get(
        `https://api.rekreasi.com/api/activities?${handleQueryingUrl(filters)}`
      )
      .then((res) => {
        // console.log("data ", res.data.data);
        setDataTampil(res.data.data);
        // console.log("data tampil", dataTampil[0]);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGolek = {};
    Array.from(e.target.elements).forEach(({ value, name }) => {
      if (value) newGolek[name] = value;
      else delete newGolek[name];
    });
    ambilData(newGolek);
  };

  // ganti next.js
  // handleSubmit dibuat dinamis spt handleQueryingUrl (pakai Object.keys dan forEach)

  return (
    <>
      <div>
        <header className="App-header maxCost-h-screen p-1 flex">
          <div className="">React js. prakter membuat filter rekreasi.com</div>
        </header>
      </div>
      <div className="App grid grid-cols-3 minCost-h-screen bg-[#282c34] ">
        <form onSubmit={handleSubmit} className="bg-blue-100 col-span-1 p-10 ">
          <div className="text-left font-bold ml-4 text-xl mb-1">title:</div>
          <input
            name="title"
            className="w-full bg-blue-200 px-5 py-6 font-mono font-semibold text-2xl  h-12 rounded-2xl"
          />{" "}
          <div className="text-left font-bold ml-4 text-xl mb-1">
            minCostim:
          </div>
          <input
            name="minCost"
            type="number"
            className="w-full bg-blue-200 px-5 py-6 font-mono font-semibold text-2xl  h-12 rounded-2xl"
          />{" "}
          <div className="text-left font-bold ml-4 text-xl mb-1">maxCost:</div>
          <input
            name="maxCost"
            type="number"
            className="w-full bg-blue-200 px-5 py-6 font-mono font-semibold text-2xl  h-12 rounded-2xl"
          />
          <input
            name="description"
            type="text"
            className="w-full bg-blue-200 px-5 py-6 font-mono font-semibold text-2xl  h-12 rounded-2xl"
          />
          <button>testse</button>
        </form>

        <div className="grid bg-blue-100 col-span-2 p-10">
          {dataTampil.map((v, i) => (
            <div className="w-full bg-blue-400 rounded-xl mt-6 p-5 text-left text-[20px] ">
              <div className="grid grid-cols-5">
                <div className="font-bold">title:</div>
                <div className="col-span-4 font-semibold">
                  {v.attributes.title}
                </div>
              </div>
              <div className="grid grid-cols-5">
                <div className="font-bold">Deskripsi:</div>
                <div className="font-semibold col-span-4">
                  {v.attributes.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
