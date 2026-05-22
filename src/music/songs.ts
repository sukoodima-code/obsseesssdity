export type Genre =
  | "Q-pop"
  | "Қазақша Lo-Fi"
  | "Домбыра Fusion"
  | "Indie Qazaq"
  | "Hip-Hop"
  | "Trap"
  | "Folk"
  | "Electronic"
  | "Chillwave"
  | "Ambient"
  | "Night Drive"
  | "Cinematic"
  | "Study Beats"
  | "Acoustic"
  | "Soul"
  | "Jazz Fusion"
  | "Phonk Qazaq"
  | "Sad Vibes"
  | "Relax"
  | "Synthwave";

export type Mood =
  | "Chill"
  | "Night"
  | "Focus"
  | "Dreamy"
  | "Melancholic"
  | "Energetic"
  | "Soulful"
  | "Ambient"
  | "Uplifting"
  | "Driving"
  | "Relaxed"
  | "Cinematic";

export type Song = {
  id: string;
  title: string;
  artist: string;
  genre: Genre;
  mood: Mood;
  durationSec: number;
  plays: number;
  likes: number;
  coverUrl: string;
  audioUrl: string;
  description: string;
  sunoPrompt: string;
};

export const MOODS: { id: Mood; label: string }[] = [
  { id: "Chill", label: "Chill" },
  { id: "Night", label: "Night" },
  { id: "Focus", label: "Focus" },
  { id: "Dreamy", label: "Dreamy" },
  { id: "Melancholic", label: "Melancholic" },
  { id: "Energetic", label: "Energetic" },
  { id: "Soulful", label: "Soulful" },
  { id: "Ambient", label: "Ambient" },
  { id: "Uplifting", label: "Uplifting" },
  { id: "Driving", label: "Driving" },
  { id: "Relaxed", label: "Relaxed" },
  { id: "Cinematic", label: "Cinematic" }
];

export const GENRES: { id: "all" | Genre; label: string }[] = [
  { id: "all", label: "Барлығы" },
  { id: "Q-pop", label: "Q-pop" },
  { id: "Қазақша Lo-Fi", label: "Қазақша Lo-Fi" },
  { id: "Домбыра Fusion", label: "Домбыра Fusion" },
  { id: "Indie Qazaq", label: "Indie Qazaq" },
  { id: "Hip-Hop", label: "Hip-Hop" },
  { id: "Trap", label: "Trap" },
  { id: "Folk", label: "Folk" },
  { id: "Electronic", label: "Electronic" },
  { id: "Chillwave", label: "Chillwave" },
  { id: "Ambient", label: "Ambient" },
  { id: "Night Drive", label: "Night Drive" },
  { id: "Cinematic", label: "Cinematic" },
  { id: "Study Beats", label: "Study Beats" },
  { id: "Acoustic", label: "Acoustic" },
  { id: "Soul", label: "Soul" },
  { id: "Jazz Fusion", label: "Jazz Fusion" },
  { id: "Phonk Qazaq", label: "Phonk Qazaq" },
  { id: "Sad Vibes", label: "Sad Vibes" },
  { id: "Relax", label: "Relax" },
  { id: "Synthwave", label: "Synthwave" }
];

export const SONGS: Song[] = [
  {
    id: "s01",
    title: "Түнгі Алматы",
    artist: "Aru Wave",
    genre: "Қазақша Lo-Fi",
    mood: "Chill",
    durationSec: 204,
    plays: 284920,
    likes: 48291,
    coverUrl: "/covers/almaty-night.svg",
    audioUrl: "/music/s01-almaty-night.wav",
    description: "Түнгі Алматы атмосферасындағы жұмсақ lo-fi әуен, қала шамдары мен терең ойларды біріктіретін трек.",
    sunoPrompt: "қазақша lo-fi, жұмсақ домбыра текстурасы, atmospheric pads, chill beat, emotional female vocals, түнгі Алматы vibe, cinematic reverb"
  },
  {
    id: "s02",
    title: "Көкжиек",
    artist: "Zarif & Aigerim",
    genre: "Chillwave",
    mood: "Dreamy",
    durationSec: 197,
    plays: 178340,
    likes: 26350,
    coverUrl: "/covers/kokjiek.svg",
    audioUrl: "/music/s02-kokjiek.wav",
    description: "Сәулелі синтезаторлар мен жылы вокалдар арқылы көкжиекті анықтайтын ашық, армандайтын мелодия.",
    sunoPrompt: "dreamy chillwave, warm synth textures, Kazakh female vocals, soft electric guitar, sunset horizon, emotional reverb"
  },
  {
    id: "s03",
    title: "Жаңбыр",
    artist: "K:sBek",
    genre: "Ambient",
    mood: "Relaxed",
    durationSec: 225,
    plays: 134890,
    likes: 19970,
    coverUrl: "/covers/zhanbyr.svg",
    audioUrl: "/music/s03-zhanbyr.wav",
    description: "Сырлы жаңбыр дыбыстары мен жұмсақ синтезаторлар қала мен дала аралығындағы тыныштықты ашады.",
    sunoPrompt: "Kazakh ambient rainscape, soft synth pads, distant dombyra hum, cinematic atmosphere, mellow piano, tranquil mood"
  },
  {
    id: "s04",
    title: "Nomad Dreams",
    artist: "Soley Nazar",
    genre: "Electronic",
    mood: "Night",
    durationSec: 210,
    plays: 312460,
    likes: 52910,
    coverUrl: "/covers/nomad-dreams.svg",
    audioUrl: "/music/s04-nomad-dreams.wav",
    description: "Заманауи электрондық beat арқылы көшпелі дәстүр мен қалалық түнді біріктіретін динамикалық әуен.",
    sunoPrompt: "Kazakh electronic, pulsing bass, airy synth leads, modern AI production, nomad dreamscape, cinematic night drive"
  },
  {
    id: "s05",
    title: "Дала тынысы",
    artist: "Sazãr",
    genre: "Folk",
    mood: "Soulful",
    durationSec: 232,
    plays: 158720,
    likes: 27130,
    coverUrl: "/covers/dala-tynysy.svg",
    audioUrl: "/music/s05-dala-tynysy.wav",
    description: "Домбыра мен сыбызғы арқылы дала әуені мұңды да мекендік, ұлттық жүректерді қозғайды.",
    sunoPrompt: "Kazakh folk, acoustic dombyra, soulful flute, deep bass pulse, nomadic spirit, emotional vocal phrase, cinematic folk ambience"
  },
  {
    id: "s06",
    title: "Қала шамдары",
    artist: "Aman A.",
    genre: "Night Drive",
    mood: "Driving",
    durationSec: 188,
    plays: 226540,
    likes: 39480,
    coverUrl: "/covers/qala-shamdy.svg",
    audioUrl: "/music/s06-qala-shamdy.wav",
    description: "Неон шамдардың астындағы қала көшелері үшін жаралған түнгі драйв трегі.",
    sunoPrompt: "night drive synthwave, urban Kazakh vibe, neon keys, rhythmic hi-hats, cinematic city lights, driving bass"
  },
  {
    id: "s07",
    title: "Аспан",
    artist: "Aida Sol",
    genre: "Cinematic",
    mood: "Uplifting",
    durationSec: 243,
    plays: 147800,
    likes: 21890,
    coverUrl: "/covers/aspan.svg",
    audioUrl: "/music/s07-aspan.wav",
    description: "Ғарыштық кеңістікте қалықтағандай, жарқын струндар мен болжамды ритмдер әсерін береді.",
    sunoPrompt: "Kazakh cinematic, orchestral synth, uplifting strings, emotive female vocals, wide cinematic sound design, radiant sky atmosphere"
  },
  {
    id: "s08",
    title: "Midnight Steppe",
    artist: "Orda Pulse",
    genre: "Synthwave",
    mood: "Night",
    durationSec: 196,
    plays: 247010,
    likes: 43270,
    coverUrl: "/covers/midnight-steppe.svg",
    audioUrl: "/music/s08-midnight-steppe.wav",
    description: "Синтволдар мен ескі қала ауасының байланысы арқылы түнгі дала́ға арналған synthwave композиция.",
    sunoPrompt: "synthwave Kazakhstan, glowing arpeggios, vintage bass, night steppe skyline, cinematic reverbs, neon nostalgia"
  },
  {
    id: "s09",
    title: "Еркіндік",
    artist: "Dombra Drop",
    genre: "Домбыра Fusion",
    mood: "Energetic",
    durationSec: 183,
    plays: 198520,
    likes: 34410,
    coverUrl: "/covers/erkindik.svg",
    audioUrl: "/music/s09-erkindik.wav",
    description: "Домбыра фьюжн және қатты синтезаторлар еркіндік сезімін ұялатады.",
    sunoPrompt: "Kazakh dombyra fusion, percussive acoustic strings, modern synth power, energetic beat, emotional rhythm, festival energy"
  },
  {
    id: "s10",
    title: "Сағым",
    artist: "Qazaq Sol",
    genre: "Sad Vibes",
    mood: "Melancholic",
    durationSec: 218,
    plays: 163420,
    likes: 28540,
    coverUrl: "/covers/sagym.svg",
    audioUrl: "/music/s10-sagym.wav",
    description: "Мұңды сыбызғы мен жұмсақ синтезаторлар арқылы алыстағы сағынуды әкелетін трек.",
    sunoPrompt: "Kazakh sad vibes, mellow dombyra, lingering synth, emotional vocals, cinematic longing, soft beat"
  },
  {
    id: "s11",
    title: "Ай сәулесі",
    artist: "Nora Zh",
    genre: "Acoustic",
    mood: "Dreamy",
    durationSec: 201,
    plays: 132440,
    likes: 21120,
    coverUrl: "/covers/ai-sauelesi.svg",
    audioUrl: "/music/s11-ai-sauelesi.wav",
    description: "Жұмсақ гитара мен әуенді әуен арқылы айдың жарығында армандарға қанат бітіреді.",
    sunoPrompt: "Kazakh acoustic ballad, warm guitar, tender vocals, moonlit mood, soft atmosphere, cinematic simplicity"
  },
  {
    id: "s12",
    title: "Almaty Nights",
    artist: "Neon Nomad",
    genre: "Q-pop",
    mood: "Night",
    durationSec: 189,
    plays: 271030,
    likes: 46120,
    coverUrl: "/covers/almaty-nights.svg",
    audioUrl: "/music/s12-almaty-nights.wav",
    description: "Қала түнінде Q-pop ритмі мен неон түстері бірге жарқырайды.",
    sunoPrompt: "Q-pop night anthem, bright synth leads, catchy chorus, polished pop production, Kazakh vocals, city lights energy"
  },
  {
    id: "s13",
    title: "Silk Road Dreams",
    artist: "Zaman Flow",
    genre: "Jazz Fusion",
    mood: "Ambient",
    durationSec: 235,
    plays: 119680,
    likes: 17850,
    coverUrl: "/covers/silk-road-dreams.svg",
    audioUrl: "/music/s13-silk-road-dreams.wav",
    description: "Студиялық саксофон мен кельттен шабыттанған әуендер арқылы жаңа дәуірдің Silk Road саяхатын ашады.",
    sunoPrompt: "Kazakh jazz fusion, smoky sax, cinematic electric piano, ambient textures, nomadic storytelling, polished production"
  },
  {
    id: "s14",
    title: "Steppe Echo",
    artist: "Tulpar Beats",
    genre: "Trap",
    mood: "Energetic",
    durationSec: 172,
    plays: 214120,
    likes: 38140,
    coverUrl: "/covers/steppe-echo.svg",
    audioUrl: "/music/s14-steppe-echo.wav",
    description: "Трап-продакшн мен дала бұғаздарының ұқсастығы арқылы қатты қуатты шеру атмосферасын жасайды.",
    sunoPrompt: "Kazakh trap beat, hard 808s, sharp dombyra stabs, emotional rap cadence, cinematic atmosphere, club-ready energy"
  },
  {
    id: "s15",
    title: "Neon Nomad",
    artist: "Luna Q",
    genre: "Electronic",
    mood: "Night",
    durationSec: 207,
    plays: 241580,
    likes: 41820,
    coverUrl: "/covers/neon-nomad.svg",
    audioUrl: "/music/s15-neon-nomad.wav",
    description: "Қала мен дала арасында шексіз жүрісті бейнелейтін электронды, жарық толы трек.",
    sunoPrompt: "Kazakh electronic anthem, bright synth textures, melodic lead, night drive energy, polished modern production"
  },
  {
    id: "s16",
    title: "Qazaq Vibes",
    artist: "Arman K.",
    genre: "Indie Qazaq",
    mood: "Relaxed",
    durationSec: 193,
    plays: 166820,
    likes: 24750,
    coverUrl: "/covers/qazaq-vibes.svg",
    audioUrl: "/music/s16-qazaq-vibes.wav",
    description: "Инди-тондар мен қазақша мәтіндер арқылы жайлы қайталанбас деңгей жасайтын композиция.",
    sunoPrompt: "Indie Kazakh vocals, warm acoustic layers, gentle percussion, relaxed mood, modern indie production"
  },
  {
    id: "s17",
    title: "Dombyra Soul",
    artist: "Saz & Synth",
    genre: "Домбыра Fusion",
    mood: "Soulful",
    durationSec: 220,
    plays: 189350,
    likes: 31240,
    coverUrl: "/covers/dombyra-soul.svg",
    audioUrl: "/music/s17-dombyra-soul.wav",
    description: "Домбыра мен синтетикалық падтармен толтырылған, жүрекке жылы тиетін әуен.",
    sunoPrompt: "Kazakh dombyra soul, lush synth pads, smooth rhythm, emotional vocal hook, cinematic fusion groove"
  },
  {
    id: "s18",
    title: "Жүрек үні",
    artist: "Gulnar",
    genre: "Soul",
    mood: "Melancholic",
    durationSec: 208,
    plays: 153900,
    likes: 29210,
    coverUrl: "/covers/zhurek-uni.svg",
    audioUrl: "/music/s18-zhurek-uni.wav",
    description: "Жүректің үнін ерекше дауыстың күші және жұмсақ оркестралық әсері арқылы жеткізеді.",
    sunoPrompt: "Kazakh soul ballad, tender vocals, warm strings, mellow groove, cinematic subtlety, emotional depth"
  },
  {
    id: "s19",
    title: "Сезім",
    artist: "Aruzhan",
    genre: "Q-pop",
    mood: "Uplifting",
    durationSec: 186,
    plays: 202700,
    likes: 36250,
    coverUrl: "/covers/sezim.svg",
    audioUrl: "/music/s19-sezim.wav",
    description: "Жарық қоңыр әуендер мен поп элементтері сезімді жеңіл әрі энергиялы етеді.",
    sunoPrompt: "Q-pop emotional hit, bright chorus, polished pop production, Kazakh girl group energy, uplifting atmosphere"
  },
  {
    id: "s20",
    title: "Lonely Astana",
    artist: "Berik",
    genre: "Sad Vibes",
    mood: "Night",
    durationSec: 212,
    plays: 172560,
    likes: 27840,
    coverUrl: "/covers/lonely-astana.svg",
    audioUrl: "/music/s20-lonely-astana.wav",
    description: "Үлкен қаланың кешкі толғанысын көрсететін мұңды электронды-композиция.",
    sunoPrompt: "Sad Kazakh city ballad, atmospheric synth, distant vocals, slow beat, cinematic loneliness, night lights"
  },
  {
    id: "s21",
    title: "Rainy Streets",
    artist: "Astana Drift",
    genre: "Chillwave",
    mood: "Chill",
    durationSec: 201,
    plays: 197820,
    likes: 31870,
    coverUrl: "/covers/rainy-streets.svg",
    audioUrl: "/music/s21-rainy-streets.wav",
    description: "Жаңбырлы көшелер мен неон шамдардың жарығын музыкалық тыныштықпен жеткізеді.",
    sunoPrompt: "rainy chillwave, ambient city textures, slow synth groove, Kazakh vocal echoes, cinematic wet streets"
  },
  {
    id: "s22",
    title: "City Lights",
    artist: "Skyline Q",
    genre: "Night Drive",
    mood: "Driving",
    durationSec: 190,
    plays: 231390,
    likes: 40960,
    coverUrl: "/covers/city-lights.svg",
    audioUrl: "/music/s22-city-lights.wav",
    description: "Түнгі қала шырақтары мен жылдам жүрісті көрсететін жанды трек.",
    sunoPrompt: "night drive synth, neon city lights, fast pulse, Kazakh contemporary energy, cinematic urban beat"
  },
  {
    id: "s23",
    title: "Deep Steppe",
    artist: "Nomad Collective",
    genre: "Ambient",
    mood: "Cinematic",
    durationSec: 238,
    plays: 142650,
    likes: 21530,
    coverUrl: "/covers/deep-steppe.svg",
    audioUrl: "/music/s23-deep-steppe.wav",
    description: "Асыра табиғи атмосфера мен кең дала дыбыстарынан тұратын шынайы степпе саундтрек.",
    sunoPrompt: "ambient steppe atmosphere, wide pads, gentle acoustic textures, cinematic Kazakh landscape, emotional slow build"
  },
  {
    id: "s24",
    title: "Shanyraq",
    artist: "Jazu",
    genre: "Folk",
    mood: "Soulful",
    durationSec: 218,
    plays: 158430,
    likes: 27190,
    coverUrl: "/covers/shanyraq.svg",
    audioUrl: "/music/s24-shanyraq.wav",
    description: "Шаңырақтың жылы тынысымен үндесетін ұлттық әуен, домбыра мен вокал арқылы.",
    sunoPrompt: "Kazakh folk ballad, dombyra intimacy, warm vocals, cinematic homestead atmosphere, soulful textures"
  },
  {
    id: "s25",
    title: "Samal",
    artist: "Nurbek",
    genre: "Study Beats",
    mood: "Focus",
    durationSec: 186,
    plays: 176520,
    likes: 29940,
    coverUrl: "/covers/samal.svg",
    audioUrl: "/music/s25-samal.wav",
    description: "Тыныш әрі динамикалық study beat, зейінді арттыруға және саяхат сезімін беруге арналған.",
    sunoPrompt: "study beats Kazakhstan, soft piano, clean percussion, ambient synth layers, focused energy, minimal Kazakh vocal sample"
  },
  {
    id: "s26",
    title: "Aurora Kazakh",
    artist: "Aurora Q",
    genre: "Synthwave",
    mood: "Night",
    durationSec: 204,
    plays: 189140,
    likes: 33010,
    coverUrl: "/covers/aurora-kazakh.svg",
    audioUrl: "/music/s26-aurora-kazakh.wav",
    description: "Ұшатын синтезаторлар мен салқын түстер әлемін көрсететін synthwave атмосфера.",
    sunoPrompt: "synthwave aurora, Kazakh melodic lead, shimmering arpeggios, lush pads, night drive energy, cinematic nostalgia"
  },
  {
    id: "s27",
    title: "Sunset Dombyra",
    artist: "Saida",
    genre: "Acoustic",
    mood: "Relaxed",
    durationSec: 215,
    plays: 148300,
    likes: 22560,
    coverUrl: "/covers/sunset-dombyra.svg",
    audioUrl: "/music/s27-sunset-dombyra.wav",
    description: "Күн батқандағы домбыра шырқалысы мен жылы акустикалық атмосфераның үйлесімі.",
    sunoPrompt: "acoustic Kazakh sunset, gentle dombyra, soft acoustic guitar, warm vocals, relaxed ambience, cinematic evening"
  },
  {
    id: "s28",
    title: "Astana Flow",
    artist: "Batyr Beat",
    genre: "Hip-Hop",
    mood: "Energetic",
    durationSec: 181,
    plays: 243760,
    likes: 39720,
    coverUrl: "/covers/astana-flow.svg",
    audioUrl: "/music/s28-astana-flow.wav",
    description: "Қалалық хип-хоп ритмі мен қазақ тіліндегі батырлы мәтіндер қала пульсын береді.",
    sunoPrompt: "Kazakh hip-hop, punchy 808s, assertive rap flow, cinematic bass, urban nights, modern production"
  },
  {
    id: "s29",
    title: "Phonk Qazaq",
    artist: "Saryphonk",
    genre: "Phonk Qazaq",
    mood: "Driving",
    durationSec: 169,
    plays: 221980,
    likes: 38105,
    coverUrl: "/covers/phonk-qazaq.svg",
    audioUrl: "/music/s29-phonk-qazaq.wav",
    description: "Қазақ дәстүрі мен фо́нк дыбыстарының бірінші рет туындаған энергиясы.",
    sunoPrompt: "Kazakh phonk, vintage vocal chops, deep 808s, night drive groove, cinematic smoke-filled streets, raw energy"
  }
];
