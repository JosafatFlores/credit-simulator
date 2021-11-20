import React from 'react'

import { FormControlMUI } from '../Common/FormControlMUI';


export const CreditInformation = ({ formControlArray }) => {

    return (
        <div className="credit-information__main-container">
            {
                (formControlArray.length > 0)
                && (
                    formControlArray.map(formControl => (
                            <FormControlMUI
                                key={formControl.name}
                                variant={formControl.variant}
                                name={formControl.name}
                                value={formControl.value}
                                text={formControl.text}
                                handleInputChange={formControl.handleInputChange}
                                type={formControl.type}
                                adornament={formControl.adornament}
                            />
                    ))
                )
            }
        </div>
    )
}
