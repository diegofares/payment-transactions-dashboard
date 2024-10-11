import React from 'react'

const Summary = ({ totalTransactions, totalAmount }) => {
    return (
        <div className='border-2 border-r-2 border-stone-200 rounded p-2 m-2 flex  justify-between'>
            <h2  className='font-bold mr-5'>Summary</h2>
            <div className='mr-3'><label>Total Transactions: </label><span>{totalTransactions}</span></div>
            <div className='mr-3'><label>Total Amount: </label><span>USD {totalAmount}</span></div>
        </div>
    )
}

export default Summary