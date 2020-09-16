import React from 'react';
import './styles.css';

export default function SearchForm({setUserSearchTerm}: any) {

    return (
        <div className='form-container'>
            <form id='user-search-form'>
            <div className="form-group">
                <label htmlFor="searchTerm">Start typing to search for users by first name:</label>
                <input type="text" className="form-control" id="searchTerm" aria-describedby="search" onChange={(e) => setUserSearchTerm(e.target.value)} />
            </div>
            </form>
        </div>
    )
}
