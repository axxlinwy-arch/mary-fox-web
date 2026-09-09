import type { Metadata } from "next";
import { EuphoriaOffer } from "@/components/euphoria/offer-section";
import { OFFER } from "@/constants/content";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: OFFER.title,
  description: OFFER.description,
  alternates: {
    canonical: `${SITE.url}/offer`,
  },
};

export default function OfferPage() {
  return <EuphoriaOffer />;
}
