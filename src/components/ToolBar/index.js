import React from 'react'
import settingActive from '../../assets/icon/setting-a.svg'
import setting from '../../assets/icon/setting.svg'
import './index.less'

const ThemePicker = ({ isDark, changeMode }) => (
    <div className="tool-picker">
        <span className="tool-title">主题</span>
        <button 
            className={isDark ? "tool-option" : "tool-option active"}
            onClick={() => changeMode(false)}
        >
            浅色
        </button>
        <button
            className={isDark ? "tool-option active" : "tool-option"}
            onClick={() => changeMode(true)}
        >
            深色
        </button>
    </div>
)

const FontSizePicker = () => (
    <div className="tool-picker">
        <span className="tool-title">字号</span>
        <button className="tool-option">A-</button>
        <span>16 </span>
        <button className="tool-option">A+</button>
    </div>
)

const BackGroundPicker = () => (
    <div className="tool-picker">
        <span className="tool-title">背景</span>
        <button className="tool-option active">默认</button>
        <button className="tool-option">自定义</button>
    </div>
)

function ToolBar(props) {
    const { 
        isDark, 
        changeMode, 
        showSetBox, 
        changeSettingStatus 
    } = props;

    return (
        <>
            <div className="tool-wrap">
                <img 
                    className='tool-icon'
                    alt='setting' 
                    src={showSetBox ? settingActive : setting}
                    onClick={changeSettingStatus}
                />
            </div>
            {showSetBox && 
            <div className="tool-box">
                <ThemePicker isDark={isDark} changeMode={changeMode}/>
                <FontSizePicker />
                <BackGroundPicker />
            </div>}
            {/* 遮罩 */}
            {showSetBox && <div className="inner" onClick={changeSettingStatus}></div>}
        </>
    )
}

export default ToolBar;