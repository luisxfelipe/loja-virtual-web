import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexJustfyCenter,
  DisplayFlexJustfyRight,
} from '../../../shared/components/styles/display.styles';
import { LimitedContainer } from '../../../shared/components/styles/limited.styles';
import { useInsertCategory } from '../hooks/useInsertCategory';
import { CategoryRoutesEnum } from '../routes';

const CategoryInsert = () => {
  const { disabledButton, name, loading, handleOnChangeName, insertCategory } = useInsertCategory();
  const navigate = useNavigate();

  const handleOnClickedCancel = () => {
    navigate(CategoryRoutesEnum.CATEGORY);
  };

  return (
    <Screen
      listBreadcrumb={[
        { name: 'HOME' },
        { name: 'CATEGORIAS', navigateTo: CategoryRoutesEnum.CATEGORY },
        { name: 'INSERIR CATEGORIA' },
      ]}
    >
      <DisplayFlexJustfyCenter>
        <LimitedContainer width={400}>
          <Input
            onChange={handleOnChangeName}
            value={name}
            margin="0px 0px 16px 0px"
            title="Nome"
            placeholder="Nome"
          />
          <DisplayFlexJustfyRight>
            <LimitedContainer margin="0px 8px" width={160}>
              <Button onClick={handleOnClickedCancel} danger>
                Cancelar
              </Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button
                disabled={disabledButton}
                loading={loading}
                onClick={insertCategory}
                type="primary"
              >
                Inserir Categoria
              </Button>
            </LimitedContainer>
          </DisplayFlexJustfyRight>
        </LimitedContainer>
      </DisplayFlexJustfyCenter>
    </Screen>
  );
};

export default CategoryInsert;
