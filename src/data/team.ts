export type TeamMember = {
  name: string;
  role: string;
  image: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
};

export type TeamByYear = Record<string, TeamMember[]>;

// Centralized team data used by Team page and Login lookup
export const teamByYear: TeamByYear = {
  "4th Year": [
    {
      name: "Shivam Deo",
      role: "President",
      image: "/images/4Shivam Deo.jpg",
      email: "shivam@soaringeagles.com",
      linkedin: "https://www.linkedin.com/in/shivam-deo ",
      twitter: "https://x.com/_shivam_deo_?t=-O3Ghml9FtTWWr-HisHTbQ&s=09",
    },
    {
      name: "Mohammad Yasir Abbasi",
      role: "Vice-President",
      image: "/images/4Yasir Abbasi.jpeg",
      email: "officialyasir06@gmail.com",
      linkedin: "https://www.linkedin.com/in/mohammad-yasir-abbasi-27b918259",
      twitter: "",
    },
    {
      name: "Mihika Pallavi",
      role: "Treasurer",
      image: "/images/4Mihika.jpg",
      email: "pallavi.mihika22@gmail.com",
      linkedin: "https://www.linkedin.com/in/mihika-pallavi22",
      twitter: "https://x.com/@Mihika_022",
    },
    {
      name: "Aditya D V",
      role: "Automation Head",
      image: "/images/4Aditya D V.jpeg",
      email: "aditya24082004@gmail.com",
      linkedin: "https://www.linkedin.com/in/aditya-d-v-740ba7259?trk=contact-info",
      twitter: "https://x.com/AdityaDV2",
    },
    {
      name: "Sumanth Gowda",
      role: "Design head",
      image: "/images/4Sumanth (1).jpg",
      email: "gowdasumanth8@gmail.com",
      linkedin: "https://www.linkedin.com/in/sumanth-gowda-s-l-a23b5b200?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
      twitter: " https://x.com/Sumanth_10101?t=_LPEM_giOVka9Bbpd_9s3Q&s=08 ",
    },
  ],
  "3rd Year": [
    {
      name: "Siddith R Shetty",
      role: "Automation",
      image: "/images/3SiddithRShetty.jpg",
      email: "sidshettyedu@gmail.com",
      linkedin: "https://www.linkedin.com/in/siddith01 ",
      twitter: "https://x.com/Siddith3",
    },
    {
      name: "Prasun",
      role: "Automation",
      image: "/images/3Prasun.jpg",
      email: "prasun7483@gmail.com",
      linkedin:
      "https://www.linkedin.com/in/prasun-nandikol-400359292?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      twitter: "https://x.com/prasun015",
    },
    {
      name: "H S Shreyas",
      role: "Automation",
      image: "/images/3hsshreyas.jpg",
      email: "hsshreyas05@gmail.com",
      linkedin: "https://www.linkedin.com/in/hsshreyas",
      twitter: "https://x.com/hsshreyas11",
    },
    {
      name: "Jagadeep Reddy",
      role: "Automation",
      image: "/images/3 jagadeep reddy.jpg",
      email: "jagadeep.bsg@gmail.com",
      linkedin: "https://www.linkedin.com/in/devireddy-venkata-jagadeep-reddy-760029284?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      twitter: "https://x.com/Itzz_jagadeep?t=2dr3EMofHHRmlEyvoNKh2w&s=09",
    },
    {
      name: "Yemula VenkatKarthikeyan",
      role: "Automation",
      image: "/images/3 Yemula VenkatKarthikeyan.jpg",
      email: "venkatkarthikeyandec@gmail.com",
      linkedin: "https://www.linkedin.com/in/venkat-karthikeyan-587a1b272?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      twitter: "https://x.com/VenkatKart39190?t=urory_qBXE-0X5RDSthYnw&s=09",
    },
    {
      name: "Himanshu Aditya",
      role: "Avionics",
      image: "/images/3Himanshu.jpg",
      email: "himanshuaditya81@gmail.com",
      linkedin: "http://www.linkedin.com/in/himanshu-aditya-ba018b339",
      twitter: "https://x.com/HIMANSHUADITY10",
    },
    {
      name: "Pratham Srivastava",
      role: "Avionics",
      image: "/images/3.pratham.jpg",
      email: "prathamsrivastava915@gmail.com",
      linkedin:
        "https://www.linkedin.com/in/pratham-srivastava-a49712283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      twitter: "https://x.com/PrathamSri19264?t=uh2npMw1q1togY299aalWg&s=09",
    },
    {
      name: "Shivansh Saurav",
      role: "Avionics",
      image: "/images/3ShivanshSaurav.jpg",
      email: "shivansh342@gmail.com",
      linkedin: "",
      twitter: "https://x.com/PropnoaZoro?t=CzuyYKwb6TyUBT2bwKJJEg&s=09",
    },
    {
      name: "Yashas N C",
      role: "Avionics",
      image: "/images/3Yashas .N.C.jpg",
      email: "yashas2005100@gmail.com",
      linkedin: "https://www.linkedin.com/in/yashas-n-c?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      twitter: "https://x.com/yashas_ync?t=YDH_P_pgM4hJsuNEL_ftRQ&s=09",
    },
    {
      name: "Lekha Kumaraswamy",
      role: "Aerodynamics",
      image: "/images/3Lekha.jpg",
      email: "lekhakumaraswamy@gmail.com",
      linkedin: "https://www.linkedin.com/in/lekha-kumaraswamy-2a6b79334?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      twitter: "https://x.com/Lekha1511?t=v_gqB3hc82TZCYIENgWJTQ&s=09",
    },
    {
      name: "Pranav A Uppoor",
      role: "Aerodynamics",
      image: "/images/3Pranav.jpeg",
      email: "pranav.a.uppoor@gmail.com",
      linkedin: "",
      twitter: "",
    },
    {
      name: "Shreyas C S",
      role: "Aerodynamics",
      image: "/images/3ShreyasCS.jpg",
      email: "shreyascs2005sit@gmail.com",
      linkedin: "",
      twitter: "https://x.com/@ShreyasCS12",
    },
  ],
  "2nd Year": [
    {
      name: "Mourya N",
      role: "Aerodynamics",
      image: "/images/2Mourya.jpg",
      email: "nmouryasit@gmail.com",
      linkedin: "https://www.linkedin.com/in/mourya-n-b39836378",
      twitter:
        "https://x.com/OutlookMourya?t=aH2hJjy8xEoJHbEJMpWM1g&s=09",
    },
    {
      name: "Kalavati Tadasur",
      role: "Aerodynamics",
      image: "/images/2kalavtati.jpg",
      email: "kalavatitadasur21@gmail.com",
      linkedin: "https://www.linkedin.com/in/kalavati-tadasur-b23541330",
      twitter: "https://x.com/Kalavati_21?t=X9QnyLlyjOOovlvpQNfNLg&s=09",
    },
    {
      name: "Adhirath Kyatarmal",
      role: "Automation",
      image: "/images/2Adhirath Katyarmal.jpg",
      email: "adhirathkatyarmal@gmail.com",
      linkedin: "https://www.linkedin.com/in/adhirath-k-9581b2341?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      twitter: "",
    },
    {
      name: "Aryan Gupta",
      role: "Automation",
      image: "/images/2AryanGupta.jpg",
      email: "aryan19832025@gmail.com",
      linkedin: "https://www.linkedin.com/in/aryan-gupta-4893b6329",
      twitter: "https://x.com/@aryan20242011",
    },
    {
      name: "Aditya Mallapur",
      role: "Avionics",
      image: "/images/2Aditya MAllapur.jpg",
      email: "adityam.veer@gmail.com",
      linkedin: "https://www.linkedin.com/in/aditya-mallapur-407917342?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      twitter: "https://x.com/GKWDIEH",
    },

  ],
  "1st Year": [],
};

export const getAllMembers = (): TeamMember[] =>
  Object.values(teamByYear).flat();


