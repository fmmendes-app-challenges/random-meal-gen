import React, { useState, useEffect } from 'react';

import { mealApi } from '../../services/api';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';
import Footer from '../../components/Footer';

import { MealData } from './types';

const Random: React.FC = () => {
  const { signOut } = useAuth();

  const [randomMeal, setRandomMeal] = useState({} as MealData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMeal = async (): Promise<void> => {
      const response = await mealApi.get('/random.php');

      if (!response) {
        console.log('No response');
      }

      const newMeal = response.data.meals[0];

      setRandomMeal(newMeal);
      setLoading(false);
    };

    setLoading(true);
    getMeal();
  }, []);

  return (
    <Container>
      <button type="button" onClick={signOut}>
        Sair
      </button>
      <Footer />
    </Container>
  );
};

export default Random;
