import React, { useState, useEffect } from 'react';
import ButtonBars from './components/ButtonBar';
import List from './components/List';
import ToolBar from './components/ToolBar';
import './style.less'

function App() {
  const [isDark, setIsDark ] = useState(true)

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

  return (
    <div className="app-wrap">
      <h1>Flag壁纸生成器</h1>
      <div id="wp" className={isDark ? 'wp-wrap dark' : 'wp-wrap light'}>
        <ToolBar />
        <List />
        <ButtonBars />
      </div>
    </div>
  );
}

export default App;
