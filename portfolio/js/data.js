/* ==========================================================
   EDIT THIS FILE to update your portfolio.
   Everything on the page (projects, skills, certificates,
   blog, resume, links) is generated from the values below.
   Items marked "SAMPLE" are placeholders: replace them with
   your real details.
   ========================================================== */

window.PROFILE = {
  name: "Abhishek Kumar Chaurasia",
  email: "Ak6471494@gmail.com",
  location: "Lucknow, Uttar Pradesh, India",

  // Replace each link with your real profile URL.
  // WhatsApp format: https://wa.me/91XXXXXXXXXX (country code + number, no + or spaces)
  socials: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    whatsapp: "https://wa.me/91XXXXXXXXXX",
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/"
  },

  about: [
    "I am a B.Tech Computer Science and Engineering student from Lucknow who enjoys turning ideas into working software. I started with web pages and kept going: today I build responsive frontends and experiment with deep learning and computer vision.",
    "I like problems that make me slow down and think, whether that is a tricky algorithm or a layout that refuses to behave. I learn best by building, so most of what I know comes from small projects that grew into bigger ones.",
    "I am currently looking for internships and open-source projects where I can contribute, learn from experienced engineers and ship things people actually use."
  ],

  facts: [
    ["Name", "Abhishek Kumar Chaurasia"],
    ["Degree", "B.Tech, Computer Science & Engineering"],
    ["Based in", "Lucknow, India"],
    ["Interests", "Frontend, Deep Learning, Computer Vision"],
    ["Open to", "Internships and collaborations"]
  ],

  skills: {
    "Languages": [
      { name: "Python", level: 85 },
      { name: "C++", level: 78 },
      { name: "JavaScript", level: 80 },
      { name: "Java", level: 68 },
      { name: "SQL", level: 70 }
    ],
    "Frontend": [
      { name: "HTML5", level: 92 },
      { name: "CSS3 / Responsive design", level: 88 },
      { name: "JavaScript (ES6+)", level: 80 },
      { name: "React", level: 68 },
      { name: "Bootstrap / Tailwind", level: 75 }
    ],
    "AI & Vision": [
      { name: "OpenCV", level: 80 },
      { name: "TensorFlow / Keras", level: 74 },
      { name: "PyTorch", level: 70 },
      { name: "NumPy / Pandas", level: 82 },
      { name: "Deep learning (CNNs)", level: 76 }
    ],
    "Tools": [
      { name: "Git & GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Linux command line", level: 70 },
      { name: "Jupyter / Google Colab", level: 85 },
      { name: "Figma", level: 58 }
    ]
  },

  // SAMPLE projects. category must be "Web" or "AI & ML".
  projects: [
    {
      title: "Face Mask Detection",
      category: "AI & ML",
      desc: "Real-time webcam detector that checks whether a person is wearing a mask, built on a CNN and OpenCV.",
      tags: ["Python", "OpenCV", "TensorFlow"],
      github: "https://github.com/",
      live: ""
    },
    {
      title: "Handwritten Digit Recognizer",
      category: "AI & ML",
      desc: "Draw a digit on a canvas and a trained CNN predicts it instantly. Trained on the MNIST dataset.",
      tags: ["Python", "Keras", "Flask"],
      github: "https://github.com/",
      live: ""
    },
    {
      title: "Image Classifier Web App",
      category: "AI & ML",
      desc: "Upload a photo and get the top predictions from a fine-tuned transfer-learning model.",
      tags: ["PyTorch", "Flask", "HTML/CSS"],
      github: "https://github.com/",
      live: ""
    },
    {
      title: "Personal Portfolio",
      category: "Web",
      desc: "This website: responsive, accessible, dark and light themes, built with plain HTML, CSS and JavaScript.",
      tags: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/",
      live: "#home"
    },
    {
      title: "Task Tracker",
      category: "Web",
      desc: "Add, filter and complete tasks with data saved in the browser so nothing is lost on refresh.",
      tags: ["JavaScript", "LocalStorage", "CSS"],
      github: "https://github.com/",
      live: ""
    },
    {
      title: "Weather Dashboard",
      category: "Web",
      desc: "Search any city and see current conditions and a five-day forecast pulled from a public weather API.",
      tags: ["JavaScript", "REST API", "CSS Grid"],
      github: "https://github.com/",
      live: ""
    }
  ],

  // Add your own photos: put files in images/ and set src, e.g. "images/hackathon.jpg".
  // Leave src empty to show a coloured placeholder.
  gallery: [
    { caption: "Hackathon weekend", src: "" },
    { caption: "Project demo day", src: "" },
    { caption: "Campus life", src: "" },
    { caption: "Study group session", src: "" },
    { caption: "Workshop on deep learning", src: "" },
    { caption: "My development setup", src: "" }
  ],

  // SAMPLE certificates
  certificates: [
    {
      title: "Deep Learning Specialization",
      issuer: "Coursera",
      year: "2025",
      id: "SAMPLE-DL-0001",
      desc: "Neural networks, convolutional networks, sequence models and practical training techniques.",
      link: "https://www.coursera.org/"
    },
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      year: "2024",
      id: "SAMPLE-RWD-0002",
      desc: "HTML, CSS, Flexbox, Grid and accessibility, completed with five certification projects.",
      link: "https://www.freecodecamp.org/"
    },
    {
      title: "Python for Everybody",
      issuer: "University of Michigan",
      year: "2024",
      id: "SAMPLE-PY-0003",
      desc: "Python fundamentals, data structures, web data access and databases.",
      link: "https://www.coursera.org/"
    },
    {
      title: "Data Structures & Algorithms",
      issuer: "NPTEL",
      year: "2025",
      id: "SAMPLE-DSA-0004",
      desc: "Core data structures, complexity analysis and problem-solving techniques.",
      link: "https://nptel.ac.in/"
    }
  ],

  // SAMPLE blog posts
  blog: [
    {
      title: "How I got started with computer vision",
      date: "September 2026",
      read: "3 min read",
      excerpt: "From a first OpenCV script to a working real-time detector: what I learned along the way.",
      body: [
        "My first computer vision program just opened the webcam and drew a rectangle on the screen. It felt small, but it showed me that a camera is only a stream of numbers I could work with.",
        "From there I learned how filters, edges and contours work, and then moved to convolutional neural networks. Training a model on my own data taught me more than any lecture: bad data gives bad results, no matter how clever the network is.",
        "If you are starting out, build one small thing end to end. Collect images, train, test it on your webcam, and then improve it."
      ]
    },
    {
      title: "Five CSS habits that keep my layouts clean",
      date: "August 2026",
      read: "4 min read",
      excerpt: "Small habits that save hours when a page has to work on every screen size.",
      body: [
        "I define colours and spacing as CSS variables at the top of the file. Changing a theme then means editing a few lines instead of hunting through hundreds.",
        "I design for the smallest screen first and add rules as the space grows. Flexbox and Grid handle most layouts without any tricks.",
        "I also check keyboard focus and contrast before calling a page finished. If I cannot use it without a mouse, it is not done."
      ]
    },
    {
      title: "How I practise problem solving",
      date: "July 2026",
      read: "3 min read",
      excerpt: "My routine for getting better at data structures and algorithms without burning out.",
      body: [
        "I pick one topic per week, such as arrays, trees or graphs, and solve problems on it every day. Consistency matters more than long weekend marathons.",
        "When I get stuck, I write the brute-force solution first and then look for what repeats. Most optimisations come from noticing repeated work.",
        "After solving a problem I rewrite it a few days later from memory. If I cannot, I did not really understand it yet."
      ]
    }
  ],

  resume: {
    education: [
      {
        title: "B.Tech, Computer Science & Engineering",
        place: "Your College Name, Lucknow",
        period: "2023 - 2027",
        desc: "Coursework in data structures, algorithms, databases, operating systems and machine learning."
      },
      {
        title: "Intermediate (Class XII)",
        place: "Your School Name, Uttar Pradesh",
        period: "2021 - 2022",
        desc: "Science stream with Physics, Chemistry and Mathematics."
      }
    ],
    experience: [
      {
        title: "Frontend Development Intern",
        place: "Company Name (SAMPLE)",
        period: "Jun 2026 - Aug 2026",
        desc: "Built responsive interface components and improved page load time."
      },
      {
        title: "Computer Vision Project Work",
        place: "College research group (SAMPLE)",
        period: "2025 - Present",
        desc: "Training and evaluating CNN models for real-time image detection."
      }
    ],
    achievements: [
      "Completed a Deep Learning specialization and several web development certifications.",
      "Built and published multiple projects on GitHub.",
      "Participated in college hackathons and coding contests.",
      "Regularly practise data structures and algorithms."
    ]
  }
};
