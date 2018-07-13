import React, { Component } from 'react';

export class Summary extends Component {
    render() {
        return(
            <div className='health-record__summary'>
                <div className='health-record__summary-image'>
                    <img src='/assets/images/patient-image.png' alt='' />
                </div>
                <div className='divider' />
                <div className='health-record__summary-table'>
                    INSERT SOME STUFF HERE
                </div>
            </div>
        );
    }
}

export default Summary;