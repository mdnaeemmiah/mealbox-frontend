import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const PHInput = ({ type, name, label, disabled }: TInputProps) => {
  return (
    <div style={{  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label} style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
              style={{ textAlign: 'center' }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
