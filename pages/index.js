import { Login } from '../components/Login';
import { app, auth } from '../config/firebase'

export default function Home() {
  const authenticatedUser = auth().currentUser

  return <Login />
}