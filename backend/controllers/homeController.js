let homePageData = {
  navbar: {
    bgclr: "",
    title: "",
    items: [],
  },
  bannerImage: "",
  title: "",
  buttons: [],
  events: [
    {
      date: "",
      title: "",
      description: "",
      location: "",
      imageUrl: "",
    },
  ],
  footer: {
    bgclr: "",
    title: "",
    items: [],
  },
};

exports.homeController = (req, res) => {
  const method = req.method;
  if (method == "GET") {
    res.status(200).json({ message: "No Data", data: homePageData });
  } else if (method == "PUT") {
    const { data } = req.body;
    homePageData = data;
    res.status(200).json({ message: "Data Found", data: homePageData });
  }
};
