//a base type for breed data shared between cats and dogs
interface BaseBreed {
  weight: {
    imperial: string;
    metric: string;
  };
  name: string;
  life_span: string;
  reference_image_id: string;
  origin: string;
  temperament: string;
}
//our dog breed type from API call
interface DogBreed extends BaseBreed {
  id: number;
  bred_for: string;
  breed_group: string;
  height: {
    imperial: string;
    metric: string;
  };
}
//shared cat and dog type are described as breeds for API calls
export type Breed = DogBreed;
