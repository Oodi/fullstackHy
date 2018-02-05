import React from 'react';
import Person from './components/Person'
import Form from './components/Form'
import Notification from './components/Notification'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber:'',
      error: null
    }
  }

  componentDidMount() {
    personService.getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }
  
  addPerson = (event) => {
      event.preventDefault()
      if (this.state.persons.some(e => e.name === this.state.newName)) {
        const persons = this.state.persons
        if (window.confirm("korvataanko " + this.state.newName)) { 
         const per =  this.state.persons.find( vendor => vendor.name === this.state.newName );
          const index = persons.indexOf(per)
          per.number = this.state.newNumber
          personService.update(per.id, per).then(response => {
            persons[index].number = this.state.newNumber  
            this.setState({
              persons,
              newName: '',
              newNumber:'',
              error: 'Päivitettiin ' + per.name
            })
          }).catch(error => {
            personService.create(per).then(response => {
              this.setState({
                persons: this.state.persons.concat(response.data),
                newName: '',
                newNumber:'',
                error: 'Päivitettiin ' + per.name
              })
            })
          })
          
        } else {
          this.setState({
            persons,
            newName: '',
            newNumber:''
          })
        }
        
       
        
      } else {
        const personObject = {
          name: this.state.newName,
          number: this.state.newNumber,
        }
      
        personService.create(personObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNumber:'',
            error: 'Lisättiin ' + personObject.name
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 5000)
        })
      }


}

    deletePer = (person) => {
      if (window.confirm("poistetaanko " + person.name)) { 
      personService.del(person.id).then(response => {
        const apu = this.state.persons
        apu.splice(this.state.persons.indexOf(person), 1)
        this.setState({
          persons: apu,
          newName: '',
          newNumber:'',
          error: 'Poistettiin ' + person.name
        })
        setTimeout(() => {
          this.setState({error: null})
        }, 5000)
      })
    }
    }
  

  handlePersonChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }


  

  render() {
    return (
      <div>
        <Notification message={this.state.error}/>
        <h2>Puhelinluettelo</h2>
        <Form onSubmit ={this.addPerson} newName= {this.state.newName} newNumber= {this.state.newNumber}  handlePersonChange = {this.handlePersonChange} handleNumbernChange = {this.handleNumberChange} />
        <h2>Numerot</h2>
        <table>
          <tbody>
          {this.state.persons.map(person => <Person key={person.name} person={person} 
          del= {this.deletePer} />)}
          </tbody>
        </table>
      </div>
    )
  }

}
export default App
