import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { getData } from "../utils/api";

export default function Layout() {
  const paths = ["/admin", "/admin/dashboard"];
  const loc = useLocation();

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getData();
      setData(resp);
    };

    fetchData();
  }, [loc.pathname]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Navingation Bar */}
        {!paths.includes(loc.pathname) && (
          <nav
            className="flex flex-row items-center px-[2rem] py-[1rem] sticky top-0"
            style={{ backgroundColor: `${data?.navbar?.bgclr}` }}
          >
            <div className="text-lg text-white">
              <p>{`${data?.navbar?.title}`}</p>
            </div>
            <div className="ml-auto flex flex-row gap-[10rem]">
              <ul className="flex gap-4 text-lg text-white">
                {data?.navbar?.items?.length &&
                  data?.navbar?.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
              </ul>
            </div>
          </nav>
        )}

        {/* Main content */}
        <main className="flex-1 ">
          <Outlet />
        </main>

        {/* Footer */}
        {!paths.includes(loc.pathname) && (
          <footer
            className="mt-auto pt-[2rem] pb-[2rem] pl-[3rem] pr-[3rem] flex justify-evenly"
            style={{ backgroundColor: `${data?.footer?.bgclr}` }}
          >
            <div className="flex gap-[2rem] flex-col  items-start">
              <p className="text-[1.5rem] font-thin">{data?.footer?.title}</p>
            </div>
            <div className="ml-auto">
              <ul className="flex gap-2 flex-col">
                {data?.footer?.items?.length &&
                  data?.footer?.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
              </ul>
            </div>
          </footer>
        )}
      </div>
    </>
  );
}
