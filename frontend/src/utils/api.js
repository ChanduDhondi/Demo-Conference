import axios from "axios";

// const url = "http://localhost:8080/api";
const url = "https://demo-conference-w6nc.onrender.com";

export const getData = async () => {
  const res = await axios.get(`${url}/home`);
  return res.data.data;
};

export const postData = async (data) => {
  const res = await axios.put(
    `${url}/home`,
    { data },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return res.data;
};
