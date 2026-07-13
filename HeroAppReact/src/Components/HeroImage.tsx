import { ImgHTMLAttributes, useEffect, useState } from "react";
import Character from "../Models/CharacterModel";
import HeroService from "../Services/heroService";

interface HeroImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  hero: Pick<Character, "id" | "imageUrl">;
  fallback?: React.ReactNode;
}

const HeroImage = ({ hero, fallback = null, ...props }: HeroImageProps) => {
  const [source, setSource] = useState<string>();
  const { id, imageUrl } = hero;

  useEffect(() => {
    let objectUrl: string | undefined;
    let active = true;
    if (!imageUrl) { setSource(undefined); return; }

    HeroService.getImage({ id, imageUrl }).then(({ data }) => {
      if (!active) return;
      objectUrl = URL.createObjectURL(data);
      setSource(objectUrl);
    }).catch(() => { if (active) setSource(undefined); });

    return () => { active = false; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [id, imageUrl]);

  return source ? <img src={source} {...props} /> : <>{fallback}</>;
};

export default HeroImage;
