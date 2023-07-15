// TODO: better management of contextual color for rightmost icon?
// TODO: implement trailing '...'
// TODO: use invalid: to style input border state
import { useFormContext, type RegisterOptions } from 'react-hook-form';
import InputWrapper from './InputWrapper';

interface Props {
  labelText: string;
  helperText?: string;
  inputName: string;
  options: RegisterOptions;
}

function FormTextInput({ labelText, inputName }: Props) {
  const { register } = useFormContext();

  return (
    <InputWrapper labelText={labelText}>
      <input
        type="text"
        {...register(inputName, {
          required: 'error message', // JS only: <p>error message</p> TS only support string
        })}
      />
    </InputWrapper>
  );
}

export default FormTextInput;
