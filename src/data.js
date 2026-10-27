// EDIT THIS FILE ONLY. The whole website reads from here.
export const profile = {
  name: 'Harsh Gakare',
  file: 'Harsh_Gakare.ipynb',
  role: 'Data Scientist',
  headline: 'I turn raw sales data into forecasts a business can act on.',
  summary:
    'Computer Science Engineering graduate with hands-on project experience in Python, SQL, Data Science, Machine Learning,  and Data Analytics. Experienced in building end-to-end data processing pipelines, data cleaning, data transformation, feature engineering, predictive modeling, and model evaluation. Familiar with structured data, database management, REST API integration, and deploying machine learning applications using Streamlit and Joblib.',
  location: 'Lakhandur, Bhandara, Maharashtra, India',
  email: 'gakareharsh@gmail.com',
  resume: '/HARSH GAKARE DS n.pdf',
}

// TODO: replace each url with your real profile link.
export const links = [
  { id: 'linkedin', label: 'LinkedIn', badge: 'in', url: 'https://www.linkedin.com/in/harshgakare', note: 'Let’s connect' },
  { id: 'github', label: 'GitHub', badge: 'gh', url: 'https://github.com/HarshGakare', note: 'Read my code' },
  { id: 'leetcode', label: 'LeetCode', badge: 'lc', url: 'https://leetcode.com/u/HarshGakare', note: 'Problem solving' },
]

export const skills = {
  'Programming': ['Python', 'C++'],
  'Data science': ['Pandas', 'NumPy', 'EDA', 'Data cleaning', 'Statistical analysis', 'ETL/ELT basics'],
  'Machine learning': ['Scikit-learn', 'LightGBM', 'Classification', 'Regression', 'Clustering', 'Feature engineering'],
  'Optimization': ['Optuna', 'GridSearchCV', 'Cross-validation', 'Hyperparameter tuning'],
  'Time series': ['Forecasting', 'Trend and seasonality', 'Lag features', 'Rolling windows', 'Recursive forecasting'],
  'Evaluation': ['MAE', 'RMSE', 'WAPE', 'Accuracy', 'F1-score', 'R²'],
  'Visualization': ['Matplotlib', 'Seaborn', 'Power BI', 'Streamlit'],
  'Databases': ['SQL', 'MongoDB'],
  'Backend and web': ['FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'React.js', 'Next.js', 'Tailwind CSS'],
  'Tools': ['Git', 'GitHub', 'Jupyter', 'Excel', 'Joblib'],
}

export const experience = [
  {
    title: 'React JS Intern, Celebal Technologies (Remote)',
    when: '06/2025 - 08/2025',
    points: ['Built responsive interfaces with React.js, JavaScript, HTML5 and CSS3.', 'Created reusable UI components and integrated REST APIs.', 'Used Git and GitHub for version control and teamwork.'],
  },
  {
    title: 'Frontend and MERN Stack Intern, EY GDS and AICTE Next Gen Program (Remote)',
    when: '12/2024 - 01/2025',
    points: ['Built full-stack apps with Node.js, Express.js, MongoDB and React.js.', 'Designed RESTful APIs and added authentication.', 'Implemented database-driven features with MongoDB.'],
  },
]

export const projects = [
  {
    title: 'AI-Powered Demand Forecasting and Inventory Optimization',
    stack: ['Python', 'LightGBM', 'Optuna', 'Pandas', 'Time series'],
    metric: '7.35% mean WAPE',
    points: [
      'Developed an end-to-end data processing and demand forecasting pipeline for 1M+ sales records across 1,115 stores.',
      'Performed data preprocessing, data cleaning, transformation, and feature engineering to prepare structured datasets for machine learning.',
      'Engineered calendar, promotion, lag, and rolling-window features for predictive analytics and time-series forecasting',
      'Optimized LightGBM models using Optuna and evaluated performance through chronological rolling cross-validation.',
      'Achieved approximately 7.35% mean WAPE across four validation folds and benchmarked forecasting models against Exponential Smoothing and ensemble approaches.',
    ],
    github: 'https://github.com/HarshGakare/AI-demand-forecasting', // add repo link
    demo: 'https://ai-demand-forecasting-mmn5uejbwkxfnugv32dc5h.streamlit.app/',
  },
  {
    title: 'Customer Churn and Revenue Risk Intelligence System',
    stack: ['Python', 'Scikit-learn', 'EDA', 'Classification'],
    metric: 'Churn + revenue exposure',
    points: [
      'Conducted data cleaning, exploratory data analysis, and feature engineering to identify customer churn patterns.',
      'Developed a machine learning classification workflow to identify high-probability churn customers.',
      'Analyzed customer lifetime value and revenue contribution to assess potential revenue exposure.',
      'Transformed structured customer data into actionable insights to support data-driven business decisions.'
    ],
    github: 'https://github.com/HarshGakare/customer-churn-intelligence-project.git',
    demo: '',
  },
  {
    title: 'Lecture Engagement Pattern Analyzer',
    stack: ['Python', 'GridSearchCV', 'Streamlit', 'Joblib'],
    metric: 'Classification + regression',
    points: [
      'Developed end-to-end machine learning workflows for student performance classification and quiz-score regression',
      'Implemented data preprocessing, encoding, feature scaling, and feature engineering to prepare model ready datasets.',
      'Optimized model performance using GridSearchCV and evaluated results using Accuracy, F1-score, MAE, RMSE, and R².',
      'Deployed trained machine learning models through Streamlit and Joblib for interactive predictions.'
    ],
    github: 'https://github.com/HarshGakare/Lecture-Engagement-Pattern-Analyzer.git',
    demo: 'https://learnpredict.streamlit.app/',
  },
]

export const education = [
  { title: 'B.Tech, Computer Science Engineering', where: 'Bansal Institute of Research and Technology Science, Bhopal (RGPV)', when: '2022 - 2026', note: 'CGPA 8.10' },
  { title: 'Class XII, Science', where: 'Dr. Babasaheb Ambedkar Mahavidyalaya, Lakhandur', when: '2021 - 2022', note: '71.58%' },
  { title: 'Class X', where: 'Shivaji Vidyalaya, Lakhandur', when: '2019 - 2020', note: '79.89%' },
]

export const certs = [
  { title: 'Data Analysis with Python', by: 'freeCodeCamp', year: '2026' },
  { title: 'SQL (Basic)', by: 'HackerRank', year: '2024' },
  { title: 'Scientific Computing with Python', by: 'freeCodeCamp', year: '2024' },
]

export const soft = ['Leadership and teamwork', 'Critical Thinking & Root Cause Analysis', 'Analytical Thinking & Complex Problem-Solving', 'Adaptability & Continuous Learning']
