// auth.ts
import jwtPlugin from '@elysiajs/jwt';
import dotenv from 'dotenv'
dotenv.config()

export const jwtAuth = jwtPlugin({
    name: "jwt",
    secret: process.env.JWT_SECRET!
});

export const authMiddleware = async (ctx: any) => {
    const token = ctx.headers?.authorization?.replace("Bearer ", "");

    if (!token) throw new Error("Unauthorized: token not found");

    const payload = await ctx.jwt.verify(token);
    if (!payload) throw new Error("Unauthorized: invalid token");

    
    ctx.user = payload;
};