// 缓动
export const easeout = (start = 0, end = 0, rate = 3, callback) => {
    if (start === end || typeof start !== 'number') {
        return;
    }

    const step = () => {
        start = start + (end - start) / rate;

        if (Math.abs(start - end) < 1) {
            callback(end, true);
            return;
        }
        callback(start, false);
        requestAnimationFrame(step);
    }

    step();
} 

// 判断是否用 IE 打开
export const isIE = () => {
    const ua = navigator.userAgent; //取得浏览器的userAgent字符串  
    const isIE9 = ua.indexOf("compatible") > -1 && ua.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    const isEdge = ua.indexOf("Edge") > -1 && !isIE9; //判断是否IE的Edge浏览器  
    const isIE11 = ua.indexOf('Trident') > -1 && ua.indexOf("rv:11.0") > -1;
    return isIE9 || isEdge || isIE11;
}

// 判断登录的设备
export const getEquipType = () => {
    let type = 'pc';
    if ("ontouchstart" in window || navigator.msMaxTouchPoints) {
        type = 'mobile';
    }
    return type;
}


// base64 转 blob
const dataURLtoBlob = (dataURL) => {
    const mimeType = dataURL.split(',')[0].split(':')[1].split(';')[0];
    // base64 解码
    const byteString = atob(dataURL.split(',')[1]);
    // 缓冲数组
    const arrayBuffer = new ArrayBuffer(byteString.length);
    // 创建视图
    const intArray = new Uint8Array(arrayBuffer);

    for(let i = 0;i < byteString.length;i ++) {
        intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([intArray], {type: mimeType});
}

// IE => 转为Blob下载
const downloadPicByBlob = (dataUrl) => {
    if (window.navigator && window.navigator.msSaveBlob) {
        const blob = dataURLtoBlob(dataUrl);
        navigator.msSaveBlob(blob, "flag.jpeg");
    }else {
        throw new Error();
    }
}

// 普通浏览器 => base64下载
const downloadPicByBase64 = (dataURL) => {
    const link = document.createElement('a');
    link.download = `flag.jpeg`;
    link.href = dataURL;
    link.click();
}

export const download = {
    byBlob: downloadPicByBlob,
    byBase64: downloadPicByBase64
}