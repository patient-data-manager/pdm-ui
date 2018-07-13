import React, { Component } from 'react';

// TO-DO: populate with actual patient data
// TO-DO: hyperlink PCP to something?

export class Summary extends Component {
    render() {
        return(
            <div className='health-record__summary'>
                <div className='summary__image'>
                    <img src='/assets/images/patient-image.png' alt='' />
                </div>
                <div className='summary__divider' />
                <div className='summary__table'>
                    <div className='summary__row'>
                        <div className='summary__key'> Name</div>
                        <div className='summary__value'> Sarah Ober</div>
                    </div>
                    <div className='summary__row'>
                        <div className='summary__key'> Gender</div>
                        <div className='summary__value'> Female</div>
                    </div>
                    <div className='summary__row'>
                        <div className='summary__key'> DOB</div>
                        <div className='summary__value'> Apr 18, 1993 (age 25)</div>
                    </div>
                    <div className='summary__row'>
                        <div className='summary__key'> Address</div>
                        <div className='summary__value'> 31 Pond Street #10, Waltham MA, 02451</div>
                    </div>
                    <div className='summary__row'>
                        <div className='summary__key'> Phone</div>
                        <div className='summary__value'> 617 653-9688</div>
                    </div>
                    <div className='summary__row'>
                        <div className='summary__key'> PCP</div>
                        <div className='summary__value summary__pcp'> Dr. Parul Desai</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Summary;