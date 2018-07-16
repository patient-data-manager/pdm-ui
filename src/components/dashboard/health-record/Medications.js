import React, { Component } from 'react';
import VerticalList from '../shared/VerticalList';

let mockList = [
    {
        'grape': 'Mar 25 2015',
        'apple': '5'
    },
    {
        'grape': 'Apr 18 2015',
        'apple': '4'
    },
    {
        'grape': 'Apr 18 2016',
        'apple': '3'
    },
    {
        'grape': 'Apr 18 2017',
        'apple': '2'
    },
    {
        'grape': 'Apr 18 2018',
        'apple': '1'
    },
    {
        'grape': 'Apr 18 2014',
        'apple': '6'
    },
    {
        'grape': 'Apr 18 2011',
        'apple': '9'
    },   
    {
        'grape': 'Apr 18 2013',
        'apple': '7'
    },    
    {
        'grape': 'Apr 18 2010',
        'apple': '10'
    },
    {
        'grape': 'Apr 18 2012',
        'apple': '8'
    },
]

export class Medications extends Component {
    render() {
        return(
            <div className='health-record__medications'>
                <VerticalList 
                    list={mockList} 
                    listType='medications'
                    dateProperty='grape'
                    descriptionProperty='apple'/>
            </div>
        );
    }
}

export default Medications;