import React from 'react';
import './styles.css';

export default function SearchForm() {
    return (
        <div className='form-container'>
            <form id='user-search-form'>
            <div className="form-group">
                <label htmlFor="searchTerm">Search:</label>
                <input type="text" className="form-control" id="searchTerm" aria-describedby="search" />
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
            </form>
        </div>
    )
}
