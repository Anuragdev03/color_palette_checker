import './App.css'
import Buttons from './components/Buttons'
import Cards from './components/Cards'
import ContrastChecker from './components/ContrastChecker'
import HeroSection from './components/Hero'

function App() {

  return (
    <div className='container'>
      <HeroSection />
      <Cards />
      <Buttons />
      <ContrastChecker />
    </div>
  )
}

export default App
