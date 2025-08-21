import { css, drizzleorm, figma, flutter, git, html, javascript, laravel, mongodb, nextjs, nodejs, postgresql, reactjs, redux, tailwind, typescript, zustand } from "../assets";



const experiences = [
    {
        title: "React.js",
        icon: reactjs,
        iconBg: "#383E56",
        points: [
            "Developing and maintaining web applications using React.js",
            "React Routing, State Hooks, useEffects, Data Fetching, Authentication, Private Route.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
    {
      title: "Mongodb",
      icon: mongodb,
      iconBg: "#383E56",
      points: [
          "Store Data files with React Node js in MongoDB",
          "Managing Data",
          "Handling Clusters",
          "Connect with nodejs backend"
      ],
    },
    {
        title: "Laravel",
        icon: laravel,
        iconBg: "#E6DEDD",
        points: [
            "Developing and maintaining web applications using html css javascript .",
            "Authentication with breeze and jetstream .",
            "Livewire, Routing, Table create, model creating, Controller creating, mysql Database .",
            "Implementing responsive design and ensuring cross-browser compatibility .",
            "Participating in code reviews and providing constructive feedback to other developers .",
        ],
    },
    {
      title: "Flutter",
      icon: flutter,
      iconBg: "#383E56",
      points: [
        "Developing and maintaining mobile applications using Flutter.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback to other developers.",
      ],
    },
    {
        title: "Next js",
        icon: nextjs,
        iconBg: "#383E56",
        points: [
          "Developing and maintaining web applications using Next.js",
          "Next Routing, Hooks, useEffects, Data Fetching, Next-Auth, Private Route.",
          "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
          "Implementing responsive design and ensuring cross-browser compatibility.",
          "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
    {
      title: "Drizzle ORM",
      icon: drizzleorm,
      iconBg: "#E6DEDD",
      points: [
        "Developing and maintaining web applications using Drizzle ORM",
        "React Routing, State Hooks, useEffects, Data Fetching, Authentication, Private Route.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback to other developers.",
      ],
    },
    {
      title: "PostgreSQL",
      icon: postgresql,
      iconBg: "#E6DEDD",
      points: [
        "Developing and maintaining web applications using PostgreSQL",
        "React Routing, State Hooks, useEffects, Data Fetching, Authentication, Private Route.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback to other developers.",
      ],
    },
    {
        title: "Node Js",
        icon: nodejs,
        iconBg: "#383E56",
        points: [
            "Creating Api Create Read Update Delete",
            "Connect with Database",
            "Creating Server Hosting Link"
        ],
    },
    {
        title: "Git",
        icon: git,
        iconBg: "#E6DEDD",
        points: [
            "Store Files in Git from project",
            "Git Version Control",
            "Creating Branches",
        ],
    },
];

const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "Flutter",
      icon: flutter,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Next",
      icon: nextjs,
    },
    {
      name: "PostgreSQL",
      icon: postgresql,
    },
    {
      name: "Drizzle ORM",
      icon: drizzleorm,
    },
    {
      name: "Zustand",
      icon: zustand,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "git",
      icon: git,
    },

  ];

  const projects = [
    {
      name: "Brand-Shop",
      description: "Electronics Store Where Users Can add new products, update products and delete products, login system with firebase.",
      tags: [
        {
          name: "daisyUI",
          color: "pink-text-gradient"
        },
        {
          name: "ReactJS",
          color: "blue-text-gradient"
        },
        {
          name: "Firebase",
          color: "green-text-gradient"
        },
        {
          name: "NodeJS",
          color: "orange-text-gradient"
        },
        {
          name: "MongoDB",
          color: "green-text-gradient"
        }
      ],
      image: html,
      source_code_link: "https://ecomercestore-8b8da.web.app/",
    },
    {
      name: "Online-Group-Study",
      description: "Post and Rating Platform for assignment where user can post their assignment and delete their assignment.Other user can give number to the assignment. Login system with firebase.",
      tags: [
        {
          name: "daisyUI",
          color: "pink-text-gradient"
        },
        {
          name: "Framer-Motion",
          color: "green-text-gradient"
        },
        {
          name: "ReactJS",
          color: "blue-text-gradient"
        },
        {
          name: "Firebase",
          color: "green-text-gradient"
        },
        {
          name: "NodeJS",
          color: "orange-text-gradient"
        },
        {
          name: "MongoDB",
          color: "green-text-gradient"
        }
      ],
      image: css,
      source_code_link: "https://onliupstudy.web.app/",
    },
    {
      name: "Thread-Talk",
      description: "Post and Rating Platform for assignment where user can post and delete their post.Other user can give vote to the post. Login system with firebase. There is admin User who has controls for this website. Only Admin can post announcement. User can search posts by tags.",
      tags: [
        {
          name: "daisyUI",
          color: "pink-text-gradient"
        },
        {
          name: "Framer-Motion",
          color: "green-text-gradient"
        },
        {
          name: "ReactJS",
          color: "blue-text-gradient"
        },
        {
          name: "Firebase",
          color: "green-text-gradient"
        },
        {
          name: "NodeJS",
          color: "orange-text-gradient"
        },
        {
          name: "MongoDB",
          color: "green-text-gradient"
        }
      ],
      image: javascript,
      source_code_link: "https://threadchat-f5e07.web.app/",
    },
    {
      name: "Data-Finance",
      description: "Simple Data-Finance React website Frontend",
      tags: [
        {
          name: "Framer-Motion",
          color: "orange-text-gradient"
        },
        {
          name: "React",
          color: "blue-text-gradient"
        },
        {
          name: "Javascript",
          color: "green-pink-gradient"
        }
      ],
      image: figma,
      source_code_link: "https://francism4402-b28587.netlify.app/",
    },
    {
      name: "GameEvent",
      description: "Simple Game Event website With Login Firebase.",
      tags: [
        {
          name: "daisyUI",
          color: "pink-text-gradient"
        },
        {
          name: "ReactJS",
          color: "blue-text-gradient"
        },
        {
          name: "Firebase",
          color: "green-text-gradient"
        },
        {
          name: "AOS",
          color: "orange-text-gradient"
        }
      ],
      image: javascript,
      source_code_link: "https://gameevent-19abd.web.app/",
    },
  ];

export {experiences, technologies, projects};