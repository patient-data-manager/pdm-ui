import React, { Component } from 'react';
import VerticalList from '../shared/VerticalList';

let mockList = [
    {
        'blue': 'Mar 25 2015',
        'pink': '5'
    },
    {
        'blue': 'Apr 18 2015',
        'pink': '4'
    },
    {
        'blue': 'Apr 18 2016',
        'pink': '3'
    },
    {
        'blue': 'Apr 18 2017',
        'pink': '2'
    },
    {
        'blue': 'Apr 18 2018',
        'pink': '1'
    },
    {
        'blue': 'Apr 18 2014',
        'pink': '6'
    },
    {
        'blue': 'Apr 18 2011',
        'pink': '9'
    },   
    {
        'blue': 'Apr 18 2013',
        'pink': '7'
    },    
    {
        'blue': 'Apr 18 2010',
        'pink': '10'
    },
    {
        'blue': 'Apr 18 2012',
        'pink': '8'
    },
]

export class Labs extends Component {
    render() {
        return(
            <div className='health-record__labs'>
                <VerticalList 
                    list={mockList} 
                    listType='labs'
                    dateProperty='blue'
                    descriptionProperty='pink'/>
            </div>
        );
    }
}

export default Labs;