const express = require ('express');

const app = express();

app.post('/', (request, response) => {
    return response.json({
        nome_responsavel: 'Victor',
        descricao_tarefa: 'Fazer desafio',
        email: 'teste@teste.com'
    });
});

app.listen(3000);
