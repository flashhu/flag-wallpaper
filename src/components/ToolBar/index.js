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
                    key={item.type}
                    className={fonSize === item.type ? "tool-option active" : "tool-option"}
                    onClick={() => changeFonSize(item.type)}
                >
                    {item.name}
                </button>
            ))}
        </div>
    )
}

const BackGroundPicker = ({ image, getDefaultBg, customizeBg }) => (
    <div className="tool-picker">
        <span className="tool-title">背景</span>
        <button 
            className={!!image ? "tool-option" :"tool-option active"}
            onClick={() => getDefaultBg()}
        >
            默认
        </button>
        <button 
            className={!!image ? "tool-option active" : "tool-option"}
            onClick={() => { document.getElementById('tool-bg-input').click() }}
        >
            自选
        </button>
        <input
            id="tool-bg-input"
            style={{display: 'none'}}
            type='file'
            accept="image/jpg, image/jpeg, image/png"
            onChange={customizeBg.bind(this)}
        />
    </div>
)

const BoxBgPicker = ({ boxBg, changeBoxBg }) => {
    const boxBgType = [
        { name: '无底', type: 'default' },
        { name: '窄边', type: 'narrow' },
        { name: '宽边', type: 'wide' }
    ]
    return (<div className="tool-picker">
        <span className="tool-title">底色</span>
        {boxBgType.map(item => (
            <button
                key={item.type}
                className={boxBg === item.type ? "tool-option active" : "tool-option"}
                onClick={() => changeBoxBg(item.type)}
            >
                {item.name}
            </button>
        ))}
    </div>)
}

function ToolBar(props) {
    const { 
        isDark, 
        changeMode, 
        showSetBox, 
        changeSettingStatus,
        fonSize, 
        changeFonSize,
        customizeBg,
        getDefaultBg,
        image,
        boxBg,
        changeBoxBg
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
                <ThemePicker isDark={isDark} changeMode={changeMode} />
                <FontSizePicker fonSize={fonSize} changeFonSize={changeFonSize} />
                <BackGroundPicker image={image} getDefaultBg={getDefaultBg} customizeBg={customizeBg} />
                <BoxBgPicker boxBg={boxBg} changeBoxBg={changeBoxBg} />
            </div>}
            {/* 遮罩 */}
            {showSetBox && <div className="inner" onClick={changeSettingStatus}></div>}
        </>
    )
}

export default ToolBar;