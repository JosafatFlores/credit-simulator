import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import { currencyFormatter } from '../../Helpers/currencyFormatter';

export const AmortizationTable = ({ amortizationData, totalPay, totalInterest, fixedCharges }) => {
    return (
        <div className="amortization__table">
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader >
                    <TableHead>
                        <TableRow>
                            <TableCell>No. Pago</TableCell>
                            <TableCell align="center">Saldo capital</TableCell>
                            <TableCell align="center">Pago</TableCell>
                            <TableCell align="center">Pago capital </TableCell>
                            <TableCell align="center">Abono a capital </TableCell>
                            <TableCell align="center">Pago interes</TableCell>
                            {
                                fixedCharges.map(fixedCharge => (
                                    <TableCell align="center">{fixedCharge.name}</TableCell>
                                ))
                            }
                            <TableCell align="center">Saldo capital final</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {amortizationData.map((row) => (
                            <TableRow
                                key={row.capitalBalanceFinal}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style={{ backgroundColor: Math.floor(((row.noPay - 1) / 12) + 1) % 2 === 0 && 'lightGray' }}
                            >
                                <TableCell>{`Año ${Math.floor(((row.noPay - 1) / 12) + 1)} pago ${row.noPay}`}</TableCell>
                                <TableCell align="center">{currencyFormatter(row.capitalBalance)}</TableCell>
                                <TableCell align="center">{currencyFormatter(row.amountPay)}</TableCell>
                                <TableCell align="center">{currencyFormatter(row.amountCapitalPay)}</TableCell>
                                <TableCell align="center">{currencyFormatter(row.capitalSubcription)}</TableCell>
                                <TableCell align="center">{currencyFormatter(row.interestPay)}</TableCell>
                                {
                                    fixedCharges.map(fixedCharge => (
                                        <TableCell align="center">{currencyFormatter(fixedCharge.amount)}</TableCell>
                                    ))
                                }
                                <TableCell align="center">{currencyFormatter(row.capitalBalanceFinal)}</TableCell>
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
                                    {currencyFormatter(totalPay)}
                                </TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">
                                    {currencyFormatter(totalInterest)}
                                </TableCell>
                                {
                                    fixedCharges.map(fixedCharge => (
                                        <TableCell align="center"></TableCell>
                                    ))
                                }

                                <TableCell align="center"></TableCell>
                            </>
                        }
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
}
