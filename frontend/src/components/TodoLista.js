import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import api from '../services/api'
import { RiCloseCircleLine, RiFeedbackFill } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.css';

export default function TodoList() {
  const [nome_responsavel, setNome_responsavel] = useState('');
  const [descricao_tarefa, setDescricao_tarefa] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    api.get('tasks', {
    }).then(response => {
      setTarefas(response.data);
    })
  }, []);



  function handleCreateForm() {
    if (!document.getElementsByClassName('form-create d-none')) {
      document.getElementById('form_create').classList.add("d-none");
      return;
    }
    else {
      document.getElementById('form_create').classList.remove("d-none");
      return;
    }
  }

  async function handleCreateRandom() {
    var noTasks = false;

    api.get('tasks', {
    }).then(response => {
      if (response.data === null) {
        noTasks = true;
      }      
    })   

    if (!noTasks) {
      const randomTasks = await fetch(`https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3`)
        .then((response) => {
          console.log(response)
          return response.json()
            .then((json) => {
              if (response.ok) {
                console.log(Promise.resolve(json))
                return json
              }
              return Promise.reject(json)
            })
        })


      console.log(randomTasks)

      randomTasks.forEach(r => {
        console.log(r.text)
        var default_nome_responsavel = 'Eu';
        var default_descricao_tarefa = r.text;
        var default_email = 'eu@me.com';
        var default_status = 'Ativa';


        const data = {
          nome_responsavel: default_nome_responsavel,
          descricao_tarefa: default_descricao_tarefa,
          email: default_email,
          status: default_status
        };

        try {
          api.post('task', data);

          alert("Tarefa cadastrada com sucesso!");

        } catch (err) {
          alert("Não deu certo, tente novamente");
        }
      });
    }
  }

  // async function handlerUpdate(taskStatus, taskID) {    
    
  //   const data = [];
    
  //   var statusAtivo = "Ativa"
  //   var statusDone = "Concluída"

  //   data = {status: statusDone};

  //   // if(taskStatus == 'ativa' || taskStatus == 'Ativa'){
  //   //   data = {status: statusDone};
  //   // }
  //   // else if(taskStatus == 'Concluida' || taskStatus == 'concluida'){
  //   //   data = {status: statusAtivo};
  //   // }    

  //   try {
  //     await api.put(`task/${taskID}`, data);

  //     alert("Tarefa alterada com sucesso!");

  //   } catch (err) {
  //     alert("Não deu certo, tente novamente");
  //   }
  // }

  //  function handlerDelete(idTask) {
  //   const {id} = {
      
  //   }
    
  //   try {
  //     api.delete(`task/${idTask}`, id);

  //     alert("Tarefa deletada com sucesso!");

  //   } catch (err) {
  //     alert("Não deu certo, tente novamente");
  //   }
  // }


  return (
    <>
      <section className="container">
        <div className="div-buttons">
          <button className='todo-button edit' onClick={handleCreateForm}>Criar Tarefa</button>
          <button className='todo-button edit' onClick={handleCreateRandom}>Estou sem Tarefas</button>
        </div>
        <div id="form_create" className="form-create d-none">
          <TodoForm />
        </div>
        <div id="form_create" className="form-create d-none">
          <TodoForm />
        </div>

      </section>

      <section className='container'>
        <div className='row'>
          <div className='col-lg-6'>
            <h2>To do</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Nome do Responsável</th>
                  <th scope="col">Descrição</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {tarefas.map(tarefa => function () {
                  if (tarefa.status == 'ativa' || tarefa.status == 'Ativa') {
                    return (<tr>
                      <td>{tarefa.nome_responsavel}</td>
                      <td>{tarefa.descricao_tarefa}</td>
                      <td>{tarefa.email}</td>
                      <td>{tarefa.status}</td>
                      {/* <td><RiCloseCircleLine
                        className='delete-icon'
                        onClick={handlerDelete(tarefa.id)}
                      /></td>
                      <td> <TiEdit
                        className='edit-icon'
                      // onClick={handlerUpdate(tarefa.status, tarefa.id)}
                      />
                      </td> */}
                    </tr>);
                  }
                }())}
              </tbody>
            </table>
          </div>
          <div className='col-lg-6'>
            <h2>Done</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Nome do Responsável</th>
                  <th scope="col">Descrição</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {tarefas.map(tarefa => function () {
                  if (tarefa.status == 'Concluida' || tarefa.status == 'concluida') {
                    return (<tr>
                      <td>{tarefa.nome_responsavel}</td>
                      <td>{tarefa.descricao_tarefa}</td>
                      <td>{tarefa.email}</td>
                      <td>{tarefa.status}</td>
                      {/* <td><RiCloseCircleLine
                        className='delete-icon'
                        onClick={handlerDelete(tarefa.id)}
                      /></td>
                      <td> <TiEdit
                        className='edit-icon'
                      // onClick={handlerUpdate(tarefa.status)}
                      />
                      </td> */}
                    </tr>);
                  }
                }())}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );

}  
