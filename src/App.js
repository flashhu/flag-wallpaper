import React, { useState, useEffect } from 'react';
import html2Canvas from 'html2canvas';
import ButtonBars from './components/ButtonBar';
import Flag from './components/Flag';
import ToolBar from './components/ToolBar';
import Message from './components/Message';
import { easeout, isWxOrQq } from './util'
import './style.less'

function App() {
  const [isDark, setIsDark ] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [msg, setMsg] = useState(null);

  const successMsg = { type: 'success', content: 'Flag立下是要拔的哦 ( • ̀ω•́ )✧' };
  const errorMsg = { type: 'error', content: '生成图片失败，请重试 T^T' };

  // 如通过微信或QQ打开网页，需要选择通过浏览器打开
  const showTipBox = isWxOrQq();

  useEffect(()=>{
    // 设备像素可见宽
    const screenWidth = document.documentElement.clientWidth;
    // 非网页
    if (screenWidth <= 850) {
      // 取壁纸框离顶部的高度
      const wp = document.getElementsByClassName('wp-wrap')[0]
      const initialHeight = wp.offsetHeight;
      easeout(0, initialHeight, 8, (value) => {
        window.scrollTo(0, value);
      })
    }
  }, [])

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

  const downloadPic = () => {
    setIsEdit(false);
    const flag = document.getElementById('flag');

    setTimeout(() => {
      html2Canvas(flag).then((canvas) => {
        const dataUrl = canvas.toDataURL('image/jpeg', 1);
        const link = document.createElement('a');
        link.download = `flag.jpeg`;
        link.href = dataUrl;
        link.click();
        setMsg(successMsg);
        hideMsg();
      }).catch(() => {
        setMsg(errorMsg);
        hideMsg();
      });
    }, 1000);

  }

  return (
    <div className="app-wrap">
      <h1>Flag壁纸生成器</h1>
      {!!msg && <Message type={msg.type}>{msg.content}</Message>}
      <div id="wp" className='wp-wrap'>
        {showTipBox &&
          <div className="tip-wrap">
            <div className="tip-box">请点击右上角选择 “浏览器中打开”</div>
          </div>}
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
          downloadPic={downloadPic}
        />
      </div>
    </div>
  );
}

export default App;
