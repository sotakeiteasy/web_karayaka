export type PriceType = {
  rub?: number | null;
  try?: number | null;
} & (
  | {
      rub: number;
    }
  | {
      try: number;
    }
);
