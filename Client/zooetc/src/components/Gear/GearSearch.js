export const GearSearch = ({ setterFunction }) => {
    return (
        <div>
            <input className="search" onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Search for a specific item..."/>
        </div>
    )
}