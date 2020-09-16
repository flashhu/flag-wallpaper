import React, { useEffect } from 'react'
import Form from 'rc-field-form'
import Input from './Input'
import LabelField from './LabelField'
import del from '../../../../assets/icon/del.svg'
import './index.less'

const { List, useForm } = Form;

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