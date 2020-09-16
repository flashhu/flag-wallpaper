import React from 'react'
import Toggle from 'react-toggle'
import moon from '../../assets/icon/moon.png'
import sun from '../../assets/icon/sun.png'
import 'react-toggle/style.css'
import './index.less'

function ToolBar(props) {
    const { isDark, changeMode } = props

    return (
        <div className="tool-wrap">
            <Toggle
                defaultChecked={isDark}
                onChange={changeMode} 
                icons={{
                    checked: <img src={moon} className='toggle-item' alt='moon' />,
                    unchecked: <img src={sun} className='toggle-item' alt='sun' />,
                }}
            />
        </div>
    )
}

export default ToolBar;