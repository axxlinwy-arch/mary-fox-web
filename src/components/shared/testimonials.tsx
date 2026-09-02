"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Testimonial } from "@/types";
import { Card } from "@/components/ui/card";

interface TestimonialsProps {
  items: Testimonial[];
}

export function Testimonials({ items }: TestimonialsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="p-8 border-0 bg-card h-full">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-foreground leading-relaxed">&ldquo;{item.text}&rdquo;</p>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-secondary-foreground">{item.role}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
