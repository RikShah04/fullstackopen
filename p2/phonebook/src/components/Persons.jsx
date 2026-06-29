const Persons = ({persons, onClick}) => {
  return(
    <div>
        {persons.map(person => {
          return(
             <div key={person.name}>
              {person.name} {person.number}
              <button onClick={() => onClick(person.id)}>delete</button>
            </div>
          )
        })}
    </div>
  )
}

export default Persons