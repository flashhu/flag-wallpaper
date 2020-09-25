import React, { useState } from 'react'
import { FlagList, FlagForm } from './components'
import './index.less'

function Flag(props) {
    const initialContent = ['🚩 14天习惯养成计划', '🏆 吃大餐！', '1. 早睡早起~', '2. 运动半小时✧']
    const { isDark, isEdit, fonSize, boxBg } = props;
    const [content, setContent] = useState(initialContent);
    const mode = isDark ? 'dark' : 'light';

    const changeContent = (value) => {
        setContent(value)
    }

    return (
        <div 
            id='flag'
            className='flag-wrap' 
            mode={mode}
            fonsize={fonSize}
            boxbg={boxBg}
        >
            <div id='flag-bg' className='flag-bg'></div>
            {
                isEdit
                ? <FlagForm
                      initialContent={content} 
                      changeContent={changeContent}
                  />
                : <FlagList data={content}/>
            }
        </div>
    )
}

export default Flag;