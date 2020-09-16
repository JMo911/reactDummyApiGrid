import React from 'react';
import './styles.css'

// renders a list of clickable numbers based on how many records are in the table and how many records we want to show per page
// when user clicks on a number, we need to grab a slice of data that corresponds to the records that should be on that page i.e. if we want 10 records per page and click on page 1, then show records 0-9..
// 9 comes from page number * records per page -1
// 0 comes from index of last record - records per page

export default function Pagination({totalRecords, recordsPerPage, updateCurrentPage, updateRecordsPerPage}: any) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRecords/recordsPerPage); i++) {
        pageNumbers.push(i);
    };
    
    return (
        <div className='pagination-wrapper'>
            {pageNumbers.map(page => {
                return <button key={page} className="btn btn-info" onClick={() => updateCurrentPage(page)}>{page}</button>
            })}
            <label htmlFor="records-per-page">Records per page:</label>
            <select name="records-per-page" id="records-per-page" onChange={(e) => updateRecordsPerPage(e.target.value)}>
                <option value="1">1</option>
                <option value="2" selected>2</option>
                <option value="3">3</option>
            </select>
        </div>
    )
}
