import { useState } from 'react';

export const useInsertCategory = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const insertCategory = () => {
    setLoading(true);
  };

  const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return {
    name,
    handleOnChangeName,
    loading,
    insertCategory,
  };
};
