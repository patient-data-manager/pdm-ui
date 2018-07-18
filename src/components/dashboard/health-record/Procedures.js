import React, { Component } from 'react';
import VerticalList from '../shared/VerticalList';

let mockList = [
    {
        'date': '2014-07-13T02:27:04.196Z',
        'description': '5'
    },
    {
        'date': '2010-07-13T02:27:04.196Z',
        'description': '9'
    },
    {
        'date': '2018-07-13T02:27:04.196Z',
        'description': '1'
    },
    {
        'date': '2016-07-13T02:27:04.196Z',
        'description': '3'
    },
    {
        'date': '2011-07-13T02:27:04.196Z',
        'description': '8'
    }, 
    {
        'date': '2015-07-13T02:27:04.196Z',
        'description': '4'
    },
    {
        'date': '2009-07-13T02:27:04.196Z',
        'description': '10'
    },
    {
        'date': '2013-07-13T02:27:04.196Z',
        'description': '6'
    },
    {
        'date': '2015-07-13T02:27:04.196Z',
        'description': '4'
    },
    {
        'date': '2012-07-13T02:27:04.196Z',
        'description': '7'
    },   
    {
        'date': '2017-07-13T02:27:04.196Z',
        'description': '2'
    }
];

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