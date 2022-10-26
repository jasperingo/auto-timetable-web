import type { Hall } from "@/models/hall-model";

export interface ExaminationHall {
  id: number;
  capacity: number;
  hall: Hall;
}
