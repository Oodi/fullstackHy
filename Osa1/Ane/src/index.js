import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      points: Array.apply(null, Array(20)).map(Number.prototype.valueOf,0)
    }
  }

  asetaArvoon = (nimi, arvo) => {
    return () => {
   this.setState({ [nimi]: arvo})
    }
  }

  vote = (nimi, arvo) => {
    return () => {       
    const kopio = this.state.points
    kopio[nimi] +=1
    this.setState({ 'points': kopio})
    }
    }
  

  render() {
    return (
      <div>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <p>has {this.state.points[this.state.selected]} votes</p>
        <Button2 fun= {this.vote} name = "vote" state = {this.state} />
        <Button fun= {this.asetaArvoon} name = "next anecdote" type = "selected" state = {this.state} />

        <h1>anecdote with most votes:</h1>
        <p>{this.props.anecdotes[this.state.points.indexOf(Math.max(...this.state.points))]}</p>
        <p>has {this.state.points[this.state.points.indexOf(Math.max(...this.state.points))]} votes</p>
      </div>

    )
  }
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = (props) => {
    return (
        <button onClick={props.fun(props.type, Math.floor(Math.random() * anecdotes.length) + 0  )}>
              {props.name}
            </button>
    )
  }

  const Button2 = (props) => {
    return (
        <button onClick={props.fun(props.state.selected, props.state  )}>
              {props.name}
            </button>
    )
  }

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
