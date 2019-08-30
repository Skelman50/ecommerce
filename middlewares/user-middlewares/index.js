import expressJwt from "express-jwt";

export const requireSignIni = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});

export const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!user) {
    return res.status(403).json({ error: "Access danied" });
  }

  next();
};

export const isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({ error: "Admin resource. Access danied" });
  }

  next();
};
