// import { server } from '@/utils/server'
// import { Finance } from '@/app/entities/finance'
// import { t } from 'elysia'

// const finance = new Finance()
// export const updateFinance = server.put(
//   '/finance/:id',
//   async ({ params, body, status }) => {
//     const { id } = params
//     const { description, type, value } = body

//     if (!id) {
//       return status(400, 'ID é obrigatório')
//     }
//     const typeValue = await new Promise<string>((resolve, reject) => {
//       switch (type) {
//         case 'e':
//           resolve('entrada')
//           break
//         case 'entrada':
//           resolve('entrada')
//           break
//         case 's':
//           resolve('saida')
//           break
//         case 'saida':
//           resolve('saida')
//           break
//         default:
//           reject(new Error('Invalid type'))
//       }
//     })

//     if ((value ?? 0) < 0) {
//       return status(400, 'Números invalidos')
//     }

//     const financeData = await finance.updateFinance({
//       id,
//       description: description ?? '',
//       type: typeValue,
//       value: value ?? 0,
//     })

//     if (!financeData) {
//       return status(400, 'Erro ao atualizar os dados')
//     }

//     return status(200, financeData.message)
//   },
//   {
//     params: t.Object({
//       id: t.String(),
//     }),
//     body: t.Object({
//       description: t.Optional(t.String()),
//       type: t.String(),
//       value: t.Optional(t.Number()),
//     }),
//     response: {
//       200: t.String(),
//       400: t.String(),
//     },
//   }
// )
