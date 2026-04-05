import jwt from "jsonwebtoken";
// jsonwebtoken is used to create, sign, and verify JSON Web Tokens (JWTs) for authentication and authorization.

const isAuthenticated = (req, res, next) => {
  try{
    const token = req.cookies.token;
    if(!token){
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      })
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if(!decode){
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      })
    }
    req.id = decode.userId;
    next();

  } catch(error){
    console.log(error);
  }
}


export default isAuthenticated;