import React from 'react';
import './index.less'

function Message({children, type}) {
    return (
        <div className="msg-wrapper" type={type}>
            {children}
        </div>
    )
}

export default React.memo(Message);