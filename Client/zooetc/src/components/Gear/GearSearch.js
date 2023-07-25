export const GearSearch = ({ setterFunctionTwo }) => {
    return (
        <div>
            <input className="search" onChange={
                (changeEvent) => {
                    setterFunctionTwo(changeEvent.target.value)
                }
            }
            type="text" placeholder="Search for a specific item..."/>
        </div>
    )
}