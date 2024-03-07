import { Buffer } from "buffer";
interface Character {
  _id: string;
  Name: string;
  Description: string;
  Details: {
    Powers: string;
    Weakness: string;
  };
  Image: {
    data: Buffer | null;
    contentType: string;
  };
  imageUrl?: string;
}

export default Character;
