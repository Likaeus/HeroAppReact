interface Character {
  id: string;
  name: string;
  description: string;
  details: {
    powers: string;
    weakness: string;
  };
  imageUrl: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export default Character;
