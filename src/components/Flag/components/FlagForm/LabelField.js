import React, {cloneElement} from 'react'
import Form from 'rc-field-form'

const { Field } = Form;

export const Error = ({ content }) => (
    <div style={{ color: '#ff4d4f'}}>{content}</div>
)

const LabelField = ({
    name,
    label,
    children,
    ...restProps
}) => (
    <Field name={name} {...restProps}>
        {(control, meta, form) => {
            // console.log(control, meta, form);
            const childNode =
                typeof children === 'function'
                ? children(control, meta, form)
                : cloneElement(children, {...control});
            
            return (
                <div>
                    <div>{childNode}</div>
                    {!!meta.errors.length && <Error content={meta.errors[0]}/>}
                </div>
            ) 
        }}
    </Field>
)

export default LabelField