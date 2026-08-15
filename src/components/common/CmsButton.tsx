import { Button as AntdButton } from 'antd';
import type { ButtonProps } from 'antd';

export const CmsButton = (props: ButtonProps) => {
    return (
        <AntdButton
            style={{
                height: '48px',
                borderRadius: '8px'
            }}
            {...props}
        />
    );
};
