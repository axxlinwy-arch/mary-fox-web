"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";
import type { Artist } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "./badge";

interface ArtistCardProps {
  artist: Artist;
  index?: number;
}

export function ArtistCard({ artist, index = 0 }: ArtistCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/artists/${artist.slug}`}>
        <Card className="group overflow-hidden border-0 bg-card hover:shadow-glow transition-all duration-500">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={artist.image}
              alt={artist.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <Button variant="accent" size="sm" className="w-full">
                Подробнее
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl font-medium">{artist.name}</h3>
                <p className="mt-1 text-sm text-secondary-foreground">
                  {artist.specialization}
                </p>
              </div>
              <a
                href={artist.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-secondary-foreground hover:text-accent transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="outline">{artist.experience}</Badge>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
