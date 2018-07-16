import React, { Component } from 'react';
import VerticalList from '../shared/VerticalList';

let mockList = [
    {
        'date': 'date field',
        'description': 'description goes here'
    },
    {
        'date': 'date field',
        'description': 'description goes here'
    },
    {
        'date': 'date field',
        'description': 'description goes here'
    },
    {
        'date': 'date field',
        'description': 'description goes here'
    },
    {
        'date': 'date field',
        'description': 'description goes here'
    },
    {
        'date': 'date field',
        'description': 'description goes here'
    },
    {
        'date': 'date field',
        'description': 'description goes here'
    },
    {
        'date': 'date field',
        'description': 'description goes here'
    },

    {
        'date': 'date field',
        'description': 'description goes here'
    },        {
        'date': 'date field',
        'description': 'description goes here'
    }
]

export class Medications extends Component {
    render() {
        return(
            <div className='health-record__medications'>
                <VerticalList 
                    list={mockList} 
                    listType='medications'/>
            </div>
        );
    }
}

export default Medications;