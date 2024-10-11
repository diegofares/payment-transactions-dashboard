import React from 'react'

const DateFilter = ({ startDate, endDate, setStartDate, setEndDate }) => {
    return (
        <div className="date-filter py-4 flex">
            <div>
                <label>Start Date: </label>
                <input type="date" className='input input-sm input-bordered mx-2' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
                <label>End Date: </label>
                <input type="date" className='input input-sm input-bordered mx-2' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
        </div>
    )
}

export default DateFilter