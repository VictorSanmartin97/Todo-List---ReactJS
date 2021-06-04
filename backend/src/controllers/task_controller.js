const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const tasks = await connection('tarefas').select('*');

        console.log(tasks);

        return response.json(tasks);
    },

    async create(request, response) {
        const { nome_responsavel, descricao_tarefa, email, status } = request.body;

        const [id] = await connection('tarefas').insert({
            nome_responsavel,
            descricao_tarefa,
            email,
            status
        })

        return response.json({ id, descricao_tarefa });
    },

    async delete(request, response) {
        try {
            const { id } = request.params;

            await connection('tarefas').where({ id }).del();

            return response.status(204).send();
        }
        catch (error) {
            next(error)
        }

    },

    async update(request, response) {
        try {
            const { status } = request.body;
            const { id } = request.params;

            const task = await connection('tarefas').where({ id }).update({ status })

            const tasks = await connection('tarefas').select('*');

            console.log(tasks)

            return response.send();

        }
        catch (error) {
            next(error)
        }
    }



}