exports.getHome = (req, res) => {
  res.status(200).render("home", {
    title: "Home",
  });
};
