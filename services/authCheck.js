const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// ── Helper dùng chung ──────────────────────────────────────────
const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const verifyToken = (token) => {
  try {
    return { decoded: jwt.verify(token, JWT_SECRET), error: null };
  } catch (error) {
    return { decoded: null, error };
  }
};

const handleJWTError = (error, res) => {
  console.error("JWT Error:", error);
  if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      code: "TOKEN_EXPIRED",                            // ← thêm code để frontend xử lý
      message: "Token đã hết hạn, vui lòng đăng nhập lại!",
    });
  }
  return res.status(401).json({
    success: false,
    code: "INVALID_TOKEN",
    message: "Token không hợp lệ!",
  });
};

// ── Middlewares ────────────────────────────────────────────────
const checkJWT = (req, res, next) => {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ success: false, message: "Vui lòng đăng nhập!" });
  }

  const { decoded, error } = verifyToken(token);
  if (error) return handleJWTError(error, res);

  req.user = decoded;
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Bạn không có quyền truy cập!",
    });
  }
  next();
};

// authAdmin = checkJWT + isAdmin gộp lại, không cần viết lại từ đầu
const authAdmin = [checkJWT, isAdmin];

module.exports = { checkJWT, isAdmin, authAdmin };