import { EuphoriaHero } from "@/components/euphoria/hero";
import { GalleryMarquee } from "@/components/euphoria/gallery-marquee";
import { EuphoriaAbout } from "@/components/euphoria/about-section";
import { MasterSection } from "@/components/euphoria/master-section";
import { PhotoSection } from "@/components/euphoria/photo-section";
import { StudioSection } from "@/components/euphoria/studio-section";
import { EuphoriaOffer } from "@/components/euphoria/offer-section";
import { PHOTO_SECTIONS } from "@/constants/content";

export default function HomePage() {
  const education = PHOTO_SECTIONS.find((s) => s.id === "education")!;

  return (
    <>
      <EuphoriaHero />
      <GalleryMarquee />
      <MasterSection />
      <StudioSection />
      <PhotoSection {...education} index={1} />
      <EuphoriaAbout />
      <EuphoriaOffer />
    </>
  );
}
