import React from 'react'

function FlagList(props) {
    const { data } = props;

    return (
        <div className="list-wrap">
            <div>
            {data.map((item, index) => (
                <p key={index}>{item}</p>
            ))}
            </div>
        </div>
    )
}

export default React.memo(FlagList)