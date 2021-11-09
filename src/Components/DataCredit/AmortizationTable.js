import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';

export const AmortizationTable = ({ amortizationData, totalPay, totalInterest }) => {

    return (
        <div className="w-75 m-auto mt-3">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No. Pago</TableCell>
                            <TableCell align="center">Saldo capital</TableCell>
                            <TableCell align="center">Monto pago</TableCell>
                            <TableCell align="center">Pago interes</TableCell>
                            <TableCell align="center">Saldo capital final</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {amortizationData.map((row) => (
                            <TableRow

                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.noPay}</TableCell>
                                <TableCell align="center">{currencyFormater(row.capitalBalance)}</TableCell>
                                <TableCell align="center">{currencyFormater(row.amountPay)}</TableCell>
                                <TableCell align="center">{currencyFormater(row.interestPay)}</TableCell>
                                <TableCell align="center">{currencyFormater(row.capitalBalanceFinal)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className="bg-secondary  bg-opacity-10">
                        {
                            (amortizationData.length !== 0)
                            && <>
                                <TableCell>Total</TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">
                                    {currencyFormater(totalPay)}
                                </TableCell>
                                <TableCell align="center">
                                    {currencyFormater(totalInterest)}
                                </TableCell>
                                <TableCell align="center"></TableCell>
                            </>
                        }
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
}

const currencyFormater = (num) => {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}