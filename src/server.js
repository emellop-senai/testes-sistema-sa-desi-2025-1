import express from 'express'
import { pool } from './config/db.js'
import alunosRoute from './routes/alunos.js'

const app = express()
const PORT = 3000
app.use(express.json())


pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})


app.get("/", (req, res) => {
    res.json("Hola Mundo!")
})

app.use('/alunos', alunosRoute)


app.listen(PORT, () => {
    console.log(`Aplicação rodando em: http://localhost:${PORT}`)
})