import React, { useState, useEffect } from 'react';
import ButtonBars from './components/ButtonBar';
import FlagList from './components/FlagList';
import ToolBar from './components/ToolBar';
import './style.less'

function App() {
  const [isDark, setIsDark ] = useState(false)

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

  return (
    <div className="app-wrap">
      <h1>Flag壁纸生成器</h1>
      <div id="wp" className={isDark ? 'wp-wrap dark' : 'wp-wrap light'}>
        <ToolBar 
          isDark={isDark}
          changeMode={changeMode}
        />
        <FlagList 
          isDark={isDark}
          className="test"
        />
        <ButtonBars />
      </div>
    </div>
  );
}

export default App;
