import React from 'react'
import TestingDummy from './TestingDummy'

function ActualOfficeAddress() {
    return (
        <div className="service-area-2 bg de-padding" style={{ padding: '3rem' }}>
            <div className="container">
                <div className="service-wpr-2 service-wpp-0 grid-3" style={{ gridRowGap: '3rem', marginTop: '0 rem' }}>
                    <TestingDummy
                        imageSrc="/country/flag-india.png"
                        country="India"
                        addressLines={[
                            '108, Webel IT Park (Phase-II),',
                            'DH Block, Action Area 1D, New Town,',
                            'Kolkata-700160'
                        ]}
                    />
                    <TestingDummy
                        imageSrc="/country/united-states.png"
                        country="USA"
                        addressLines={[
                            '971 US Highway 202N STE N',
                            'Branchburg NJ 08876'
                        ]}
                    />
                    <TestingDummy
                        imageSrc="/country/united-kingdom.png"
                        country="UK"
                        addressLines={[
                            '27, Old Gloucester Street, London',
                            'WC1N 3AX, United Kingdom'
                        ]}
                    />
                    <TestingDummy
                        imageSrc="/country/united-arab-emirates.png"
                        country="UAE"
                        addressLines={[
                            'Business Centre, Sharjah Publishing City Free Zone,',
                            ' Sharjah, UAE'
                        ]}
                    />
                    <TestingDummy
                        imageSrc="/country/hong-kong.png"
                        country="Hongkong"
                        addressLines={[
                            'RM 1504, 15/F Kwong Fat Comm Building',
                            '582-588 Canton Road Yau Ma Tei KLN,',
                            'Hong Kong'
                        ]}
                    />
                    <TestingDummy
                        imageSrc="/country/flag-bangladesh.png"
                        country="Bangladesh"
                        addressLines={[
                            '111, Noya Paltan, 6th Floor,',
                            'Paltan, Dhaka-1000'
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default ActualOfficeAddress