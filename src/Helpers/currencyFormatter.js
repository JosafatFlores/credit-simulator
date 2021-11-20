
export const currencyFormatter = (num) => {
    const number = num.toString()
    return '$' + number.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}