import React from 'react';


class App extends React.Component {
  addNote = (event) => {
    event.preventDefault()
    this.props.store.dispatch(
      {
        type: 'NEWANE',
        data: {
          content: event.target.ane.value,
          id: (Math.random() * 1000000).toFixed(0),
          votes: 0
        }
      }
    )
    event.target.ane.value = ''
}


  render() {
    const anecdotes = this.props.store.getState()
    const klik = (id) => () => {
      this.props.store.dispatch({type: 'VOTE', data: {id}})
     }



    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button key={anecdote.id} onClick={klik(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addNote}>
          <div><input name="ane"/></div>
          <button >create</button> 
        </form>
      </div>
    )
  }
}

export default App