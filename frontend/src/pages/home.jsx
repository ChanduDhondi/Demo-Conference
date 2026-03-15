import EventCard from "../components/eventCard";
import { useState, useEffect } from "react";
import { getData } from "../utils/api";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const resp = await getData();
      setData(resp);
    };

    load();
  }, []);

  return (
    <>
      <div className="flex flex-col mx-[2rem] my-[1rem]">
        {/* Hero Section */}
        <section
          className="h-[25rem] rounded-lg p-[1rem] bg-cover bg-center flex flex-col justify-center-safe items-center"
          style={{ backgroundImage: `url(${data.bannerImage})` }}
        >
          <div className="mt-[-5rem]">
            <h1 className="text-6xl text-white">{data.title}</h1>
          </div>
          <div className="text-white flex justify-start gap-4 mt-[1rem] text-xl">
            {data?.buttons?.length &&
              data?.buttons?.map((btn, i) => (
                <button className="border rounded-md p-1" key={i}>
                  {btn}
                </button>
              ))}
          </div>
        </section>

        {/* Main content */}
        <section className="my-[1rem] mx-[3rem] flex flex-col">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-10 text-center">
              Upcoming Events
            </h1>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data?.events?.length &&
                data?.events?.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
