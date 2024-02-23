import z from 'zod';

//a base type for breed data shared between cats and dogs
/*
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
  needed: number;
}*/
const weightSchema = z.object({
  imperial: z.string(),
  metric: z.string()
});

const BaseBreedSchema = z.object({
  weight: weightSchema,
  name: z.string(),
  life_span: z.string(),
  reference_image_id: z.string(),
  origin: z.string(),
  temperament: z.string()
});

const DogBreedSchema = BaseBreedSchema.extend({
  type: z.literal('dog'),
  id: z.number(),
  bred_for: z.string(),
  breed_group: z.string(),
  height: weightSchema
});

const CatBreedSchema = BaseBreedSchema.extend({
  type: z.literal('cat')
});

const BreedSchema = z.discriminatedUnion('type', [
  DogBreedSchema,
  CatBreedSchema
]);

export type Breed = z.infer<typeof BreedSchema>;

export const isBreed = (obj: unknown): obj is Breed => {
  if (!BreedSchema.safeParse(obj).success) {
    return false;
  }
  return true;
};

//our dog breed type from API call
/*
interface DogBreed extends BaseBreed {
  type: 'dog';
  id: number;
  bred_for: string;
  breed_group: string;
  height: {
    imperial: string;
    metric: string;
  };
}

interface CatBreed extends BaseBreed {
  type: 'cat';
  child_friendly: number;
}
*/
//shared cat and dog type are described as breeds for API calls
//export type Breed = DogBreed | CatBreed;

export interface BreedQuery {
  limit: string;
  page: string;
  animal: 'dog' | 'cat';
}
