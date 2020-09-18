import React, { useState } from 'react';
import html2Canvas from 'html2canvas';
import ButtonBars from './components/ButtonBar';
import Flag from './components/Flag';
import ToolBar from './components/ToolBar';
import Message from './components/Message';
import { isWxOrQq, isIE, getEquipType, download } from './util'
import './style.less'

function App() {
  const [isDark, setIsDark ] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [msg, setMsg] = useState(null);
  const [mobileSave, setMobileSave] = useState('');

  const successMsgPC = { type: 'success', content: 'Flag立下是要拔的哦 ( • ̀ω•́ )✧' };
  const successMsgMB = { type: 'success', content: '趁它不注意点击图片收了它！' };
  const errorMsg = { type: 'error', content: '生成图片失败，请重试或更换浏览器 T^T' };

  // 如通过微信或QQ打开网页，需要选择通过浏览器打开
  // const showTipBox = isWxOrQq();
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
    }, 15000);
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

    setTimeout(() => {
      html2Canvas(flag).then((canvas) => {
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
    <div className="app-wrap">
      {equipType === 'pc' && <h1>Flag壁纸生成器</h1>}
      {!!msg && <Message type={msg.type}>{msg.content}</Message>}
      <div id="wp" className='wp-wrap'>
        {/* {showTipBox &&
          <div className="tip-wrap">
            <div className="tip-box">请点击右上角选择 “浏览器中打开”</div>
          </div>} */}
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
