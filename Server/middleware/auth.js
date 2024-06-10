const admin = require("./firebase");

const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Authentication failed");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    req.body.user = {
      userId: decodedToken.uid,
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Authentication failed");
  }
};

export default userAuth;
