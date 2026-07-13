interface Character {
  id: string;
  name: string;
  description: string;
  details: {
    powers: string;
    weakness: string;
  };
  imageUrl: string | null;
  creatorName: string;
  visibility: "public" | "private";
  isOwnedByCurrentUser?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default Character;
