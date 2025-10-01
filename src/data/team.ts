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
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      email: "shivam@soaringeagles.com",
      linkedin: "https://linkedin.com/in/shivamdeo",
      twitter: "https://twitter.com/shivamdeo",
    },
    {
      name: "Mohammad Yasir Abbasi",
      role: "Vice-President",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yasir",
      email: "yasir@soaringeagles.com",
      linkedin: "https://linkedin.com/in/yasirabbasi",
      twitter: "https://twitter.com/yasirabbasi",
    },
    {
      name: "Mihika Pallavi",
      role: "Treasurer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mihika",
      email: "pallavi.mihika22@gmail.com",
      linkedin: "https://www.linkedin.com/in/mihika-pallavi22",
      twitter: "https://x.com/@Mihika_022",
    },
    {
      name: "Adithya D V",
      role: "Automation Head",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adithya",
      email: "adithya@soaringeagles.com",
      linkedin: "https://linkedin.com/in/adithyadv",
      twitter: "https://twitter.com/adithyadv",
    },
    {
      name: "Sumanth",
      role: "Design head",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sumanth",
      email: "sumanth@soaringeagles.com",
      linkedin: "https://linkedin.com/in/sumanth",
      twitter: "https://twitter.com/sumanth",
    },
  ],
  "3rd Year": [
    {
      name: "Siddith R Shetty",
      role: "Automation",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      email: "sidshettyedu@gmail.com",
      linkedin: "https://www.linkedin.com/in/siddith01 ",
      twitter: "https://x.com/Siddith3",
    },
    {
      name: "Prasun Nandikol",
      role: "Automation",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      email: "prasun7483@gmail.com",
      linkedin:
        "https://www.linkedin.com/in/prasun-nandikol-400359292?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      twitter: "https://x.com/prasun015",
    },
    {
      name: "Himanshu Aditya",
      role: "Avionics",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
      email: "himanshuaditya81@gmail.com",
      linkedin: "http://www.linkedin.com/in/himanshu-aditya-ba018b339",
      twitter: "https://x.com/HIMANSHUADITY10",
    },
    {
      name: "Pratham Srivastava",
      role: "Avionics",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
      email: "prathamsrivastava915@gmail.com",
      linkedin:
        "https://www.linkedin.com/in/pratham-srivastava-a49712283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      twitter: "https://x.com/PrathamSri19264?t=uh2npMw1q1togY299aalWg&s=09",
    },
    {
      name: "H S Shreyas",
      role: "Automation",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
      email: "ryan@soaringeagles.com",
      linkedin: "https://www.linkedin.com/in/hsshreyas",
      twitter: "https://x.com/hsshreyas11",
    },
    {
      name: "Ryan Anderson",
      role: "Testing Team",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
      email: "ryan@soaringeagles.com",
      linkedin: "https://linkedin.com/in/ryananderson",
      twitter: "https://twitter.com/ryananderson",
    },
  ],
  "2nd Year": [
    {
      name: "Mourya N",
      role: "Aerodynamics",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
      email: "nmouryasit@gmail.com",
      linkedin: "https://www.linkedin.com/in/mourya-n-b39836378",
      twitter:
        "https://x.com/OutlookMourya?t=aH2hJjy8xEoJHbEJMpWM1g&s=09",
    },
    {
      name: "Kalavati Ta",
      role: "Aerodynamics",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
      email: "kalavatitadasur21@gmail.com",
      linkedin: "https://www.linkedin.com/in/kalavati-tadasur-b23541330",
      twitter: "https://x.com/Kalavati_21?t=X9QnyLlyjOOovlvpQNfNLg&s=09",
    },
  ],
  "1st Year": [],
};

export const getAllMembers = (): TeamMember[] =>
  Object.values(teamByYear).flat();


