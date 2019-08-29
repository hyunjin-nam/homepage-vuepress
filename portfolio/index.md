---
works_index: true
1hero_text: "I'm <strong>Hyunjin Nam</strong>, a data scientist who likes to create contents."
title: Data

---

<h1 align="center"> I'm <strong>Hyunjin Nam</strong>, a data scientist who likes to create contents. </h1>


I am a <strong>data scientist</strong> with a background in <strong>statistics</strong>. I am specialized in machine learning applications in <strong>digital health</strong>. By using Statistical approach, I am building a machine learning model to predict diseases, which can allow physicians and health care professionals to get support to diagnosis. I enjoy <strong>machine learning</strong>, web programming, and play around with data. You can check more about me on the link below 👇



    {
      "name": "Hyunjin Nam", 
      "resourceType" : "Data Scientist" 👩🏻‍💻,
      "education" : "Master’s Degree in Statistics at Uppsala University",
      "contacts" : [{ 
        "homepage" : "hyunjinnam.com",
        "city": "Stockholm" 🏠,
        "email": "jinanam0116@gmail.com" 💌
        }],
      "skills" : [{
        "programming" : ["Python" 🐍, "R", "SAS"],
        "databases" : ["MySQL", "MongoDB", "PostgreSQL"],
        "data analysis": ["TensorFlow", "Pandas" 🐼, "Numpy", "Matplotlib", "Scikit-learn" 📊],
        "web development": ["Vuepress" 🌐, "HTML5", "CSS", "jQuery"],
        "others": ["Tableau" 📈, "Adobe Premiere", "Adobe Lightroom" ⚡, "Adobe Photoshop" 📸]
        }],
      "languages" : [{
        "English" 🇬🇧: [ ● ● ● ● ○ ],
        "Korean" 🇰🇷: [ ● ● ● ● ● ],
        "Swedish" 🇸🇪: [ ● ○ ○ ○ ○ ]
        }]
    }





<Hero :text="$page.frontmatter.hero_text" />
<WorksList />


