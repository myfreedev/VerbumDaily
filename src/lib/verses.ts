export interface Verse {
  text: string;
  reference: string;
}

export const dailyVerses: Verse[] = [
  {
    text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
    reference: "Jeremiah 29:11",
  },
  {
    text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters.",
    reference: "Psalm 23:1-2",
  },
  {
    text: "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.",
    reference: "Isaiah 40:31",
  },
  {
    text: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
    reference: "Proverbs 3:5-6",
  },
  {
    text: "I can do all things through him who strengthens me.",
    reference: "Philippians 4:13",
  },
];

export function getDailyVerse(): Verse {
  // Simple rotation based on day of year
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      1000 /
      60 /
      60 /
      24
  );
  return dailyVerses[dayOfYear % dailyVerses.length];
}
