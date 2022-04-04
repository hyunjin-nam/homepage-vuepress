---
works_index: true
1hero_text: "I'm <strong>Hyunjin Nam</strong>, a data scientist who likes to create contents."
title: Data
permalink: /

---


<h1 align="center"> I'm <strong>Hyunjin Nam</strong>, a data scientist who likes to create contents. </h1>
I am a Data Analyst with a background in **statistics**, working with Python and R. I specialize in machine learning applications with focus on **customers based analysis** By using a statistical approach, I am building a predictive model to help businesses understand customer needs better. Please check more about me below 👇


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
        "databases" : ["SQL", "MongoDB", "AWS"],
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




## Experience
 **Tele2** *Nov 2019 - Present* 
 `Data Analyst`
- Building a machine learning model targeting the right customer to cross-sell, up-sell and retention (cross-sell broadband to mobile customers, up-sell TV add-ons to TV customers).
- Building a Tableau dashboard to show a real-time overview of customers’ behaviours to gain business insight (the volume of the customers' propensity score for each event, 5G data consumption).
- Analytical support to the marketing team by following up the effectiveness of personalized offers using A/B testing, significance testing
- Ad-hoc analysis and regular reporting using SQL

 **Hansung University** *July 2020 - Dec 2020* 
 `Course Instructor`
- Teached a statistics course "Basic Statistics and Data Science with R" at Hansung University. The course is consists of 7 online lectures including laboratory sessions with R.
- Trained students to be able to step into the data science world dealing with real data
- Introduced essential statistics skills such as data handling (Dplyr), visualization (Ggplot2), T-test, and logistic regression (GLM).

 **Byon8** *Jan 2019 - Nov 2019* 
 `AI Developer`
- Byon8 is a health tech company using artificial intelligence in medical diagnostics. Byon8 provides diagnostic suggestions from the AI engine to ensure secure diagnoses, recommendations and treatments.
- Responsible for data preprocessing, data mining with demographic and clinical data.
- Built a tree-based model that can help diagnose diabetes.

**Svenska Institutet**  *Sep 2017 - Jun 2019* 
`Digital Ambassador`
- Studyinsweden is an organization built and maintained by the Swedish Institute (svenska institutet) and is tasked with promoting Sweden for prospective international students abroad.
- Provided contents regarding the Swedish higher education system and living as an international student in Sweden 
- Responsible for writing and managing the official instagram [@studyinsweden](https://www.instagram.com/studyinsweden/) account

<Hero :text="$page.frontmatter.hero_text" />
<WorksList />


