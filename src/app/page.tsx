import { EuphoriaHero } from "@/components/euphoria/hero";
import { GalleryMarquee } from "@/components/euphoria/gallery-marquee";
import { TestimonialsSection } from "@/components/euphoria/testimonials-section";
import { MasterSection } from "@/components/euphoria/master-section";
import { StudioSection } from "@/components/euphoria/studio-section";
import { CoworkingSection } from "@/components/euphoria/coworking-section";
import { EducationSection } from "@/components/euphoria/education-section";
import { StudentReviewsSection } from "@/components/euphoria/student-reviews-section";

export default function HomePage() {
  return (
    <>
      <EuphoriaHero />
      <MasterSection />
      <GalleryMarquee />
      <TestimonialsSection />
      <StudioSection />
      <CoworkingSection />
      <EducationSection />
      <StudentReviewsSection />
    </>
  );
}
