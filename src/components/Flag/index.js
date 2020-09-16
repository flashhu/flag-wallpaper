import React from 'react'
import { FlagList, FlagForm } from './components'
import './index.less'

function Flag(props) {
    const { isDark, isEdit } = props;
    const mode = isDark ? 'dark' : 'light';

    return (
        <div className='flag-wrap'>
            {
                isEdit
                ? <FlagForm mode={mode}/>
                : <FlagList mode={mode}/>
            }
        </div>
    )
}

export default Flag;