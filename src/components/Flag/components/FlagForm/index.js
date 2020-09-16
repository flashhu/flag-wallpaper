import React, { useEffect } from 'react'
import Form from 'rc-field-form'
import Input from './Input'
import LabelField from './LabelField'
import del from '../../../../assets/del.svg'
import './index.less'

const { List, useForm } = Form;

function FlagForm(props) {
    const [form] = useForm();
    const { mode } = props;

    useEffect(() => {
        form.setFieldsValue({
            flags: ['🚩 14天习惯养成计划', '🏆 吃大餐！', '1. 早睡早起~', '2. 运动半小时✧'],
        });
    }, [form])

    return (
        <Form
            className="form-wrap"
            mode={mode}
            form={form}
            onValuesChange={(_,values) => {
                // console.log('values:', values);
                // console.log('getFields:', form.getFieldsValue());
            }}
        >
            <List 
                name='flags'
                rules={[
                    {
                        message: '不要贪多哦~',
                        validator: async(_, value) => {
                            console.log(value.length);
                            if (value.length > 6) {
                                console.log('error');
                                throw new Error();
                            }
                        }
                    }
                ]}
            >
                {(fields, {add, remove}, { errors }) => {
                    // console.log('Demo Fields:', fields, errors);

                    return (
                        <>
                            {fields.map((field, index) => (
                                <LabelField 
                                    {...field} 
                                    rules={[
                                        {max: 12, message: '最多输入12个字符'},
                                        {required: true, message: '该项不能为空'}
                                    ]}
                                >
                                    {control => (
                                        <div className="form-item">
                                            <Input {...control} />
                                            <img 
                                                className="form-del"
                                                alt='del' 
                                                src={del} 
                                                onClick={() => {remove(index)}}
                                            />
                                        </div>
                                    )}
                                </LabelField>
                            ))}
                            {/* 出现 Error => item数量达到上限 */}
                            {
                                !errors.length && 
                                <div
                                    className="form-add"
                                    onClick={() => { add(); }}
                                >
                                    添加
                                </div>
                            }
                        </>
                    )
                }}
            </List>
        </Form>
    )
}

export default FlagForm;