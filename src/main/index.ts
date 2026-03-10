import {Elysia} from 'elysia'
import { namaNegara } from '../routes/region.route.ts'
import { namaOrang } from '../routes/human.route.ts'
import {  authMiddleware, jwtAuth } from '../middleware/auth.ts'
import dotenv from 'dotenv'
dotenv.config()

const app = new Elysia({prefix: "/api"})
    .use(jwtAuth)


app.post("/login",async ({jwt,body,set}) => {
    try {
        const { username }: any = body
        const token = await jwt.sign({
            id: 1,
            name: username
        })

        set.status = 200
        return { token }
    } catch (error) {
        set.status = 500
        return { message: "Server terjadi error", status: 500}
    }
})

app.group("/v1", (app) => 
    app
        .onBeforeHandle(authMiddleware)
        .use(namaNegara)
        .use(namaOrang)
)
app.get("/", () => {
    return {
        message: "Hello from elysia",
        status: true,
        data: {
            from: "ray",
            to: "all"
        }
    }
})

app.listen(3000,() => {
    console.log("server berjalan di http://localhost:3000")
})