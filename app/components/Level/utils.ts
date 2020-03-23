export const getLevelFromPoints = (points: number): number => {
  if (points <= 100) {
    return 1;
  } else if (points <= 500) {
    return 2;
  } else if (points <= 1000) {
    return 3;
  } else if (points <= 2500) {
    return 4;
  }
  return 5;
};

export function getStylesByLevel(level: number): string {
  switch (level) {
    case 5:
      return `
        background-color: #B5881D;
        border-color: #EDC625;
        color: #FFD62B;
      `;
    case 4:
      return `
        background-color: #C78927;
        border-color: #F9AC32;
        color: #EFB353;
      `;
    case 3:
      return `
        background-color: #96624B;
        border-color: #D39978;
        color: #FFB74D;
      `;
    case 2:
      return `
        background-color: #378BC2;
        border-color: #90CBF9;
        color: #90CBF9;
      `;
    default:
      return `
        background-color: #868D96;
        border-color: #BABDC7;
        color: #BABDC7;
      `;
  }
}
