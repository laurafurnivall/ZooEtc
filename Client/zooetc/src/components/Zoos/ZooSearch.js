export default function ZooSearch({ setterFunction }) {
    return (
        <div>
            <input className="search" onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
                type="text" placeholder="Search for a zoo or location..." />
        </div>
    )
}