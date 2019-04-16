import React from 'react'

const Place = ({ place }) => {
    return (
        <li key={place.id}>
            {place.title}
        </li>
    )
}

export default Place