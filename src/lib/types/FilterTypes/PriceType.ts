export type PriceType = {
  rub?: number | null;
  try?: number | null;
  try_old?: number | null;
} & (
  | {
      rub: number;
    }
  | {
      try: number;
    }
);
