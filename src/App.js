import React, { useState, useEffect } from 'react';
import ButtonBars from './components/ButtonBar';
import Flag from './components/Flag';
import ToolBar from './components/ToolBar';
import './style.less'

function App() {
  const [isDark, setIsDark ] = useState(false);
  const [isEdit, setIsEdit] = useState(true);

  useEffect(()=>{
    // 设备像素可见宽
    const screenWidth = document.documentElement.clientWidth;
    // 非网页
    if (screenWidth <= 768) {
      // 取壁纸框离顶部的高度
      const wp = document.getElementsByClassName('wp-wrap')[0]
      const initialHeight = wp.offsetHeight;
      window.scrollTo(0, initialHeight);
    }
  }, [])

  const changeMode = (e) => {
    setIsDark(e.target.checked);
  }

  const changeEditStatus = () => {
    setIsEdit(!isEdit);
  }

  const downloadPic = () => {
    setIsEdit(false);
    console.log('download');
  }

  return (
    <div className="app-wrap">
      <h1>Flag壁纸生成器</h1>
      <div id="wp" className={isDark ? 'wp-wrap dark' : 'wp-wrap light'}>
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
