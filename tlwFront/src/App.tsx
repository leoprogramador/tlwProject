import { MainRoutes } from './routes/mainRoutes'
import { Template } from './components/TemplateComponents'
import { Header } from './components/partials/Header'
import { Footer } from './components/partials/Footer'
import { ScrollToTop, ScrollToTopOnRefresh } from './components/ScrollToTop';
import './App.css'

function App() {

  return (
    <Template>
      <ScrollToTopOnRefresh />
      <ScrollToTop />
      <Header />
      <MainRoutes />
      <Footer />
    </Template>
  )
}

export default App
