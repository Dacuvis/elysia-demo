import {Elysia,t} from 'elysia'
import db from '../database/database.ts'

export const namaOrang = new Elysia({prefix: "/human"})
    .post("/", async ({body,set}) => {
                try {
            const {nama,umur,fisik,tempat} = body
            const {tinggi,berat,warna_rambut} = fisik ?? {}
            const {negara_kelahiran,kota_kelahiran} = tempat ?? {}
            
            const fisikJSON = fisik ? JSON.stringify(fisik) : null
            const tempatJSON = tempat ? JSON.stringify(tempat) : null

            const [rows] = await db.query(
                "INSERT INTO human(nama,umur,fisik,tempat) VALUES(?,?,?,?)",
                [nama,umur,fisikJSON,tempatJSON]
            )

            console.log(tinggi,berat,warna_rambut,negara_kelahiran,kota_kelahiran)
            set.status = 200;
            return { message: "Data berhasil di push", status: 200 };
        } catch (err: any) {
            set.status = 500;
            return { status: 500, message: "Server terjadi error", detail: err.message };
        }
    },{
        body: t.Object({
            nama: t.Optional(t.String({
                minLength: 3,
                maxLength: 50,
                default: "Anonim",
                pattern: "^[A-Za-z]+$"
            })),
            umur: t.Optional(t.Number({
                min: 0,
                max: 150,
                default: 0
            })),
            fisik: t.Optional(t.Object({
                tinggi: t.Number({
                    min: 3,
                    max: 300,
                }),
                berat: t.Number({
                    min: 5,
                    max: 150,
                }),
                warna_rambut: t.Optional(t.String({
                    minLength: 3,
                    maxLength: 50,
                    default: "Anonim",
                    pattern: "^[A-Za-z]+$"
                }))
            })),
            tempat: t.Optional(t.Object({
                negara_kelahiran: t.Optional(t.String({
                    minLength: 3,
                    maxLength: 50,
                    default: "earth",
                    pattern: "^[A-Za-z]+$"
                })),
                kota_kelahiran: t.Optional(t.String({
                    minLength: 3,
                    maxLength: 50,
                    default: "earth",
                    pattern: "^[A-Za-z]+$"
                }))
            }))
        })
    }
)
    .get("/",async ({set}) => {
        try {
            const [rows] = await db.query("SELECT * FROM human")
            set.status = 200
            return { message: "Data berhasil di buka", status: 200, data: rows };
        } catch (err: any) {
            set.status = 500
            return { status: 500, message: "Server terjadi error", detail: err.message }
        }
    })

    .get("/:id",async ({params,set}) => {
        try {
            const [rows] = await db.query("SELECT * FROM human WHERE id = ?",[params.id])
            set.status = 200
            return { message: "Data berhasil di buka", status: 200, data: rows };
        } catch (err: any) {
            set.status = 500
            return { status: 500, message: "Server terjadi error", detail: err.message }
        }  
    })