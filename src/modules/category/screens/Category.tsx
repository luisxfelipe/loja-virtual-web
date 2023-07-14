import Screen from '../../../shared/components/screen/Screen';
import { useCategory } from '../hooks/useCategory';

const Category = () => {
  const { categories } = useCategory();

  return (
    <Screen>
      <div>Categorias</div>
      {categories.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </Screen>
  );
};

export default Category;
