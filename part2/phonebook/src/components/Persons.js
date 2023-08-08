const Persons = ({filteredPersons, onDelete}) => {
    return (
        <>   
          {filteredPersons.map(person => 
            <div key = {person.id}>
              {person.name} {person.number} {' '}
              <button onClick={() => onDelete(person.id, person.name)}>delete</button>
            </div>
          )}
       </>     
            
          
        
    )
}

export default Persons