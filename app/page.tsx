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
  "tutorials",
];

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [isProgramMenuOpen, setIsProgramMenuOpen] = useState(false);
  const [isPreviousMenuOpen, setIsPreviousMenuOpen] = useState(false);
  const tr = (en: string, es: string) => (language === "es" ? es : en);

  const tabParam = searchParams.get("tab");
  const activeSection =
    tabParam && VALID_SECTION_IDS.includes(tabParam) ? tabParam : "home";

  const navigateToSection = (sectionId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", sectionId);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (tabParam && VALID_SECTION_IDS.includes(tabParam)) {
      return;
    }

    const fallback = "home";
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", fallback);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams, tabParam]);

  const programLinksPerDay = [
    { en: "Wednesday June 24", es: "Miercoles 24 de junio", href: "#" },
    { en: "Thursday June 25", es: "Jueves 25 de junio", href: "#" },
    { en: "Friday June 26", es: "Viernes 26 de junio", href: "#" },
  ];

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
];

  const navItems = [
    { id: "home", label: { en: "Home", es: "Inicio" } },
    { id: "call-for-papers", label: { en: "Call for papers", es: "Convocatoria" } },
    { id: "paper-awards", label: { en: "Paper awards", es: "Premios" } },
    { id: "keynote-speakers", label: { en: "Keynote speakers", es: "Conferencistas" } },
    { id: "students-meeting", label: { en: "Student's meeting", es: "Reunion estudiantil" } },
    { id: "program-committee", label: { en: "Program committee", es: "Comite de programa" } },
    { id: "organization", label: { en: "Organization", es: "Organizacion" } },
    { id: "conference-proceedings", label: { en: "Conference proceedings", es: "Memorias" } },
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
      name: "Prof. Dr. Salvador Venegas",
      affiliation: {
        en: "Instituto Tecnologico de Estudios Superiores de Monterrey (ITESM), Campus Ciudad de Mexico",
        es: "Instituto Tecnológico de Estudios Superiores de Monterrey (ITESM), Campus Ciudad de México",
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
    { date: "April 27th, 2026", label: "Deadline for submission" },
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
        <section className="keynote-list" aria-label="Keynote speakers list">
          {keynoteSpeakers.map((speaker) => (
            <article key={speaker.name} className="surface keynote-card">
              <h2>{speaker.title[language]}</h2>


              <div className="speaker-head">
                <div className="speaker-avatar" aria-hidden="true">
                  {speaker.image ? (
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      width={100}
                      height={100}
                      className="profile-photo"
                    />
                  ) : (
                    speaker.initials
                  )}
                </div>
                <div>
                  <h3>{speaker.name}</h3>
                  <p>{speaker.affiliation[language]}</p>
                </div>
              </div>

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
            </article>
          ))}
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
            Papers must be elaborated based on formatting instructions and sent in
            PDF format to mcpr2026psm@inaoep.mx. Accepted papers are expected to be
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
            <div className="program-dropdown">
              <button
                type="button"
                className="program-dropdown-toggle"
                aria-haspopup="menu"
                aria-expanded={isProgramMenuOpen}
                onClick={() => setIsProgramMenuOpen((prev) => !prev)}
              >
                {tr("Program and links per day", "Programa y enlaces por dia")}
              </button>
              {isProgramMenuOpen && (
                <ul className="program-dropdown-menu" role="menu" aria-label={tr("Program links by day", "Enlaces del programa por dia")}>
                  {programLinksPerDay.map((day) => (
                    <li key={day.en} role="none">
                      <a
                        role="menuitem"
                        href={day.href}
                        onClick={() => setIsProgramMenuOpen(false)}
                      >
                        {language === "es" ? day.es : day.en}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="button"
              className="program-action-button"
              onClick={() => {
                navigateToSection("tutorials");
                setIsProgramMenuOpen(false);
              }}
            >
              {tr("Tutorials MCPR 2026", "Tutoriales MCPR 2026")}
            </button>
            <p className="mini-note">{tr("Access links to the virtual conference:", "Acceso a enlaces de la conferencia virtual:")}</p>
            <button type="button">{tr("Coming soon!", "Proximamente!")}</button>
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
            <div className="media-box media-box-image">
              <a
                href="https://durol.com.mx/page/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="./sponsors/durol.jpg"
                  alt="DUROL"
                  width={280}
                  height={120}
                  className="sponsor-card-logo"
                />
              </a>
            </div>
            <p className="sponsor-note">{tr("Click on the image for more information.", "Haz clic en la imagen para mas informacion.")}</p>
          </section>
        </aside>
      </main>

      <footer className="credit">Desing and made by Blak</footer>
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
