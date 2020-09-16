import React from 'react'

function FlagList(props) {
    const { data } = props;

    return (
        <div 
            className="list-wrap"
        >
            {data.map((item, index) => (
                <p key={index}>{item}</p>
            ))}
        </div>
    )
}

export default FlagList