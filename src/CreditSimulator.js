import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import { DataCreditScreen } from './Components/DataCredit/DataCreditScreen'

export const CreditSimulator = () => {
    return (
        <>
            <AppBar size="large" position="static">
                <Toolbar variant="dense">
                    <h3>Calcula el costo de tu credito</h3>
                </Toolbar>
            </AppBar>
            <DataCreditScreen />
        </>
    )
}
