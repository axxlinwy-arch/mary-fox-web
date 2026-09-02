"use client";

import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "./badge";

interface BookingCardProps {
  artistName: string;
  date: string;
  time: string;
  status?: "pending" | "confirmed" | "completed";
}

const statusLabels = {
  pending: "Ожидает",
  confirmed: "Подтверждено",
  completed: "Завершено",
};

export function BookingCard({
  artistName,
  date,
  time,
  status = "pending",
}: BookingCardProps) {
  return (
    <Card className="p-6 border-0">
      <div className="flex items-start justify-between mb-4">
        <Badge variant={status === "confirmed" ? "accent" : "outline"}>
          {statusLabels[status]}
        </Badge>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <User className="h-4 w-4 text-accent" />
          <span>{artistName}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-secondary-foreground">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-secondary-foreground">
          <Clock className="h-4 w-4" />
          <span>{time}</span>
        </div>
      </div>
      <Button variant="outline" size="sm" className="mt-6 w-full" asChild>
        <Link href="/book">Изменить запись</Link>
      </Button>
    </Card>
  );
}
