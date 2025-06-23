import './App.css'
import Buttons from './components/Buttons'
import Cards from './components/Cards'
import HeroSection from './components/Hero'

function App() {

  return (
    <div className='container'>
      <HeroSection />
      <Cards />
      <Buttons />
    </div>
  )
}

export default App
