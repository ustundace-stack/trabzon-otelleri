"use client";

import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { updateReservationStatus } from "./actions";
import { useState } from "react";

interface Props {
  reservationId: number;
}

export function ReservationActionButtons({ reservationId }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (status: "approved" | "rejected") => {
    setIsLoading(true);
    await updateReservationStatus(reservationId, status);
    setIsLoading(false);
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-emerald-600 hover:bg-emerald-50" 
        title="Onayla"
        disabled={isLoading}
        onClick={() => handleUpdate("approved")}
      >
        <Check className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-red-600 hover:bg-red-50" 
        title="İptal Et"
        disabled={isLoading}
        onClick={() => handleUpdate("rejected")}
      >
        <X className="h-4 w-4" />
      </Button>
    </>
  );
}
