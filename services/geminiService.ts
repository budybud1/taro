import { GoogleGenAI } from "@google/genai";
import { DrawnCard } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function getTarotReading(cards: DrawnCard[]): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  if (cards.length !== 3) {
    throw new Error("이 기능은 3카드 스프레드가 필요합니다.");
  }

  const cardDescriptions = cards.map((drawnCard, index) => {
    const position = index === 0 ? '과거' : index === 1 ? '현재' : '미래';
    const orientation = drawnCard.isReversed ? '역방향' : '정방향';
    return `- 카드 ${index + 1} (${position}): ${drawnCard.card.name} (${orientation})`;
  }).join('\n');

  const prompt = `
    당신은 전문적이고, 통찰력 있으며, 공감 능력이 뛰어난 타로 리더입니다.
    제가 뽑은 세 장의 카드는 다음과 같습니다:
    ${cardDescriptions}

    이 카드들에 대해 일관성 있고 이야기 형식의 해석을 제공해 주세요.
    '과거' 카드가 어떻게 상황의 배경을 설정하는지, '현재' 카드가 현재 상황을 어떻게 반영하는지, 그리고 '미래' 카드가 어떤 잠재적인 결과를 제안하는지 설명해 주세요.
    각 카드의 의미를 하나의 흐르는 이야기로 엮어주세요.
    어조는 지지적이고 개인의 성장과 자기 성찰에 초점을 맞춰주세요. 단정적인 예측은 피해주세요.
    응답은 각 카드의 영향에 대한 세 개의 문단과 마지막 요약 문단으로 구성해 주세요.
    모든 답변은 반드시 한국어로 해주세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("타로 리딩 생성에 실패했습니다.");
  }
}