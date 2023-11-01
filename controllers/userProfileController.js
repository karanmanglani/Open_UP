exports.getUserProfile = (req, res) => {
  res.status(200).render("userProfile", {
    title: "{%USER_NAME%}",
  });
};
