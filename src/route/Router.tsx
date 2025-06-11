import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import Body from '../components/Body'
import Body2 from '../components/Body2'
import Traveldiary from '../components/TravelDiary'
import Login from '../Log/Login'
import Signup from '../Log/Signup'

// Header가 있는 레이아웃
const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Header가 있는 페이지들 */}
        <Route path="/" element={<Layout><Body/><Body2/></Layout>} />
        <Route path="/traveldiary" element={<Layout><Traveldiary/></Layout>}/>
        
        
        {/* Header가 없는 페이지들 */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter