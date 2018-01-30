import React from 'react'
import ReactDOM from 'react-dom'

class Test extends React.Component {
    constructor() {
      super()
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0,
        ka: 0,
        pro: 0 
      }
    }
    
      asetaArvoon = (nimi, arvo, state) => {
        return () => {
        state[nimi] = arvo
        state.ka = (state.hyva - state.huono) / (state.hyva + state.neutraali + state.huono)
        state.pro = (state.hyva / (state.hyva + state.neutraali + state.huono)) * 100
        this.setState({ [nimi]: arvo})
        }
      }

     
    
      render() {
        return (
          <div>
            <Otsikko otsikko = "anna palautetta"/>            
            <div>
              <Button type = 'hyva' fun = {this.asetaArvoon} state = {this.state} />
              <Button type = 'neutraali' fun = {this.asetaArvoon} state = {this.state} />
              <Button type = 'huono' fun = {this.asetaArvoon} state = {this.state} />             
            </div>
            <Statistics state= {this.state} ka = {this.ka}/>
          </div>
        )
      }
}

 const Otsikko = (props) => {
    return (
        <h1>{props.otsikko}</h1>
    )
  }

  const Button = (props) => {
    return (
        <button onClick={props.fun(props.type, props.state[props.type] + 1, props.state)}>
              {props.type}
            </button>
    )
  }

 const Statistics = (props) => {
    if (props.state.hyva + props.state.neutraali + props.state.huono  === 0) {
        return (
          <div>
            <em>ei yhtään palautetta annettu</em>
          </div>
        )
      }
    return (
      <div>
        <Otsikko otsikko = "Statistiikka"/> 
        <table>
            <tbody>
                <Static name = 'hyvä' value={props.state.hyva} />
                <Static name = 'neutraali' value={props.state.neutraali} />
                <Static name = 'huono' value={props.state.huono} />
                <Static name = 'keskiarvo' value={props.state.ka} />
                <Static name = 'positiivisia' value={props.state.pro + " %"} />
            </tbody>
        </table>
      </div>
    )
  }

 const Static = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.value}</td>
        </tr>
    )
  }


 
ReactDOM.render(
  <Test />,
  document.getElementById('root')
)
