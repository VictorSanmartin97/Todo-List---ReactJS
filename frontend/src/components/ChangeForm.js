import React, { useState, useEffect, useRef } from 'react';

import api from '../services/api'

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [nome_responsavel, setNome_responsavel] = useState('');
  const [descricao_tarefa, setDescricao_tarefa] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const inputRef = useRef(null);


  const handleChange = e => {
    setInput(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      nome_responsavel,
      descricao_tarefa,
      email,
      status,
    };

    try {
      await api.post('task', data);

      alert("Tarefa cadastrado com sucesso!");

    } catch (err) {
      alert("Não deu certo, tente novamente");
    }

    setInput('');
  };

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={handleSubmit} className='todo-form'>
          {props.edit ? (
            <>
              <input
                placeholder='Update your item'
                value={input}
                onChange={handleChange}
                name='text'
                ref={inputRef}
                className='todo-input edit'
              />
              <button onClick={handleSubmit} className='todo-button edit'>
                Update
          </button>
            </>
          ) : (
              <>
                <input
                  placeholder='Nome do Responsável'
                  value={nome_responsavel}
                  onChange={e => setNome_responsavel(e.target.value)}
                  name='text'
                  className='todo-input'
                />
                <input
                  placeholder='Descrição'
                  value={descricao_tarefa}
                  onChange={e => setDescricao_tarefa(e.target.value)}
                  name='text'
                  className='todo-input'
                />
                <input
                  placeholder='E-mail'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  name='text'
                  className='todo-input'
                />
                <input
                  placeholder='Status'
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  name='text'
                  className='todo-input'
                />
                <button onClick={handleSubmit} className='todo-button'>
                  Add
          </button>
              </>
            )}
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
