import { Input as AntdInput } from 'antd';
import type { InputProps, PasswordProps } from 'antd/es/input';
import type { TextAreaProps } from 'antd/es/input/TextArea';

export const CmsInput = (props: InputProps) => {
    return (
        <AntdInput
            {...props}
            style={{ height: '48px', borderRadius: '8px', ...props.style }}
            className={`cms-input ${props.className || ''}`}
        />
    );
};

const Password = (props: PasswordProps) => {
    return (
        <AntdInput.Password
            {...props}
            style={{ height: '48px', borderRadius: '8px', ...props.style }}
            className={`cms-input ${props.className || ''}`}
        />
    );
};

const TextArea = (props: TextAreaProps) => {
    return (
        <AntdInput.TextArea
            {...props}
            className={`cms-textarea ${props.className || ''}`}
            style={{ borderRadius: '8px', ...props.style }}
        />
    );
};

CmsInput.Password = Password;
CmsInput.TextArea = TextArea;
