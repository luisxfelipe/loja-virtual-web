import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import { ContainerPageNotFound } from '../styles/pageNotFound.styles';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleOnClickButton = () => {
    navigate('/');
  };

  return (
    <ContainerPageNotFound>
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, a página que você visitou não existe."
        extra={
          <Button onClick={handleOnClickButton} type="primary">
            Página de login
          </Button>
        }
      />
    </ContainerPageNotFound>
  );
};

export default PageNotFound;
