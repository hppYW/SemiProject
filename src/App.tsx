import './App.css'
import Router from './route/Router'
import { AuthProvider } from './Auth/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>    
  )
}

export default App
