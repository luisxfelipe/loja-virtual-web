import { Input as InputAntd, InputProps as InputPropsAntd } from 'antd';
import { InputHTMLAttributes } from 'react';

import { BoxInput, TitleInput } from './input.styles';

interface InputProps extends InputPropsAntd {
  title?: string;
}

const Input = ({ title, ...props }: InputProps) => {
  return (
    <BoxInput>
      {title && <TitleInput>{title}</TitleInput>}
      <InputAntd />
    </BoxInput>
  );
};

export default Input;
