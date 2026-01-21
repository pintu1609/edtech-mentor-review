import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
  role: "student" | "mentor" | "admin";
}

export const verifyToken = (
  req: NextRequest,
  allowedRoles: Array<DecodedToken["role"]> = []
): DecodedToken => {
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    throw new Error("Unauthorized: token missing");
  }

  let decoded: DecodedToken;

  try {
    decoded = jwt.verify(token, SECRET) as DecodedToken;
  } catch {
    throw new Error("Unauthorized: invalid token");
  }

  if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
    throw new Error("Forbidden: insufficient role");
  }

  return decoded;
};
