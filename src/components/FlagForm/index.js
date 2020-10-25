import React, { useEffect } from 'react'
import Form from 'rc-field-form'
import Input from './components/Input'
import LabelField from './components/LabelField'
import drag from '../../assets/icon/drag.svg'
import del from '../../assets/icon/del.svg'
import './index.less'

const { List, useForm } = Form;
const MAX_FIELD = 7;

function FlagForm(props) {
    const [form] = useForm();
    const { initialContent, changeContent } = props;

    useEffect(() => {
        form.setFieldsValue({
            flags: initialContent,
        });
        // eslint-disable-next-line
    }, [form])

    return (
        <Form
            className="form-wrap"
            form={form}
            onValuesChange={(_,values) => {
                // console.log('values:', values);
                // console.log('getFields:', form.getFieldsValue().flags);
                changeContent(form.getFieldsValue().flags)
            }}
        >
            <List 
                name='flags'
                rules={[
                    {
                        message: '不要贪多哦~',
                        validator: async(_, value) => {
                            if (value.length > MAX_FIELD - 1) {
                                console.log('error');
                                throw new Error();
                            }
                        }
                    }
                ]}
            >
                {(fields, {add, remove}, { errors }) => {

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
                                            <img
                                                className="form-icon"
                                                alt='del'
                                                src={del}
                                                onClick={() => { remove(index) }}
                                            />
                                            <Input {...control} />
                                            <img
                                                className="form-icon"
                                                alt='drag'
                                                src={drag}
                                            />
                                        </div>
                                    )}
                                </LabelField>
                            ))}
                            {/* 出现 Error => item数量达到上限 */}
                            {
                                !errors.length && fields.length < MAX_FIELD &&
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