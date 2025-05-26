interface Finance {
  entrada?: number | null
  saida?: number | null
}
export function calcEntradas(finance: Finance[]) {
  if (!finance) {
    return false
  }

  const financeCalcEntradas = finance.reduce(
    (total, item) => {
      return {
        entrada: (total.entrada ?? 0) + (item.entrada ?? 0),
        saida: (total.saida ?? 0) + (item.saida ?? 0),
      }
    },
    { entrada: 0, saida: 0 }
  )

  if (!financeCalcEntradas) {
    return false
  }

  return {
    entrada: financeCalcEntradas.entrada,
    saida: financeCalcEntradas.saida,
  }
}
