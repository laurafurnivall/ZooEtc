export default function JobSearch({ setterFunction }) {
    return (
        <div>
            <input className="search" onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
                type="text" placeholder="Search for a specific job..." />
        </div>
    )
}