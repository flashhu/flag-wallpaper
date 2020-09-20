import React, { useState } from 'react';
import html2Canvas from 'html2canvas';
import ButtonBars from './components/ButtonBar';
import Flag from './components/Flag';
import ToolBar from './components/ToolBar';
import Message from './components/Message';
import { isIE, getEquipType, download } from './util'
import './style.less'

function App() {
  const [isDark, setIsDark ] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [msg, setMsg] = useState(null);
  const [mobileSave, setMobileSave] = useState('');

  const successMsgPC = { type: 'success', content: 'Flag立下是要拔的哦 ( • ̀ω•́ )✧' };
  const successMsgMB = { type: 'success', content: '趁它不注意长按保存图片收了它！' };
  const errorMsg = { type: 'error', content: '生成图片失败，请重试或更换浏览器 T^T' };

  // 设备类型
  const equipType = getEquipType();

  const changeMode = (e) => {
    setIsDark(e.target.checked);
  }

  const changeEditStatus = () => {
    setIsEdit(!isEdit);
  }

  const hideMsg = () => {
    setTimeout(() => {
      setMsg(null);
    }, 2500);
  }

  // 移动端图片预览遮罩
  const hideMask = () => {
    setTimeout(() => {
      setMobileSave('');
    }, 8000);
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

  return (
    <div className="app-wrap" plat={equipType}>
      {equipType === 'pc' && <h1>Flag壁纸生成器</h1>}
      {!!msg && <Message type={msg.type}>{msg.content}</Message>}
      <div id="wp" className='wp-wrap'>
        <ToolBar 
          isDark={isDark}
          changeMode={changeMode}
        />
        <Flag 
          isDark={isDark}
          isEdit={isEdit}
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
    </div>
  );
}

export default App;
