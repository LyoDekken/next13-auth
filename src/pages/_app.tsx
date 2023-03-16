import 'tailwindcss/tailwind.css'

import { AuthProvider } from '../contexts/Auth'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp