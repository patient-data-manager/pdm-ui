import React, { Component } from 'react';
import VerticalList from '../shared/VerticalList';

let mockList = [
    {
        'dog': 'Mar 25 2015',
        'cat': '5'
    },
    {
        'dog': 'Apr 18 2015',
        'cat': '4'
    },
    {
        'dog': 'Apr 18 2016',
        'cat': '3'
    },
    {
        'dog': 'Apr 18 2017',
        'cat': '2'
    },
    {
        'dog': 'Apr 18 2018',
        'cat': '1'
    },
    {
        'dog': 'Apr 18 2014',
        'cat': '6'
    },
    {
        'dog': 'Apr 18 2011',
        'cat': '9'
    },   
    {
        'dog': 'Apr 18 2013',
        'cat': '7'
    },    
    {
        'dog': 'Apr 18 2010',
        'cat': '10'
    },
    {
        'dog': 'Apr 18 2012',
        'cat': '8'
    },
]

export class Conditions extends Component {
    render() {
        return(
            <div className='health-record__conditions'>
                <VerticalList 
                    list={mockList} 
                    listType='conditions'
                    dateProperty='dog'
                    descriptionProperty='cat'/>
            </div>
        );
    }
}

export default Conditions;