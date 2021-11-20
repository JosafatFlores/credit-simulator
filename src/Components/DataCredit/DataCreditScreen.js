import React, { useEffect, useState } from 'react'
import { useForm } from '../../Hooks/useForm'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'

import { CreditInformation } from './CreditInformation'
import { AmortizationTable } from './AmortizationTable'
import { FixedCharges } from './FixedCharges';
import { currencyFormatter } from '../../Helpers/currencyFormatter';


export const DataCreditScreen = () => {

    const [amountPay, setAmountPay] = useState(0)
    const [amountCapitalPay, setAmountCapitalPay] = useState(0)
    const [interestMonthly, setInterestMonthly] = useState(0)
    const [periodMonthly, setPeriodMonthly] = useState(0)
    const [totalPay, setTotalPay] = useState(0)
    const [totalInterest, setTotalInterest] = useState(0)
    const [amortizationData, setAmortizationData] = useState([])
    const [fixedCharges, setFixedCharges] = useState([])


    useEffect(() => {
        calculateAmortization()
    }, [amountPay])

    const [formValues, , handleInputChange] = useForm({
        amountText: "",
        periodText: "",
        interestText: ""
    })

    const { amountText, periodText, interestText } = formValues

    const formControlArray = [{
        variant: "filled",
        name: "amountText",
        value: amountText,
        text: "Monto",
        handleInputChange: handleInputChange,
        type: "number",
        adornament: "$"
    },
    {
        variant: "filled",
        name: "periodText",
        value: periodText,
        text: "Plazo (Anual)",
        handleInputChange: handleInputChange,
        type: "number",
        adornament: "▓"
    },
    {
        variant: "filled",
        name: "interestText",
        value: interestText,
        text: "Interes anual",
        handleInputChange: handleInputChange,
        type: "number",
        adornament: "%"
    }]

    const handleCalculeteCredit = () => {
        if (amountText !== "" && periodText !== "" && interestText !== "") {
            const interestMonthlyTemp = (interestText / 12) / 100
            const periodMonthlyTemp = periodText * 12
            const amountCapitalPayTemp = (amountText * interestMonthlyTemp / (1 - 1 / Math.pow((1 + interestMonthlyTemp), periodMonthlyTemp))).toFixed(2)
            //R  =  A * i / (1 – 1 / (1 + i)^n)
            setAmountCapitalPay(amountCapitalPayTemp)

            let total = 0
            fixedCharges.map(fixedCharge => (
                total += Number(fixedCharge.amount)
            ))

            console.log('a1', amountPay)
            setAmountPay(Number((Number(amountCapitalPayTemp) + total).toFixed(2)))
            setInterestMonthly(interestMonthlyTemp)
            setPeriodMonthly(periodMonthlyTemp)

            
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Los datos de Monto, periodo e interes son necesarios',
                timer: 1000,
                showConfirmButton: false,
            })
        }
    }

    const calculateAmortization = () => {
        console.log('amoritzation')
        let totalPay = 0
        const paysArray = []
        for (let i = 0; i < periodMonthly; i++) {

            if (paysArray.length === 0) {
                const interestPay = (amountText * interestMonthly).toFixed(2)
                paysArray.push({
                    noPay: i + 1,
                    capitalBalance: Number(amountText),
                    amountPay: Number(amountPay),
                    amountCapitalPay: Number(amountCapitalPay),
                    interestPay: Number(interestPay),
                    capitalBalanceFinal: Number((Number(amountText) + Number(interestPay) - Number(amountCapitalPay)).toFixed(2))
                })
            } else {
                const lastPay = paysArray[paysArray.length - 1]
                const interestPay = (lastPay.capitalBalanceFinal * interestMonthly).toFixed(2)
                paysArray.push({
                    noPay: i + 1,
                    capitalBalance: lastPay.capitalBalanceFinal,
                    amountPay: Number(amountPay),
                    amountCapitalPay: Number(amountCapitalPay),
                    interestPay: Number(interestPay),
                    capitalBalanceFinal: Number((lastPay.capitalBalanceFinal + Number(interestPay) - Number(amountCapitalPay)).toFixed(2))
                })
            }
        }
        setAmortizationData(paysArray)
        setTotalPay(Number(totalPay.toFixed(2)))
        setTotalInterest(Number((totalPay - amountText).toFixed(2)))

    }

    return (
        <>
            <div className="credit__information">
                <CreditInformation
                    formControlArray={formControlArray}
                />
            </div>
            <div className="credit__fixed-charges">
                <FixedCharges fixedCharges={fixedCharges} setFixedCharges={setFixedCharges} />
            </div>
            <div
                className="w-75 m-auto mt-2 d-flex justify-content-center"
            >
                <p>Pago mensual: {amountPay}</p>
            </div>
            <Button
                className="d-flex m-auto justify-content-end"
                variant="outlined"
                size="medium"
                color="success"
                onClick={handleCalculeteCredit}
            >
                Calcular
            </Button>
            <AmortizationTable
                amortizationData={amortizationData}
                totalPay={totalPay}
                totalInterest={totalInterest}
                fixedCharges={fixedCharges}
            />
        </>
    )
}
