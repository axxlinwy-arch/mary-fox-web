import type { Metadata } from "next";
import { EuphoriaOffer } from "@/components/euphoria/offer-section";
import { OFFER } from "@/constants/content";
import { SITE_URL } from "@/constants/site";

export const metadata: Metadata = {
  title: OFFER.title,
  description: OFFER.description,
  alternates: {
    canonical: `${SITE_URL}/offer`,
  },
};

export default function OfferPage() {
  return <EuphoriaOffer />;
}
