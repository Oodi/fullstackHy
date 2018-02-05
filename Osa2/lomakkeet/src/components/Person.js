import React from 'react'

const Person = ({ person, del }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
      <button onClick={() => {del(person)}}>poista</button>
        </td>
    </tr>
  )
}

export default Person