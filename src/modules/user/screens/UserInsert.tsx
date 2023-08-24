import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styles';
import { LimitedContainer } from '../../../shared/components/styles/limited.styles';
import { useUserInsert } from '../hooks/useUserInsert';
import { UserRoutesEnum } from '../routes';

const UserInsert = () => {
  const {
    user,
    disabledButton,
    loading,
    handleCancelInsert,
    handleInsertAdmin,
    handleOnChangeInput,
  } = useUserInsert();

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'USUÁRIOS',
          navigateTo: UserRoutesEnum.USER,
        },
        {
          name: 'INSERIR',
        },
      ]}
    >
      <DisplayFlexJustifyCenter>
        <LimitedContainer width={400}>
          <Input
            onChange={(event) => handleOnChangeInput(event, 'name')}
            value={user.name}
            margin="0px 0px 16px 0px"
            title="Nome"
            placeholder="Nome"
          />
          <Input
            onChange={(event) => handleOnChangeInput(event, 'phone')}
            value={user.phone}
            margin="0px 0px 16px 0px"
            title="Telefone"
            placeholder="Telefone"
          />
          <Input
            onChange={(event) => handleOnChangeInput(event, 'email')}
            value={user.email}
            margin="0px 0px 16px 0px"
            title="Email"
            placeholder="Email"
          />
          <Input
            onChange={(event) => handleOnChangeInput(event, 'cpf')}
            value={user.cpf}
            margin="0px 0px 16px 0px"
            title="CPF"
            placeholder="Cpf"
          />
          <Input
            onChange={(event) => handleOnChangeInput(event, 'password')}
            value={user.password}
            margin="0px 0px 16px 0px"
            title="Senha"
            placeholder="Senha"
          />

          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button danger onClick={handleCancelInsert}>
                Cancelar
              </Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button
                onClick={handleInsertAdmin}
                disabled={disabledButton}
                loading={loading}
                type="primary"
              >
                Inserir Admin
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </DisplayFlexJustifyCenter>
    </Screen>
  );
};

export default UserInsert;
