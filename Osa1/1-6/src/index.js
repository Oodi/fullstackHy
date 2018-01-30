import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14
          }
        ]
      }

  return (
    <div>
      <Otsikko kurssi= {kurssi.nimi} />
      <Sisalto osat = {kurssi.osat}  />
      <Yhteensa osat = {kurssi.osat}  />
    </div>
  )
}

 const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    )
  }

 const Sisalto = (props) => {
    return (
      <div>
        <Osa name ={props.osat[0].nimi} teht={props.osat[0].tehtavia}/>
        <Osa name ={props.osat[1].nimi} teht={props.osat[1].tehtavia}/>
        <Osa name ={props.osat[2].nimi} teht={props.osat[2].tehtavia}/>
      </div>
    )
  }

 const Osa = (props) => {
    return (
        <p>{props.name} {props.teht}</p>
    )
  }

 const Yhteensa = (props) => {
    return (
        <p>yhteensä {props.osat[0].tehtavia + props.osat[1].tehtavia 
        + props.osat[2].tehtavia} tehtävää</p>
    )
  }
  

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
