export interface VocabItem {
  id: string;
  missionId: number;
  french: string;
  dutch: string;
  category?: string; // e.g. "Getallen", "Woord", "Zin / Vraag", "Kleuren", "Dagen", etc.
  example?: string;
}

export interface Mission {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  iconName: string;
  themeColor: {
    bg: string;
    border: string;
    badge: string;
    light: string;
    gradient: string;
    primary: string;
    cardBg: string;
    pillBg: string;
  };
  words: VocabItem[];
}

export const MISSIONS_DATA: Mission[] = [
  {
    id: 1,
    title: "Mission 1",
    subtitle: "Et toi? Comment tu t'appelles?",
    emoji: "👋",
    iconName: "User",
    themeColor: {
      bg: "bg-blue-500",
      border: "border-blue-400",
      badge: "bg-blue-100 text-blue-900 border-blue-300",
      light: "bg-blue-50 text-blue-800",
      gradient: "from-sky-500 via-blue-600 to-indigo-600",
      primary: "blue",
      cardBg: "from-blue-500 to-indigo-600",
      pillBg: "bg-sky-500 text-white",
    },
    words: [
      { id: "m1-1", missionId: 1, french: "un an", dutch: "een jaar", category: "Woord" },
      { id: "m1-2", missionId: 1, french: "être", dutch: "zijn (werkwoord)", category: "Werkwoord" },
      { id: "m1-3", missionId: 1, french: "comment?", dutch: "hoe?", category: "Vraagwoord" },
      { id: "m1-4", missionId: 1, french: "et", dutch: "en", category: "Woord" },
      { id: "m1-5", missionId: 1, french: "non", dutch: "nee", category: "Woord" },
      { id: "m1-6", missionId: 1, french: "oui", dutch: "ja", category: "Woord" },
      { id: "m1-7", missionId: 1, french: "qui", dutch: "wie", category: "Vraagwoord" },
      { id: "m1-8", missionId: 1, french: "zéro", dutch: "nul (0)", category: "Getal" },
      { id: "m1-9", missionId: 1, french: "un", dutch: "een (1)", category: "Getal" },
      { id: "m1-10", missionId: 1, french: "deux", dutch: "twee (2)", category: "Getal" },
      { id: "m1-11", missionId: 1, french: "trois", dutch: "drie (3)", category: "Getal" },
      { id: "m1-12", missionId: 1, french: "quatre", dutch: "vier (4)", category: "Getal" },
      { id: "m1-13", missionId: 1, french: "cinq", dutch: "vijf (5)", category: "Getal" },
      { id: "m1-14", missionId: 1, french: "six", dutch: "zes (6)", category: "Getal" },
      { id: "m1-15", missionId: 1, french: "sept", dutch: "zeven (7)", category: "Getal" },
      { id: "m1-16", missionId: 1, french: "huit", dutch: "acht (8)", category: "Getal" },
      { id: "m1-17", missionId: 1, french: "neuf", dutch: "negen (9)", category: "Getal" },
      { id: "m1-18", missionId: 1, french: "dix", dutch: "tien (10)", category: "Getal" },
      { id: "m1-19", missionId: 1, french: "onze", dutch: "elf (11)", category: "Getal" },
      { id: "m1-20", missionId: 1, french: "douze", dutch: "twaalf (12)", category: "Getal" },
      { id: "m1-21", missionId: 1, french: "Au revoir!", dutch: "Tot ziens!", category: "Begroeting" },
      { id: "m1-22", missionId: 1, french: "Bonjour!", dutch: "Goedendag! / Hallo!", category: "Begroeting" },
      { id: "m1-23", missionId: 1, french: "Comment tu t'appelles?", dutch: "Hoe heet je?", category: "Zin" },
      { id: "m1-24", missionId: 1, french: "Et toi?", dutch: "En jij?", category: "Zin" },
      { id: "m1-25", missionId: 1, french: "J'ai 9 ans.", dutch: "Ik ben 9 jaar.", category: "Zin" },
      { id: "m1-26", missionId: 1, french: "Je m'appelle Sami.", dutch: "Ik heet Sami.", category: "Zin" },
      { id: "m1-27", missionId: 1, french: "Moi, j'ai 10 ans.", dutch: "Ik, ik ben 10 jaar.", category: "Zin" },
      { id: "m1-28", missionId: 1, french: "Moi, je suis Milou.", dutch: "Ik, ik ben Milou.", category: "Zin" },
      { id: "m1-29", missionId: 1, french: "Salut!", dutch: "Hallo! / Dag!", category: "Begroeting" },
      { id: "m1-30", missionId: 1, french: "Tu as quel âge?", dutch: "Hoe oud ben je?", category: "Zin" },
      { id: "m1-31", missionId: 1, french: "Tu es qui?", dutch: "Wie ben jij?", category: "Zin" },
      { id: "m1-32", missionId: 1, french: "de/d'", dutch: "van / uit", category: "Woord" },
      { id: "m1-33", missionId: 1, french: "de Bruxelles", dutch: "uit Brussel", category: "Plaats" },
      { id: "m1-34", missionId: 1, french: "d'Anvers", dutch: "uit Antwerpen", category: "Plaats" },
      { id: "m1-35", missionId: 1, french: "un zéro", dutch: "een nul", category: "Woord" },
    ],
  },
  {
    id: 2,
    title: "Mission 2",
    subtitle: "Il y a quoi dans ta classe?",
    emoji: "🎒",
    iconName: "School",
    themeColor: {
      bg: "bg-emerald-500",
      border: "border-emerald-400",
      badge: "bg-emerald-100 text-emerald-900 border-emerald-300",
      light: "bg-emerald-50 text-emerald-800",
      gradient: "from-emerald-400 via-teal-500 to-green-600",
      primary: "emerald",
      cardBg: "from-emerald-500 to-teal-600",
      pillBg: "bg-emerald-500 text-white",
    },
    words: [
      { id: "m2-1", missionId: 2, french: "un banc", dutch: "een schoolbank", category: "Klas" },
      { id: "m2-2", missionId: 2, french: "un bureau", dutch: "een bureau / lessenaar", category: "Klas" },
      { id: "m2-3", missionId: 2, french: "un cahier", dutch: "een schrift", category: "Schoolgerei" },
      { id: "m2-4", missionId: 2, french: "un crayon", dutch: "een potlood", category: "Schoolgerei" },
      { id: "m2-5", missionId: 2, french: "un exercice", dutch: "een oefening", category: "Klas" },
      { id: "m2-6", missionId: 2, french: "un livre", dutch: "een boek", category: "Schoolgerei" },
      { id: "m2-7", missionId: 2, french: "un stylo", dutch: "een balpen", category: "Schoolgerei" },
      { id: "m2-8", missionId: 2, french: "un tableau", dutch: "een schoolbord", category: "Klas" },
      { id: "m2-9", missionId: 2, french: "un texte", dutch: "een tekst", category: "Klas" },
      { id: "m2-10", missionId: 2, french: "un élève", dutch: "een leerling (jongen)", category: "Personen" },
      { id: "m2-11", missionId: 2, french: "une élève", dutch: "een leerlinge (meisje)", category: "Personen" },
      { id: "m2-12", missionId: 2, french: "un prof", dutch: "een leraar / meester", category: "Personen" },
      { id: "m2-13", missionId: 2, french: "une prof", dutch: "een lerares / juf", category: "Personen" },
      { id: "m2-14", missionId: 2, french: "un voisin", dutch: "een buurjongen / buur", category: "Personen" },
      { id: "m2-15", missionId: 2, french: "une voisine", dutch: "een buurmeisje / buurvrouw", category: "Personen" },
      { id: "m2-16", missionId: 2, french: "une classe", dutch: "een klas / klaslokaal", category: "Klas" },
      { id: "m2-17", missionId: 2, french: "une école", dutch: "een school", category: "School" },
      { id: "m2-18", missionId: 2, french: "une gomme", dutch: "een gom", category: "Schoolgerei" },
      { id: "m2-19", missionId: 2, french: "une feuille", dutch: "een blad (papier)", category: "Schoolgerei" },
      { id: "m2-20", missionId: 2, french: "une page", dutch: "een pagina / bladzijde", category: "Schoolgerei" },
      { id: "m2-21", missionId: 2, french: "une question", dutch: "een vraag", category: "Klas" },
      { id: "m2-22", missionId: 2, french: "une réponse", dutch: "een antwoord", category: "Klas" },
      { id: "m2-23", missionId: 2, french: "être", dutch: "zijn (werkwoord)", category: "Werkwoord" },
      { id: "m2-24", missionId: 2, french: "c'est", dutch: "het is / dat is", category: "Zin" },
      { id: "m2-25", missionId: 2, french: "ce sont", dutch: "het zijn / dat zijn", category: "Zin" },
      { id: "m2-26", missionId: 2, french: "avec", dutch: "met", category: "Woord" },
      { id: "m2-27", missionId: 2, french: "quoi?", dutch: "wat?", category: "Vraagwoord" },
      { id: "m2-28", missionId: 2, french: "trop", dutch: "te / te veel", category: "Woord" },
      { id: "m2-29", missionId: 2, french: "vite", dutch: "snel / vlug", category: "Woord" },
      { id: "m2-30", missionId: 2, french: "il y a", dutch: "er is / er zijn", category: "Zin" },
      { id: "m2-31", missionId: 2, french: "Je ne comprends pas.", dutch: "Ik begrijp het niet.", category: "Zin" },
      { id: "m2-32", missionId: 2, french: "pardon", dutch: "sorry / pardon", category: "Beleefdheid" },
      { id: "m2-33", missionId: 2, french: "Pas trop vite!", dutch: "Niet te snel!", category: "Zin" },
      { id: "m2-34", missionId: 2, french: "Prenez une feuille.", dutch: "Neem een blad.", category: "Zin" },
      { id: "m2-35", missionId: 2, french: "s'il te plaît", dutch: "alsjeblieft", category: "Beleefdheid" },
      { id: "m2-36", missionId: 2, french: "s'il vous plaît", dutch: "alstublieft", category: "Beleefdheid" },
      { id: "m2-37", missionId: 2, french: "voici", dutch: "hier is / ziehier", category: "Woord" },
    ],
  },
  {
    id: 3,
    title: "Mission 3",
    subtitle: "Tu fais quoi?",
    emoji: "⚽",
    iconName: "Activity",
    themeColor: {
      bg: "bg-amber-500",
      border: "border-amber-400",
      badge: "bg-amber-100 text-amber-900 border-amber-300",
      light: "bg-amber-50 text-amber-800",
      gradient: "from-amber-400 via-orange-500 to-rose-500",
      primary: "amber",
      cardBg: "from-amber-500 to-orange-500",
      pillBg: "bg-amber-500 text-white",
    },
    words: [
      { id: "m3-1", missionId: 3, french: "un cinéma", dutch: "een bioscoop", category: "Vrije tijd" },
      { id: "m3-2", missionId: 3, french: "un film", dutch: "een film", category: "Vrije tijd" },
      { id: "m3-3", missionId: 3, french: "un gsm", dutch: "een gsm / mobieltje", category: "Vrije tijd" },
      { id: "m3-4", missionId: 3, french: "un jour", dutch: "een dag", category: "Tijd" },
      { id: "m3-5", missionId: 3, french: "un ordinateur", dutch: "een computer", category: "Vrije tijd" },
      { id: "m3-6", missionId: 3, french: "un portable", dutch: "een laptop / gsm", category: "Vrije tijd" },
      { id: "m3-7", missionId: 3, french: "un sport", dutch: "een sport", category: "Sport" },
      { id: "m3-8", missionId: 3, french: "un weekend", dutch: "een weekend", category: "Tijd" },
      { id: "m3-9", missionId: 3, french: "un ami", dutch: "een vriend", category: "Personen" },
      { id: "m3-10", missionId: 3, french: "une amie", dutch: "een vriendin", category: "Personen" },
      { id: "m3-11", missionId: 3, french: "une chanson", dutch: "een liedje", category: "Muziek" },
      { id: "m3-12", missionId: 3, french: "la musique", dutch: "de muziek", category: "Muziek" },
      { id: "m3-13", missionId: 3, french: "une radio", dutch: "een radio", category: "Vrije tijd" },
      { id: "m3-14", missionId: 3, french: "une semaine", dutch: "een week", category: "Tijd" },
      { id: "m3-15", missionId: 3, french: "une télé(vision)", dutch: "een televisie", category: "Vrije tijd" },
      { id: "m3-16", missionId: 3, french: "aimer", dutch: "houden van / graag hebben", category: "Werkwoord" },
      { id: "m3-17", missionId: 3, french: "chanter", dutch: "zingen", category: "Werkwoord" },
      { id: "m3-18", missionId: 3, french: "danser", dutch: "dansen", category: "Werkwoord" },
      { id: "m3-19", missionId: 3, french: "écouter", dutch: "luisteren", category: "Werkwoord" },
      { id: "m3-20", missionId: 3, french: "jouer", dutch: "spelen", category: "Werkwoord" },
      { id: "m3-21", missionId: 3, french: "regarder", dutch: "kijken", category: "Werkwoord" },
      { id: "m3-22", missionId: 3, french: "téléphoner à", dutch: "opbellen naar / bellen naar", category: "Werkwoord" },
      { id: "m3-23", missionId: 3, french: "(le) lundi", dutch: "(de) maandag", category: "Dagen" },
      { id: "m3-24", missionId: 3, french: "(le) mardi", dutch: "(de) dinsdag", category: "Dagen" },
      { id: "m3-25", missionId: 3, french: "(le) mercredi", dutch: "(de) woensdag", category: "Dagen" },
      { id: "m3-26", missionId: 3, french: "(le) jeudi", dutch: "(de) donderdag", category: "Dagen" },
      { id: "m3-27", missionId: 3, french: "(le) vendredi", dutch: "(de) vrijdag", category: "Dagen" },
      { id: "m3-28", missionId: 3, french: "(le) samedi", dutch: "(de) zaterdag", category: "Dagen" },
      { id: "m3-29", missionId: 3, french: "(le) dimanche", dutch: "(de) zondag", category: "Dagen" },
      { id: "m3-30", missionId: 3, french: "Tu fais quoi?", dutch: "Wat doe je?", category: "Zin" },
      { id: "m3-31", missionId: 3, french: "Tu aimes faire quoi?", dutch: "Wat doe je graag?", category: "Zin" },
    ],
  },
  {
    id: 4,
    title: "Mission 4",
    subtitle: "Qu'est-ce que tu portes?",
    emoji: "👕",
    iconName: "Shirt",
    themeColor: {
      bg: "bg-purple-600",
      border: "border-purple-400",
      badge: "bg-purple-100 text-purple-900 border-purple-300",
      light: "bg-purple-50 text-purple-800",
      gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
      primary: "purple",
      cardBg: "from-purple-600 to-pink-500",
      pillBg: "bg-purple-600 text-white",
    },
    words: [
      { id: "m4-1", missionId: 4, french: "un garçon", dutch: "een jongen", category: "Personen" },
      { id: "m4-2", missionId: 4, french: "un vêtement", dutch: "een kledingstuk", category: "Kledij" },
      { id: "m4-3", missionId: 4, french: "un jean", dutch: "een jeans / spijkerbroek", category: "Kledij" },
      { id: "m4-4", missionId: 4, french: "un pantalon", dutch: "een broek", category: "Kledij" },
      { id: "m4-5", missionId: 4, french: "un pull", dutch: "een trui", category: "Kledij" },
      { id: "m4-6", missionId: 4, french: "un short", dutch: "een korte broek / short", category: "Kledij" },
      { id: "m4-7", missionId: 4, french: "un t-shirt", dutch: "een T-shirt", category: "Kledij" },
      { id: "m4-8", missionId: 4, french: "des vêtements", dutch: "kleren / kleding", category: "Kledij" },
      { id: "m4-9", missionId: 4, french: "une basket", dutch: "een gymschoen / sneaker", category: "Kledij" },
      { id: "m4-10", missionId: 4, french: "des baskets", dutch: "gymschoenen / sneakers", category: "Kledij" },
      { id: "m4-11", missionId: 4, french: "une botte", dutch: "een laars", category: "Kledij" },
      { id: "m4-12", missionId: 4, french: "des bottes", dutch: "laarzen", category: "Kledij" },
      { id: "m4-13", missionId: 4, french: "une chaussure", dutch: "een schoen", category: "Kledij" },
      { id: "m4-14", missionId: 4, french: "des chaussures", dutch: "schoenen", category: "Kledij" },
      { id: "m4-15", missionId: 4, french: "une chemise", dutch: "een hemd", category: "Kledij" },
      { id: "m4-16", missionId: 4, french: "une fille", dutch: "een meisje", category: "Personen" },
      { id: "m4-17", missionId: 4, french: "une jupe", dutch: "een rok", category: "Kledij" },
      { id: "m4-18", missionId: 4, french: "une robe", dutch: "een jurk / kleedje", category: "Kledij" },
      { id: "m4-19", missionId: 4, french: "une veste", dutch: "een jas / vest", category: "Kledij" },
      { id: "m4-20", missionId: 4, french: "une couleur", dutch: "een kleur", category: "Kleur" },
      { id: "m4-21", missionId: 4, french: "avoir", dutch: "hebben (werkwoord)", category: "Werkwoord" },
      { id: "m4-22", missionId: 4, french: "chercher", dutch: "zoeken", category: "Werkwoord" },
      { id: "m4-23", missionId: 4, french: "porter", dutch: "dragen (van kledij)", category: "Werkwoord" },
      { id: "m4-24", missionId: 4, french: "aussi", dutch: "ook", category: "Woord" },
      { id: "m4-25", missionId: 4, french: "ce, cette", dutch: "deze, dit / die, dat", category: "Woord" },
      { id: "m4-26", missionId: 4, french: "bleu, bleue", dutch: "blauw", category: "Kleur" },
      { id: "m4-27", missionId: 4, french: "brun, brune", dutch: "bruin", category: "Kleur" },
      { id: "m4-28", missionId: 4, french: "jaune, jaune", dutch: "geel", category: "Kleur" },
      { id: "m4-29", missionId: 4, french: "mauve, mauve", dutch: "paars", category: "Kleur" },
      { id: "m4-30", missionId: 4, french: "orange, orange", dutch: "oranje", category: "Kleur" },
      { id: "m4-31", missionId: 4, french: "rose, rose", dutch: "roze", category: "Kleur" },
      { id: "m4-32", missionId: 4, french: "rouge, rouge", dutch: "rood", category: "Kleur" },
      { id: "m4-33", missionId: 4, french: "vert, verte", dutch: "groen", category: "Kleur" },
      { id: "m4-34", missionId: 4, french: "quelqu'un", dutch: "iemand", category: "Woord" },
      { id: "m4-35", missionId: 4, french: "Je n'aime pas ...", dutch: "Ik hou niet van ...", category: "Zin" },
      { id: "m4-36", missionId: 4, french: "Qu'est-ce que tu portes?", dutch: "Wat draag je?", category: "Zin" },
    ],
  },
  {
    id: 5,
    title: "Mission 5",
    subtitle: "Tu es qui?",
    emoji: "🎭",
    iconName: "Smile",
    themeColor: {
      bg: "bg-rose-500",
      border: "border-rose-400",
      badge: "bg-rose-100 text-rose-900 border-rose-300",
      light: "bg-rose-50 text-rose-800",
      gradient: "from-rose-500 via-pink-500 to-red-500",
      primary: "rose",
      cardBg: "from-rose-500 to-pink-600",
      pillBg: "bg-rose-500 text-white",
    },
    words: [
      { id: "m5-1", missionId: 5, french: "un bébé", dutch: "een baby", category: "Personen" },
      { id: "m5-2", missionId: 5, french: "un cheveu", dutch: "een haar", category: "Lichaam" },
      { id: "m5-3", missionId: 5, french: "des cheveux", dutch: "haren / haar", category: "Lichaam" },
      { id: "m5-4", missionId: 5, french: "un monsieur", dutch: "een meneer", category: "Personen" },
      { id: "m5-5", missionId: 5, french: "un homme", dutch: "een man", category: "Personen" },
      { id: "m5-6", missionId: 5, french: "un enfant", dutch: "een kind (jongen)", category: "Personen" },
      { id: "m5-7", missionId: 5, french: "une enfant", dutch: "een kind (meisje)", category: "Personen" },
      { id: "m5-8", missionId: 5, french: "une personne", dutch: "een persoon", category: "Personen" },
      { id: "m5-9", missionId: 5, french: "une dame", dutch: "een dame", category: "Personen" },
      { id: "m5-10", missionId: 5, french: "une femme", dutch: "een vrouw", category: "Personen" },
      { id: "m5-11", missionId: 5, french: "des lunettes", dutch: "een bril", category: "Voorwerp" },
      { id: "m5-12", missionId: 5, french: "une photo", dutch: "een foto", category: "Voorwerp" },
      { id: "m5-13", missionId: 5, french: "montrer", dutch: "tonen / laten zien", category: "Werkwoord" },
      { id: "m5-14", missionId: 5, french: "ne ... pas", dutch: "niet / geen", category: "Woord" },
      { id: "m5-15", missionId: 5, french: "beau, belle", dutch: "mooi (m/v)", category: "Kenmerk" },
      { id: "m5-16", missionId: 5, french: "blanc, blanche", dutch: "wit (m/v)", category: "Kenmerk" },
      { id: "m5-17", missionId: 5, french: "blond, blonde", dutch: "blond (m/v)", category: "Kenmerk" },
      { id: "m5-18", missionId: 5, french: "court, courte", dutch: "kort (m/v)", category: "Kenmerk" },
      { id: "m5-19", missionId: 5, french: "fort, forte", dutch: "sterk / luid (m/v)", category: "Kenmerk" },
      { id: "m5-20", missionId: 5, french: "grand, grande", dutch: "groot (m/v)", category: "Kenmerk" },
      { id: "m5-21", missionId: 5, french: "gris, grise", dutch: "grijs (m/v)", category: "Kenmerk" },
      { id: "m5-22", missionId: 5, french: "jeune, jeune", dutch: "jong", category: "Kenmerk" },
      { id: "m5-23", missionId: 5, french: "joli, jolie", dutch: "mooi / knap", category: "Kenmerk" },
      { id: "m5-24", missionId: 5, french: "long, longue", dutch: "lang (m/v)", category: "Kenmerk" },
      { id: "m5-25", missionId: 5, french: "noir, noire", dutch: "zwart (m/v)", category: "Kenmerk" },
      { id: "m5-26", missionId: 5, french: "nouveau, nouvelle", dutch: "nieuw (m/v)", category: "Kenmerk" },
      { id: "m5-27", missionId: 5, french: "petit, petite", dutch: "klein (m/v)", category: "Kenmerk" },
      { id: "m5-28", missionId: 5, french: "roux, rousse", dutch: "roodharig (m/v)", category: "Kenmerk" },
      { id: "m5-29", missionId: 5, french: "vieux, vieille", dutch: "oud (m/v)", category: "Kenmerk" },
      { id: "m5-30", missionId: 5, french: "J'ai les cheveux noirs.", dutch: "Ik heb zwart haar.", category: "Zin" },
    ],
  },
  {
    id: 6,
    title: "Mission 6",
    subtitle: "Tu vas où?",
    emoji: "🚲",
    iconName: "Compass",
    themeColor: {
      bg: "bg-teal-600",
      border: "border-teal-400",
      badge: "bg-teal-100 text-teal-900 border-teal-300",
      light: "bg-teal-50 text-teal-800",
      gradient: "from-teal-500 via-cyan-500 to-emerald-500",
      primary: "teal",
      cardBg: "from-teal-600 to-cyan-600",
      pillBg: "bg-teal-600 text-white",
    },
    words: [
      { id: "m6-1", missionId: 6, french: "un (auto)bus", dutch: "een (auto)bus", category: "Verkeer" },
      { id: "m6-2", missionId: 6, french: "un carrefour", dutch: "een kruispunt", category: "Verkeer" },
      { id: "m6-3", missionId: 6, french: "un coin", dutch: "een hoek", category: "Verkeer" },
      { id: "m6-4", missionId: 6, french: "les feux", dutch: "de verkeerslichten", category: "Verkeer" },
      { id: "m6-5", missionId: 6, french: "un rondpoint", dutch: "een rotonde", category: "Verkeer" },
      { id: "m6-6", missionId: 6, french: "un tram", dutch: "een tram", category: "Verkeer" },
      { id: "m6-7", missionId: 6, french: "un vélo", dutch: "een fiets", category: "Verkeer" },
      { id: "m6-8", missionId: 6, french: "un feu", dutch: "een verkeerslicht", category: "Verkeer" },
      { id: "m6-9", missionId: 6, french: "une place", dutch: "een plein", category: "Verkeer" },
      { id: "m6-10", missionId: 6, french: "une rue", dutch: "een straat", category: "Verkeer" },
      { id: "m6-11", missionId: 6, french: "droit, droite", dutch: "rechtdoor / rechts", category: "Richting" },
      { id: "m6-12", missionId: 6, french: "gauche, gauche", dutch: "links", category: "Richting" },
      { id: "m6-13", missionId: 6, french: "aider", dutch: "helpen", category: "Werkwoord" },
      { id: "m6-14", missionId: 6, french: "aller", dutch: "gaan", category: "Werkwoord" },
      { id: "m6-15", missionId: 6, french: "arriver à", dutch: "aankomen bij / toekomen", category: "Werkwoord" },
      { id: "m6-16", missionId: 6, french: "continuer", dutch: "verdergaan / rechtdoor gaan", category: "Werkwoord" },
      { id: "m6-17", missionId: 6, french: "à côté de", dutch: "naast", category: "Plaats" },
      { id: "m6-18", missionId: 6, french: "à droite", dutch: "naar rechts / rechts", category: "Richting" },
      { id: "m6-19", missionId: 6, french: "à gauche", dutch: "naar links / links", category: "Richting" },
      { id: "m6-20", missionId: 6, french: "dans", dutch: "in", category: "Plaats" },
      { id: "m6-21", missionId: 6, french: "ici", dutch: "hier", category: "Plaats" },
      { id: "m6-22", missionId: 6, french: "jusqu'à", dutch: "tot / tot aan", category: "Richting" },
      { id: "m6-23", missionId: 6, french: "là", dutch: "daar", category: "Plaats" },
      { id: "m6-24", missionId: 6, french: "loin de", dutch: "ver van", category: "Plaats" },
      { id: "m6-25", missionId: 6, french: "où?", dutch: "waar?", category: "Vraagwoord" },
      { id: "m6-26", missionId: 6, french: "près de", dutch: "dicht bij / vlakbij", category: "Plaats" },
      { id: "m6-27", missionId: 6, french: "rien", dutch: "niets", category: "Woord" },
      { id: "m6-28", missionId: 6, french: "tout droit", dutch: "rechtdoor", category: "Richting" },
      { id: "m6-29", missionId: 6, french: "C'est où?", dutch: "Waar is het?", category: "Zin" },
      { id: "m6-30", missionId: 6, french: "De rien!", dutch: "Graag gedaan!", category: "Beleefdheid" },
      { id: "m6-31", missionId: 6, french: "Excusez-moi.", dutch: "Excuseer mij. / Pardon.", category: "Beleefdheid" },
      { id: "m6-32", missionId: 6, french: "Je vais à pied.", dutch: "Ik ga te voet.", category: "Zin" },
      { id: "m6-33", missionId: 6, french: "Je vais à vélo.", dutch: "Ik ga met de fiets.", category: "Zin" },
      { id: "m6-34", missionId: 6, french: "Je vais en bus.", dutch: "Ik ga met de bus.", category: "Zin" },
      { id: "m6-35", missionId: 6, french: "Je vais en trams.", dutch: "Ik ga met de tram.", category: "Zin" },
      { id: "m6-36", missionId: 6, french: "Merci!", dutch: "Dank je! / Bedankt!", category: "Beleefdheid" },
      { id: "m6-37", missionId: 6, french: "Où est ...?", dutch: "Waar is ...?", category: "Zin" },
      { id: "m6-38", missionId: 6, french: "Prends le bus.", dutch: "Neem de bus.", category: "Zin" },
      { id: "m6-39", missionId: 6, french: "Prenez la première rue à droite.", dutch: "Neem de eerste straat rechts.", category: "Zin" },
      { id: "m6-40", missionId: 6, french: "Vous pouvez m'aider?", dutch: "Kunt u mij helpen?", category: "Zin" },
      { id: "m6-41", missionId: 6, french: "premier, première", dutch: "eerste (m/v)", category: "Rangtelwoord" },
      { id: "m6-42", missionId: 6, french: "deuxième", dutch: "tweede", category: "Rangtelwoord" },
      { id: "m6-43", missionId: 6, french: "troisième", dutch: "derde", category: "Rangtelwoord" },
      { id: "m6-44", missionId: 6, french: "quatrième", dutch: "vierde", category: "Rangtelwoord" },
    ],
  },
];

// Helper to get all words combined
export const ALL_WORDS: VocabItem[] = MISSIONS_DATA.flatMap((m) => m.words);

// Speech synthesis helper for clean pronunciation in French
export function speakFrench(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  
  // Clean text of parentheses or slashes for cleaner pronunciation
  const cleanText = text
    .replace(/\(le\)/gi, "le")
    .replace(/\(auto\)bus/gi, "autobus")
    .replace(/\(vision\)/gi, "vision")
    .replace(/\//g, " ");

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = "fr-FR";
  utterance.rate = 0.85; // slightly slower for young language learners
  
  // Try to find a French voice
  const voices = window.speechSynthesis.getVoices();
  const frVoice = voices.find(v => v.lang.startsWith("fr") || v.lang.includes("FR"));
  if (frVoice) {
    utterance.voice = frVoice;
  }
  
  window.speechSynthesis.speak(utterance);
}
