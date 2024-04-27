import jwt from "jsonwebtoken";

const jwtAuth = async (req, res, next) => {
  // access the token from req.headers
  const bearerToken = req.headers["authorization"];

  // check if token exist or not
  if (!bearerToken) {
    return res.status(401).send("Unauthorized");
  }

  //if token exists
  try {
    const token = bearerToken.replace("Bearer ", "");
    const payload = await jwt.verify(token, process.env.SECRET);
    console.log(payload);
    const userId = payload.id;
    req.userId = userId;
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
  next();
};

export default jwtAuth;
