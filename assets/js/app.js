import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './components/Navbar'
import CustomersPage from './pages/CustomersPage'
import HomePage from './pages/HomePage'
import { HashRouter, Switch, Route } from 'react-router-dom'

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css'
import InvoicesPage from './pages/InvoicesPage'

console.log('Hello Webpack Encore! Edit me in assets/js/app.js')

const App = () => {
  return (
    <HashRouter>
      <Navbar />

      <main className='container pt-5'>
        <Switch>
          <Route path="/invoices" component={InvoicesPage} />
          <Route path="/customers" component={CustomersPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
    </HashRouter>
  )
}

const rootElement = document.querySelector('#app')
ReactDOM.render(<App />, rootElement)
