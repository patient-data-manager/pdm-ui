import React, { Component } from 'react';
import VerticalList from '../shared/VerticalList';

let mockList = [
    {
        'date': 'Mar 25 2015',
        'description': '5'
    },
    {
        'date': 'Apr 18 2015',
        'description': '4'
    },
    {
        'date': 'Apr 18 2016',
        'description': '3'
    },
    {
        'date': 'Apr 18 2017',
        'description': '2'
    },
    {
        'date': 'Apr 18 2018',
        'description': '1'
    },
    {
        'date': 'Apr 18 2014',
        'description': '6'
    },
    {
        'date': 'Apr 18 2011',
        'description': '9'
    },   
    {
        'date': 'Apr 18 2013',
        'description': '7'
    },    
    {
        'date': 'Apr 18 2010',
        'description': '10'
    },
    {
        'date': 'Apr 18 2012',
        'description': '8'
    },
]

export class Procedures extends Component {

    render() {
        return(
            <div className='health-record__procedures'>
                <VerticalList 
                    list={mockList} 
                    listType='procedures'
                    dateProperty='date'
                    descriptionProperty='description'/>
            </div>
        );
    }
}

export default Procedures;