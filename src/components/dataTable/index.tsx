import React from 'react';
import './styles.css';
import UserInterface from '../../interfaces/userInterface';

export default function DataTable({data}: any) {
    return (
        <div className='table-wrapper'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {
                            data.length && Object.keys(data[0]).map(column => {
                                return <th scope="col">
                                    {column}
                                </th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length && data.map((row: any) => {
                            return <tr>
                                {
                                    row && Object.keys(row).map((key:any) => {
                                    return <td>{row[key]}</td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
