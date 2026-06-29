const PersonForm = ({onSubmit, nameChange, numChange}) => {
  return(
    <form onSubmit={onSubmit}>
      <div> name: <input onChange={nameChange}/> </div>
      <div> number: <input onChange={numChange}/></div>
      <div> <button type="submit">add</button> </div>
    </form>
  )
}

export default PersonForm