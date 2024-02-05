// import { createMachine } from 'xstate';

// export const weatherMachine = createMachine({
//   id: 'weather',
//   initial: 'idle',
//   context: {
//     data: null,
//     error: null
//   },
//   states: {
//     idle: {
//       on: {
//         FETCH: 'loading'
//       }
//     },
//     loading: {
//       invoke: {
//         src: 'fetchData',
//         onDone: {
//           target: 'success',
//           actions: 'setData'
//         },
//         onError: {
//           target: 'failure',
//           actions: 'setError'
//         }
//       }
//     },
//     success: {
//       on: {
//         FETCH: 'loading'
//       }
//     },
//     failure: {
//       on: {
//         FETCH: 'loading'
//       }
//     }
//   }
// });