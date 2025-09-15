export interface TarotCardData {
  id: string;
  name: string;
  arcana: '메이저' | '마이너';
  suit?: '완드' | '컵' | '소드' | '펜타클';
  meaning_up: string;
  meaning_rev: string;
  description: string;
}

export interface DrawnCard {
  card: TarotCardData;
  isReversed: boolean;
}