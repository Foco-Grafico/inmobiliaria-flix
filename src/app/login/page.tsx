import { LoginForm } from './components/login-form'

interface Props {
  searchParams: {
    error?: string
  }
}

export default function Login ({ searchParams }: Props) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <LoginForm error={searchParams.error} />
    </main>
  )
}
