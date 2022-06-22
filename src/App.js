import './App.css';
import {useState} from 'react'

function App() {

  const [todoList, setTodoList] = useState([]);
  const [checkTodoList, setCheckTodoList] = useState([]);
  const [form, setForm] = useState({
    todo: '',
    status: false
  });

  const resetInput = () => {
    setForm({
      todo: '',
      status: false
    })
  }

  const handleChange = (e) => {
    
    setForm({
      ...form,
      todo: e.target.value,
      status: false
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)
    if(form.index || form.index === 0) {
      const newTodo = todoList.map((e,i) => {
        if(i === form.index) {
          return form
        } else {
          return e
        }
      })

      setTodoList(newTodo)
      
    } else {
      setTodoList([
        ...todoList,
        form
      ])
    }
    

    resetInput()
  }

  const handleCheck = (index) => {
    const newTodo = todoList.filter((e,i) => {
      if(i !== index) {
        
        return {
          todo: e.todo,
          status: false
        }
      }
      
    })

    console.log(newTodo);
    

    const newCheckTodo = todoList.filter((e,i) => {
      if(i === index) {
        return {
          todo: e.todo,
          status: true
        }
      }
    })
    

    const listNewCheckTodo = newCheckTodo.concat(checkTodoList);

    setCheckTodoList(listNewCheckTodo)
    setTodoList(newTodo);
  }

  const handleDelete = (index) => {
    const newTodo = todoList.filter((e,i) => {
      if(index !== i) {
        return e
      }
    })

    setTodoList(newTodo);
  }

  const handleEdit = (index) => {
    const detailTodo = {
      index,
      ...todoList[index]
    }
    setForm(detailTodo)
  }

  return (
    <div>
      <div className='jumbotroon'>
        <h1>Todo List App</h1>
        
        <form className='form' method='post' onSubmit={handleSubmit}>
          <input type="text" className='heighttext' name='todo' value={form.todo}  onChange={handleChange} placeholder='Todo ...' />
          <button className='btn-submit' type='submit'>Submit</button>
        </form>
      </div>

      <div className='content' style={{display: todoList.length == 0 ? 'none' : ''}}>
        
        <div className='card-body'>
          <h3 className='title-job'>~Pekerjaan yang sedang berlangsung~</h3>

          {
            todoList.map((e,i) => (
              <div key={i} className='card'>
                <div className='action'>
                  <input type='checkbox' checked={e.status ? true : false} onChange={() => handleCheck(i)} />
                </div>
                <div className='text' style={{textDecoration: e.status ? 'line-through' : 'none'}}>
                  {e.todo}
                </div>
                <div className='button-action' style={{ display: e.status ? 'none' : 'block' }}>
                  <button className='btn-edit' onClick={() => handleEdit(i)}>Edit</button>
                  <button className='btn-delete' onClick={() => handleDelete(i)}>Delete</button>
                </div>

              </div>
            ))
          }
        </div>
        
        
      </div>

      <div className='content' style={{display: checkTodoList.length == 0 ? 'none' : ''}}>
        <div className='card-body-finish'>
          <h3 className='title-job'>~Pekerjaan yang telah selesai~</h3>
          {
            checkTodoList.map((e,i) => (
              <div key={i} className='card'>
                <div className='action'>
                  <input type='checkbox' checked={true} />
                </div>
                <div className='text' style={{textDecoration: 'line-through'}}>
                  {e.todo}
                </div>

              </div>
            ))
          }
        </div>
      </div>
    
    </div>
  );
}

export default App;
