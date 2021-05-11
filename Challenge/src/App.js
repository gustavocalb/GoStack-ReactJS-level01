import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  const [title, setTitle] = useState()

  console.log(repositories)

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })

  }, [repositories])

  function titleChange(event) {
    setTitle(event.target.value)
    console.log(title)
  }

  async function handleAddRepository() {
    await api.post('/repositories', {
      title: title
    }).then(response => {
      console.log(response)
      setRepositories([...repositories, response.data])
    })
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
  }

  return (
    <div>
      <h2>Seus repositorios:</h2>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (
          <li key={repositorie.id}>
          {repositorie.title}
          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <form>
        <input 
        type="text" 
        placeholder="Nome do repositorio"
        onChange={titleChange}
        />
        <button onClick={handleAddRepository}>Criar Repositorio</button>
      </form>
    </div>
  );
}

export default App;
