export type Meal = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  composition: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    products: string[];
  };
};
