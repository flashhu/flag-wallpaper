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

// 判断是否通过微信/QQ打开网页
export const isWxOrQq = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        // 微信打开
        return true;
    } else if (ua.match(/QQ/i) == "qq") {
        // QQ打开
        return true;
    } else {
        return false;
    }
} 