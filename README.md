# Flag 壁纸生成器

灵感源于某次间歇性踌躇满志 ~~习惯性混吃等死~~ 

趁此机会，实践一下函数式组件 😝   



## 预览

[传送门](http://www.flashhu.site:3389/)  （建议使用微信扫描二维码）

![二维码](http://120.26.173.129/wp-content/uploads/2020/09/1600591298.png)



## 功能概述

1. 选择主题（深 / 浅）
2. 增删改 Flag 内容
3. 预览 / 保存图片



## 可用方式

1. 手机 微信/QQ 打开网址
2. 手机使用 夸克/小米浏览器
3. 电脑使用 Chrome / Firefox / Edge
4. 平板使用 Safari / Chrome

5. 电脑打开开发者模式，选择手机后，再退出开发者模式，可以搞电脑壁纸（非常规操作）



## Todo

#### feat

- [x] 在特定位置增加输入框
- [x] 自定义背景图片
- [x] 自定义字体大小
- [ ] 图片裁剪

#### fix

- [x] 保存图片时可能出现白边

- [x] 移动端保存图片隐藏后 按钮的focus状态移除

- [ ] 输入项多时，软键盘会使按钮和表单部分重叠

- [ ] 从预览到保存，添加按钮默认显示，未加个数判断

- [ ] 上传图片大小限制

  

## 问题记录

#### 1. 习惯性使用 `DataURL` 和 `download` 属性实现下载

如此操作后，会发现移动端只有 Safari 还能下个图片（这里用的 iPad）

Chrome下载出了一个 document，点击保存后毫无反应是常态

[`download` 属性](https://www.caniuse.com/mdn-html_elements_a_download)在一些比较常见的手机端浏览器都不支持

还有一种说法是，由于 base64 过长，导致在手机端无法正常下载

**解决办法：**

① base64 传后端，生成图片后，返图片地址

② base64 图片显示，移动端长按保存



#### 2. 移动端和PC端判断

接上个问题，需要通过判断设备来确定下载图片的方式，以及显示的布局样式

最初是通过媒体查询来判断显示的样式的，测试之后发现

当你的平板大小没有那么的凑巧时，你就只能下载手机的壁纸了... 

**解决办法：**

> 注意：①② 都可以被手动修改！！

① `navigator.platform`  

这个办法有点简单粗暴，如果包含mac或win，就算为PC端

听着感觉没有任何毛病，但是使用 iPad 上的 Safari时这个值为 `MacIntel` 

感觉相对而言，不确定性因素比较大

② `navigator.userAgent`

见 [Detecting a mobile browser](https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser) 的高赞回答（感觉和`navigator.platform`  有一点相似）

从某面试题的[回答](https://github.com/haizlin/fe-interview/issues/88)中看，根据 `navigator.userAgent`进行判断比较多

③ 利用移动端的API

同样来自某面试题的[回答](https://github.com/haizlin/fe-interview/issues/88#issuecomment-494661347) ，其中对移动端的判断方式

手头上的设备测试时均可正常使用

④ 利用已有工具

[detectmobilebrowsers](http://detectmobilebrowsers.com/)

[current-device](https://github.com/matthewhudson/current-device)



#### 3. 迷之出现的白边

图片能正常保存，但是会出现各种位置的奇怪白边

微信保存底部出现白边，小米浏览器保存底部和侧边出现白边，Safari顶部出现白边... 

顶部出现白边时，如果把标题 "Flag壁纸生成器"去掉，会发现白边消失或者变小了一些

经过各种实验，这个白边会不会出现，取决于从（x, y）取设定的宽高，会不会超出所选的元素

白色，是因为 html2canvas 中设的默认背景颜色是白色

**解决办法：**

设置[参数](http://html2canvas.hertzen.com/configuration)，固定宽高；y 默认为所选元素离视口的高度，注意调整 y 的值

可参照 [html2canvas生成图片出现白边儿的解决方法](https://www.jianshu.com/p/1ba91e9bb2ca)



#### 4. ios 上拉下拉出现白边

> 手指按住屏幕后上拉，下拉的过程中，触发 touchmove 事件，触发的对象为 webview 容器 
>
> 容器被拖动 => 出现白边
>
> 参考自 [移动端开发必会出现的问题和解决方案](https://zhuanlan.zhihu.com/p/137539250)

测试时，在 iPad 上使用 Safari 出现这种情况，暂未处理

**解决办法：**

① 监听事件禁止滑动

②将其装饰为其他功能



#### 5. 部分内容无法正常保存图片

设置`z-index`后，导致这部分元素无法正常保存

**解决办法：**

参照 [html2canvas z-index not effect](https://stackoverflow.com/questions/51836736/html2canvas-z-index-not-effect) 中提供的思路

在设置`z-index` 的同时，设置 `position`，即可保存