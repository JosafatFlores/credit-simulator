import React, { useState } from 'react'
import { Dialog, Button, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@mui/material';
import { FormControlMUI } from '../Common/FormControlMUI';
import { useForm } from '../../Hooks/useForm';
import { currencyFormatter } from '../../Helpers/currencyFormatter';

export const FixedCharges = ({ fixedCharges, setFixedCharges }) => {

    const [open, setOpen] = useState(false);


    const [formValues, , handleInputChange] = useForm({
        nameText: "",
        amountText: ""
    })

    const { nameText, amountText } = formValues

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickAdd = () => {
        if (nameText !== "" && amountText !== "") {
            setFixedCharges(array =>
                [
                    ...array,
                    {
                        id: Date.now(),
                        name: nameText,
                        amount: amountText
                    }
                ]
            )
            setOpen(false);
        }
    }

    return (
        <div className="fixed-charges__main-container">
            <h6 className="d-flex m-auto">Costos fijos mensuales</h6>
            <div className="fixed-charges__fixed-charges">
                {
                    fixedCharges.map(fixedCharge => (
                        <div key={fixedCharge.id} className="fixed-charges__data">
                            <div>{fixedCharge.name}</div>
                            <div>{currencyFormatter(fixedCharge.amount)}</div>
                        </div>
                    ))
                }
            </div>
            <div className="fixed-charges__button">
                <Button variant="outlined" color="secondary" onClick={handleClickOpen}>✚</Button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agregar costo fijo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        En esta parte se agregan los costos fijos que tienen los creditos, como lo pueden ser seguros, gasto de manejo de cuenta, etc
                    </DialogContentText>
                    <FormControlMUI
                        key="nameText"
                        variant="filled"
                        name="nameText"
                        value={nameText}
                        text="Nombre"
                        handleInputChange={handleInputChange}
                        type="text"
                        adornament="💳"
                        fullWidth={true}
                    />
                    <FormControlMUI
                        key="amountText"
                        variant="filled"
                        name="amountText"
                        value={amountText}
                        text="Monto"
                        handleInputChange={handleInputChange}
                        type="number"
                        adornament="💰"
                        fullWidth={true}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClickAdd}>Agregar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

