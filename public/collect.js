window.onload = function () {
  const SERVER_URL = 'https://www.hujingo.top/flag-server/api/avatar.jpg';
  const logInfo = {};

  // 1. 收集用户信息
  logInfo.type = device.type; // 设备类型
  logInfo.orientation = device.orientation; // 屏幕方向
  logInfo.os = device.os; // 操作系统

  // window
  if (window && window.screen) {
    logInfo.sh = window.screen.height || 0; // 屏幕高度
    logInfo.sw = window.screen.width || 0; // 屏幕宽度
  }

  // 2. 收集页面加载时间
  let timing = performance.timing, start = timing.navigationStart;
  logInfo.firstPaintTime = timing.responseStart - start || 0;
  logInfo.domRenderTime = timing.domContentLoadedEventEnd - start || 0;
  logInfo.loadTime = (timing.loadEventEnd - start < 0) ? timing.loadEventStart - start : timing.loadEventEnd - start;

  // 拼接参数
  let args = '';
  for (let i in logInfo) {
    if (args !== '') {
      args += '&';
    }
    args += `${i}=${logInfo[i]}`
  }

  // 通过伪装成 Image 对象，传递给后端
  let img = new Image(1, 1);
  let src = `${SERVER_URL}?${args}`;
  img.src = src;
};

/**
 * @param {*} msg 错误信息
 * @param {*} url 发生错误的脚本URL
 * @param {*} lineno 发生错误的行号
 * @param {*} colno 发生错误的列号
 * @param {*} error 错误对象
 */
window.onerror = function (msg, url, lineno, colno, error) {
  const SERVER_URL = 'https://www.hujingo.top/flag-server/api/error.jpg';
  const defaults = {
    msg: '',  // 错误的具体信息
    url: '',  // 错误所在的url
    lineno: '', // 错误所在的行
    colno: ''  // 错误所在的列
  };

  defaults.url = url;
  defaults.lineno = lineno;
  defaults.colno = colno || (window.event && window.event.errorCharacter) || 0;

  if (error && error.stack) {
    // 如果浏览器有堆栈信息，直接使用
    defaults.msg = error.stack.toString();

  } else if (arguments.callee) {
    // 尝试通过callee拿堆栈信息
    let ext = [];
    let fn = arguments.callee.caller;
    let floor = 3;
    while (fn && (--floor > 0)) {
      ext.push(fn.toString());
      if (fn === fn.caller) {
        break;
      }
      fn = fn.caller;
    }
    ext = ext.join(",");
    defaults.msg = error.stack.toString();
  }

  // 拼接参数
  let args = '';
  for (let i in defaults) {
    if (args !== '') {
      args += '&';
    }
    args += `${i}=${defaults[i]}`
  }

  // 通过伪装成 Image 对象，传递给后端
  let img = new Image(1, 1);
  let src = `${SERVER_URL}?${args}`;
  img.src = src;
}