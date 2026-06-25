"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const VALID_SECTION_IDS = [
  "home",
  "call-for-papers",
  "paper-awards",
  "keynote-speakers",
  "students-meeting",
  "program-committee",
  "organization",
  "conference-proceedings",
  "submission-guidelines",
  "important-dates",
  "previous-mcprs",
  "conference-venue",
  "contact",
  "registration",
  "fees",
  "program",
  "tutorials",
  "panels",
  "live-transmission",
];

const SPONSOR_ITEMS = [
  {
    href: "https://durol.com.mx/page/",
    src: "./sponsors/durol.jpg",
    alt: "DUROL",
  },
  {
    href: "https://imechatronic.com/",
    src: "./sponsors/mechatronics.jpeg",
    alt: "IME Mechatronics",
  },
  {
    href: "https://www.ergotech.mx/",
    src: "./sponsors/ergo-tech.jpeg",
    alt: "Ergo Tech",
  },
];

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [isPreviousMenuOpen, setIsPreviousMenuOpen] = useState(false);
  const [activeSponsorIndex, setActiveSponsorIndex] = useState(0);
  const [expandedPeople, setExpandedPeople] = useState<{ [key: string]: boolean }>({});
  const togglePerson = (key: string) => setExpandedPeople((prev) => ({ ...prev, [key]: !prev[key] }));

  const [expandedProgramDays, setExpandedProgramDays] = useState<{ [key: string]: boolean }>({
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });
  const tr = (en: string, es: string) => (language === "es" ? es : en);

  const tabParam = searchParams.get("tab");
  const normalizedTab = tabParam === "panels" ? "keynote-speakers" : tabParam;
  const activeSection =
    normalizedTab && VALID_SECTION_IDS.includes(normalizedTab) ? normalizedTab : "home";

  const navigateToSection = (sectionId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", sectionId);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (normalizedTab && VALID_SECTION_IDS.includes(normalizedTab)) {
      return;
    }

    const fallback = "home";
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", fallback);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [normalizedTab, router, searchParams]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSponsorIndex((current) => (current + 1) % SPONSOR_ITEMS.length);
    }, 4200);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const conferenceProgramByDay = [
    {
      id: "wednesday",
      day: { en: "Wednesday, June 24", es: "Miercoles, 24 de junio" },
      schedule: [
        { time: "9:00 - 9:20", en: "Opening Ceremony", es: "Ceremonia de apertura" },
        { time: "9:20 - 10:20", en: "Keynote Address: New Paradigms in Sensors and Computer Vision Methods + Comments on Artificial Intelligence Production at an International Scale — Prof. Walterio Mayol-Cuevas (University of Bristol, UK)", es: "Conferencia magistral: New Paradigms in Sensors and Computer Vision Methods + Comments on Artificial Intelligence Production at an International Scale — Prof. Walterio Mayol-Cuevas (University of Bristol, UK)" },
        { time: "10:20 - 10:40", en: "Coffee Break", es: "Receso de cafe" },
        { time: "", en: "Session 1: Pattern Recognition and Machine Learning Techniques — Chair: Prof. Erik Rodner", es: "Sesion 1: Tecnicas de reconocimiento de patrones y aprendizaje automatico — Presidente: Prof. Erik Rodner" },
        { time: "10:40 - 11:00", en: "Evaluation of Clustering and Consensus Models for Classifying Adulterant Levels in Alcoholic Beverages Using Single-Shot Interferograms — E. López-Meléndez, R. I. Álvarez-Tamayo, A. Barcelata-Pinzón, P. Prieto-Cortés, and L. D. Lara-Rodríguez", es: "Evaluation of Clustering and Consensus Models for Classifying Adulterant Levels in Alcoholic Beverages Using Single-Shot Interferograms — E. López-Meléndez et al." },
        { time: "11:00 - 11:20", en: "Beyond Pareto: A High-Efficiency Approach to Bi-Objective Regression Trees — Erick G.G. de Paz, Arturo Hernández-Aguirre, and Iván Cruz-Aceves", es: "Beyond Pareto: A High-Efficiency Approach to Bi-Objective Regression Trees — Erick G.G. de Paz et al." },
        { time: "11:20 - 11:40", en: "Ensembles of Manifold Learners for Supervised and Unsupervised Learning — Fabiola Muñoz Vera, Juan Manuel Pérez Ortega, Eduardo F. Morales, and Hugo Jair Escalante", es: "Ensembles of Manifold Learners for Supervised and Unsupervised Learning — Fabiola Muñoz Vera et al." },
        { time: "11:40 - 12:00", en: "Application of Unsupervised Pattern Recognition for the Structural Characterization of Masonry Walls — Miguel Ángel Tlatzimatzi Flores, María Guadalupe Medina Barrera, and Eduardo Ismael Hernández", es: "Application of Unsupervised Pattern Recognition for the Structural Characterization of Masonry Walls — Miguel Ángel Tlatzimatzi Flores et al." },
        { time: "12:00 - 12:20", en: "Coffee Break", es: "Receso de cafe" },
        { time: "", en: "Session 2: Pattern Recognition and Machine Learning Techniques — Chair: Prof. Humberto de Jesús Ochoa Domínguez", es: "Sesion 2: Tecnicas de reconocimiento de patrones y aprendizaje automatico — Presidente: Prof. Humberto de Jesús Ochoa Domínguez" },
        { time: "12:20 - 12:40", en: "Clustering Algorithms for Density Variations: An Empirical Comparison — Adrián J. Ramírez-Díaz, José Fco. Martínez-Trinidad, and J. Ariel Carrasco-Ochoa", es: "Clustering Algorithms for Density Variations: An Empirical Comparison — Adrián J. Ramírez-Díaz et al." },
        { time: "12:40 - 13:00", en: "Dissimilarity-Based Graph Embedding via Local and Global Approximate Graph Patterns — Daybelis Jaramillo-Olivares, J. Ariel Carrasco-Ochoa, and José Fco. Martínez-Trinidad", es: "Dissimilarity-Based Graph Embedding via Local and Global Approximate Graph Patterns — Daybelis Jaramillo-Olivares et al." },
        { time: "13:00 - 13:20", en: "Comprehensive Validation of Brex Sequential Classifier Model for Robust Pattern Recognition — Gerardo Acevedo-Sánchez, J. Pacheco-Senard, A. Alarcón-Paredes, Ó. Camacho-Nieto, and C. Yáñez-Márquez", es: "Comprehensive Validation of Brex Sequential Classifier Model for Robust Pattern Recognition — Gerardo Acevedo-Sánchez et al." },
        { time: "13:20 - 13:40", en: "A Machine Learning Framework for High-Performance Electrolyte Classification in Lithium Metal Batteries — Sergio Rubén Ocampo-Pérez, Noureddine Lakouari, and Outmane Oubram", es: "A Machine Learning Framework for High-Performance Electrolyte Classification in Lithium Metal Batteries — Sergio Rubén Ocampo-Pérez et al." },
        { time: "13:40 - 14:00", en: "Dynamic Assessment of Landslide Susceptibility at Pico de Orizaba Using Ensemble Classifiers and Multitemporal Analysis — Adhara Alejandra Avendaño Barajas, L. Altamirano Robles, R. Díaz Hernández, and S. Zapotecas Martínez", es: "Dynamic Assessment of Landslide Susceptibility at Pico de Orizaba Using Ensemble Classifiers and Multitemporal Analysis — Adhara Alejandra Avendaño Barajas et al." },
        { time: "14:00 - 15:00", en: "Lunch", es: "Comida" },
        { time: "", en: "Session 3: Deep Learning and Neural Networks — Chair: Prof. Juan Humberto Sossa Azuela", es: "Sesion 3: Deep learning y redes neuronales — Presidente: Prof. Juan Humberto Sossa Azuela" },
        { time: "15:00 - 15:20", en: "Banking Fraud Detection Using Neural Network Models — Ostin Uriel Martínez Campos, Andrés Ferreyra-Ramírez, Eduardo Rodríguez-Martínez, and Carlos Avilés-Cruz", es: "Banking Fraud Detection Using Neural Network Models — Ostin Uriel Martínez Campos et al." },
        { time: "15:20 - 15:40", en: "Variational Standard Simplex Hierarchical Encoder for Clustering — Ulises Rodríguez-Domínguez", es: "Variational Standard Simplex Hierarchical Encoder for Clustering — Ulises Rodríguez-Domínguez" },
        { time: "15:40 - 16:00", en: "Chest CT Gender Domain Translation: Comparative Evaluation of CycleGAN and cVAE in Radiometric and Volumetric Coherence — I. Delgado Navarro, G. J. Alvarado Flores, L. Altamirano Robles, R. Díaz Hernández, and S. Zapotecas Martínez", es: "Chest CT Gender Domain Translation: Comparative Evaluation of CycleGAN and cVAE in Radiometric and Volumetric Coherence — I. Delgado Navarro et al." },
        { time: "16:00 - 16:20", en: "Detection of Dangerous Wildlife in a Dynamic Environment Using Deep Learning — David Cruz-Villavicencio and Jesús Alberto Martínez-Castro", es: "Detection of Dangerous Wildlife in a Dynamic Environment Using Deep Learning — David Cruz-Villavicencio and Jesús Alberto Martínez-Castro" },
        { time: "16:20 - 16:40", en: "Coffee Break", es: "Receso de cafe" },
        { time: "", en: "Session 4: Deep Learning & Neural Networks / Pattern Recognition and Machine Learning Techniques — Chair: Prof. Walterio Mayol-Cuevas", es: "Sesion 4: Deep learning y redes neuronales / Reconocimiento de patrones — Presidente: Prof. Walterio Mayol-Cuevas" },
        { time: "16:40 - 17:00", en: "Spatiotemporal Prediction of Wildfires Spread Using Deep Learning — Ángel Itzcoatl Huizar Bretado, Raquel Díaz Hernández, K. A. Ramírez Gutiérrez, and L. Altamirano Robles", es: "Spatiotemporal Prediction of Wildfires Spread Using Deep Learning — Ángel Itzcoatl Huizar Bretado et al." },
        { time: "17:00 - 17:20", en: "A Safety-Aware Approach for Automated Urine Culture Screening Using Calibrated Deep Learning — G. J. Alvarado Flores, I. Delgado Navarro, R. Díaz Hernández, L. Altamirano Robles, and S. Zapotecas Martínez", es: "A Safety-Aware Approach for Automated Urine Culture Screening Using Calibrated Deep Learning — G. J. Alvarado Flores et al." },
        { time: "17:20 - 17:40", en: "Modeling Tumor Progression in Mammography with Conditional Generative Adversarial Networks — Alfonso Rojas-Domínguez and Jesús Yaljá Montiel Pérez", es: "Modeling Tumor Progression in Mammography with Conditional Generative Adversarial Networks — Alfonso Rojas-Domínguez and Jesús Yaljá Montiel Pérez" },
        { time: "17:40 - 18:00", en: "Customer Preferences Recognition in Neuromarketing: Improving Accuracy with Autoregressive Modeling, Genetic Algorithms, and Naive Bayes — Christian Ruiz-Ugalde, R. A. García-Hernández, J. Rojas-Simón, Y. L., and Marco Antonio Ramos-Corchado", es: "Customer Preferences Recognition in Neuromarketing: Improving Accuracy with Autoregressive Modeling, Genetic Algorithms, and Naive Bayes — Christian Ruiz-Ugalde et al." },
      ],
    },
    {
      id: "thursday",
      day: { en: "Thursday, June 25", es: "Jueves, 25 de junio" },
      schedule: [
        { time: "9:00 - 10:00", en: "Panel in Spanish: Las Voces del Mañana — David Da Vinci y Luis Villarreal Debaten sobre Inteligencia Artificial", es: "Panel en español: Las Voces del Mañana — David Da Vinci y Luis Villarreal Debaten sobre Inteligencia Artificial" },
        { time: "10:00 - 10:20", en: "Coffee Break", es: "Receso de cafe" },
        { time: "", en: "Session 5: Medical Applications of Pattern Recognition — Chair: Prof. Salvador E. Venegas-Andraca", es: "Sesion 5: Aplicaciones medicas del reconocimiento de patrones — Presidente: Prof. Salvador E. Venegas-Andraca" },
        { time: "10:20 - 10:40", en: "Machine Learning Algorithms for Identifying Attention-Deficit/Hyperactivity Disorder Processing Electroencephalographic Signals — Erika Altair Castro-Verazas, Saúl Brandon Lima-Portillo, Delia Irazú Hernández-Farías, and C. A. Reyes-García", es: "Machine Learning Algorithms for Identifying Attention-Deficit/Hyperactivity Disorder Processing Electroencephalographic Signals — Erika Altair Castro-Verazas et al." },
        { time: "10:40 - 11:00", en: "Graph-Based Modeling of Disfluent Speech for Alzheimer's Detection — Carlos A. Olachea-Hernández, Luis Villaseñor-Pineda, Manuel Montes-y-Gómez, and F. J. Martínez-Santiago", es: "Graph-Based Modeling of Disfluent Speech for Alzheimer's Detection — Carlos A. Olachea-Hernández et al." },
        { time: "11:00 - 11:20", en: "Factors Associated with Depression in Mexico: An XAI Comparative Analysis of Tree-Based Classifiers Under Imbalanced Data — Abigail Romero-Trejo, A. Guzmán-Ponce, R.M. Valdovinos-Rosas, L. Cleofas-Sánchez, and I. Francisco-Valencia", es: "Factors Associated with Depression in Mexico: An XAI Comparative Analysis of Tree-Based Classifiers Under Imbalanced Data — Abigail Romero-Trejo et al." },
        { time: "11:20 - 11:40", en: "Coffee Break", es: "Receso de cafe" },
        { time: "", en: "Session 6: Medical Applications of Pattern Recognition / Computer Vision — Chair: Prof. Salvador E. Venegas-Andraca", es: "Sesion 6: Aplicaciones medicas del reconocimiento de patrones / Vision por computadora — Presidente: Prof. Salvador E. Venegas-Andraca" },
        { time: "11:40 - 12:00", en: "Hierarchical Incremental Learning for Adaptive Breast Thermography Classification — Yareli Aburto-Sánchez, Pilar Gómez-Gil, and Leopoldo Altamirano-Robles", es: "Hierarchical Incremental Learning for Adaptive Breast Thermography Classification — Yareli Aburto-Sánchez et al." },
        { time: "12:00 - 12:20", en: "Automatic Classification of Subcutaneous Mycoses in Clinical Images Using Transfer Learning — Vania Déborah Vázquez Palacios, Julio César Pérez Sansalvador, and Humberto Pérez Espinoza", es: "Automatic Classification of Subcutaneous Mycoses in Clinical Images Using Transfer Learning — Vania Déborah Vázquez Palacios et al." },
        { time: "12:20 - 12:40", en: "Upsampling of Sparse Three-Dimensional Point Clouds Using iFactor-KDtree with Adaptive Interpolation — Dora-Luz Almanza-Ojeda, Mario-Alberto Ibarra-Manzano, Carlos A. Pérez-Ramírez, and Yair A. Andrade-Ambriz", es: "Upsampling of Sparse Three-Dimensional Point Clouds Using iFactor-KDtree with Adaptive Interpolation — Dora-Luz Almanza-Ojeda et al." },
        { time: "12:40 - 13:00", en: "Coffee Break", es: "Receso de cafe" },
        { time: "13:00 - 14:00", en: "Keynote Address: Foundation Models for Microscopy and Medical Data Analysis — Prof. Erik Rodner (University of Applied Sciences Berlin, Germany)", es: "Conferencia magistral: Foundation Models for Microscopy and Medical Data Analysis — Prof. Erik Rodner (University of Applied Sciences Berlin, Germany)" },
        { time: "14:00 - 15:00", en: "Lunch", es: "Comida" },
        { time: "", en: "Session 7: Language Processing and Recognition — Chair: Prof. Ramón Iván Barraza Castillo", es: "Sesion 7: Procesamiento y reconocimiento de lenguaje — Presidente: Prof. Ramón Iván Barraza Castillo" },
        { time: "15:00 - 15:20", en: "A Two-Stage Textual Preprocessing Pipeline for Medical Image Captioning — S. Rascón-Cervantes, G. Ramírez-Alonso, A. Pastor López-Monroy, R. López-Santillán, and N. A. Rendón Mejía", es: "A Two-Stage Textual Preprocessing Pipeline for Medical Image Captioning — S. Rascón-Cervantes et al." },
        { time: "15:20 - 15:40", en: "Semantic Pattern Recognition in Scientific Literature Using Hybrid Topic Modeling and SciBERT With LoRA-Based Validation — Yessenia Díaz Álvarez, Raúl Pinto Elías, A. Magadán Salazar, Noé A. Castro Sánchez, and J. Fuentes Pacheco", es: "Semantic Pattern Recognition in Scientific Literature Using Hybrid Topic Modeling and SciBERT With LoRA-Based Validation — Yessenia Díaz Álvarez et al." },
        { time: "15:40 - 16:00", en: "Automatic Depressive Symptom Detection on Social Media Using the BDI-II — Cielo Aholiva Higuera-Gutiérrez, I. H. López-Nava, M. Montes-y-Gómez, M. Ezra Aragón, and D. E. Losada", es: "Automatic Depressive Symptom Detection on Social Media Using the BDI-II — Cielo Aholiva Higuera-Gutiérrez et al." },
        { time: "16:00 - 16:20", en: "Statistical Analysis of Combined Adversarial Attacks on Spam Detection Models — Samantha Acosta Ruiz, Mireya Tovar Vidal, and José A. Reyes-Ortiz", es: "Statistical Analysis of Combined Adversarial Attacks on Spam Detection Models — Samantha Acosta Ruiz et al." },
        { time: "16:20 - 16:40", en: "Coffee Break", es: "Receso de cafe" },
        { time: "", en: "Session 8: Language Processing and Recognition / Computer Vision — Chair: Prof. Ramón Iván Barraza Castillo", es: "Sesion 8: Procesamiento y reconocimiento de lenguaje / Vision por computadora — Presidente: Prof. Ramón Iván Barraza Castillo" },
        { time: "16:40 - 17:00", en: "InCvT: A Hybrid Inception-Convolutional Vision Transformer Architecture for Speech Emotion Recognition — Juan A. Ramírez-Quintana, Eduardo Gallegos-Camarena, A. A. Torres-García, and Verónica Gallegos-Orozco", es: "InCvT: A Hybrid Inception-Convolutional Vision Transformer Architecture for Speech Emotion Recognition — Juan A. Ramírez-Quintana et al." },
        { time: "17:20 - 17:40", en: "Comparative Statistical Analysis of Sentiment Models in Spanish Political Discourse on YouTube — Guillermo David Barrera Ortega, María Beatriz Bernabe Loranca, David Pinto Avendaño, and A. Carrillo Canán", es: "Comparative Statistical Analysis of Sentiment Models in Spanish Political Discourse on YouTube — Guillermo David Barrera Ortega et al." },
        { time: "17:40 - 18:00", en: "VAR Based on Knowledge Transfer from VLMs and Video Descriptions — Emilio Vera-Cordero, David Mata Mendoza, Gibran Benitez-García, Hiroki Takahashi, and Mariko Nakano", es: "VAR Based on Knowledge Transfer from VLMs and Video Descriptions — Emilio Vera-Cordero et al." },
        { time: "20:00 - 23:00", en: "Conference Dinner (Salón ARGOS del Centro de Convenciones Cibeles)", es: "Cena de conferencia (Salón ARGOS del Centro de Convenciones Cibeles)" },
      ],
    },
    {
      id: "friday",
      day: { en: "Friday, June 26", es: "Viernes, 26 de junio" },
      schedule: [
        { time: "9:00 - 10:00", en: "Keynote Address: Quantum Computing: Foundations, Transition to Industry, and Applications in Pattern Recognition — Prof. Dr. Salvador E. Venegas-Andraca (Tecnologico de Monterrey, Campus Ciudad de Mexico)", es: "Conferencia magistral: Quantum Computing: Foundations, Transition to Industry, and Applications in Pattern Recognition — Prof. Dr. Salvador E. Venegas-Andraca (Tecnologico de Monterrey, Campus Ciudad de Mexico)" },
        { time: "10:00 - 10:10", en: "Coffee Break", es: "Receso de cafe" },
        { time: "10:10 - 11:25", en: "Panel in Spanish: Tecnología con Propósito — Academia, Industria y Gobierno Dialogan sobre Inteligencia Artificial | Mtra. Elizabeth Burrola Meléndez (CIITA-IPN), Mtro. Orlando Daniel Avitia (CECyTECH), Prof. Salvador E. Venegas-Andraca (Tec de Monterrey), Ing. Javier Acosta (Mechatronics AI)", es: "Panel en español: Tecnología con Propósito — Academia, Industria y Gobierno Dialogan sobre Inteligencia Artificial | Mtra. Elizabeth Burrola Meléndez (CIITA-IPN), Mtro. Orlando Daniel Avitia (CECyTECH), Prof. Salvador E. Venegas-Andraca (Tec de Monterrey), Ing. Javier Acosta (Mechatronics AI)" },
        { time: "11:25 - 11:40", en: "Coffee Break", es: "Receso de cafe" },
        { time: "", en: "Session 9: Computer Vision — Chair: Prof. Jesús Ariel Carrasco Ochoa", es: "Sesion 9: Vision por computadora — Presidente: Prof. Jesús Ariel Carrasco Ochoa" },
        { time: "11:40 - 12:00", en: "Embedded System for Vehicle Environment Perception and License Plate Recognition (LPR) Using Computer Vision and Deep Learning — R. Leonardo Méndez-Macías, J. Villegas-Cortez, A. Ferreyra Ramírez, A. Zúñiga-López, and S. Cordero-Sánchez", es: "Embedded System for Vehicle Environment Perception and License Plate Recognition (LPR) Using Computer Vision and Deep Learning — R. Leonardo Méndez-Macías et al." },
        { time: "12:00 - 12:20", en: "Interpretable Human Activity Recognition for Subtle Robbery Detection in Surveillance Videos — Bryan Jhoan Cazáres Leyva, Ulises Gachuz Dávila, José Juan González Fonseca, Juan A. Camacho-Vázquez, and Sergio Isahí Garrido-Castañeda", es: "Interpretable Human Activity Recognition for Subtle Robbery Detection in Surveillance Videos — Bryan Jhoan Cazáres Leyva et al." },
        { time: "12:20 - 12:40", en: "Tree Crown Segmentation in UAV RGB Images via Monocular Depth Estimation — Sergio Adán-Juárez, Andrea Magadán-Salazar, J. Fuentes-Pacheco, Raúl Pinto-Elías, and J. Tavira-Villanueva", es: "Tree Crown Segmentation in UAV RGB Images via Monocular Depth Estimation — Sergio Adán-Juárez et al." },
        { time: "12:40 - 13:00", en: "UAV Pose Estimation in Low-Light Conditions Using Visual–LiDar Fusion — Esteban Tlelo-Coyotecatl, Alejandro Gutiérrez-Giles, and José Martínez-Carranza", es: "UAV Pose Estimation in Low-Light Conditions Using Visual–LiDar Fusion — Esteban Tlelo-Coyotecatl et al." },
        { time: "13:00 - 13:30", en: "Closing Ceremony", es: "Ceremonia de clausura" },
        { time: "13:30 - 15:00", en: "Lunch", es: "Comida" },
      ],
    },
    {
      id: "saturday",
      day: { en: "Saturday, June 27", es: "Sabado, 27 de junio" },
      schedule: [
        { time: "8:30 - 9:00", en: "Registration", es: "Registro" },
        { time: "9:00 - 11:30", en: "Tutorial 1: Understanding Modern NLP Techniques (Prof. Humberto de Jesús Ochoa Domínguez) | Tutorial 2: Neuromorphic Computing for Edge AI (Prof. Victor Hugo Ponce Ponce) | Tutorial 3: Robot Modeling and Control (Prof. Elsa Rubio Espino, CIC-IPN)", es: "Tutorial 1: Understanding Modern NLP Techniques (Prof. Humberto de Jesús Ochoa Domínguez) | Tutorial 2: Neuromorphic Computing for Edge AI (Prof. Victor Hugo Ponce Ponce) | Tutorial 3: Robot Modeling and Control (Prof. Elsa Rubio Espino, CIC-IPN)" },
        { time: "11:30 - 11:45", en: "Coffee Break", es: "Receso de cafe" },
        { time: "11:45 - 13:30", en: "Tutorial continuation sessions (Tutorial 1 | Tutorial 2 | Tutorial 3)", es: "Continuacion de sesiones de tutorial (Tutorial 1 | Tutorial 2 | Tutorial 3)" },
        { time: "13:30 - 14:50", en: "Lunch", es: "Comida" },
      ],
    },
  ];

  const programLinksPerDay = conferenceProgramByDay.map((day) => ({
    id: day.id,
    en: day.day.en,
    es: day.day.es,
    href: `#program-day-${day.id}`,
  }));

  const tutorials = [
  {
    name: "Prof. Humberto de Jesús Ochoa Domínguez",
    image: "./people/humberto_ochoa.jpg",
    title: {
      en: "Understanding Modern Natural Language Processing Techniques: Tokenization, Embeddings, and Transformer Architectures",
      es: "Comprensión de técnicas modernas de procesamiento de lenguaje natural: tokenización, embeddings y arquitecturas Transformer",
    },
    description: {
      en: `In this 4-hour workshop, participants will explore the fundamental concepts and cutting-edge techniques used in modern Natural Language Processing (NLP). The session is designed to provide an in-depth understanding of:`,
      es: `En este taller de 4 horas, los participantes explorarán los conceptos fundamentales y las técnicas de vanguardia utilizadas en el procesamiento moderno del lenguaje natural (NLP). La sesión está diseñada para proporcionar una comprensión profunda de:`,
    },
    topics: [
      {
        en: "Introduction to NLP: Natural Language Processing, its applications, and the role of machine learning in transforming language data into meaningful insights.",
        es: "Introducción al NLP: procesamiento de lenguaje natural, sus aplicaciones y el papel del aprendizaje automático en la transformación de datos lingüísticos en información significativa.",
      },
      {
        en: "Tokenization & Vector Embeddings: Learn the process of converting text data into tokens, followed by embedding techniques that map these tokens into dense vector representations, enabling machines to understand and process language effectively.",
        es: "Tokenización y embeddings vectoriales: aprender el proceso de convertir datos de texto en tokens, seguido de técnicas de embedding que asignan estos tokens a representaciones vectoriales densas, permitiendo que las máquinas comprendan y procesen el lenguaje de manera efectiva.",
      },
      {
        en: "Order Encoding Mechanisms: Explore the techniques for encoding sequential information in text, such as positional encodings, to maintain the context and order of words in a sequence.",
        es: "Mecanismos de codificación de orden: explorar técnicas para codificar información secuencial en texto, como las codificaciones posicionales, con el fin de mantener el contexto y el orden de las palabras en una secuencia.",
      },
      {
        en: "Attention Mechanism and Transformer Architecture: Dive into the revolutionary attention mechanisms, their role in improving NLP tasks, and understand the transformer architecture that powers state-of-the-art models like BERT.",
        es: "Mecanismo de atención y arquitectura Transformer: profundizar en los mecanismos de atención revolucionarios, su papel en la mejora de tareas de NLP y comprender la arquitectura Transformer que impulsa modelos de última generación como BERT.",
      },
    ],
    closing: {
      en: `By the end of the workshop, participants will have a solid understanding of the core components that drive many NLP systems today and how to leverage these techniques in their own machine learning projects.`,
      es: `Al finalizar el taller, los participantes tendrán una comprensión sólida de los componentes centrales que impulsan muchos sistemas actuales de NLP y de cómo aprovechar estas técnicas en sus propios proyectos de aprendizaje automático.`,
    },
  },
  {
    name: "Prof. Victor Hugo Ponce Ponce",
    image: "./people/victor_ponce.jpg",
    title: {
      en: "Neuromorphic Computing for Edge AI: A Practical Introduction with SPICE and Verilog-A",
      es: "Computación neuromórfica para IA en el borde: una introducción práctica con SPICE y Verilog-A",
    },
    description: {
      en: `This workshop offers a practical introduction to analog neuromorphic computing as an alternative to traditional artificial intelligence architectures. It focuses on modeling spiking neurons and memristive synapses, emphasizing their ability to integrate memory and computation within the same physical substrate. This integration enables efficient processing of temporal signals with low energy consumption, which is crucial for edge AI applications.

Unlike software-focused courses, this tutorial introduces participants to integrated circuit-level design using open-source tools that are widely adopted in both academic and industrial settings. A reproducible workflow based on Xschem, Ngspice, and Verilog-A models will be presented, in alignment with open technologies such as SkyWater 130 nm.

During the hands-on session, participants will:`,
      es: `Este taller ofrece una introducción práctica a la computación neuromórfica analógica como alternativa a las arquitecturas tradicionales de inteligencia artificial. Se enfoca en el modelado de neuronas de disparo y sinapsis memristivas, destacando su capacidad para integrar memoria y cómputo dentro del mismo sustrato físico. Esta integración permite procesar señales temporales de manera eficiente con bajo consumo energético, lo cual es crucial para aplicaciones de IA en el borde.

A diferencia de los cursos enfocados en software, este tutorial introduce a los participantes al diseño a nivel de circuitos integrados mediante herramientas de código abierto ampliamente adoptadas tanto en entornos académicos como industriales. Se presentará un flujo de trabajo reproducible basado en modelos de Xschem, Ngspice y Verilog-A, en alineación con tecnologías abiertas como SkyWater 130 nm.

Durante la sesión práctica, los participantes podrán:`,
    },
    topics: [
      {
        en: "Explore the dynamic behavior of a leaky integrate-and-fire (LIF) neuron.",
        es: "Explorar el comportamiento dinámico de una neurona leaky integrate-and-fire (LIF).",
      },
      {
        en: "Simulate memristive devices under various stimuli.",
        es: "Simular dispositivos memristivos bajo diversos estímulos.",
      },
      {
        en: "Analyze synaptic interactions in simple neuromorphic systems.",
        es: "Analizar interacciones sinápticas en sistemas neuromórficos simples.",
      },
    ],
    closing: {
      en: `The workshop aims to bridge the gap between artificial intelligence and microelectronics by providing participants with an initial hands-on experience in analog neuromorphic hardware design.`,
      es: `El taller busca cerrar la brecha entre la inteligencia artificial y la microelectrónica, proporcionando a los participantes una experiencia práctica inicial en el diseño de hardware neuromórfico analógico.`,
    },
  },
  {
    name: "Prof. Elsa Rubio Espino",
    image: "./people/elsa_rubio.jpeg",
    title: {
      en: "Robot Modeling and Control",
      es: "Modelado y control de robots",
    },
    description: {
      en: `This tutorial, presented by Prof. Elsa Rubio Espino from the Centro de Investigacion en Computacion of the Instituto Politecnico Nacional (CDMX, Mexico), aims to introduce participants to the fundamental principles of mobile robot modeling and control from both theoretical and applied perspectives.

The first part will cover general concepts of mathematical modeling using differential equations, which enable the description of the dynamic behavior of robotic systems in real-world environments.

Then, various control strategies used in mobile robotics will be presented, including classical approaches, fuzzy logic-based techniques, and optimal control methods.`,
      es: `Este tutorial, impartido por la Prof. Elsa Rubio Espino del Centro de Investigacion en Computacion del Instituto Politecnico Nacional (CDMX, Mexico), tiene como objetivo introducir a los participantes en los principios fundamentales del modelado y control de robots moviles, desde perspectivas tanto teoricas como aplicadas.

La primera parte abordara conceptos generales de modelado matematico mediante ecuaciones diferenciales, que permiten describir el comportamiento dinamico de sistemas roboticos en entornos reales.

Despues, se presentaran diversas estrategias de control utilizadas en robotica movil, incluyendo enfoques clasicos, tecnicas basadas en logica difusa y metodos de control optimo.`,
    },
    topics: [
      {
        en: "Fundamentals and applications will be discussed in general terms, emphasizing their relevance for navigation problems.",
        es: "Se discutiran fundamentos y aplicaciones en terminos generales, resaltando su relevancia para resolver problemas de navegacion.",
      },
      {
        en: "The tutorial highlights how control methods support stability in mobile robotic systems.",
        es: "El tutorial destaca como los metodos de control contribuyen a la estabilidad en sistemas roboticos moviles.",
      },
      {
        en: "Trajectory-tracking challenges are addressed by connecting modeling with control strategy design.",
        es: "Se abordan desafios de seguimiento de trayectoria al conectar el modelado con el diseno de estrategias de control.",
      },
    ],
    closing: {
      en: `The tutorial is geared toward students, researchers, and professionals interested in robotics, dynamic systems, and control, and provides a comprehensive overview that connects mathematical modeling with the design of control strategies for mobile systems.`,
      es: `El tutorial esta dirigido a estudiantes, investigadores y profesionistas interesados en robotica, sistemas dinamicos y control, y ofrece una vision integral que conecta el modelado matematico con el diseno de estrategias de control para sistemas moviles.`,
    },
  },
];

  const panels = [
    {
      name: "Luis Eduardo Villarreal Vázquez",
      image: "./people/luis_villareal.jpeg",
      title: {
        en: "Robotics for Young Innovators: Building Champions in STEM",
        es: "Robótica para Jóvenes Innovadores: Formando Campeones en STEM",
      },
      role: {
        en: "International Robotics Champion & Student-Instructor, Mech Robotix",
        es: "Campeón Internacional de Robótica & Instructor-Estudiante, Mech Robotix",
      },
      description: {
        en: `At just 13 years old and in 8th grade, Luis Eduardo Villarreal Vázquez is an international robotics champion and award-winning STEM instructor. He represents an inspiring example of how young people can achieve extraordinary results in science and technology competitions.

Luis has represented his city, state, and Mexico in various robotics, science, and technology competitions since the age of 8. He is an international robotics champion in several Robojam competition categories, having participated in competitions in Mexico, Colombia, USA, Europe, and Asia. He holds a world record in the RoboSketch category since 2022 and was named Roboticist of the Year 2022 by Robojam International.

His award-winning projects include "Ecoalebrijes Robóticos" (earning a bronze medal at Infomatrix Solacyt 2022), "BullyGuard MIA: Combating Bullying with Artificial Intelligence" (gold medal at state level, bronze at Ibero-American level, and registered with INDAUTOR), and "3D Chickens Live: Where technology can create life" (gold medal at Infomatrix Solacyt Chihuahua 2026).

Luis was named Best Roboticist of Mexico 2023 by The Valerio Foundation and is selected as one of UNICEF Mexico's "Youth Who Inspire 2025."`,
        es: `Con solo 13 años de edad y cursando 8º grado, Luis Eduardo Villarreal Vázquez es un campeón internacional de robótica e instructor galardonado en STEM. Representa un ejemplo inspirador de cómo los jóvenes pueden lograr resultados extraordinarios en competencias de ciencia y tecnología.

Luis ha representado su ciudad, estado y México en varias competencias de robótica, ciencia y tecnología desde los 8 años. Es campeón internacional de robótica en varias categorías de competencias Robojam, habiendo participado en competencias en México, Colombia, USA, Europa y Asia. Ostenta un récord mundial en la categoría RoboSketch desde 2022 y fue nombrado Roboticista del Año 2022 por Robojam International.

Sus proyectos galardonados incluyen "Ecoalebrijes Robóticos" (medalla de bronce en Infomatrix Solacyt 2022), "BullyGuard MIA: Combatiendo el Bullying con Inteligencia Artificial" (medalla de oro a nivel estatal, bronce a nivel iberoamericano, y registrado con INDAUTOR), y "3D Chickens Live: Where technology can create life" (medalla de oro en Infomatrix Solacyt Chihuahua 2026).

Luis fue nombrado Mejor Roboticista de México 2023 por The Valerio Foundation y está seleccionado como uno de los "Youth Who Inspire 2025" de UNICEF México.`,
      },
      highlights: [
        {
          en: "International Robotics Champion in multiple Robojam categories",
          es: "Campeón Internacional de Robótica en múltiples categorías Robojam",
        },
        {
          en: "World Record holder in RoboSketch category (2022-present)",
          es: "Poseedor de Récord Mundial en categoría RoboSketch (2022-presente)",
        },
        {
          en: "Roboticist of the Year 2022 - Robojam International",
          es: "Roboticista del Año 2022 - Robojam International",
        },
        {
          en: "Best Roboticist of Mexico 2023 - The Valerio Foundation",
          es: "Mejor Roboticista de México 2023 - The Valerio Foundation",
        },
        {
          en: "NASA Space Apps Challenge 2024 Global Nomination - Supernova Family Team",
          es: "Nominación Global NASA Space Apps Challenge 2024 - Equipo Supernova Family",
        },
        {
          en: "UNICEF Mexico's Youth Who Inspire 2025",
          es: "Youth Who Inspire 2025 de UNICEF México",
        },
      ],
    },
    {
      name: "David da Vinci (Edgar David Camacho Flores)",
      image: "./people/david_da_vinci.jpg",
      title: {
        en: "Human Industry 4.0: Meaningful Innovation for New Generations",
        es: "Industria Humana 4.0: innovacion con sentido para nuevas generaciones",
      },
      role: {
        en: "Science Communicator, Writer, Teacher, and Young Entrepreneur",
        es: "Divulgador cientifico, escritor, docente y joven emprendedor",
      },
      description: {
        en: `David da Vinci (Edgar David Camacho Flores) is a 10-year-old boy from Mexico who is learning to be a polymath, an entrepreneur, and one of the most inspiring young voices in Mexico when it comes to meaningful innovation.

He came up with the idea of "Human Industry 4.0," a vision that brings together artificial intelligence, emotional intelligence, and human growth to create new generations that are more aware, skilled, and ready for the future.

From a really young age, David found his love for learning and making things. Now, he is a science communicator, teacher, writer, and entrepreneur, sharing ideas about STEAM, emotional intelligence, purposeful technology, and kids' rights.

He wrote the book "How far would you go for your passion?", which encourages girls, boys, young people, and adults to find their purpose and grow their potential from a young age.

He is the creator of Macayos, an IP (intellectual property) and educational platform fueled by artificial intelligence, aimed at helping girls, boys, and young people learn to understand and manage their emotions while building a life filled with well-being and purpose.

He is also the founder of GenIA, a meaningful generative artificial intelligence academy aimed at teaching new generations how to use technology in an ethical, creative, and thoughtful way.

With a love for space science, languages, and the performing arts, he has taken part in musical theater, television, and digital projects, crafting educational content that is fun, easy to understand, and truly connects with people.

His journey starts with a personal challenge that turned into a mission: to support the well-being, safety, and overall growth of children and young people.

Through his work, he encourages values like empathy, discipline, curiosity, resilience, and taking meaningful action.

Today, David da Vinci is not just working on projects, he is planting the seeds for a fresh way to think about education, technology, and leadership around the globe.`,
        es: `David da Vinci (Edgar David Camacho Flores) es un nino mexicano de 10 anos que se esta formando como polimata, emprendedor y una de las voces jovenes mas inspiradoras en Mexico cuando se trata de innovacion con sentido.

Es creador de la idea de "Industria Humana 4.0", una vision que integra inteligencia artificial, inteligencia emocional y desarrollo humano para formar nuevas generaciones mas conscientes, capacitadas y preparadas para el futuro.

Desde muy pequeno, David descubrio su pasion por aprender y crear. Hoy es divulgador cientifico, docente, escritor y emprendedor, compartiendo ideas sobre STEAM, inteligencia emocional, tecnologia con proposito y derechos de la infancia.

Es autor del libro "How far would you go for your passion?", que inspira a ninas, ninos, jovenes y personas adultas a encontrar su proposito y desarrollar su potencial desde edades tempranas.

Es creador de Macayos, una propiedad intelectual y plataforma educativa impulsada por inteligencia artificial, enfocada en ayudar a ninas, ninos y jovenes a comprender y gestionar sus emociones mientras construyen una vida con bienestar y sentido.

Tambien es fundador de GenIA, una academia de inteligencia artificial generativa con enfoque humano que ensena a nuevas generaciones a usar la tecnologia de forma etica, creativa y reflexiva.

Con gran interes por la ciencia espacial, los idiomas y las artes escenicas, ha participado en teatro musical, television y proyectos digitales, creando contenido educativo divertido, claro y cercano para diferentes audiencias.

Su trayectoria surge de un reto personal que se transformo en mision: impulsar el bienestar, la seguridad y el desarrollo integral de la infancia y la juventud.

A traves de su trabajo promueve valores como la empatia, la disciplina, la curiosidad, la resiliencia y la accion con sentido.

Hoy, David da Vinci no solo trabaja en proyectos: esta sembrando una nueva forma de pensar la educacion, la tecnologia y el liderazgo a nivel global.`,
      },
      highlights: [
        {
          en: "Creator of the Human Industry 4.0 vision",
          es: "Creador de la vision Industria Humana 4.0",
        },
        {
          en: "Founder of GenIA, an ethical and creative AI academy for new generations",
          es: "Fundador de GenIA, academia de IA etica y creativa para nuevas generaciones",
        },
        {
          en: "Creator of Macayos, an AI-powered educational IP and platform",
          es: "Creador de Macayos, propiedad intelectual y plataforma educativa impulsada por IA",
        },
        {
          en: "Author of How far would you go for your passion?",
          es: "Autor de How far would you go for your passion?",
        },
        {
          en: "Young communicator of STEAM, emotional intelligence, and children's rights",
          es: "Joven divulgador de STEAM, inteligencia emocional y derechos de la infancia",
        },
      ],
    },
    {
      name: "Mtra. Elizabeth Burrola Melendez",
      image: "./people/elizabeth_burrola.png",
      title: {
        en: "Technology with Purpose: Institutional Leadership and Public Innovation",
        es: "Tecnologia con proposito: liderazgo institucional e innovacion publica",
      },
      role: {
        en: "Director, Centro de Innovacion e Integracion de Tecnologias Avanzadas (CIITA-IPN)",
        es: "Directora, Centro de Innovacion e Integracion de Tecnologias Avanzadas (CIITA-IPN)",
      },
      description: {
        en: `Senior public administration executive with broad experience in institutional management, internal control, auditing, budget evaluation, quality management systems, and higher education administration.

She has led initiatives to strengthen organizational processes, improve operational efficiency, and ensure regulatory compliance while coordinating multidisciplinary teams toward strategic goals.

She currently serves as Director of CIITA from the National Polytechnic Institute.` ,
        es: `Ejecutiva senior de administracion publica con amplia experiencia en gestion institucional, control interno, auditoria, evaluacion presupuestal, sistemas de gestion de calidad y administracion de educacion superior.

Ha liderado iniciativas para fortalecer procesos organizacionales, mejorar la eficiencia operativa y asegurar el cumplimiento normativo, coordinando equipos multidisciplinarios hacia objetivos estrategicos.

Actualmente se desempena como Directora del CIITA del Instituto Politecnico Nacional.`,
      },
      highlights: [
        {
          en: "Director, CIITA-IPN (2024-present)",
          es: "Directora, CIITA-IPN (2024-a la fecha)",
        },
        {
          en: "Former Academic Director, Universidad Tecnologica de Camargo (2021-2023)",
          es: "Ex Directora Academica, Universidad Tecnologica de Camargo (2021-2023)",
        },
        {
          en: "Former Technical Coordinator, Secretaria de la Funcion Publica (2021)",
          es: "Ex Coordinadora Tecnica, Secretaria de la Funcion Publica (2021)",
        },
      ],
    },
    {
      name: "Mtro. Orlando Daniel Avitia",
      image: "./people/orlando_avitia.jpg",
      title: {
        en: "AI Fluency and Talent Development for the Borderplex Region",
        es: "Fluidez en IA y desarrollo de talento para la region Borderplex",
      },
      role: {
        en: "Regional Director Zona Norte, CECyTECH / Co-Founder and CEO, SinergiX Talent Development",
        es: "Director Regional Zona Norte, CECyTECH / Cofundador y CEO, SinergiX Talent Development",
      },
      description: {
        en: `Educational leader and AI specialist with more than 16 years of experience across the educational, industrial, and social sectors in the Borderplex region.

He leads AI literacy, growth mindset, and technology adoption programs for executives, teachers, HR teams, and plant operators, and has trained over 215 teachers in applied AI for education.

He has also promoted strategic initiatives such as Juarez IA Fluency and Juarez Skills+ to strengthen regional innovation and workforce development.` ,
        es: `Lider educativo y especialista en inteligencia artificial con mas de 16 anos de trayectoria en el sector educativo, industrial y social de la region Borderplex.

Lidera programas de alfabetizacion en IA, mentalidad de crecimiento y adopcion tecnologica para directivos, docentes, equipos de RR.HH. y operarios, y ha capacitado a mas de 215 docentes en IA aplicada a la educacion.

Tambien ha impulsado iniciativas estrategicas como Juarez IA Fluency y Juarez Skills+ para fortalecer la innovacion regional y el desarrollo del talento.`,
      },
      highlights: [
        {
          en: "Regional Director Zona Norte, CECyTECH",
          es: "Director Regional Zona Norte, CECyTECH",
        },
        {
          en: "Co-Founder and CEO, SinergiX Talent Development",
          es: "Cofundador y CEO, SinergiX Talent Development",
        },
        {
          en: "Leader of Juarez IA Fluency and strategic semiconductor initiatives",
          es: "Impulsor de Juarez IA Fluency e iniciativas estrategicas en semiconductores",
        },
      ],
    },
    {
      name: "Ing. Javier Acosta",
      image: "./people/Javier-Acosta.jpg",
      title: {
        en: "Industrial AI in Manufacturing: Automation, Vision, and Traceability",
        es: "IA industrial en manufactura: automatizacion, vision y trazabilidad",
      },
      role: {
        en: "Founder, Mechatronics AI",
        es: "Fundador, Mechatronics AI",
      },
      description: {
        en: `Founder of Mechatronics AI and specialist in industrial artificial intelligence for manufacturing, with more than 20 years of experience in industrial automation, robotics, and production processes.

He is the inventor of Traceability 4.0, ArVision, and Humantronic solutions, focused on transforming legacy equipment into intelligent systems and improving quality and productivity in assembly lines.` ,
        es: `Fundador de Mechatronics AI y especialista en inteligencia artificial industrial para manufactura, con mas de 20 anos de experiencia en automatizacion industrial, robotica y procesos de produccion.

Es inventor de soluciones como Traceability 4.0, ArVision y Humantronic, enfocadas en transformar equipos legacy en sistemas inteligentes y mejorar calidad y productividad en lineas de ensamble.`,
      },
      highlights: [
        {
          en: "Founder, Mechatronics AI",
          es: "Fundador, Mechatronics AI",
        },
        {
          en: "Inventor of Traceability 4.0 and ArVision systems",
          es: "Inventor de los sistemas Traceability 4.0 y ArVision",
        },
        {
          en: "Expert in industrial automation, robotics, and manufacturing AI",
          es: "Experto en automatizacion industrial, robotica e IA para manufactura",
        },
      ],
    },
  ];

  const navItems = [
    { id: "home", label: { en: "Home", es: "Inicio" } },
    { id: "live-transmission", label: { en: "Live transmission", es: "Transmisión en vivo" } },
    { id: "call-for-papers", label: { en: "Call for papers", es: "Convocatoria" } },
    { id: "paper-awards", label: { en: "Paper awards", es: "Premios" } },
    { id: "keynote-speakers", label: { en: "Keynote speakers and panelists", es: "Conferencistas y panelistas" } },
    { id: "students-meeting", label: { en: "Student's meeting", es: "Reunion estudiantil" } },
    { id: "program-committee", label: { en: "Program committee", es: "Comite de programa" } },
    { id: "organization", label: { en: "Organization", es: "Organizacion" } },
    { id: "conference-proceedings", label: { en: "Conference proceedings", es: "Memorias" } },
    { id: "fees", label: { en: "Fees", es: "Costos" } },
  ];

  const callTopics = [
    "Data Mining",
    "Discrete Geometry",
    "Document Processing and Recognition",
    "Fuzzy and Hybrid Techniques in Pattern Recognition",
    "Image Coding, Processing and Analysis",
    "Industrial and Medical Applications of Pattern Recognition",
    "Bioinformatics",
    "Logical Combinatorial Pattern Recognition",
    "Mathematical Morphology",
    "Deep Neural Networks",
    "Artificial Intelligent Techniques and Recognition",
    "Pattern Recognition Principles",
    "Robotics and Remote Sensing Applications of Pattern Recognition",
    "Shape and Texture Analysis",
    "Signal Processing and Analysis",
    "Special Hardware Architectures",
    "Statistical and Structural Pattern Recognition",
    "Voice and Speech Recognition",
    "Parallel and Distributed Pattern Recognition",
    "Pattern Recognition Tools for Active Observatories for Earth, Planets, Climate and Life",
  ];

  const timelineItems = [
    { title: "Submission deadline", date: "February 22, 2026" },
    { title: "Notification", date: "April 8, 2026" },
    { title: "Camera-ready due", date: "April 10, 2026" },
    { title: "Early bird registration", date: "April 24, 2026" },
    { title: "Main conference", date: "June 24-27, 2026" },
  ];

  const keynoteSpeakers = [
    {
      title: {
        en: "Foundation Models for Microscopy and Medical Data Analysis",
        es: "Modelos fundacionales para microscopía y análisis de datos médicos",
      },
      name: "Prof. Dr. Erik Rodner",
      affiliation: {
        en: "Professor for Data Science and Machine Learning, University of Applied Sciences Berlin",
        es: "Profesor de Ciencia de Datos y Aprendizaje Automático, Universidad de Ciencias Aplicadas de Berlín",
      },
      initials: "ER",
      image: "./people/erik_rodner.jpg",
      abstract: {
        en: `Foundation models enable transferable representations across tasks and domains, but their application to biomedical data remains challenging due to limited annotations and heterogeneous data.

  In this talk, we present recent work on applying foundation models to two key modalities: microscopy images and structured medical data.

  For microscopy analysis, we show how synthetic data can be used to train and adapt foundation models for complex imaging tasks, improving robustness and performance under limited supervision.

  For structured medical tabular data, we show results of recent benchmarks in the small data domain, identify relevant units in current tabular foundation models, and show the surprising performance of zero-shot model generation.

  By connecting both domains, we highlight common opportunities and challenges of foundation models, including robustness and interpretability.`,
        es: `Los modelos fundacionales permiten obtener representaciones transferibles entre tareas y dominios, pero su aplicación a datos biomédicos sigue siendo un reto debido a la limitada disponibilidad de anotaciones y a la heterogeneidad de los datos.

  En esta conferencia, presentamos trabajos recientes sobre la aplicación de modelos fundacionales a dos modalidades clave: imágenes de microscopía y datos médicos estructurados.

  Para el análisis de microscopía, mostramos cómo los datos sintéticos pueden utilizarse para entrenar y adaptar modelos fundacionales a tareas complejas de imagen, mejorando la robustez y el desempeño en escenarios con supervisión limitada.

  Para datos médicos tabulares estructurados, mostramos resultados de evaluaciones recientes en dominios con pocos datos, identificamos unidades relevantes en modelos fundacionales tabulares actuales y presentamos el sorprendente desempeño de la generación de modelos zero-shot.

  Al conectar ambos dominios, destacamos oportunidades y desafíos comunes de los modelos fundacionales, incluyendo la robustez y la interpretabilidad.`,
      },
      biography: {
        en: `Erik Rodner is a professor of Machine Learning and Data Science at the University of Applied Sciences Berlin (HTW Berlin). His work lies at the intersection of machine learning and computer vision, with a particular interest in learning under limited data availability.

  Prior to joining HTW Berlin, he held a tenured lecturer position at the University of Jena, where his research focused on transfer and active learning for computer vision, aiming to improve generalization when training data is scarce. Earlier international research experience was gained during a postdoctoral stay at the University of California, Berkeley in 2012–2013, where he worked on domain adaptation and open-set recognition.

  Between 2018 and 2020, Erik Rodner was part of ZEISS Corporate Research as Machine Learning Lead. In this role, he led work on learning-based methods for optical inspection and medical and microscopy image analysis, bridging academic research and industrial applications. Erik Rodner has authored more than 100 peer-reviewed publications in machine learning and computer vision, published in leading international conferences and journals such as CVPR, ECCV, ICCV, TPAMI, and IJCV.`,
        es: `Erik Rodner es profesor de Aprendizaje Automático y Ciencia de Datos en la Universidad de Ciencias Aplicadas de Berlín (HTW Berlin). Su trabajo se ubica en la intersección entre el aprendizaje automático y la visión por computadora, con un interés particular en el aprendizaje bajo disponibilidad limitada de datos.

  Antes de incorporarse a HTW Berlin, ocupó una posición académica permanente en la Universidad de Jena, donde su investigación se centró en aprendizaje por transferencia y aprendizaje activo para visión por computadora, con el objetivo de mejorar la generalización cuando los datos de entrenamiento son escasos. Su experiencia internacional previa incluye una estancia posdoctoral en la Universidad de California, Berkeley, entre 2012 y 2013, donde trabajó en adaptación de dominio y reconocimiento de conjuntos abiertos.

  Entre 2018 y 2020, Erik Rodner formó parte de ZEISS Corporate Research como líder de Aprendizaje Automático. En este cargo, dirigió trabajos sobre métodos basados en aprendizaje para inspección óptica y análisis de imágenes médicas y de microscopía, conectando la investigación académica con aplicaciones industriales. Erik Rodner es autor de más de 100 publicaciones revisadas por pares en aprendizaje automático y visión por computadora, publicadas en conferencias y revistas internacionales líderes como CVPR, ECCV, ICCV, TPAMI e IJCV.`,
      },
    },
    {
      title: {
        en: "New Paradigms in Sensors and Computer Vision Methods plus Comments on AI Production at an International Scale",
        es: "Nuevos paradigmas en sensores y métodos de visión por computadora, además de comentarios sobre producción de IA a escala internacional",
      },
      name: "Prof. Walterio Mayol-Cuevas",
      affiliation: {
        en: "University of Bristol, UK / Amazon US",
        es: "Universidad de Bristol, Reino Unido / Amazon Estados Unidos",
      },
      initials: "WM",
      image: "./people/walterio_mayol.jpg",
      abstract: {
        en: `The frontier of AI has not yet been reached, partly due to the lack of connection between the synthetic world and real-world actions.

  This talk has two parts. In the first, I will cover recent research projects with collaborators and students at the University of Bristol on new visual sensors that allow for processing and computation at the moment of image capture.

  This allows us to redefine how we approach computer vision and AI, considering real-world constraints and opportunities. I will also discuss methods for understanding visual actions, such as skill detection and identification of difficult moments in manual tasks.

  In the second part of the talk, I will discuss personal opinions based on work on AI and computer vision methods in commercial production at scale in international environments.`,
        es: `La frontera de la inteligencia artificial aún no se ha alcanzado, en parte debido a la falta de conexión entre el mundo sintético y las acciones del mundo real.

  Esta conferencia tiene dos partes. En la primera, presentaré proyectos de investigación recientes con colaboradores y estudiantes de la Universidad de Bristol sobre nuevos sensores visuales que permiten procesamiento y cómputo al momento de capturar la imagen.

  Esto permite redefinir la manera en que abordamos la visión por computadora y la inteligencia artificial, considerando restricciones y oportunidades del mundo real. También discutiré métodos para comprender acciones visuales, como la detección de habilidades y la identificación de momentos difíciles en tareas manuales.

  En la segunda parte de la conferencia, compartiré opiniones personales basadas en el trabajo con métodos de IA y visión por computadora en producción comercial a escala dentro de entornos internacionales.`,
      },
      biography: {
        en: `Walterio Mayol-Cuevas is Full Professor in the School of Computer Science at the University of Bristol and Head of Generative AI Science at Amazon Ads.

  His interests overlap visual mapping methods, robotics, augmented reality, and AI-powered creativity.`,
        es: `Walterio Mayol-Cuevas es profesor titular en la Escuela de Ciencias de la Computación de la Universidad de Bristol y Head of Generative AI Science en Amazon Ads.

  Sus intereses abarcan métodos de mapeo visual, robótica, realidad aumentada y creatividad impulsada por inteligencia artificial.`,
      },
    },
    {
      title: {
        en: "Quantum Computing: Foundations, Transition to Industry and Applications in Pattern Recognition",
        es: "Computación cuántica: fundamentos, transición hacia la industria y aplicaciones en reconocimiento de patrones",
      },
      name: "Prof. Dr. Salvador E. Venegas-Andraca",
      affiliation: {
        en: "Tecnologico de de Monterrey, Campus Ciudad de Mexico",
        es: "Tecnologico de de Monterrey, Campus Ciudad de Mexico",
      },
      initials: "SV",
      image: "./people/salvador_elias.jpg",
      abstract: {
        en: `Quantum computing is a scientific and engineering field that, due to its pervasiveness and maturity, is now transitioning from the lab to the market. Quantum technology, a field composed of computers, sensors, and communication systems based on quantum physics, is expected to become a driving force of the global economy.

  In this talk, I shall define the notion of quantum computing and its constituent parts. Moreover, I shall provide a succinct introduction to the history of quantum computing followed by a concise review of the mathematical and computational foundations of this discipline.

  I will then talk about quantum algorithms and present several results of my research group with an emphasis on the multidisciplinary nature of quantum computing. Then, I will explore how quantum algorithms can be developed and used for pattern recognition. I shall start by reviewing the foundations of quantum pattern recognition followed by case studies that show the potential advantages of using quantum algorithms for pattern recognition.

  Finally, I will address some pivotal features of the emerging high-tech market of quantum technologies. I will analyze the role of National Quantum Initiatives, Education and Technical Training, Technical Norms, Standards, and Tools for production and education, for the advancement of quantum computing and its potential use to boost the economic performance of participating societies as well as to decrease technological and social gaps among nations.`,
        es: `La computación cuántica es un campo científico y de ingeniería que, debido a su amplitud y madurez, actualmente está transitando del laboratorio al mercado. Se espera que la tecnología cuántica, un campo compuesto por computadoras, sensores y sistemas de comunicación basados en la física cuántica, se convierta en una fuerza impulsora de la economía global.

  En esta conferencia, definiré la noción de computación cuántica y sus partes constitutivas. Además, presentaré una introducción breve a la historia de la computación cuántica, seguida de una revisión concisa de los fundamentos matemáticos y computacionales de esta disciplina.

  Posteriormente, hablaré sobre algoritmos cuánticos y presentaré diversos resultados de mi grupo de investigación, con énfasis en la naturaleza multidisciplinaria de la computación cuántica. Después, exploraré cómo los algoritmos cuánticos pueden desarrollarse y utilizarse para el reconocimiento de patrones. Comenzaré revisando los fundamentos del reconocimiento cuántico de patrones, seguido de casos de estudio que muestran las ventajas potenciales de usar algoritmos cuánticos para reconocimiento de patrones.

  Finalmente, abordaré algunas características fundamentales del mercado emergente de alta tecnología en tecnologías cuánticas. Analizaré el papel de las iniciativas cuánticas nacionales, la educación y capacitación técnica, las normas técnicas, los estándares y las herramientas de producción y educación para el avance de la computación cuántica, así como su posible uso para impulsar el desempeño económico de las sociedades participantes y disminuir brechas tecnológicas y sociales entre naciones.`,
      },
      biography: {
        en: `Salvador E. Venegas-Andraca is a scientist, consultant, and entrepreneur devoted to scientific research, technology development, technology transfer, and teaching. Salvador's work is aimed at understanding scientific and societal aspects of computation as well as contributing towards the economic development of modern society based on science and technology.

  Salvador is the founder of quantum computing in Mexico. He is also the founder and Principal Investigator of the Unconventional Computing Lab (est. 2004), a professor of Computer Science at Tecnologico de Monterrey, and adjunct professor at the Faculty of Sciences of the National Autonomous University of Mexico (UNAM). Also, Salvador is an Associate Editor of the Quantum Information Processing journal (Springer) as well as a member of the Quantum Computing Network of the World Economic Forum.

  Salvador holds a DPhil in Physics and an MSc by research in Computer Vision, both degrees awarded by the University of Oxford, as well as an MBA (Hon) and a BSc (Hon) in Digital Electronics and Computer Science, these two last degrees awarded by Tecnologico de Monterrey. In 2008, Salvador was a postdoctoral fellow at the Faculty of Arts and Sciences of Harvard University.

  Salvador is a leading scientist in the field of quantum walks, co-founder of the field Quantum Image Processing, and his research interests include quantum algorithms, quantum walks, the analysis of biological information via quantum algorithms, quantum machine learning, quantum image processing, classical and quantum cybersecurity, and the analysis of NP-hard and NP-complete problems. Salvador has supervised several undergraduate (BSc) and graduate (MSc, PhD) students whose research efforts have been focused on quantum science and technology.

  Salvador is the author of "Quantum Walks for Computer Scientists" (Morgan and Claypool, 2008), the first book ever written on the scientific field of quantum walks, and co-author of "Quantum Image Processing" (Springer, 2020), the first book ever written fully focused on storing, processing and retrieving visual information using quantum mechanical systems. He has published more than 60 scientific papers with more than 3,000 citations in Web of Science. Furthermore, Salvador has coauthored twelve white papers and insight reports on quantum technology and cybersecurity published by the World Economic Forum. Since 2020, Salvador is included in the World's Top 2% Scientists lists for both career-long impact and single-year impact.

  Salvador has delivered plenary talks, keynote talks, seminars, tutorials and other courses in Argentina, Brazil, Canada, Colombia, Egypt, Germany, Japan, Mexico, Peru, El Salvador, Saudi Arabia, United Arab Emirates, The United Kingdom, The United States of America, Uruguay, and The Vatican. He has also co-organized conferences, workshops and tutorials in Mexico, The United Kingdom, and The United States of America. Salvador has been a Visiting Professor at Harvard University, the National Autonomous University of Mexico, the National Polytechnic Institute (Mexico), Yucatan Autonomous University (Mexico), del Valle University (Colombia), Sergio Arboleda University (Colombia), Bahia Blanca University (Argentina), and Montevideo University (Uruguay).

  Salvador has received several awards for his scientific achievements, among them: fellow of the Mexican Academy of Sciences, Senior Member and Distinguished Speaker of the Association for Computing Machinery, fellow of the Mexican Academy of Computer Science, member of the Mexican Society for the Public Communication of Science, Level 3 (physics and mathematics) at Mexico’s National Network of Researchers (SNII), Oxford University Chancellor Fund’s Award, Romulo Garza Award (2015), Outstanding Professor Award at Tecnologico de Monterrey (2021, 2022, 2024,2025), and Silver Medal at the British Council International Students Awards (2005).`,
        es: `Salvador E. Venegas-Andraca es científico, consultor y emprendedor dedicado a la investigación científica, el desarrollo tecnológico, la transferencia de tecnología y la enseñanza. Su trabajo busca comprender aspectos científicos y sociales de la computación, además de contribuir al desarrollo económico de la sociedad moderna basada en ciencia y tecnología.

  Salvador es el fundador de la computación cuántica en México. También es fundador e investigador principal del Unconventional Computing Lab (establecido en 2004), profesor de Ciencias de la Computación en el Tecnológico de Monterrey y profesor adjunto en la Facultad de Ciencias de la Universidad Nacional Autónoma de México (UNAM). Además, es editor asociado de la revista Quantum Information Processing de Springer y miembro de la Quantum Computing Network del Foro Económico Mundial.

  Salvador cuenta con un DPhil en Física y una maestría de investigación en Visión por Computadora, ambos grados otorgados por la Universidad de Oxford, así como un MBA con honores y una licenciatura con honores en Electrónica Digital y Ciencias de la Computación, estos dos últimos otorgados por el Tecnológico de Monterrey. En 2008, fue investigador posdoctoral en la Facultad de Artes y Ciencias de la Universidad de Harvard.

  Salvador es un científico líder en el campo de las caminatas cuánticas, cofundador del campo de Procesamiento Cuántico de Imágenes, y sus intereses de investigación incluyen algoritmos cuánticos, caminatas cuánticas, análisis de información biológica mediante algoritmos cuánticos, aprendizaje automático cuántico, procesamiento cuántico de imágenes, ciberseguridad clásica y cuántica, y el análisis de problemas NP-hard y NP-complete. Ha dirigido a diversos estudiantes de licenciatura, maestría y doctorado enfocados en ciencia y tecnología cuántica.

  Salvador es autor de "Quantum Walks for Computer Scientists" (Morgan and Claypool, 2008), el primer libro escrito sobre el campo científico de las caminatas cuánticas, y coautor de "Quantum Image Processing" (Springer, 2020), el primer libro centrado completamente en almacenar, procesar y recuperar información visual usando sistemas de mecánica cuántica. Ha publicado más de 60 artículos científicos con más de 3,000 citas en Web of Science. Además, ha coescrito doce documentos técnicos e informes sobre tecnología cuántica y ciberseguridad publicados por el Foro Económico Mundial. Desde 2020, Salvador aparece en las listas World's Top 2% Scientists tanto por impacto a lo largo de su carrera como por impacto anual.

  Salvador ha impartido conferencias plenarias, conferencias magistrales, seminarios, tutoriales y otros cursos en Argentina, Brasil, Canadá, Colombia, Egipto, Alemania, Japón, México, Perú, El Salvador, Arabia Saudita, Emiratos Árabes Unidos, Reino Unido, Estados Unidos, Uruguay y el Vaticano. También ha coorganizado conferencias, talleres y tutoriales en México, Reino Unido y Estados Unidos. Salvador ha sido profesor visitante en la Universidad de Harvard, la Universidad Nacional Autónoma de México, el Instituto Politécnico Nacional, la Universidad Autónoma de Yucatán, la Universidad del Valle en Colombia, la Universidad Sergio Arboleda en Colombia, la Universidad de Bahía Blanca en Argentina y la Universidad de Montevideo en Uruguay.

  Salvador ha recibido diversos premios por sus logros científicos, entre ellos: miembro de la Academia Mexicana de Ciencias, Senior Member y Distinguished Speaker de la Association for Computing Machinery, miembro de la Academia Mexicana de Computación, miembro de la Sociedad Mexicana para la Divulgación de la Ciencia, Nivel 3 en el Sistema Nacional de Investigadoras e Investigadores (SNII) en física y matemáticas, Oxford University Chancellor Fund’s Award, Premio Rómulo Garza (2015), Outstanding Professor Award del Tecnológico de Monterrey (2021, 2022, 2024, 2025) y Medalla de Plata en los British Council International Students Awards (2005).`,
      },
    },
  ];

  const studentTopics = [
    [
      "Bioinformatics",
      "Neural Networks",
      "Computer Vision",
      "Neural Networks and Associative Memories",
      "Data Mining",
      "Parallel and Distributed Pattern Recognition",
      "Document Processing and Recognition",
      "Robotics and Remote Sensing Applications of Pattern Recognition",
    ],
    [
      "Discrete Geometry",
      "Fuzzy and Hybrid Techniques in Pattern Recognition",
      "Shape and Texture Analysis",
      "Image Coding, Processing and Analysis",
      "Signal Processing and Analysis",
      "Industrial and Medical Applications of Pattern Recognition",
      "Pattern Recognition Principles",
    ],
    [
      "Special Hardware Architectures of Pattern Recognition",
      "Logical Combinatorial Pattern Recognition",
      "Statistical and Structural Pattern Recognition",
      "Mathematical Morphology",
      "Voice and Speech Recognition",
      "Natural Language Processing and Recognition",
    ],
  ];

  const psmDates = [
    { date: "May 17th, 2026", label: "Deadline for submission" },
    { date: "June 1st, 2026", label: "Notification of acceptance" },
    { date: "June 10th, 2026", label: "Camera Ready" },
    { date: "June 24th-27th, 2026", label: "Postgraduate Students&apos; meeting" },
  ];

  const psmCommittee = [
    "Vianey Guadalupe Cruz Sanchez, UACJ",
    "Osslan Osiris Vergara Villegas, UACJ",
    "Juan Humberto Sossa Azuela, CIC - IPN",
    "Jesus Ariel Carrasco Ochoa, INAOE, Mex",
    "Jose Francisco Martinez Trinidad, INAOE, Mex",
    "Jose Arturo Olvera Lopez, BUAP",
  ];

  const committeeChairs = [
    { name: "Vianey G. Cruz Sanchez", affiliation: "UACJ, Mexico", initials: "VC", image: "./people/vianey_cruz.jpg" },
    { name: "Osslan O. Vergara Villegas", affiliation: "UACJ, Mexico", initials: "OV", image: "./people/osslan_vergara.png" },
    { name: "Juan H. Sossa Azuela", affiliation: "CIC-IPN, Mexico", initials: "JS", image: "./people/huberto_sossa.jpg" },
    { name: "Jesus A. Carrasco Ochoa", affiliation: "INAOE, Mexico", initials: "JC", image: "./people/jesus_carrasco.jpg" },
    { name: "Jose F. Martinez Trinidad", affiliation: "INAOE, Mexico", initials: "JM", image: "./people/jose_martinez.jpg" },
    { name: "Jose A. Olvera Lopez", affiliation: "BUAP, Mexico", initials: "JO", image: "./people/jose_olvera.jpg" },
  ];

  const programCommitteeMembers = [
    { firstName: "Adrian", lastName: "Perez-Suay", institution: "University of Valencia" },
    { firstName: "Adrian Pastor", lastName: "Lopez Monroy", institution: "" },
    { firstName: "Agustin", lastName: "Moreno Canadas", institution: "" },
    { firstName: "Annette", lastName: "Morales-Gonzalez", institution: "" },
    { firstName: "Antoni", lastName: "Grau", institution: "Universitat Politecnica de Catalunya" },
    { firstName: "Antonio-Jose", lastName: "Sanchez-Salmeron", institution: "Universitat Politecnica de Valencia" },
    { firstName: "Bappaditya", lastName: "Mandal", institution: "" },
    { firstName: "Bhuvendhraa", lastName: "Rudrusamy", institution: "" },
    { firstName: "Carlo", lastName: "Sansone", institution: "University of Naples Federico II" },
    { firstName: "Catarina", lastName: "Silva", institution: "" },
    { firstName: "Dairazalia", lastName: "Sanchez-Cortes", institution: "" },
    { firstName: "Delia", lastName: "Mitrea", institution: "" },
    { firstName: "Dibio", lastName: "Borges", institution: "Universidade de Brasilia" },
    { firstName: "Dr. Shreyanka", lastName: "Subbarayappa", institution: "M. S. Ramaiah University of Applied Sciences" },
    { firstName: "Eduardo", lastName: "Morales", institution: "INAOE" },
    { firstName: "Efren", lastName: "Mezura-Montes", institution: "" },
    { firstName: "Francisco", lastName: "Antunes", institution: "" },
    { firstName: "Giorgio", lastName: "Fumera", institution: "University of Cagliari" },
    { firstName: "Hayde", lastName: "Peregrina-Barreto", institution: "" },
    { firstName: "Helio", lastName: "Pedrini", institution: "" },
    { firstName: "Hugo Jair", lastName: "Escalante", institution: "INAOE" },
    { firstName: "Humberto", lastName: "Sossa", institution: "IPN" },
    { firstName: "Jacques", lastName: "Facon", institution: "Universidade Federal do Espirito Santo - Sao Mateus" },
    { firstName: "Jakub", lastName: "Nalepa", institution: "" },
    { firstName: "Jinshan", lastName: "Tang", institution: "" },
    { firstName: "Joan Andreu", lastName: "Sanchez", institution: "" },
    { firstName: "Joaquin", lastName: "Salas", institution: "IPN" },
    { firstName: "Jose", lastName: "Ruiz Shulcloper", institution: "" },
    { firstName: "Jose", lastName: "Bernal", institution: "" },
    { firstName: "Jose Luis", lastName: "Oliveira", institution: "University of Aveiro" },
    { firstName: "Jose M.", lastName: "Molina", institution: "" },
    { firstName: "Juan B.", lastName: "Hurtado-Ramos", institution: "" },
    { firstName: "Kalman", lastName: "Palagyi", institution: "University of Szeged" },
    { firstName: "Laurent", lastName: "Heutte", institution: "" },
    { firstName: "Leopoldo", lastName: "Altamirano-Robles", institution: "" },
    { firstName: "Lucia", lastName: "Cimmino", institution: "" },
    { firstName: "Luis Enrique", lastName: "Sucar", institution: "INAOE" },
    { firstName: "Manuel", lastName: "Montes-Y-Gomez", institution: "Instituto Nacional de Astrofisica, Optica y Electronica" },
    { firstName: "Manuel S.", lastName: "Lazo-Cortes", institution: "TecNM/ITTLA" },
    { firstName: "Marcos A.", lastName: "Levano", institution: "Universidad Catolica de Temuco" },
    { firstName: "Marcos Eduardo", lastName: "Valle", institution: "Universidade Estadual de Campinas" },
    { firstName: "Maria", lastName: "Trujillo", institution: "" },
    { firstName: "Martin", lastName: "Kampel", institution: "" },
    { firstName: "Miguel", lastName: "Realpe", institution: "" },
    { firstName: "Miguel", lastName: "Moctezuma-Flores", institution: "" },
    { firstName: "Milton", lastName: "Garcia-Borroto", institution: "" },
    { firstName: "Mohamed", lastName: "Ibn Khedher", institution: "" },
    { firstName: "Monica Karel", lastName: "Huerta", institution: "" },
    { firstName: "Pablo", lastName: "Cancela", institution: "" },
    { firstName: "Pedro", lastName: "Couto", institution: "" },
    { firstName: "Pedro", lastName: "Real Jurado", institution: "Institute Mathematics of Seville University (IMUS)" },
    { firstName: "Sang-Woon", lastName: "Kim", institution: "Myongji University" },
    { firstName: "Sergio", lastName: "Cabrera", institution: "" },
    { firstName: "Silvia", lastName: "Biasotti", institution: "" },
    { firstName: "Svetlana", lastName: "Yanushkevich", institution: "" },
    { firstName: "Vladimir", lastName: "Milian Nunez", institution: "" },
    { firstName: "Xiaoyi", lastName: "Jiang", institution: "University of Munster" },
  ];

  const previousMcprLinks = [
    { label: "2025", href: "https://ccc.inaoep.mx/~mcpr2025/" },
    { label: "2024", href: "https://ccc.inaoep.mx/~mcpr2024/" },
    { label: "2023", href: "https://ccc.inaoep.mx/~mcpr2023/" },
    { label: "2022", href: "https://ccc.inaoep.mx/~mcpr2022/" },
    { label: "2021", href: "https://ccc.inaoep.mx/~mcpr2021/" },
    { label: "2020", href: "https://ccc.inaoep.mx/~mcpr2020/" },
    { label: "2019", href: "https://ccc.inaoep.mx/~mcpr2019/" },
    { label: "2018", href: "https://ccc.inaoep.mx/~mcpr2018/" },
    { label: "2017", href: "https://ccc.inaoep.mx/~mcpr2017/" },
    { label: "2016", href: "https://ccc.inaoep.mx/~mcpr2016/" },
    { label: "2015", href: "https://ccc.inaoep.mx/~mcpr2015/" },
    { label: "2014", href: "https://ccc.inaoep.mx/~mcpr2014/" },
    { label: "2013", href: "https://ccc.inaoep.mx/~mcpr2013/" },
    { label: "2012", href: "https://ccc.inaoep.mx/~mcpr2012/" },
    { label: "2011", href: "https://ccc.inaoep.mx/~mcpr2011/" },
    { label: "2010", href: "https://ccc.inaoep.mx/~mcpr2010/" },
    { label: "2009", href: "https://ccc.inaoep.mx/~mlpr2009/" },
  ];

  const renderMainContent = () => {
    if (activeSection === "home") {
      return (
        <article className="surface page-block home-block">
          <h2>{tr("18th Mexican Conference on Pattern Recognition MCPR 2026", "18a Conferencia Mexicana de Reconocimiento de Patrones MCPR 2026")}</h2>
          <p className="center-line">{tr("Ciudad Juarez, Chihuahua, Mexico", "Ciudad Juarez, Chihuahua, Mexico")}</p>
          <p className="center-line">{tr("June 24 to June 27, 2026", "24 al 27 de junio de 2026")}</p>
          <div className="announcement">{tr("The MCPR 2026 conference will be held in person", "La conferencia MCPR 2026 se celebrara de forma presencial")}</div>

          <div className="home-grid">
            <div>
              <p>
                {tr(
                  "The 18th Mexican Conference on Pattern Recognition (MCPR2026) will be held in Ciudad Juarez, Chihuahua, Mexico from June 24 to June 27, 2026. This is under the direction of the Coordinacion de Ciencias Computacionales and with the consent of the Mexican Association for Pattern Recognition.",
                  "La 18a Conferencia Mexicana de Reconocimiento de Patrones (MCPR2026) se llevara a cabo en Ciudad Juarez, Chihuahua, Mexico del 24 al 27 de junio de 2026. Esta edicion se realiza bajo la direccion de la Coordinacion de Ciencias Computacionales y con el respaldo de la Asociacion Mexicana de Reconocimiento de Patrones."
                )}
              </p>
              <p>
                {tr(
                  "MCPR2026 attempts to provide a forum for the exchange of scientific results, experiences, and new knowledge, as well as promoting cooperation among research groups in Pattern Recognition and related areas in Mexico and around the world.",
                  "MCPR2026 busca ofrecer un foro para el intercambio de resultados cientificos, experiencias y nuevo conocimiento, ademas de fomentar la colaboracion entre grupos de investigacion en Reconocimiento de Patrones y areas afines en Mexico y el mundo."
                )}
              </p>
            </div>

            <ol className="timeline" aria-label="Important dates timeline">
              {timelineItems.map((item) => (
                <li key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.date}</p>
                </li>
              ))}
            </ol>
          </div>
        </article>
      );
    }

    if (activeSection === "paper-awards") {
      return (
        <article className="surface page-block awards-block">
          <h2>{tr("Paper awards", "Premios de articulos")}</h2>
          <p>
            {tr(
              "The MCPR-IAPR Best Paper Award and MCPR-IAPR Student Paper Award winners will be invited to send extended papers to the special section devoted to MCPR in the \"Pattern Recognition Letters\" Journal.",
              "Los ganadores del MCPR-IAPR Best Paper Award y del MCPR-IAPR Student Paper Award seran invitados a enviar versiones extendidas a la seccion especial dedicada a MCPR en la revista \"Pattern Recognition Letters\"."
            )}
          </p>
          <p>
            {tr(
              "The papers accepted and presented at the event will also be invited to submit extended manuscripts to the special issue of the \"Computacion y Sistemas (CyS)\" and \"International Journal of Combinatorial Optimization Problems and Informatics (IJCOPI)\" journals.",
              "Los articulos aceptados y presentados en el evento tambien seran invitados a enviar manuscritos extendidos al numero especial de las revistas \"Computacion y Sistemas (CyS)\" e \"International Journal of Combinatorial Optimization Problems and Informatics (IJCOPI)\"."
            )}
          </p>
          <p>
            {tr(
              "Authors must consider that an extended paper means at least a difference of 40% regarding theory content, experimental results, and references. In addition, the extended versions will be peer-reviewed in accordance with the journals' guidelines.",
              "Los autores deben considerar que una version extendida debe incluir al menos un 40% de contenido adicional respecto al articulo original. Ademas, las versiones extendidas seran evaluadas por pares conforme a los lineamientos de las revistas."
            )}
          </p>
        </article>
      );
    }

    if (activeSection === "tutorials") {
      return (
        <section className="tutorials-section">
          <header className="tutorials-header">
            <p>{tr("MCPR 2026 Tutorials", "Tutoriales MCPR 2026")}</p>
            <h2>{tr("Tutorials MCPR 2026", "Tutoriales MCPR 2026")}</h2>
          </header>

          <div className="tutorials-list">
            {tutorials.map((tutorial) => (
              <article key={tutorial.name} className="surface tutorial-card">
                <aside className="tutorial-speaker">
                  <div className="tutorial-photo-wrap">
                    <Image
                      src={tutorial.image}
                      alt={tutorial.name}
                      width={240}
                      height={240}
                      className="tutorial-photo"
                    />
                  </div>
                  <h3>{tutorial.name}</h3>
                </aside>

                <div className="tutorial-content">
                  <h2>{tutorial.title[language]}</h2>

                  {tutorial.description[language].split("\n\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  <ul>
                    {tutorial.topics.map((topic) => (
                      <li key={topic.en}>{topic[language]}</li>
                    ))}
                  </ul>

                  {tutorial.closing[language].split("\n\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      );
    }

    if (activeSection === "program") {
      const toggleProgramDay = (dayId: string) => {
        setExpandedProgramDays((prev) => ({
          ...prev,
          [dayId]: !prev[dayId],
        }));
      };

      return (
        <article className="surface page-block program-page-block">
          <h2>{tr("Conference program", "Programa de conferencia")}</h2>
          
          <section className="program-embed-wrap" aria-label={tr("PDF program viewer", "Visor PDF del programa")}>
            <iframe
              src="./docs/MCPR2026_Program.pdf"
              title={tr("MCPR 2026 Program PDF", "PDF Programa MCPR 2026")}
              className="program-embed-frame"
              style={{
                width: "100%",
                minHeight: "800px",
                border: "1px solid #d8e0e9",
                borderRadius: "12px",
              }}
            />
          </section>
          
          <div className="program-doc-actions" style={{ marginBottom: "2rem", marginTop: "2rem" }}>
            <a 
              href="./docs/MCPR2026_Program.pdf" 
              download 
              style={{
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: "#007bff",
                color: "white",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "600",
                fontSize: "1.1rem",
                marginRight: "12px",
                marginBottom: "12px",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.backgroundColor = "#0056b3";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.backgroundColor = "#007bff";
              }}
            >
              {tr("Download Program PDF", "Descargar Programa PDF")}
            </a>
          </div>

          <p>
            {tr(
              "Consult the official program document and browse the schedule breakdown by day.",
              "Consulta el documento oficial del programa y revisa el desglose de actividades por dia."
            )}
          </p>

          <div className="program-day-jump-links" aria-label={tr("Program links by day", "Enlaces del programa por dia")}>
            {programLinksPerDay.map((day) => (
              <a key={day.id} href={day.href}>
                {language === "es" ? day.es : day.en}
              </a>
            ))}
          </div>

          <div className="program-days-stack">
            {conferenceProgramByDay.map((day) => (
              <section key={day.id} id={`program-day-${day.id}`} className="program-day-card">
                <button
                  type="button"
                  onClick={() => toggleProgramDay(day.id)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    textAlign: "left",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #dee2e6",
                    borderRadius: "6px",
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.backgroundColor = "#e9ecef";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.backgroundColor = "#f8f9fa";
                  }}
                >
                  <span>{language === "es" ? day.day.es : day.day.en}</span>
                  <span style={{ fontSize: "1.3rem" }}>
                    {expandedProgramDays[day.id] ? "▼" : "▶"}
                  </span>
                </button>
                
                {expandedProgramDays[day.id] && (
                  <ul 
                    className="program-day-full-list"
                    style={{
                      marginTop: "12px",
                      animation: "slideDown 0.3s ease",
                    }}
                  >
                    {day.schedule.map((item, index) => (
                      <li key={`${day.id}-${index}`} className={!item.time ? "session-heading" : ""}>
                        {item.time && <span className="program-time">{item.time}</span>}
                        <span className="program-activity">{language === "es" ? item.es : item.en}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <style>{`
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </article>
      );
    }

    if (activeSection === "call-for-papers") {
      return (
        <article className="surface call-papers">
          <h2>{tr("Call for papers", "Convocatoria de articulos")}</h2>
          <p className="call-subtitle">
            {tr(
              "Authors are invited to submit contributions including, but not limited to the following areas:",
              "Se invita a los autores a enviar contribuciones, incluyendo pero no limitado a las siguientes areas:"
            )}
          </p>

          <ul className="topics-list" aria-label="Call for papers topics list">
            {callTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>

          <section className="submission-note" aria-label="Submission details">
            <p>
              {tr(
                "All 10 A4-page papers will be submitted and presented at the conference in English. All submissions will be blind peer-reviewed by three Scientific Committee members for originality, technical content, and relevance to the conference theme. The final acceptance will be based on a peer review of the full-length paper.",
                "Todos los trabajos de 10 paginas tamano A4 deberan enviarse y presentarse en ingles. Todas las contribuciones seran evaluadas de forma ciega por tres miembros del comite cientifico, considerando originalidad, contenido tecnico y relevancia con el tema de la conferencia. La aceptacion final se basara en la revision del articulo completo."
              )}
            </p>
            <p>
              {tr(
                "Accepted papers will appear in the conference proceedings, published in Springer's LNCS series. The papers should be prepared following the authors' guidelines provided by Springer and adhering to the Code of Conduct of the Editorial. Submission implies that at least one author is willing to register and present the conference communication if it is accepted.",
                "Los articulos aceptados apareceran en las memorias de la conferencia, publicadas en la serie LNCS de Springer. Los trabajos deben prepararse siguiendo las guias para autores de Springer y respetando el codigo editorial. El envio implica que al menos un autor se compromete a registrarse y presentar el trabajo en caso de ser aceptado."
              )}
            </p>
          </section>
        </article>
      );
    }

    if (activeSection === "keynote-speakers") {
      return (
        <section className="panels-section" aria-label="Keynote speakers and panelists">
          <header className="panels-header">
            <p>{tr("MCPR 2026", "MCPR 2026")}</p>
            <h2>{tr("Keynote speakers and panelists", "Conferencistas y panelistas")}</h2>
          </header>

          <div className="accordion-list">
            {keynoteSpeakers.map((speaker) => {
              const isOpen = !!expandedPeople[`keynote-${speaker.name}`];
              return (
                <article key={speaker.name} className="surface accordion-card">
                  <button
                    type="button"
                    className="accordion-trigger"
                    aria-expanded={isOpen}
                    onClick={() => togglePerson(`keynote-${speaker.name}`)}
                  >
                    <div className="accordion-summary">
                      <div className="accordion-avatar">
                        {speaker.image ? (
                          <Image
                            src={speaker.image}
                            alt={speaker.name}
                            width={72}
                            height={72}
                            style={{ width: 72, height: 72, objectFit: "cover", borderRadius: "50%", display: "block" }}
                          />
                        ) : (
                          <span>{speaker.initials}</span>
                        )}
                      </div>
                      <div className="accordion-summary-text">
                        <h3 className="accordion-name">{speaker.name}</h3>
                        <p className="accordion-sub">{speaker.affiliation[language]}</p>
                        <p className="accordion-title-preview">{speaker.title[language]}</p>
                      </div>
                    </div>
                    <span className="accordion-chevron" aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
                  </button>

                  {isOpen && (
                    <div className="accordion-body">
                      <p className="accordion-full-title">{speaker.title[language]}</p>
                      <div className="speaker-text-block">
                        <strong>{tr("Conference abstract:", "Resumen de la conferencia:")}</strong>
                        {speaker.abstract[language].split("\n\n").map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      <div className="speaker-text-block">
                        <strong>{tr("Speaker biography:", "Biografía del ponente:")}</strong>
                        {speaker.biography[language].split("\n\n").map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

            {panels.map((panel) => {
              const isOpen = !!expandedPeople[`panel-${panel.name}`];
              return (
                <article key={panel.name} className="surface accordion-card">
                  <button
                    type="button"
                    className="accordion-trigger"
                    aria-expanded={isOpen}
                    onClick={() => togglePerson(`panel-${panel.name}`)}
                  >
                    <div className="accordion-summary">
                      <div className="accordion-avatar accordion-avatar--panel">
                        <Image
                          src={panel.image}
                          alt={panel.name}
                          width={72}
                          height={72}
                          style={{ width: 72, height: 72, objectFit: "cover", borderRadius: "50%", display: "block" }}
                        />
                      </div>
                      <div className="accordion-summary-text">
                        <h3 className="accordion-name">{panel.name}</h3>
                        <p className="accordion-sub">{panel.role[language]}</p>
                        <p className="accordion-title-preview">{panel.title[language]}</p>
                      </div>
                    </div>
                    <span className="accordion-chevron" aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
                  </button>

                  {isOpen && (
                    <div className="accordion-body">
                      <p className="accordion-full-title">{panel.title[language]}</p>
                      {panel.description[language].split("\n\n").map((paragraph) => (
                        <p key={paragraph} className="accordion-body-text">{paragraph}</p>
                      ))}
                      <h4 className="accordion-highlights-label">{tr("Highlights:", "Logros:")}</h4>
                      <ul className="accordion-highlights">
                        {panel.highlights.map((highlight) => (
                          <li key={highlight.en}>{highlight[language]}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      );
    }

    if (activeSection === "students-meeting") {
      return (
        <article className="surface page-block students-block">
          <h2>{tr("Student's Meeting", "Reunion de Estudiantes")}</h2>

          <p>
            The MCPR Postgraduate Students&apos; Meeting (MCPR2026-PSM) has been
            designed for bringing together Master and PhD students in order to
            discuss their research with a panel of both students and senior
            researchers in the area of Pattern Recognition. MCPR2026-PSM will be
            held in Ciudad Juarez, Chihuahua, Mexico from June 24th-26th, 2026.
          </p>
          <p>The main objectives of this Meeting are:</p>
          <ul>
            <li>
              Provide feedback on participants&apos; research and advices for future
              directions
            </li>
            <li>Promote interaction with other researchers</li>
            <li>
              Promote a spirit of collaborative research and participation in
              conference events
            </li>
          </ul>

          <h3>{tr("Fees", "Cuotas")}</h3>
          <p>
            Authors of accepted papers for the Student&apos;s Meeting will have free
            registration. They will be able to attend all the conferences and
            tutorials of MCPR.
          </p>
          <ul>
            <li>Student with accepted paper: Free</li>
            <li>Student without accepted paper: $(pending) Mexican pesos</li>
            <li>Fees includes entry to all the talks and tutorials of MCPR</li>
          </ul>
          <p>
            <a className="fees-download-link" href="docs/registrationFormMCPR2026.pdf" download>
              {tr("Download registration form (PDF)", "Descargar formato de registro (PDF)")}
            </a>
          </p>

          <h3>{tr("Topics", "Temas")}</h3>
          <div className="topics-columns">
            {studentTopics.map((group, idx) => (
              <ul key={`topic-group-${idx}`}>
                {group.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ))}
          </div>

          <h3>{tr("Paper submission", "Envio de articulos")}</h3>
          <p>All the 10 pages postgraduate students&apos; meeting papers must include:</p>
          <ul>
            <li>Research problem to solve</li>
            <li>Research Methodology</li>
            <li>Main contribution</li>
            <li>Results achieved and their validity</li>
          </ul>
          <p>
            Papers must be elaborated based on{" "}
            <a href="docs/LNCS-Word-Templates.zip" download>Word Template</a>
            {" or "}
            <a href="docs/LaTeX2e%2BProceedings.zip" download>LaTeX Template</a>
            {" "}and sent in PDF format to mcpr2026psm@inaoep.mx. Accepted papers are expected to be
            published in Research in Computing Science (ISSN: 1870-4069) and will
            be presented at the conference as a poster.
          </p>

          <h3>{tr("Review Process", "Proceso de revision")}</h3>
          <p>
            All the papers (PDF) will be submitted in English. All submissions
            will be rigorously reviewed by a designed Technical Committee, taking
            into account technical content, originality, and relevance.
          </p>

          <h3>{tr("Important Dates", "Fechas importantes")}</h3>
          <div className="students-dates" aria-label="Important dates for students meeting">
            {psmDates.map((entry) => (
              <article key={entry.date} className="date-chip">
                <h4>{entry.date}</h4>
                <p>{entry.label}</p>
              </article>
            ))}
          </div>

          <h3>{tr("MCPR2026-PSM Organizing committee", "Comite organizador MCPR2026-PSM")}</h3>
          <ul>
            {psmCommittee.map((member) => (
              <li key={member}>{member}</li>
            ))}
          </ul>
        </article>
      );
    }

    if (activeSection === "program-committee") {
      return (
        <section className="committee-block" aria-label="Program committee section">
          <article className="surface page-block committee-chairs-panel">
            <h2>{tr("Program Committee Chairs", "Presidentes del Comite de Programa")}</h2>
            <div className="committee-chairs-grid">
              {committeeChairs.map((chair) => (
                <article key={chair.name} className="chair-card">
                  <header>{chair.name}</header>
                  <div className="chair-avatar" aria-hidden="true">
                    {chair.image ? (
                      <Image
                        src={chair.image}
                        alt={chair.name}
                        width={76}
                        height={76}
                        className="profile-photo"
                      />
                    ) : (
                      chair.initials
                    )}
                  </div>
                  <footer>{chair.affiliation}</footer>
                </article>
              ))}
            </div>
          </article>

          <article className="surface page-block committee-table-panel">
            <h2>{tr("Program Committee", "Comite de Programa")}</h2>
            <div className="committee-table-wrap">
              <table className="committee-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>{tr("Last Name", "Apellidos")}</th>
                    <th>{tr("Institution", "Institucion")}</th>
                  </tr>
                </thead>
                <tbody>
                  {programCommitteeMembers.map((member) => (
                    <tr key={`${member.firstName}-${member.lastName}`}>
                      <td>{member.firstName}</td>
                      <td>{member.lastName}</td>
                      <td>{member.institution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      );
    }

    if (activeSection === "organization") {
      return (
        <article className="surface page-block organization-block">
          <h2>{tr("Organization", "Organizacion")}</h2>
          <section className="committee-chairs-panel">
            <h2>{tr("Program Committee Chairs", "Presidentes del Comite de Programa")}</h2>
            <div className="committee-chairs-grid">
              {committeeChairs.map((chair) => (
                <article key={chair.name} className="chair-card">
                  <header>{chair.name}</header>
                  <div className="chair-avatar" aria-hidden="true">
                    {chair.image ? (
                      <Image
                        src={chair.image}
                        alt={chair.name}
                        width={76}
                        height={76}
                        className="profile-photo"
                      />
                    ) : (
                      chair.initials
                    )}
                  </div>
                  <footer>{chair.affiliation}</footer>
                </article>
              ))}
            </div>
          </section>
        </article>
      );
    }

    if (activeSection === "submission-guidelines") {
      return (
        <article className="surface page-block simple-content-block">
          <h2>{tr("Submission guidelines", "Lineamientos de envio")}</h2>
          <p>
            {tr(
              "Papers submitted to MCPR 2026 must be written in English and formatted in accordance with LNCS guidelines.",
              "Los trabajos enviados a MCPR 2026 deben estar escritos en ingles y formateados de acuerdo con las guias LNCS."
            )}
          </p>
          <p>
            {tr(
              "Papers should be submitted electronically before January 31st, 2026 via the EasyChair system. Authors should consult Springer author guidelines and use proceedings templates for LaTeX or Word. Springer encourages authors to include ORCID IDs. The corresponding author must complete and sign a Consent-to-Publish form and follow the Editorial Code of Conduct.",
              "Los articulos deben enviarse electronicamente antes del 31 de enero de 2026 mediante el sistema EasyChair. Los autores deben consultar las guias de Springer y usar las plantillas de memorias en LaTeX o Word. Springer recomienda incluir identificadores ORCID. El autor de correspondencia debe completar y firmar el formato de Consentimiento de Publicacion y cumplir el Codigo Editorial."
            )}
          </p>
          <p>
            {tr(
              "The author signing the copyright form must match the corresponding author listed in the paper. Once files are sent to Springer, authorship changes cannot be made. Submission implies at least one author is willing to register and present the work if accepted. For issues during submission, contact mcpr2026@inaoep.mx.",
              "El autor que firme el formato de derechos de autor debe coincidir con el autor de correspondencia indicado en el trabajo. Una vez enviados los archivos a Springer, no se podran realizar cambios de autoria. El envio implica que al menos un autor se compromete a registrarse y presentar el trabajo en caso de aceptacion. Para problemas durante el envio, contacte a mcpr2026@inaoep.mx."
            )}
          </p>
        </article>
      );
    }

    if (activeSection === "important-dates") {
      return (
        <article className="surface page-block important-dates-block">
          <h2>{tr("Important dates", "Fechas importantes")}</h2>
          <ol className="dates-track" aria-label={tr("Conference important dates", "Fechas importantes de la conferencia")}>
            <li>
              <h3>{tr("Submission deadline", "Fecha limite de envio")}</h3>
              <p className="muted">January 31, 2026</p>
              <p>February 22, 2026</p>
            </li>
            <li>
              <h3>{tr("Notification", "Notificacion")}</h3>
              <p>April 8, 2026</p>
            </li>
            <li>
              <h3>{tr("Camera-ready due", "Entrega camera-ready")}</h3>
              <p>April 10, 2026</p>
            </li>
            <li>
              <h3>{tr("Early bird registration", "Registro temprano")}</h3>
              <p>April 24, 2026</p>
            </li>
            <li>
              <h3>{tr("Main conference", "Conferencia principal")}</h3>
              <p>June 24-27, 2026</p>
            </li>
          </ol>
        </article>
      );
    }

    if (activeSection === "previous-mcprs") {
      return (
        <article className="surface page-block previous-block">
          <h2>{tr("Previous MCPRs", "MCPRs anteriores")}</h2>
          <p>{tr("Browse previous conference editions:", "Consulta ediciones anteriores de la conferencia:")}</p>
          <ul className="previous-links-list">
            {previousMcprLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </article>
      );
    }

    if (activeSection === "contact") {
      return (
        <article className="surface page-block contact-block">
          <h2>{tr("Contact", "Contacto")}</h2>

          <p>
            {tr(
              "For any questions regarding MCPR2026, please contact its organizers at",
              "Para cualquier pregunta relacionada con MCPR2026, por favor contacte a los organizadores en"
            )}
          </p>

          <a href="mailto:mcpr2026@inaoep.mx">mcpr2026@inaoep.mx</a>
        </article>
      );
    }

    if (activeSection === "conference-venue") {
      return (
        <article className="surface page-block venue-block">
          <h2>{tr("Conference Venue", "Sede de la conferencia")}</h2>

          <p className="venue-intro">
            {tr(
              "The 2026 Mexican Conference on Pattern Recognition (MCPR) will be held onsite at Centro de Innovacion e Integracion de Tecnologias Avanzadas (CIITA) from IPN.",
              "La Conferencia Mexicana de Reconocimiento de Patrones 2026 (MCPR) se llevara a cabo de forma presencial en el Centro de Innovacion e Integracion de Tecnologias Avanzadas (CIITA) del IPN."
            )}
          </p>

          <figure className="ciita-image-card">
            <Image
              src="./img/ciita_img.jpg"
              alt="Centro de Innovacion e Integracion de Tecnologias Avanzadas CIITA building"
              width={1200}
              height={675}
              className="ciita-image"
              priority
            />
          </figure>

          <div className="venue-address-card">
            <h3>{tr("Address", "Direccion")}</h3>
            <p>
              Av. Vicente Guerrero, Hipodromo, 32330, Ciudad Juarez,
              Chihuahua, Mexico.
            </p>
          </div>

          <figure className="venue-image-card">
            <Image
              src="./img/info-conference.jpeg"
              alt="Centro de Innovacion e Integracion de Tecnologias Avanzadas CIITA"
              width={1200}
              height={1800}
              className="venue-image"
              priority
            />
            <figcaption>
              Centro de Innovacion e Integracion de Tecnologias Avanzadas (CIITA)
            </figcaption>
          </figure>

          
          <figure className="venue-image-card mt-5">
            <Image
              src="./img/info-2.jpeg"
              alt="Centro de Innovacion e Integracion de Tecnologias Avanzadas CIITA"
              width={1200}
              height={1800}
              className="venue-image"
              priority
            />
            <figcaption>
              Centro de Innovacion e Integracion de Tecnologias Avanzadas (CIITA)
            </figcaption>
          </figure>
        </article>
      );
    }

    if (activeSection === "registration") {
      return (
        <article className="surface page-block registration-block">
          <div className="coming-soon-badge">
            {tr("Coming soon", "Próximamente")}
          </div>

          <h2>{tr("Registration", "Registro")}</h2>

          <p>
            {tr(
              "Registration information for MCPR 2026 will be available soon.",
              "La información de registro para MCPR 2026 estará disponible próximamente."
            )}
          </p>

          <div className="registration-soon-card">
            <h3>{tr("Stay tuned", "Mantente atento")}</h3>
            <p>
              {tr(
                "Please check this section later for registration fees, dates, and instructions.",
                "Consulta esta sección más adelante para conocer cuotas, fechas e instrucciones de registro."
              )}
            </p>
          </div>
        </article>
      );
    }

    if (activeSection === "live-transmission") {
      return (
        <article className="surface page-block simple-content-block">
          <h2>{tr("Live transmission", "Transmisión en vivo")}</h2>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", maxWidth: "100%", backgroundColor: "#000" }}>
            <iframe
              src="https://www.youtube.com/embed/qrE0mHj0zso?autoplay=1"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="MCPR 2026 Live Transmission"
            />
          </div>
          <p style={{ marginTop: "1.5rem" }}>
            {tr(
              "Watch the live transmission of the MCPR 2026 conference.",
              "Mira la transmisión en vivo de la conferencia MCPR 2026."
            )}
          </p>
        </article>
      );
    }

    if (activeSection === "fees") {
      return (
        <article className="surface page-block simple-content-block">
          <h2>{tr("Fees for Authors and Registration", "Cuotas para autores y registro")}</h2>
          <p>
            {tr(
              "Registration fees are listed below for IAPR members and non-IAPR members.",
              "A continuación se muestran las cuotas de registro para miembros de IAPR y no miembros de IAPR."
            )}
          </p>

          <div className="committee-table-wrap">
            <table className="committee-table">
              <thead>
                <tr>
                  <th>{tr("Registration type", "Tipo de registro")}</th>
                  <th>{tr("IAPR members", "Miembros IAPR")}</th>
                  <th>{tr("Non-IAPR members", "No miembros IAPR")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{tr("Early Registration", "Registro anticipado")}</strong>
                    <br />
                    <span>{tr("(before June 12th, 2025)", "(antes del 12 de junio de 2025)")}</span>
                  </td>
                  <td>$450 USD</td>
                  <td>$475 USD</td>
                </tr>
                <tr>
                  <td>
                    <strong>{tr("Late Registration", "Registro tardio")}</strong>
                    <br />
                    <span>{tr("(after June 12th, 2025)", "(despues del 12 de junio de 2025)")}</span>
                  </td>
                  <td>$500 USD</td>
                  <td>$525 USD</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="fees-download-wrap">
            <a className="fees-download-link" href="docs/registrationFormMCPR2026.pdf" download>
              {tr("Download registration form (PDF)", "Descargar formato de registro (PDF)")}
            </a>
          </p>
        </article>
      );
    }

    return (
      <article className="surface page-block placeholder-block">
        <h2>Section coming soon</h2>
        <p>This section is under construction for MCPR 2026.</p>
      </article>
    );
    
  };

  return (
    <div className="conference-page">
      <header className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-kicker">{tr("Mexican Conference on Pattern Recognition", "Conferencia Mexicana de Reconocimiento de Patrones")}</p>
          <h1>MCPR 2026</h1>
          <p className="hero-location">{tr("Ciudad Juarez, Chihuahua, Mexico", "Ciudad Juarez, Chihuahua, Mexico")}</p>
          <p className="hero-date">{tr("June 24-27, 2026", "24-27 de junio, 2026")}</p>
        </div>
        <div className="language-toggle" role="group" aria-label={tr("Language selector", "Selector de idioma")}>
          <button
            type="button"
            className={language === "en" ? "active" : ""}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            type="button"
            className={language === "es" ? "active" : ""}
            onClick={() => setLanguage("es")}
          >
            ES
          </button>
        </div>
      </header>

      <nav className="top-nav" aria-label="Primary navigation">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={activeSection === item.id ? "active" : ""}
                onClick={() => navigateToSection(item.id)}
              >
                {item.label[language]}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="layout-grid">
        <section className="main-column">
          {renderMainContent()}

          <section className="logo-strip" aria-label="Conference partner logos">
            <div>
              <Image
                src="./sponsors/inaoe.jpg"
                alt="INAOE"
                width={160}
                height={56}
                className="sponsor-logo"
              />
            </div>
            <div>
              <Image
                src="./sponsors/logo.png"
                alt="MexAPR"
                width={160}
                height={56}
                className="sponsor-logo"
              />
            </div>
            <div>
              <Image
                src="./sponsors/lncs.jpg"
                alt="LNCS"
                width={160}
                height={56}
                className="sponsor-logo"
              />
            </div>
            <div>
              <Image
                src="./sponsors/iarp.jpg"
                alt="IAPR"
                width={160}
                height={56}
                className="sponsor-logo"
              />
            </div>
          </section>
        </section>

        <aside className="side-column" aria-label="Conference side content">
          <section className="surface side-card accent-program">
            <h3>{tr("Conference program", "Programa de conferencia")}</h3>
            <p>{tr("Complete program in PDF", "Programa completo en PDF")}</p>
            <button
              type="button"
              className="program-action-button"
              onClick={() => {
                navigateToSection("program");
                setIsPreviousMenuOpen(false);
              }}
            >
              {tr("Program", "Programa")}
            </button>
            <button
              type="button"
              className="program-action-button"
              onClick={() => {
                navigateToSection("tutorials");
                setIsPreviousMenuOpen(false);
              }}
            >
              {tr("Tutorials MCPR 2026", "Tutoriales MCPR 2026")}
            </button>
            <button
              type="button"
              className="program-action-button"
              onClick={() => {
                navigateToSection("keynote-speakers");
                setIsPreviousMenuOpen(false);
              }}
            >
              {tr("Keynote speakers and panelists", "Conferencistas y panelistas")}
            </button>
            <p className="mini-note">{tr("Conference proceedings:", "Memorias de la conferencia:")}</p>
            <a
              href="https://link.springer.com/book/10.1007/978-3-032-28393-1"
              target="_blank"
              rel="noopener noreferrer"
              className="program-action-button"
              style={{ display: "block", textAlign: "center", textDecoration: "none" }}
            >
              {tr("MCPR 2026 Proceedings (Springer)", "Memorias MCPR 2026 (Springer)")}
            </a>
            <p className="mini-note">{tr("Access links to the virtual conference:", "Acceso a enlaces de la conferencia virtual:")}</p>
            <button
              type="button"
              onClick={() => {
                navigateToSection("live-transmission");
                setIsPreviousMenuOpen(false);
              }}
            >
              {tr("Live transmission", "Transmisión en vivo")}
            </button>
          </section>

          <section className="surface side-card accent-contrib">
            <h3>{tr("Contributions", "Contribuciones")}</h3>
            <ul>
              <li>
                <button
                  type="button"
                  className="sidebar-link-button"
                  onClick={() => {
                    navigateToSection("submission-guidelines");
                    setIsPreviousMenuOpen(false);
                  }}
                >
                  {tr("Submission guidelines", "Guia de envio")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sidebar-link-button"
                  onClick={() => {
                    navigateToSection("important-dates");
                    setIsPreviousMenuOpen(false);
                  }}
                >
                  {tr("Important dates", "Fechas importantes")}
                </button>
              </li>
              <li>
                <div className="sidebar-dropdown">
                  <button
                    type="button"
                    className="sidebar-link-button sidebar-dropdown-toggle"
                    aria-haspopup="menu"
                    aria-expanded={isPreviousMenuOpen}
                    onClick={() => setIsPreviousMenuOpen((prev) => !prev)}
                  >
                    {tr("Previous MCPRs", "MCPR anteriores")}
                  </button>
                  {isPreviousMenuOpen && (
                    <ul className="sidebar-dropdown-menu" role="menu" aria-label={tr("Previous MCPRs links", "Enlaces de MCPR anteriores")}>
                      {previousMcprLinks.map((item) => (
                        <li key={item.label} role="none">
                          <a
                            role="menuitem"
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsPreviousMenuOpen(false)}
                          >
                            {item.label === "Previous MCPR proceedings"
                              ? tr("Previous MCPR proceedings", "Memorias MCPR anteriores")
                              : item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            </ul>
          </section>

          <section className="surface side-card accent-attendance">
            <h3>{tr("Attendance", "Asistencia")}</h3>
            <ul>
              <li>
                <button
                  type="button"
                  className="sidebar-link-button"
                  onClick={() => {
                    navigateToSection("conference-venue");
                    setIsPreviousMenuOpen(false);
                  }}
                >
                  {tr("Conference venue", "Sede")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sidebar-link-button"
                  onClick={() => {
                    navigateToSection("registration");
                    setIsPreviousMenuOpen(false);
                  }}
                >
                  {tr("Registration", "Registro")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sidebar-link-button"
                  onClick={() => {
                    navigateToSection("contact");
                    setIsPreviousMenuOpen(false);
                  }}
                >
                  {tr("Contact", "Contacto")}
                </button>
              </li>
            </ul>
          </section>

          <section className="surface side-card accent-forms">
            <h3>{tr("Forms", "Formularios")}</h3>
            <div className="media-box">{tr("Under construction website", "Sitio en construccion")}</div>
          </section>

          <section className="surface side-card accent-sponsor">
            <h3>{tr("Sponsor", "Patrocinador")}</h3>
            <div className="sponsor-carousel-box">
              <div className="sponsor-carousel">
                <a
                  href={SPONSOR_ITEMS[activeSponsorIndex].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-card-item"
                >
                  <Image
                    src={SPONSOR_ITEMS[activeSponsorIndex].src}
                    alt={SPONSOR_ITEMS[activeSponsorIndex].alt}
                    width={280}
                    height={120}
                    className="sponsor-card-logo"
                  />
                </a>
                <div className="sponsor-carousel-controls">
                  <button
                    type="button"
                    className="sponsor-carousel-arrow"
                    onClick={() =>
                      setActiveSponsorIndex(
                        (current) =>
                          (current - 1 + SPONSOR_ITEMS.length) % SPONSOR_ITEMS.length,
                      )
                    }
                    aria-label={tr("Previous sponsor", "Patrocinador anterior")}
                  >
                    &lt;
                  </button>
                  <div className="sponsor-carousel-dots" role="tablist" aria-label={tr("Sponsor carousel", "Carrusel de patrocinadores")}>
                    {SPONSOR_ITEMS.map((sponsor, index) => (
                      <button
                        key={sponsor.href}
                        type="button"
                        className={`sponsor-carousel-dot ${index === activeSponsorIndex ? "is-active" : ""}`}
                        onClick={() => setActiveSponsorIndex(index)}
                        aria-label={`${tr("Go to sponsor", "Ir al patrocinador")} ${index + 1}`}
                        aria-current={index === activeSponsorIndex}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="sponsor-carousel-arrow"
                    onClick={() =>
                      setActiveSponsorIndex(
                        (current) => (current + 1) % SPONSOR_ITEMS.length,
                      )
                    }
                    aria-label={tr("Next sponsor", "Siguiente patrocinador")}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
            <p className="sponsor-note">{tr("Click on the image for more information.", "Haz clic en la imagen para mas informacion.")}</p>
          </section>
        </aside>
      </main>

      <footer className="credit">
        Desing and made by {" "}
        <a
          href="https://www.blak.com.mx/"
          target="_blank"
          rel="noopener noreferrer"
          className="credit-link"
        >
          Blak
        </a>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
