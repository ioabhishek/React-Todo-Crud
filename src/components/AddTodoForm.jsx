const AddTodoForm = ({todo, onAddFormSubmit, onAddInputChange}) => {
  return (
    <form onSubmit={onAddFormSubmit}>
      <h2>Add Todo</h2>
      <label htmlFor="todo">Add Todo:</label>
      <input 
        type="text" 
        name="todo"
        placeholder="Create a new todo"
        value={todo}
        onChange={onAddInputChange}
      />
      <button type='submit'>Add</button>
    </form>
  )
}

export default AddTodoForm