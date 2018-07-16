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

export class Conditions extends Component {
    render() {
        return(
            <div className='health-record__conditions'>
                <VerticalList 
                    list={mockList} 
                    listType='conditions'/>
            </div>
        );
    }
}

export default Conditions;