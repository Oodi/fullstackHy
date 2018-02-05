import React from 'react'
import ReactDOM from 'react-dom'
import Kurssit from './components/kurssit'



const App = () => {
  return (
    <div>
      <Kurssit />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)