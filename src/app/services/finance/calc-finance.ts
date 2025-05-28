interface Finance {
  type: string
  value: number
}
export function calcFinance(finance: Finance[]) {
  if (!finance) {
    return false
  }

  const financeCalcEntradas = finance.reduce(
    (acc, curr) => {
      if (curr.type === 'entrada') {
        acc.value += curr.value
      }
      return acc
    },
    { value: 0 }
  )

  const financeCalcSaidas = finance.reduce(
    (acc, curr) => {
      if (curr.type === 'saida') {
        acc.value += curr.value
      }
      return acc
    },
    { value: 0 }
  )

  if (!financeCalcEntradas && !financeCalcSaidas) {
    return false
  }

  return {
    entrada: financeCalcEntradas.value,
    saida: financeCalcSaidas.value,
  }
}
