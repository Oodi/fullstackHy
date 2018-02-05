import React from 'react'

const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit.bind(this)}>
          <div>
            nimi: <input value={props.newName}
            onChange={props.handlePersonChange.bind(this)}/>
          </div>
          <div>
            numero: <input value={props.newNumber}
            onChange={props.handleNumbernChange.bind(this)}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
  )
}

export default Form