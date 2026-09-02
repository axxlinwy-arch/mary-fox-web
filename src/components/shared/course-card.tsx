"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Course } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "./badge";

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/education/${course.slug}`}>
        <Card className="group overflow-hidden border-0 bg-card hover:shadow-glow transition-all duration-500 h-full">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="accent">{course.level}</Badge>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-2xl font-medium">{course.title}</h3>
                <p className="mt-1 text-sm text-secondary-foreground">
                  {course.subtitle}
                </p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-secondary-foreground group-hover:text-accent transition-colors" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-secondary-foreground">
                <Clock className="h-3.5 w-3.5" />
                {course.duration}
              </div>
              <span className="font-medium text-accent">{course.price}</span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
