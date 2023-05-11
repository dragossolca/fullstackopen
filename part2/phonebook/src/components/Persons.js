import Person from './Person'

const Persons = (props) => {
    return (
        <>   
          {props.filteredPersons.map(person => 
            <Person key={person.id} person={person} />
          )}
        </>
    )
}

export default Persons