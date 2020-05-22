import React, { createContext, useContext, useCallback, useState } from 'react';

interface SavedMealsContextData {
  saveMeal(mealId: string): void;
  removeMeal(mealId: string): void;
  savedMeals: string[];
}

const SavedMealsContext = createContext<SavedMealsContextData>(
  {} as SavedMealsContextData,
);

const SavedMealsProvider: React.FC = ({ children }) => {
  const [savedMeals, setSavedMeals] = useState<string[]>(() => {
    const mealsInLocalStorage = localStorage.getItem(
      '@RandomMealGenerator:savedMeals',
    );

    if (mealsInLocalStorage) {
      return JSON.parse(mealsInLocalStorage);
    }

    return [] as string[];
  });

  const saveMeal = useCallback(
    (mealId: string) => {
      setSavedMeals((oldSavedMeals) => [...oldSavedMeals, mealId]);
      localStorage.setItem(
        '@RandomMealGenerator:savedMeals',
        JSON.stringify(savedMeals),
      );
    },
    [savedMeals],
  );

  const removeMeal = useCallback(
    (mealId: string) => {
      const newSavedMeals = savedMeals.filter((meals) => meals !== mealId);

      setSavedMeals(newSavedMeals);
      localStorage.setItem(
        '@RandomMealGenerator:savedMeals',
        JSON.stringify(newSavedMeals),
      );
    },
    [savedMeals],
  );

  return (
    <SavedMealsContext.Provider value={{ saveMeal, removeMeal, savedMeals }}>
      {children}
    </SavedMealsContext.Provider>
  );
};

function useSavedMeals(): SavedMealsContextData {
  const context = useContext(SavedMealsContext);

  if (!context) {
    throw new Error('useInput must be used within a SavedMealsProvider');
  }

  return context;
}

export { SavedMealsProvider, useSavedMeals };
