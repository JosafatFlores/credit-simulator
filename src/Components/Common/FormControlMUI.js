import React from 'react'
import { FilledInput, FormControl, InputAdornment, InputLabel } from '@mui/material'

export const FormControlMUI = ({ variant, name, value, text, handleInputChange, type, adornament, fullWidth = false }) => {

    return (
        <div>
            <FormControl sx={{ m: 1 }} variant={variant} fullWidth={fullWidth}>
                <InputLabel htmlFor={name}>{text}</InputLabel>
                <FilledInput
                    id={name}
                    value={value}
                    name={name}
                    onChange={handleInputChange}
                    type={type}
                    startAdornment={<InputAdornment position="start">{adornament}</InputAdornment>}
                    autoComplete="off"
                />
            </FormControl>
        </div>
    )
}