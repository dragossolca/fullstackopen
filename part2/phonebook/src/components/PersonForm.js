const PersonForm = ({submitFunction, fields}) => {
    return (
        <form onSubmit={submitFunction}>
            <div>
                name: <input value={fields[0].value.newName} onChange={fields[0].onChange.handleNameChange} />
            </div>
            <div>
                number: <input value={fields[1].value.newNumber} onChange={fields[1].onChange.handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}



export default PersonForm