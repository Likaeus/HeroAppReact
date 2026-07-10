import { ImgHTMLAttributes, useEffect, useState } from "react";
import Character from "../Models/CharacterModel";
import HeroService from "../Services/heroService";

interface HeroImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  hero: Pick<Character, "id" | "imageUrl">;
  fallback?: React.ReactNode;
}

const HeroImage = ({ hero, fallback = null, ...props }: HeroImageProps) => {
  const [source, setSource] = useState<string>();

  useEffect(() => {
    let objectUrl: string | undefined;
    let active = true;
    if (!hero.imageUrl) { setSource(undefined); return; }

    HeroService.getImage(hero.id).then(({ data }) => {
      if (!active) return;
      objectUrl = URL.createObjectURL(data);
      setSource(objectUrl);
    }).catch(() => { if (active) setSource(undefined); });

    return () => { active = false; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [hero.id, hero.imageUrl]);

  return source ? <img src={source} {...props} /> : <>{fallback}</>;
};

export default HeroImage;
