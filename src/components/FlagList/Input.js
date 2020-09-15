import React from 'react';

// 作为flagList的子组件
// 如作为公用组件再提出，导入时目录太深；
// 和业务相关性不大，只有flagList会用 => flagList中通用的限制写入
// 写法仿照 rc-field-form 提供的示例

const Input = (props) => {
    return <input {...props} />;
}

const ControlledInput = ({value = '', ...props}) => {
    return(
        <Input value={value} {...props}/>
)}

export default ControlledInput;