import React, { useEffect } from 'react'
import Form from 'rc-field-form'
import Input from './Input'
import LabelField from './LabelField'
import minus from '../../../../assets/icon/minus.svg'
import plus from '../../../../assets/icon/plus.svg'
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
                                            {!errors.length && fields.length < MAX_FIELD &&
                                            <img
                                                className="form-icon"
                                                alt='plus'
                                                src={plus}
                                                onClick={() => { add('', index === 0 ? 0: index) }}
                                            />}
                                            <img 
                                                className="form-icon"
                                                alt='minus' 
                                                src={minus} 
                                                onClick={() => {remove(index)}}
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