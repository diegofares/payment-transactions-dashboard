import React from 'react'

const Sort = ({ sortOrder, sortField, setSortField, setSortOrder }) => {
    return (
        <div className='py-4'> 
            <label htmlFor="sort-selector">Sort By: </label>
            <select id="sort-selector" className="select select-sm select-bordered mx-2" onChange={(e) => setSortField(e.target.value)} value={sortField}>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
            </select>
            <button className="btn btn-sm btn-secondary mx-2" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
            </button>
        </div>

    )
}

export default Sort