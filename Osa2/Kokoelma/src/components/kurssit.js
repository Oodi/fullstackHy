import React from 'react'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
  const osatGen =  () => props.kurssi.osat.map((osa, id) => <Osa key={id} osa={osa.nimi} tehtavia = {osa.tehtavia} />) 
  return(
    <div>
      {osatGen()}
    </div>
  )
}
const Yhteensa = (props) => {


  return(
    <p>yhteensä {props.kurssi.osat.reduce((accumulator, currentValue) => accumulator + currentValue.tehtavia, 0)} tehtävää</p>
  )
}

const Kurssi = (props) => {
    return(
    <div>
      <Otsikko kurssi={props.kurssi}/>
      <Sisalto kurssi={props.kurssi} />
      <Yhteensa kurssi={props.kurssi}  />
    </div>
    )
}


const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

  const Kurssit = () => {
    const kurssitGen = () => kurssit.map((kurssi, id) => <Kurssi key= {id} kurssi={kurssi} />)  

    return (
      <div>
        {kurssitGen()}
      </div>
    )
  }

  export default Kurssit