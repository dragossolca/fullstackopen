const Filter = (props) => {
    return (
        <>
          filter shown with <input value={props.value} onChange={props.handleFilterChange} />
        </>
    )
}

export default Filter