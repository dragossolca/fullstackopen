const PersonForm = (props) => {
    return (
        <form onSubmit={props.submitFunction}>
            <div>
                name: <input value={props.fields[0].name} onChange={props.fields[0].onChange} />
            </div>
            <div>
                number: <input value={props.fields[1].name} onChange={props.fields[1].onChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}



export default PersonForm