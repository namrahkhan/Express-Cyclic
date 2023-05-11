const initServer = (operator, p) => {
  const port = typeof p === "number" ? parseInt(p) : NaN;
  try {
    if (isNaN(port)) throw new Error(`Port should be a number`);
    if (!operator.listen)
      throw new Error(
        "App constructor should be the one that is returned after invoking express"
      );
    operator.listen(port, (err) => {
      if (err) throw new Error(err);
      console.log(`The application is listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = initServer;
