exports.up = function(knex) {
    return knex.schema.createTable('tarefas', function (table) {
        table.string('id').primary();
        table.string('nome_responsavel').notNullable();
        table.string('descricao_tarefa').notNullable();
        table.string('email').notNullable();
        table.string('status').notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tarefas');
};
