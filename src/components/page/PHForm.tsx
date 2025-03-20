import { Form } from 'antd';
import { ReactNode } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

type TFormConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const PHForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig['defaultValues'] = defaultValues;
  }

  if (resolver) {
    formConfig['resolver'] = resolver;
  }

  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <div style={{width:500}}>
      <Form
          layout="vertical"
          onFinish={methods.handleSubmit(submit)}
          style={{
            width: '100%',
            maxWidth: '600px',
            height: 'auto',
            minHeight: '400px',
            padding: '30px',
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)', // Enhanced shadow effect
          }}
        > 
       <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize:30}}>Login Now</h2>
          {children}
        </Form>
      </div>
    </FormProvider>
  );
};

export default PHForm;
