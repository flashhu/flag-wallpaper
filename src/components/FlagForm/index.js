import React, { useEffect } from 'react'
import Form from 'rc-field-form'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Input from './components/Input'
import LabelField from './components/LabelField'
import useDraggable from './components/useDraggable'
import drag from '../../assets/icon/drag.svg'
import del from '../../assets/icon/del.svg'
import './index.less'

const { List, useForm } = Form;
const MAX_FIELD = 7;

const DisableDraggable = {
    onDragStart(event) {
        event.stopPropagation();
        event.preventDefault();
    },
    draggable: true,
};

const Draggable = ({ id, index, move, children }) => {
    const { ref, isDragging } = useDraggable('list-draggable', id, index, move);
    return (
        <div
            ref={ref}
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            {children}
        </div>
    );
};

function FlagForm(props) {
    const [form] = useForm();
    const { initialContent, changeContent, plat } = props;

    useEffect(() => {
        form.setFieldsValue({
            flags: initialContent,
        });
        // eslint-disable-next-line
    }, [form])

    return (
        <DndProvider backend={plat === 'pc' ? HTML5Backend: TouchBackend}>
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
                    {(fields, {add, remove, move}, { errors }) => {

                        return (
                            <>
                                {fields.map((field, index) => (
                                    <Draggable
                                        move={move}
                                        index={index}
                                        id={field.key}
                                        {...field}
                                        rules={[{ required: true }]}
                                    >
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
                                                        {...DisableDraggable}
                                                        alt='del'
                                                        src={del}
                                                        onClick={() => { remove(index) }}
                                                    />
                                                    <Input {...DisableDraggable} {...control} />
                                                    <img
                                                        className="form-icon"
                                                        alt='drag'
                                                        src={drag}
                                                    />
                                                </div>
                                            )}
                                        </LabelField>
                                    </Draggable>
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
        </DndProvider>
    )
}

export default FlagForm;