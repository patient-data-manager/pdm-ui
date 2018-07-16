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

export class Procedures extends Component {

    render() {
        return(
            <div className='health-record__procedures'>
                <VerticalList list={mockList}/>
            </div>
        );
    }
}

export default Procedures;