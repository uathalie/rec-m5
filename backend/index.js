import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: "crud"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.json("Aqui está o backend!")
})

app.get("/entradas", (req, res)=>{
    const q = "SELECT * FROM entradas"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/saidas", (req, res)=>{
    const q = "SELECT * FROM saidas"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/totalcarteira", (req, res)=>{
    const q = "SELECT (SELECT SUM(valor) FROM entradas) - (SELECT SUM(valor) FROM saidas) AS totalcarteira"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800, ()=>{
    console.log("Backend funcionando!")
});