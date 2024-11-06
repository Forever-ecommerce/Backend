import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Extract token after "Bearer"

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized, Login Again",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id; // Assuming 'id' is in the token payload
    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Invalid token, please log in again",
    });
  }
};

export default authUser;
