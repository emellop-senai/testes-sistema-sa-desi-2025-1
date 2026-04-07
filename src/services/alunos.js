import { pool } from "../config/db.js"

class AlunosService {
    async getAll() {
        const res = await pool.query("SELECT * from alunos")
        console.log(res)
        return res.rows
    }

    async getById() {

    }

    /**
     * Helperzinho
     * const newStudent = await pool.query("INSERT INTO alunos(nome, idade, altura) VALUES($1, $2, $3) RETURNING *", [data.nome, data.idade, data.altura])
     */

    async createStudent(data) {
        const newStudent = await pool.query("INSERT INTO alunos(nome) VALUES($1) RETURNING *", [data.nome])
        console.log(newStudent.rows[0]);

        return newStudent.rows[0]
    }

    async delete() {

    }

}

export const alunosService = new AlunosService()