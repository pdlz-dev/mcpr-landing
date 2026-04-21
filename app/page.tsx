"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
];

export default function Home() {
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
      title: "Foundation Models for Microscopy and Medical Data Analysis",
      name: "Prof. Dr. Erik Rodner",
      affiliation:
        "Professor for Data Science and Machine Learning, University of Applied Sciences Berlin",
      initials: "ER",
      image: "/people/erik_rodner.jpg",
      abstract:
        "Foundation models enable transferable representations across tasks and domains, but their application to biomedical data remains challenging due to limited annotations and heterogeneous data. This talk reviews recent work on microscopy images and structured medical datasets, including synthetic data adaptation, robust low-supervision training, and zero-shot model generation.",
      biography:
        "Erik Rodner is a professor of Machine Learning and Data Science at HTW Berlin. His research focuses on machine learning and computer vision under limited data availability, with prior appointments at the University of Jena and postdoctoral work at UC Berkeley.",
    },
    {
      title:
        "New Paradigms in Sensors and Computer Vision Methods plus Comments on AI Production at an International Scale",
      name: "Prof. Walterio Mayol-Cuevas",
      affiliation: "University of Bristol, UK / Amazon US",
      initials: "WM",
      image: "/people/walterio_mayol.jpg",
      abstract:
        "This keynote explores the frontier between synthetic and real-world action understanding. The first part covers recent research on visual sensors and methods that support processing at image-capture time. The second part discusses opinions and lessons from AI and computer vision deployment at international production scale.",
      biography:
        "Walterio Mayol-Cuevas is Full Professor in the School of Computer Science at the University of Bristol and Head of Generative AI Science at Amazon Ads. His interests overlap visual mapping methods, robotics, augmented reality, and AI-powered creativity.",
    },
    {
      title:
        "Quantum Computing: Foundations, Transition to Industry and Applications in Pattern Recognition",
      name: "Dr. Salvador Elias Venegas-Andraca",
      affiliation:
        "Instituto Tecnologico de Estudios Superiores de Monterrey (ITESM), Campus Ciudad de Mexico",
      initials: "SV",
      image: "/people/salvador_elias.jpg",
      abstract:
        "Quantum computing is transitioning from laboratory environments to the market, with increasing relevance for pattern recognition. This keynote introduces core concepts, discusses algorithmic opportunities, and presents case studies where quantum approaches can boost recognition performance.",
      biography:
        "Salvador E. Venegas-Andraca is a scientist, consultant, and educator focused on quantum algorithms and technology transfer. He has authored foundational books and numerous publications in quantum information processing and machine learning applications.",
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
    { name: "Vianey G. Cruz Sanchez", affiliation: "UACJ, Mexico", initials: "VC", image: "/people/vianey_cruz.jpg" },
    { name: "Osslan O. Vergara Villegas", affiliation: "UACJ, Mexico", initials: "OV", image: "/people/osslan_vergara.png" },
    { name: "Juan H. Sossa Azuela", affiliation: "CIC-IPN, Mexico", initials: "JS", image: "/people/huberto_sossa.jpg" },
    { name: "Jesus A. Carrasco Ochoa", affiliation: "INAOE, Mexico", initials: "JC", image: "/people/jesus_carrasco.jpg" },
    { name: "Jose F. Martinez Trinidad", affiliation: "INAOE, Mexico", initials: "JM", image: "/people/jose_martinez.jpg" },
    { name: "Jose A. Olvera Lopez", affiliation: "BUAP, Mexico", initials: "JO", image: "/people/jose_olvera.jpg" },
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
              <h2>{speaker.title}</h2>

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
                  <p>{speaker.affiliation}</p>
                </div>
              </div>

              <p>
                <strong>{tr("Conference abstract:", "Resumen de la conferencia:")}</strong> {speaker.abstract}
              </p>
              <p>
                <strong>{tr("Speaker biography:", "Biografia del ponente:")}</strong> {speaker.biography}
              </p>
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
                src="/sponsors/inaoe.jpg"
                alt="INAOE"
                width={160}
                height={56}
                className="sponsor-logo"
              />
            </div>
            <div>
              <Image
                src="/sponsors/logo.png"
                alt="MexAPR"
                width={160}
                height={56}
                className="sponsor-logo"
              />
            </div>
            <div>
              <Image
                src="/sponsors/lncs.jpg"
                alt="LNCS"
                width={160}
                height={56}
                className="sponsor-logo"
              />
            </div>
            <div>
              <Image
                src="/sponsors/iarp.jpg"
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
              <li>{tr("Conference venue", "Sede")}</li>
              <li>{tr("Registration", "Registro")}</li>
              <li>{tr("Contact", "Contacto")}</li>
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
                  src="/sponsors/durol.jpg"
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
