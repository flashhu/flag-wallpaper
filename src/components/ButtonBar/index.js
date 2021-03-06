import React from 'react'
import './index.less'

const Button = ({ className = 'btn', children, ...restProps }) => {
    return (
        <button className={className} {...restProps}>{children}</button>
    )
}

function ButtonBars(props) {
    const { isEdit, changeEditStatus, downloadPic } = props;

    return (
        <div className="btns-wrap">
            <div className="btns-box">
                <Button onClick={changeEditStatus}>{isEdit ? '预览' : '修改'}</Button>
                <Button onClick={downloadPic}>保存</Button>
            </div>
        </div>
    )
}

export default React.memo(ButtonBars);