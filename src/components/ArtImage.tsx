import Image, { getImageProps } from "next/image";

/**
 * Image plein cadre avec une variante mobile (direction artistique).
 *
 * Sans `mobileSrc`, c'est un simple <Image fill>. Avec, un <picture>
 * charge UNE seule des deux photos selon la largeur d'écran : pas de
 * double téléchargement, et pas deux <img> dont l'une serait masquée.
 * 720 px : le même seuil « mobile » que le reste du site.
 */
export function ArtImage({
  src,
  mobileSrc,
  className,
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  mobileSrc?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!mobileSrc) {
    return (
      <Image
        className={className}
        src={src}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
      />
    );
  }
  const common = { alt: "", fill: true, sizes, priority } as const;
  const desktop = getImageProps({ ...common, src });
  const mobile = getImageProps({ ...common, src: mobileSrc });
  const { srcSet, ...img } = desktop.props;
  return (
    <picture>
      <source media="(max-width: 720px)" srcSet={mobile.props.srcSet} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...img} srcSet={srcSet} className={className} alt="" />
    </picture>
  );
}
