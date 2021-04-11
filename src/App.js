import React, { useState } from 'react';
import html2Canvas from 'html2canvas';
import { ButtonBars, ToolBar, Message, FlagForm, FlagList} from './components';
import { isIE, getEquipType, download } from './util'
import './style.less'

function App() {
  const successMsgPC = { type: 'success', content: 'Flag立下是要拔的哦 ( • ̀ω•́ )✧' };
  const successMsgMB = { type: 'success', content: '长按保存或截屏一下吧~' };
  const errorMsg = { type: 'error', content: '生成图片失败，请重试或更换浏览器 T^T' };
  const initialContent = ['🚩 14天习惯养成计划', '🏆 吃大餐！', '1. 早睡早起~', '2. 运动半小时✧'];

  const [isDark, setIsDark ] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [msg, setMsg] = useState(null);
  const [mobileSave, setMobileSave] = useState('');
  const [showSetBox, setShowSetBox] = useState(false);
  const [fonSize, setFonSize] = useState('small');
  const [isDfImage, setIsDfImage] = useState(true);
  const [boxBg, setBoxBg] = useState('default');
  const [content, setContent] = useState(initialContent);

  // 设备类型
  const equipType = getEquipType();

  const changeMode = (mode) => {
    setIsEdit(false);
    setIsDark(mode);
  }

  const changeEditStatus = () => {
    setIsEdit(!isEdit);
  }

  const changeSettingStatus = () => {
    setShowSetBox(!showSetBox);
  }

  const changeFonSize = (type) => {
    setIsEdit(false);
    setFonSize(type);
  }

  const changeBoxBg = (type) => {
    setIsEdit(false);
    setBoxBg(type);
  }

  const changeContent = (value) => {
    setContent(value)
  }

  const getDefaultBg = () => {
    const box = document.getElementById('flag-bg');
    box.style.backgroundImage = '';
    setIsDfImage(true);
  }

  const customizeBg = (e) => {
    setIsEdit(false);
    const reader = new FileReader();
    reader.onload = () => {
      const box = document.getElementById('flag-bg');
      box.style.backgroundImage = `url(${reader.result})`;
      box.style.backgroundSize = 'cover';
      box.style.backgroundPosition = 'center';
      setIsDfImage(false);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  const hideMsg = () => {
    setTimeout(() => {
      setMsg(null);
    }, 1500);
  }

  // 移动端图片预览遮罩
  const hideMask = () => {
    setTimeout(() => {
      setMobileSave('');
    }, 5000);
  }

  const downloadPic = (dataUrl) => {
    if (equipType === 'mobile') {
      setMobileSave(dataUrl);
      setMsg(successMsgMB);
      hideMask();
    }
    if (equipType === 'pc') {
      const isInIE = isIE();
      if (isInIE) {
        download.byBlob(dataUrl);
      } else {
        download.byBase64(dataUrl);
      }
      setMsg(successMsgPC);
    }
  }

  const handleClickSave = () => {
    setIsEdit(false);
    const flag = document.getElementById('flag');
    const y = equipType === 'pc' ? flag.getBoundingClientRect().top : document.documentElement.scrollTop || document.body.scrollTop;

    setTimeout(() => {
      html2Canvas(flag, {
        height: flag.clientHeight,
        width: flag.clientWidth,
        windowWidth: document.body.scrollWidth,
        windowHeight: document.body.scrollHeight,
        y: y
      }).then((canvas) => {
        const dataUrl = canvas.toDataURL('image/jpeg', 1);
        downloadPic(dataUrl);
        hideMsg();
      }).catch(() => {
        setMsg(errorMsg);
        hideMsg();
      });
    }, 1000);
  }

  const getError = () => {
    throw new Error('test')
  }

  return (
    <div className="app-wrap" plat={equipType}>
      {equipType === 'pc' && <h1>Flag壁纸生成器</h1>}
      {!!msg && <Message type={msg.type}>{msg.content}</Message>}
      <div id="wp" className='wp-wrap'>
        <div
          id='flag'
          className='flag-wrap'
          mode={isDark ? 'dark' : 'light'}
          fonsize={fonSize}
          boxbg={boxBg}
        >
          <div id='flag-bg' className='flag-bg'></div>
          {
            isEdit
              ? <FlagForm
                plat={equipType}
                initialContent={content}
                changeContent={changeContent}
              />
              : <FlagList data={content} />
          }
        </div>
        <ToolBar
          isDark={isDark}
          changeMode={changeMode}
          showSetBox={showSetBox}
          changeSettingStatus={changeSettingStatus}
          fonSize={fonSize}
          changeFonSize={changeFonSize}
          isDfImage={isDfImage}
          getDefaultBg={getDefaultBg}
          customizeBg={customizeBg}
          boxBg={boxBg}
          changeBoxBg={changeBoxBg}
        />
        <ButtonBars 
          isEdit={isEdit}
          changeEditStatus={changeEditStatus}
          downloadPic={handleClickSave}
        />
        {mobileSave && 
          <img 
            alt='flag-pic' 
            src={mobileSave} 
            style={{height: '100%', position: 'absolute', top: 0}}
          />}
      </div>
      <button onClick={getError}>error</button>
    </div>
  );
}

export default App;
