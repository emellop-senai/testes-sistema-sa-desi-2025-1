import express from 'express'
import { alunosService } from '../services/alunos.js'

const alunosRoute = express.Router()


alunosRoute.get("/", async (req, res) => {
    try {
        const alunos = await alunosService.getAll()
        res.status(200).json(alunos)
    } catch (error) {
        console.error("Erro ao buscar os alunos", error)
        res.status(500).json({ erro: "Erro interno do servidor" })
    }
})

alunosRoute.post("/", async (req, res) => {
    const body = req.body
    try {
        const newStudent = await alunosService.createStudent(body)
        res.status(201).json(newStudent)
    } catch (error) {
        console.error("Erro ao cadastrar aluno", error);
        res.status(500).json({ erro: "Erro interno do servidor" })
    }
})

export default alunosRoute