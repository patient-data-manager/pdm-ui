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

export class Labs extends Component {
    render() {
        return(
            <div className='health-record__labs'>
                <VerticalList 
                    list={mockList} 
                    listType='labs'/>
            </div>
        );
    }
}

export default Labs;