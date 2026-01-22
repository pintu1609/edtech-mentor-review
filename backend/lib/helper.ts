import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Fallback for development
const ACCESS_TOKEN_EXPIRY = parseExpiryToSeconds(
  process.env.ACCESS_TOKEN_EXPIRY_DAY || "2d"
); 

interface UserPayload {
  _id: string;
  email: string;
  role?: string;
}

export const generateToken = (user: UserPayload): string => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );

  return token;
};

function parseExpiryToSeconds(expiry: string): number {
  const timeValue = parseInt(expiry.slice(0, -1)); // number part
  const timeUnit = expiry.slice(-1); // last char unit: d, h, m, s

  switch (timeUnit) {
    case "d":
      return timeValue * 24 * 60 * 60;
    case "h":
      return timeValue * 60 * 60;
    case "m":
      return timeValue * 60;
    case "s":
      return timeValue;
    default:
      throw new Error("Invalid expiry format. Use d, h, m or s suffix");
  }
}
