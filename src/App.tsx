import './App.css'
import Router from './route/router'
import Header from './components/Header'
import Body from './components/Body'

const App: React.FC = () => {
  return (
    <div>
      <Header/>
      <Body/>
    </div>    
  )
}

export default App
