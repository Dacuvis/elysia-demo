import {Elysia} from 'elysia'
import db from '../database/database.ts'

export const namaNegara = new Elysia({prefix: "/region"})
    .get("/",async ({query}) => {
        try {
            const { nama_negara } = query
            let result:any
            if (nama_negara) {
                const [rows] = await db.query("SELECT * FROM negara WHERE nama_negara = ?",[nama_negara])
                result = rows
            } else {
                const [rows] = await db.query("SELECT * FROM negara")
                result = rows
        }

            return result
        } catch (err: any) {
            return {
                status: 500,
                message: "Server terjadi error",
                detail: err.message
            }
        }
    })

    .get("/:id", async ({params}) => {
        try {
            const [rows] = await db.query("SELECT * FROM negara WHERE id = ?",[params.id])
            return rows
        } catch (err: any) {
            return {
                status: 500,
                message: "Server terjadi error",
                detail: err.message                
            }
        }
    })