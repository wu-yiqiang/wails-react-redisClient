import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// import { resolve } from 'path'
//
// const pathResolve = (dir: string): string => {
//   return resolve(__dirname, '.', dir)
// }
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     '@': pathResolve('/src/')
  //     // components: pathResolve('src/components')
  //   }
  // },
})
