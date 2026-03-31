import express from 'express'
import { pool } from './config/db.js'

const app = express()
const PORT = 3000
app.use(express.json())

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens

/**
 * You must always return the client to the pool if you successfully check it out, regardless of whether or not there was an error with the queries you ran on the client.

If you don’t release the client your application will leak them and eventually your pool will be empty forever and all future requests to check out a client from the pool will wait forever.
 */
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

// será sempre necessário fazer um release para cortar a conexão, dessa forma precisamos fazer single transactions, ajustem isso

const client = await pool.connect()

app.get("/", (req, res) => {
    res.json("Hola Mundo!")
})

app.get("/alunos", async (req, res) => {
    try {
        const restorno = await client.query("SELECT * from alunos")
        res.status(200).json(restorno.rows)
    } catch (error) {
        throw new Error(error);
    }
})


app.listen(PORT, () => {
    console.log(`Aplicação rodando em: http://localhost:${PORT}`)
})