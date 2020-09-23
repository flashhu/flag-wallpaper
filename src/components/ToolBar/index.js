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

const FontSizePicker = ({ fonSize, changeFonSize }) => {
    const sizeType = [
        { name: '小号', type: 'small'},
        { name: '中号', type: 'medium' },
        { name: '大号', type: 'big' },
        { name: '特大', type: 'huge' }
    ];
    return(
        <div className="tool-picker">
            <span className="tool-title">字号</span>
            {sizeType.map(item => (
                <button
                    className={fonSize === item.type ? "tool-option active" : "tool-option"}
                    onClick={() => changeFonSize(item.type)}
                >
                    {item.name}
                </button>
            ))}
        </div>
    )
}

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
        changeSettingStatus,
        fonSize, 
        changeFonSize
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
                <FontSizePicker fonSize={fonSize} changeFonSize={changeFonSize}/>
                <BackGroundPicker />
            </div>}
            {/* 遮罩 */}
            {showSetBox && <div className="inner" onClick={changeSettingStatus}></div>}
        </>
    )
}

export default ToolBar;