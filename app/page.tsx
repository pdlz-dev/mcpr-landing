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
];

// End of day, Mexico City time.
const SUBMISSION_DEADLINE = new Date("2027-01-31T23:59:59-06:00").getTime();

const ICON_PATHS: Record<string, string> = {
  calendar: "M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  document: "M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7l-4-4Zm0 0v4h4M9 12h6M9 16h6",
  users: "M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm10 9v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.2a3.5 3.5 0 0 1 0 6.6",
  ticket: "M4 7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3a2 2 0 0 0 0 4v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a2 2 0 0 0 0-4V7Zm10-1v12",
  archive: "M4 5h16v4H4zM5 9v10h14V9M10 13h4",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  arrow: "M5 12h14M13 6l6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
};

function Icon({ name, size = 20 }: { name: keyof typeof ICON_PATHS; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

function Countdown({ target, labels }: { target: number; labels: [string, string, string, string] }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, []);

  const remaining = now === null ? null : Math.max(0, target - now);
  const units =
    remaining === null
      ? [null, null, null, null]
      : [
          Math.floor(remaining / 86_400_000),
          Math.floor(remaining / 3_600_000) % 24,
          Math.floor(remaining / 60_000) % 60,
          Math.floor(remaining / 1000) % 60,
        ];

  return (
    <dl className="countdown" aria-live="off">
      {units.map((value, idx) => (
        <div key={labels[idx]} className="countdown-unit">
          <dt>{labels[idx]}</dt>
          <dd>{value === null ? "--" : String(value).padStart(2, "0")}</dd>
        </div>
      ))}
    </dl>
  );
}

function ComingSoon({
  badge,
  message,
  note,
}: {
  badge: string;
  message: string;
  note?: string;
}) {
  return (
    <article className="surface page-block coming-soon-block">
      <div className="coming-soon-art" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="coming-soon-badge">{badge}</div>
      <p className="coming-soon-message">{message}</p>
      {note ? <p className="coming-soon-note">{note}</p> : null}
    </article>
  );
}

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [isPreviousMenuOpen, setIsPreviousMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const tr = (en: string, es: string) => (language === "es" ? es : en);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tabParam = searchParams.get("tab");
  const normalizedTab = tabParam === "panels" ? "keynote-speakers" : tabParam;
  const activeSection =
    normalizedTab && VALID_SECTION_IDS.includes(normalizedTab) ? normalizedTab : "home";

  const navigateToSection = (sectionId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", sectionId);
    router.push(`?${params.toString()}`, { scroll: false });
    setIsMenuOpen(false);
    setIsPreviousMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const navItems = [
    { id: "home", label: { en: "Home", es: "Inicio" }, short: { en: "Home", es: "Inicio" } },
    { id: "call-for-papers", label: { en: "Call for papers", es: "Convocatoria" }, short: { en: "Call for papers", es: "Convocatoria" } },
    { id: "paper-awards", label: { en: "Paper awards", es: "Premios" }, short: { en: "Awards", es: "Premios" } },
    { id: "keynote-speakers", label: { en: "Keynote speakers and panelists", es: "Conferencistas y panelistas" }, short: { en: "Speakers", es: "Ponentes" } },
    { id: "students-meeting", label: { en: "Student's meeting", es: "Reunion estudiantil" }, short: { en: "Students", es: "Estudiantes" } },
    { id: "program-committee", label: { en: "Program committee", es: "Comite de programa" }, short: { en: "Committee", es: "Comite" } },
    { id: "organization", label: { en: "Organization", es: "Organizacion" }, short: { en: "Organization", es: "Organizacion" } },
    { id: "conference-proceedings", label: { en: "Conference proceedings", es: "Memorias" }, short: { en: "Proceedings", es: "Memorias" } },
    { id: "fees", label: { en: "Fees", es: "Costos" }, short: { en: "Fees", es: "Costos" } },
  ];

  const participateItems = [
    { id: "submission-guidelines", label: { en: "Submission guidelines", es: "Lineamientos de envio" } },
    { id: "important-dates", label: { en: "Important dates", es: "Fechas importantes" } },
    { id: "registration", label: { en: "Registration", es: "Registro" } },
    { id: "conference-venue", label: { en: "Conference venue", es: "Sede" } },
    { id: "previous-mcprs", label: { en: "Previous MCPRs", es: "MCPR anteriores" } },
    { id: "contact", label: { en: "Contact", es: "Contacto" } },
  ];

  const sectionTitles: Record<string, { en: string; es: string }> = {
    "call-for-papers": { en: "Call for papers", es: "Convocatoria de articulos" },
    "paper-awards": { en: "Paper awards", es: "Premios de articulos" },
    "keynote-speakers": { en: "Keynote speakers and panelists", es: "Conferencistas y panelistas" },
    "students-meeting": { en: "Student's meeting", es: "Reunion de estudiantes" },
    "program-committee": { en: "Program committee", es: "Comite de programa" },
    organization: { en: "Organization", es: "Organizacion" },
    "conference-proceedings": { en: "Conference proceedings", es: "Memorias de la conferencia" },
    "submission-guidelines": { en: "Submission guidelines", es: "Lineamientos de envio" },
    "important-dates": { en: "Important dates", es: "Fechas importantes" },
    "previous-mcprs": { en: "Previous MCPRs", es: "MCPRs anteriores" },
    "conference-venue": { en: "Conference venue", es: "Sede de la conferencia" },
    contact: { en: "Contact", es: "Contacto" },
    registration: { en: "Registration", es: "Registro" },
    fees: { en: "Fees for authors and registration", es: "Cuotas para autores y registro" },
    program: { en: "Conference program", es: "Programa de conferencia" },
    tutorials: { en: "Tutorials", es: "Tutoriales" },
  };

  const exploreCards: { id: string; icon: keyof typeof ICON_PATHS; title: { en: string; es: string }; text: { en: string; es: string } }[] = [
    {
      id: "submission-guidelines",
      icon: "document",
      title: { en: "Submission guidelines", es: "Lineamientos de envio" },
      text: { en: "LNCS format, Springer templates and the Consent-to-Publish form.", es: "Formato LNCS, plantillas de Springer y formato de consentimiento." },
    },
    {
      id: "students-meeting",
      icon: "users",
      title: { en: "Student's meeting", es: "Reunion de estudiantes" },
      text: { en: "Master and PhD students discuss their research with senior researchers.", es: "Estudiantes de maestria y doctorado discuten su investigacion con investigadores." },
    },
    {
      id: "program-committee",
      icon: "users",
      title: { en: "Program committee", es: "Comite de programa" },
      text: { en: "An international committee reviews every contribution.", es: "Un comite internacional revisa cada contribucion." },
    },
    {
      id: "conference-venue",
      icon: "pin",
      title: { en: "Conference venue", es: "Sede de la conferencia" },
      text: { en: "Centro de Investigacion en Computacion (CIC), IPN, Mexico City.", es: "Centro de Investigacion en Computacion (CIC), IPN, Ciudad de Mexico." },
    },
    {
      id: "registration",
      icon: "ticket",
      title: { en: "Registration", es: "Registro" },
      text: { en: "Fees, dates and instructions will be published soon.", es: "Cuotas, fechas e instrucciones se publicaran proximamente." },
    },
    {
      id: "previous-mcprs",
      icon: "archive",
      title: { en: "Previous MCPRs", es: "MCPRs anteriores" },
      text: { en: "Browse every edition since 2009.", es: "Consulta todas las ediciones desde 2009." },
    },
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
    { title: { en: "Submission deadline", es: "Fecha limite de envio" }, date: "January 31, 2027" },
    { title: { en: "Notification", es: "Notificacion" }, date: "March 26, 2027" },
    { title: { en: "Camera-ready due", es: "Entrega camera-ready" }, date: "April 9, 2027" },
    { title: { en: "Early bird registration", es: "Registro temprano" }, date: "April 24, 2027" },
    { title: { en: "Main conference", es: "Conferencia principal" }, date: "June 22-25, 2027" },
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
    { date: "May 17th, 2027", label: "Deadline for submission" },
    { date: "June 1st, 2027", label: "Notification of acceptance" },
    { date: "June 10th, 2027", label: "Camera Ready" },
    { date: "June 22nd-25th, 2027", label: "Postgraduate Students&apos; meeting" },
  ];

  const psmCommittee = [
    "Jose Arturo Olvera Lopez, BUAP",
    "Juan Humberto Sossa Azuela, CIC - IPN",
    "Osslan Osiris Vergara Villegas, UACJ",
    "Elsa Rubio Espino, CIC - IPN",
    "Jesus A. Carrasco Ochoa, INAOE, Mexico",
    "Jose F. Martinez Trinidad, INAOE, Mexico",
  ];

  const committeeChairs = [
    { name: "Juan H. Sossa Azuela", affiliation: "CIC-IPN, Mexico", initials: "JS", image: "./people/humberto_sossa.jpeg" },
    { name: "Elsa Rubio Espino", affiliation: "CIC-IPN, Mexico", initials: "ER", image: "./people/elsa_rubio.jpeg" },
    { name: "Osslan O. Vergara Villegas", affiliation: "UACJ, Mexico", initials: "OV", image: "./people/osslan_vergara.png" },
  ];

  const organizingCommittee = [
    "Juan Humberto Sossa Azuela, CIC - IPN",
    "Osslan Osiris Vergara Villegas, UACJ",
    "Elsa Rubio Espino, CIC - IPN",
    "Jesus A. Carrasco Ochoa, INAOE, Mexico",
    "Jose F. Martinez Trinidad, INAOE, Mexico",
    "Jose A. Olvera Lopez, BUAP, Mexico",
  ];

  const steeringCommittee = [
    "Jesus A. Carrasco Ochoa, INAOE, Mexico",
    "Jose F. Martinez Trinidad, INAOE, Mexico",
    "Jose A. Olvera Lopez, BUAP, Mexico",
  ];

  const programCommittee = [
    { first: "Alireza", last: "Alaei", affiliation: "Southern Cross University" },
    { first: "Francisco", last: "Antunes", affiliation: "University of Coimbra" },
    { first: "Silvia", last: "Biasotti", affiliation: "IMATI-CNR" },
    { first: "Dibio", last: "Borges", affiliation: "Universidade de Brasilia" },
    { first: "John", last: "Branch", affiliation: "Universidad Nacional de Colombia" },
    { first: "Deisy", last: "Chaves", affiliation: "Universidad del Valle" },
    { first: "Lucia", last: "Cimmino", affiliation: "Department of Information Science and Technology, Pegaso University" },
    { first: "Pedro", last: "Couto", affiliation: "CITAB - UTAD" },
    { first: "Hugo Jair", last: "Escalante", affiliation: "INAOE" },
    { first: "Jorge Ernesto", last: "Espinosa Oviedo", affiliation: "Politecnico Colombiano Jaime Isaza Cadavid" },
    { first: "Giorgio", last: "Fumera", affiliation: "University of Cagliari" },
    { first: "Antoni", last: "Grau", affiliation: "Universitat Politecnica de Catalunya" },
    { first: "Laurent", last: "Heutte", affiliation: "Universite de Rouen Normandie" },
    { first: "Mohamed", last: "Ibn Khedher", affiliation: "IRT-SystemX" },
    { first: "Xiaoyi", last: "Jiang", affiliation: "University of Munster" },
    { first: "Martin", last: "Kampel", affiliation: "Vienna University of Technology" },
    { first: "Sang-Woon", last: "Kim", affiliation: "Myongji University" },
    { first: "Vitaly", last: "Kober", affiliation: "CICESE" },
    { first: "Manuel S.", last: "Lazo-Cortes", affiliation: "TecNM/ITTLA" },
    { first: "Marcos A.", last: "Levano", affiliation: "Universidad Catolica de Temuco" },
    { first: "Heber Ivan", last: "Mejia Cabrera", affiliation: "Universidad Senor de Sipan" },
    { first: "Vladimir", last: "Milian Nunez", affiliation: "Universidad de las Ciencias Informaticas" },
    { first: "Giorgia", last: "Minello", affiliation: "Universita Ca' Foscari di Venezia" },
    { first: "Delia", last: "Mitrea", affiliation: "Technical University of Cluj-Napoca" },
    { first: "Miguel", last: "Moctezuma-Flores", affiliation: "UNAM" },
    { first: "Jose M.", last: "Molina", affiliation: "Universidad Carlos III de Madrid" },
    { first: "Manuel", last: "Montes-Y-Gomez", affiliation: "Instituto Nacional de Astrofisica, Optica y Electronica" },
    { first: "Eduardo", last: "Morales", affiliation: "INAOE" },
    { first: "Agustin", last: "Moreno Canadas", affiliation: "National University of Colombia" },
    { first: "Jakub", last: "Nalepa", affiliation: "Silesian University of Technology" },
    { first: "Nudrat", last: "Nida", affiliation: "UET" },
    { first: "Jose Luis", last: "Oliveira", affiliation: "University of Aveiro" },
    { first: "Kalman", last: "Palagyi", affiliation: "University of Szeged" },
    { first: "Joao Paulo", last: "Papa", affiliation: "UNESP - Univ Estadual Paulista" },
    { first: "Helio", last: "Pedrini", affiliation: "Institute of Computing, University of Campinas" },
    { first: "Pedro", last: "Pina", affiliation: "Institute of Astrophysics and Space Sciences, Department of Earth Sciences, University of Coimbra" },
    { first: "Adrian", last: "Perez-Suay", affiliation: "University of Valencia" },
    { first: "Pedro", last: "Real", affiliation: "Institute Mathematics of Seville University (IMUS)" },
    { first: "Miguel", last: "Realpe", affiliation: "ESPOL" },
    { first: "Alejandro", last: "Restrepo", affiliation: "Universidad Nacional de Colombia" },
    { first: "Wilson", last: "Rivera", affiliation: "University of Puerto Rico" },
    { first: "Bhuvendhraa", last: "Rudrusamy", affiliation: "Heriot-Watt University Malaysia" },
    { first: "Robert", last: "Sablatnig", affiliation: "TU Wien" },
    { first: "Carlo", last: "Sansone", affiliation: "University of Naples Federico II" },
    { first: "Catarina", last: "Silva", affiliation: "University of Coimbra" },
    { first: "Shreyanka", last: "Subbarayappa", affiliation: "M. S. Ramaiah University of Applied Sciences" },
    { first: "Luis Enrique", last: "Sucar", affiliation: "INAOE" },
    { first: "Marcos Eduardo", last: "Valle", affiliation: "Universidade Estadual de Campinas" },
  ];

  const previousMcprLinks = [
    { label: "2026", href: "https://ccc.inaoep.mx/~mcpr2026/" },
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
        <>
          <section className="countdown-section" aria-label={tr("Submission countdown", "Cuenta regresiva de envio")}>
            <div className="container">
              <div className="countdown-card">
                <div className="countdown-info">
                  <p className="eyebrow">{tr("Next deadline", "Proxima fecha limite")}</p>
                  <h2>{tr("Paper submission", "Envio de articulos")}</h2>
                  <p>{tr("January 31, 2027 via EasyChair", "31 de enero de 2027 via EasyChair")}</p>
                </div>
                <Countdown
                  target={SUBMISSION_DEADLINE}
                  labels={language === "es" ? ["Dias", "Horas", "Minutos", "Segundos"] : ["Days", "Hours", "Minutes", "Seconds"]}
                />
                <button
                  type="button"
                  className="countdown-cta"
                  onClick={() => navigateToSection("submission-guidelines")}
                >
                  {tr("Submission guidelines", "Lineamientos de envio")}
                  <Icon name="arrow" size={18} />
                </button>
              </div>
            </div>
          </section>

          <section className="section about-section">
            <div className="container about-grid">
              <div className="about-copy">
                <p className="eyebrow">{tr("Introduction", "Introduccion")}</p>
                <h2 className="section-title">
                  {tr("You are invited to the 19th edition of MCPR", "Te invitamos a la 19a edicion de MCPR")}
                </h2>
                <span className="title-rule" aria-hidden="true" />
                <p className="lead">
                  {tr(
                    "The 19th Mexican Conference on Pattern Recognition (MCPR2027) will be held at the Centro de Investigacion en Computacion (CIC) of the Instituto Politecnico Nacional in Mexico City, Mexico from June 22 to June 25, 2027. This is an IAPR-endorsed event under the direction of the Coordinación de Ciencias Computacionales and with the consent of the Mexican Association for Pattern Recognition.",
                    "La 19a Conferencia Mexicana de Reconocimiento de Patrones (MCPR2027) se llevara a cabo en el Centro de Investigacion en Computacion (CIC) del Instituto Politecnico Nacional, en Ciudad de Mexico, Mexico, del 22 al 25 de junio de 2027. Este es un evento respaldado por la IAPR, realizado bajo la direccion de la Coordinacion de Ciencias Computacionales y con el respaldo de la Asociacion Mexicana de Reconocimiento de Patrones."
                  )}
                </p>
                <p>
                  {tr(
                    "MCPR2027 attempts to provide a forum for the exchange of scientific results, experiences, and new knowledge, as well as promoting cooperation among research groups in Pattern Recognition and related areas in Mexico and around the world.",
                    "MCPR2027 busca ofrecer un foro para el intercambio de resultados cientificos, experiencias y nuevo conocimiento, ademas de fomentar la colaboracion entre grupos de investigacion en Reconocimiento de Patrones y areas afines en Mexico y el mundo."
                  )}
                </p>
                <p className="about-callout">
                  {tr("The MCPR 2027 conference will be held in person.", "La conferencia MCPR 2027 se celebrara de forma presencial.")}
                </p>
              </div>

              <div className="about-media">
                <span className="about-dots" aria-hidden="true" />
                <figure className="about-photo">
                  <Image
                    src="./img/cic.jpg"
                    alt="Centro de Investigacion en Computacion CIC-IPN building"
                    width={1200}
                    height={675}
                  />
                </figure>
                <div className="about-badge">
                  <strong>{tr("June 22-25", "22-25 junio")}</strong>
                  <span>2027 · CIC-IPN</span>
                </div>
              </div>
            </div>
          </section>

          <section className="stats-band" aria-label={tr("Conference highlights", "Datos de la conferencia")}>
            <div className="container stats-grid">
              <div className="stat">
                <strong>19<sup>{tr("th", "a")}</sup></strong>
                <span>{tr("Edition", "Edicion")}</span>
              </div>
              <div className="stat">
                <strong>4</strong>
                <span>{tr("Conference days", "Dias de conferencia")}</span>
              </div>
              <div className="stat">
                <strong>LNCS</strong>
                <span>{tr("Springer proceedings", "Memorias Springer")}</span>
              </div>
              <div className="stat">
                <strong>IAPR</strong>
                <span>{tr("Endorsed event", "Evento respaldado")}</span>
              </div>
            </div>
          </section>

          <section className="section dates-section">
            <div className="container">
              <div className="section-head section-head--center">
                <p className="eyebrow">{tr("Mark your calendar", "Agenda estas fechas")}</p>
                <h2 className="section-title">{tr("Important dates", "Fechas importantes")}</h2>
                <span className="title-rule" aria-hidden="true" />
              </div>
              <ol className="home-timeline">
                {timelineItems.map((item, idx) => (
                  <li key={item.date}>
                    <span className="timeline-step">{String(idx + 1).padStart(2, "0")}</span>
                    <p className="timeline-date">{item.date}</p>
                    <h3>{item.title[language]}</h3>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="section topics-section">
            <div className="container topics-layout">
              <div className="section-head">
                <p className="eyebrow">{tr("Call for papers", "Convocatoria")}</p>
                <h2 className="section-title">{tr("Topics of interest", "Temas de interes")}</h2>
                <span className="title-rule" aria-hidden="true" />
                <p>
                  {tr(
                    "Authors are invited to submit contributions including, but not limited to, the following areas.",
                    "Se invita a los autores a enviar contribuciones, incluyendo pero no limitado a las siguientes areas."
                  )}
                </p>
                <button type="button" className="btn btn-primary" onClick={() => navigateToSection("call-for-papers")}>
                  {tr("Read the call for papers", "Leer la convocatoria")}
                  <Icon name="arrow" size={18} />
                </button>
              </div>
              <ul className="topic-chips">
                {callTopics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section explore-section">
            <div className="container">
              <div className="section-head section-head--center">
                <p className="eyebrow">{tr("Explore", "Explora")}</p>
                <h2 className="section-title">{tr("Plan your participation", "Planea tu participacion")}</h2>
                <span className="title-rule" aria-hidden="true" />
              </div>
              <div className="explore-grid">
                {exploreCards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    className="explore-card"
                    onClick={() => navigateToSection(card.id)}
                  >
                    <span className="explore-icon">
                      <Icon name={card.icon} size={22} />
                    </span>
                    <h3>{card.title[language]}</h3>
                    <p>{card.text[language]}</p>
                    <span className="explore-link">
                      {tr("Learn more", "Ver mas")}
                      <Icon name="arrow" size={16} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="cta-band">
            <div className="container cta-inner">
              <div>
                <h2>{tr("Ready to share your research?", "Listo para compartir tu investigacion?")}</h2>
                <p>
                  {tr(
                    "Papers are due January 31, 2027 via EasyChair. Accepted papers will be published in Springer LNCS.",
                    "Los articulos deben enviarse antes del 31 de enero de 2027 via EasyChair. Los aceptados se publicaran en Springer LNCS."
                  )}
                </p>
              </div>
              <div className="cta-actions">
                <button type="button" className="btn btn-light" onClick={() => navigateToSection("submission-guidelines")}>
                  {tr("Submission guidelines", "Lineamientos de envio")}
                </button>
                <a className="btn btn-outline-light" href="mailto:mcpr2027@inaoep.mx">
                  <Icon name="mail" size={18} />
                  {tr("Contact us", "Contactanos")}
                </a>
              </div>
            </div>
          </section>
        </>
      );
    }

    if (activeSection === "paper-awards") {
      return (
        <ComingSoon
          badge={tr("Under construction", "En construccion")}
          message={tr(
            "Information about the MCPR 2027 paper awards will be available soon.",
            "La informacion sobre los premios de articulos de MCPR 2027 estara disponible proximamente."
          )}
          note={tr(
            "Questions? Write to mcpr2027@inaoep.mx",
            "Dudas? Escribenos a mcpr2027@inaoep.mx"
          )}
        />
      );
    }
    if (activeSection === "tutorials") {
      return (
        <ComingSoon
          badge={tr("Under construction", "En construccion")}
          message={tr(
            "The MCPR 2027 tutorials will be announced soon.",
            "Los tutoriales de MCPR 2027 se anunciaran proximamente."
          )}
          note={tr(
            "Questions? Write to mcpr2027@inaoep.mx",
            "Dudas? Escribenos a mcpr2027@inaoep.mx"
          )}
        />
      );
    }
    if (activeSection === "program") {
      return (
        <ComingSoon
          badge={tr("Under construction", "En construccion")}
          message={tr(
            "The MCPR 2027 conference program will be published soon.",
            "El programa de la conferencia MCPR 2027 se publicara proximamente."
          )}
          note={tr(
            "Questions? Write to mcpr2027@inaoep.mx",
            "Dudas? Escribenos a mcpr2027@inaoep.mx"
          )}
        />
      );
    }
    if (activeSection === "call-for-papers") {
      return (
        <article className="surface call-papers">
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
            {language === "es" ? (
              <p>
                En linea con ediciones anteriores, los articulos aceptados se publicaran en las memorias
                de la conferencia como parte de la serie LNCS de Springer. Los trabajos deben prepararse
                siguiendo las{" "}
                <a href="docs/Springer_Instructions_for_Authors_of_Proceedings_CS-2.pdf" target="_blank" rel="noopener noreferrer">
                  guias para autores
                </a>{" "}
                de Springer y respetando el{" "}
                <a href="docs/Publishers_Code_of_Conduct_for_Book_Authors.pdf" target="_blank" rel="noopener noreferrer">
                  codigo de conducta editorial
                </a>
                . El envio implica que al menos un autor se compromete a registrarse y presentar el
                trabajo en caso de ser aceptado.
              </p>
            ) : (
              <p>
                In line with previous editions, accepted papers will be published in the conference
                proceedings as part of the Springer LNCS series. The papers should be prepared following
                the{" "}
                <a href="docs/Springer_Instructions_for_Authors_of_Proceedings_CS-2.pdf" target="_blank" rel="noopener noreferrer">
                  authors&apos; guidelines
                </a>{" "}
                provided by Springer and adhering to the{" "}
                <a href="docs/Publishers_Code_of_Conduct_for_Book_Authors.pdf" target="_blank" rel="noopener noreferrer">
                  Code of Conduct of the Editorial
                </a>
                . Submission implies that at least one author is willing to register and present the
                conference communication if it is accepted.
              </p>
            )}
          </section>
        </article>
      );
    }

    if (activeSection === "keynote-speakers") {
      return (
        <ComingSoon
          badge={tr("To be announced", "Por anunciar")}
          message={tr(
            "The keynote speakers and panelists for MCPR 2027 will be announced soon.",
            "Los conferencistas magistrales y panelistas de MCPR 2027 se anunciaran proximamente."
          )}
          note={tr(
            "Questions? Write to mcpr2027@inaoep.mx",
            "Dudas? Escribenos a mcpr2027@inaoep.mx"
          )}
        />
      );
    }
    if (activeSection === "students-meeting") {
      return (
        <article className="surface page-block students-block">

          <p>
            The MCPR Postgraduate Students&apos; Meeting (MCPR2027-PSM) has been
            designed for bringing together Master and PhD students in order to
            discuss their research with a panel of both students and senior
            researchers in the area of Pattern Recognition. MCPR2027-PSM will be
            held at the Centro de Investigacion en Computacion (CIC) of the
            Instituto Politecnico Nacional in Mexico City, Mexico from June
            22nd-25th, 2027.
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
            <li>{tr("Student without accepted paper: to be defined", "Estudiante sin articulo aceptado: por definir")}</li>
            <li>Fees includes entry to all the talks and tutorials of MCPR</li>
          </ul>
          <p>
            {tr(
              "Registration form: to be defined.",
              "Formato de registro: por definir."
            )}
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
            {" "}and sent in PDF format to mcpr2027psm@inaoep.mx. Accepted papers are expected to be
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

          <h3>{tr("MCPR2027-PSM Organizing committee", "Comite organizador MCPR2027-PSM")}</h3>
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
                    <th scope="col">{tr("First name", "Nombre")}</th>
                    <th scope="col">{tr("Last name", "Apellido")}</th>
                    <th scope="col">{tr("Institution", "Institucion")}</th>
                  </tr>
                </thead>
                <tbody>
                  {programCommittee.map((member) => (
                    <tr key={`${member.last}-${member.first}`}>
                      <td>{member.first}</td>
                      <td>{member.last}</td>
                      <td>{member.affiliation}</td>
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

          <div className="organization-grid">
            <section className="organization-card">
              <h3>{tr("Organizing committee", "Comite organizador")}</h3>
              <ul>
                {organizingCommittee.map((member) => (
                  <li key={member}>{member}</li>
                ))}
              </ul>
            </section>

            <section className="organization-card">
              <h3>{tr("Steering Committee", "Comite directivo")}</h3>
              <ul>
                {steeringCommittee.map((member) => (
                  <li key={member}>{member}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="organization-card organization-card--full">
            <h3>{tr("Local Organizing committee", "Comite organizador local")}</h3>
            <p className="organization-pending">
              {tr(
                "The local organizing committee will be announced soon.",
                "El comite organizador local se anunciara proximamente."
              )}
            </p>
          </section>
        </article>
      );
    }

    if (activeSection === "submission-guidelines") {
      return (
        <article className="surface page-block submission-guidelines-block">
          {language === "es" ? (
            <>
              <p>
                Los articulos enviados a MCPR 2027 deben estar escritos en ingles y con formato de
                acuerdo con los lineamientos de LNCS.
              </p>
              <p>
                Los articulos deben enviarse electronicamente antes del 31 de enero de 2027 mediante el
                sistema EasyChair. Los autores deben consultar las{" "}
                <a href="docs/Springer_Instructions_for_Authors_of_Proceedings_CS-2.pdf" target="_blank" rel="noopener noreferrer">
                  Instrucciones para Autores de Articulos a Publicarse en Springer Computer Science
                  Proceedings
                </a>{" "}
                (plantillas para LaTeX o Word). Springer recomienda que los autores incluyan sus
                identificadores ORCID. El autor de correspondencia debe completar y firmar un{" "}
                <a href="docs/MCPR2027_SNCS_ProceedingsPaper_LTP_ST_SN_Switzerland.docx" download>
                  formato de Consentimiento de Publicacion
                </a>{" "}
                y seguir el{" "}
                <a href="docs/Publishers_Code_of_Conduct_for_Book_Authors.pdf" target="_blank" rel="noopener noreferrer">
                  Codigo de Conducta Editorial
                </a>
                .
              </p>
            </>
          ) : (
            <>
              <p>
                Papers submitted to MCPR 2027 must be written in English and formatted in accordance with
                LNCS guidelines.
              </p>
              <p>
                Papers should be submitted electronically before January 31st, 2027 via the EasyChair
                system. Authors should consult the{" "}
                <a href="docs/Springer_Instructions_for_Authors_of_Proceedings_CS-2.pdf" target="_blank" rel="noopener noreferrer">
                  Instructions for Authors of Papers to be Published in Springer Computer Science
                  Proceedings
                </a>{" "}
                templates for LaTeX or Word. Springer encourages authors to include ORCID IDs. The
                corresponding author must complete and sign a{" "}
                <a href="docs/MCPR2027_SNCS_ProceedingsPaper_LTP_ST_SN_Switzerland.docx" download>
                  Consent-to-Publish form
                </a>{" "}
                and follow the{" "}
                <a href="docs/Publishers_Code_of_Conduct_for_Book_Authors.pdf" target="_blank" rel="noopener noreferrer">
                  Editorial Code of Conduct
                </a>
                .
              </p>
            </>
          )}
        </article>
      );
    }

    if (activeSection === "important-dates") {
      return (
        <article className="surface page-block important-dates-block">
          <ol className="dates-track" aria-label={tr("Conference important dates", "Fechas importantes de la conferencia")}>
            <li>
              <h3>{tr("Submission deadline", "Fecha limite de envio")}</h3>
              <p>January 31, 2027</p>
            </li>
            <li>
              <h3>{tr("Notification", "Notificacion")}</h3>
              <p>March 26, 2027</p>
            </li>
            <li>
              <h3>{tr("Camera-ready due", "Entrega camera-ready")}</h3>
              <p>April 9, 2027</p>
            </li>
            <li>
              <h3>{tr("Early bird registration", "Registro temprano")}</h3>
              <p>April 24, 2027</p>
            </li>
            <li>
              <h3>{tr("Main conference", "Conferencia principal")}</h3>
              <p>June 22-25, 2027</p>
            </li>
          </ol>
        </article>
      );
    }

    if (activeSection === "previous-mcprs") {
      return (
        <article className="surface page-block previous-block">
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

          <p>
            {tr(
              "For any questions regarding MCPR2027, please contact its organizers at",
              "Para cualquier pregunta relacionada con MCPR2027, por favor contacte a los organizadores en"
            )}
          </p>

          <a href="mailto:mcpr2027@inaoep.mx">mcpr2027@inaoep.mx</a>
        </article>
      );
    }

    if (activeSection === "conference-venue") {
      return (
        <article className="surface page-block venue-block">

          <p className="venue-intro">
            {tr(
              "The 2027 Mexican Conference on Pattern Recognition (MCPR) will be held onsite at the Centro de Investigacion en Computacion (CIC) of the Instituto Politecnico Nacional, in Mexico City.",
              "La Conferencia Mexicana de Reconocimiento de Patrones 2027 (MCPR) se llevara a cabo de forma presencial en el Centro de Investigacion en Computacion (CIC) del Instituto Politecnico Nacional, en Ciudad de Mexico."
            )}
          </p>

          <figure className="ciita-image-card">
            <Image
              src="./img/cic.jpg"
              alt="Centro de Investigacion en Computacion CIC-IPN building"
              width={1200}
              height={675}
              className="ciita-image"
              priority
            />
            <figcaption>
              Centro de Investigacion en Computacion (CIC), IPN
            </figcaption>
          </figure>

          <div className="venue-address-card">
            <h3>{tr("Address", "Direccion")}</h3>
            <p>
              Av. Juan de Dios Batiz s/n, esq. Miguel Othon de Mendizabal,
              Nueva Industrial Vallejo, Gustavo A. Madero, 07738, Ciudad de
              Mexico, Mexico.
            </p>
          </div>
        </article>
      );
    }

    if (activeSection === "registration") {
      return (
        <ComingSoon
          badge={tr("Coming soon", "Proximamente")}
          message={tr(
            "Registration fees, dates and instructions for MCPR 2027 will be available soon.",
            "Las cuotas, fechas e instrucciones de registro de MCPR 2027 estaran disponibles proximamente."
          )}
          note={tr(
            "Questions? Write to mcpr2027@inaoep.mx",
            "Dudas? Escribenos a mcpr2027@inaoep.mx"
          )}
        />
      );
    }

    if (activeSection === "fees") {
      return (
        <ComingSoon
          badge={tr("To be defined", "Por definir")}
          message={tr(
            "Registration fees and the registration form for MCPR 2027 are still to be defined.",
            "Las cuotas de registro y el formato de registro de MCPR 2027 estan por definir."
          )}
          note={tr(
            "Questions? Write to mcpr2027@inaoep.mx",
            "Dudas? Escribenos a mcpr2027@inaoep.mx"
          )}
        />
      );
    }

    if (activeSection === "conference-proceedings") {
      return (
        <ComingSoon
          badge={tr("Coming soon", "Proximamente")}
          message={tr(
            "Details about the MCPR 2027 proceedings will be published soon.",
            "La informacion sobre las memorias de MCPR 2027 se publicara proximamente."
          )}
          note={tr(
            "Questions? Write to mcpr2027@inaoep.mx",
            "Dudas? Escribenos a mcpr2027@inaoep.mx"
          )}
        />
      );
    }

    return (
      <ComingSoon
        badge={tr("Coming soon", "Proximamente")}
        message={tr(
          "This section is still being prepared for MCPR 2027.",
          "Esta seccion aun se esta preparando para MCPR 2027."
        )}
        note={tr(
          "Questions? Write to mcpr2027@inaoep.mx",
          "Dudas? Escribenos a mcpr2027@inaoep.mx"
        )}
      />
    );
  };

  const isHome = activeSection === "home";
  const pageTitle = sectionTitles[activeSection] ?? { en: "MCPR 2027", es: "MCPR 2027" };
  const heroBackground = { backgroundImage: "url('./img/bg.jpeg')" };

  const sideLink = (id: string, label: string) => (
    <li key={id}>
      <button
        type="button"
        className={`sidebar-link-button${activeSection === id ? " active" : ""}`}
        onClick={() => navigateToSection(id)}
      >
        {label}
        <Icon name="arrow" size={15} />
      </button>
    </li>
  );

  return (
    <div className="conference-page">
      <header className={`site-header${isScrolled || isMenuOpen ? " is-solid" : ""}`}>
        <div className="container header-inner">
          <button type="button" className="brand" onClick={() => navigateToSection("home")}>
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
            <span className="brand-text">
              MCPR<span>2027</span>
            </span>
          </button>

          <nav className="main-nav" aria-label={tr("Primary navigation", "Navegacion principal")}>
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={activeSection === item.id ? "active" : ""}
                    aria-current={activeSection === item.id ? "page" : undefined}
                    onClick={() => navigateToSection(item.id)}
                  >
                    {item.short[language]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <div className="language-toggle" role="group" aria-label={tr("Language selector", "Selector de idioma")}>
              <button
                type="button"
                className={language === "en" ? "active" : ""}
                aria-pressed={language === "en"}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={language === "es" ? "active" : ""}
                aria-pressed={language === "es"}
                onClick={() => setLanguage("es")}
              >
                ES
              </button>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-small header-cta"
              onClick={() => navigateToSection("submission-guidelines")}
            >
              {tr("Submit a paper", "Enviar articulo")}
            </button>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? tr("Close menu", "Cerrar menu") : tr("Open menu", "Abrir menu")}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <Icon name={isMenuOpen ? "close" : "menu"} size={24} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="mobile-menu">
            <div className="container mobile-menu-grid">
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
              <ul>
                {participateItems.map((item) => (
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
            </div>
          </div>
        )}
      </header>

      {isHome ? (
        <section className="hero hero--home" style={heroBackground}>
          <div className="hero-shade" />
          <div className="hero-pattern" aria-hidden="true" />
          <div className="container hero-inner">
            <p className="hero-eyebrow">
              <span className="hero-pill">{tr("19th edition", "19a edicion")}</span>
              {tr("IAPR-endorsed event", "Evento respaldado por la IAPR")}
            </p>
            <h1 className="hero-title">
              MCPR <span className="text-gradient">2027</span>
            </h1>
            <p className="hero-subtitle">
              <span className="hero-rule" aria-hidden="true" />
              {tr("Mexican Conference on Pattern Recognition", "Conferencia Mexicana de Reconocimiento de Patrones")}
            </p>
            <ul className="hero-meta">
              <li>
                <Icon name="calendar" size={18} />
                {tr("June 22-25, 2027", "22-25 de junio, 2027")}
              </li>
              <li>
                <Icon name="pin" size={18} />
                {tr("CIC-IPN, Mexico City", "CIC-IPN, Ciudad de Mexico")}
              </li>
            </ul>
            <div className="hero-actions">
              <button type="button" className="btn btn-primary" onClick={() => navigateToSection("call-for-papers")}>
                {tr("Call for papers", "Convocatoria")}
                <Icon name="arrow" size={18} />
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => navigateToSection("important-dates")}>
                {tr("Important dates", "Fechas importantes")}
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="hero hero--page" style={heroBackground}>
          <div className="hero-shade" />
          <div className="hero-pattern" aria-hidden="true" />
          <div className="container hero-inner">
            <nav className="breadcrumb" aria-label={tr("Breadcrumb", "Ruta")}>
              <button type="button" onClick={() => navigateToSection("home")}>
                {tr("Home", "Inicio")}
              </button>
              <span aria-hidden="true">/</span>
              <span>{pageTitle[language]}</span>
            </nav>
            <h1 className="page-title">{pageTitle[language]}</h1>
            <span className="hero-rule" aria-hidden="true" />
          </div>
        </section>
      )}

      <main className={isHome ? "home-main" : "inner-main-wrap"}>
        {isHome ? (
          renderMainContent()
        ) : (
          <div className="container inner-layout">
            <div className="main-column">{renderMainContent()}</div>

            <aside className="side-column" aria-label={tr("Conference side content", "Contenido lateral")}>
              <section className="side-card side-card--dark">
                <p className="eyebrow">{tr("Key dates", "Fechas clave")}</p>
                <ul className="side-dates">
                  <li>
                    <span>{tr("Submission deadline", "Fecha limite de envio")}</span>
                    <strong>January 31, 2027</strong>
                  </li>
                  <li>
                    <span>{tr("Notification", "Notificacion")}</span>
                    <strong>March 26, 2027</strong>
                  </li>
                  <li>
                    <span>{tr("Main conference", "Conferencia principal")}</span>
                    <strong>June 22-25, 2027</strong>
                  </li>
                </ul>
              </section>

              <section className="side-card">
                <h3>{tr("Contributions", "Contribuciones")}</h3>
                <ul>
                  {sideLink("submission-guidelines", tr("Submission guidelines", "Guia de envio"))}
                  {sideLink("important-dates", tr("Important dates", "Fechas importantes"))}
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
                                {item.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                </ul>
              </section>

              <section className="side-card">
                <h3>{tr("Attendance", "Asistencia")}</h3>
                <ul>
                  {sideLink("conference-venue", tr("Conference venue", "Sede"))}
                  {sideLink("registration", tr("Registration", "Registro"))}
                  {sideLink("contact", tr("Contact", "Contacto"))}
                </ul>
              </section>

              <section className="side-card side-card--soft">
                <h3>{tr("Conference program", "Programa de conferencia")}</h3>
                <p className="mini-note">
                  {tr(
                    "Program, tutorials, keynote speakers, panelists and forms will be published soon.",
                    "El programa, los tutoriales, los conferencistas, panelistas y formularios se publicaran proximamente."
                  )}
                </p>
              </section>
            </aside>
          </div>
        )}

        <section className="partners" aria-label={tr("Conference partner logos", "Logos de instituciones")}>
          <div className="container">
            <p className="partners-label">{tr("Organized and endorsed by", "Organizado y respaldado por")}</p>
            <div className="logo-strip">
              <div>
                <Image src="./sponsors/inaoe.jpg" alt="INAOE" width={160} height={56} className="sponsor-logo" />
              </div>
              <div>
                <Image src="./sponsors/logo.png" alt="MexAPR" width={160} height={56} className="sponsor-logo" />
              </div>
              <div>
                <Image src="./sponsors/cic.jpeg" alt="CIC - IPN" width={160} height={56} className="sponsor-logo" />
              </div>
              <div>
                <Image
                  src="./sponsors/iapr.jpg"
                  alt="IAPR - International Association for Pattern Recognition"
                  width={160}
                  height={56}
                  className="sponsor-logo"
                />
              </div>
              <div>
                <Image
                  src="./sponsors/lncs.jpg"
                  alt="Springer Lecture Notes in Computer Science (LNCS)"
                  width={160}
                  height={56}
                  className="sponsor-logo"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <p className="brand-text">
              MCPR<span>2027</span>
            </p>
            <p>
              {tr(
                "19th Mexican Conference on Pattern Recognition. June 22-25, 2027, Centro de Investigacion en Computacion (CIC-IPN), Mexico City.",
                "19a Conferencia Mexicana de Reconocimiento de Patrones. 22-25 de junio de 2027, Centro de Investigacion en Computacion (CIC-IPN), Ciudad de Mexico."
              )}
            </p>
            <a className="footer-mail" href="mailto:mcpr2027@inaoep.mx">
              <Icon name="mail" size={18} />
              mcpr2027@inaoep.mx
            </a>
          </div>

          <div>
            <h4>{tr("Conference", "Conferencia")}</h4>
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={() => navigateToSection(item.id)}>
                    {item.label[language]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{tr("Participate", "Participa")}</h4>
            <ul>
              {participateItems.map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={() => navigateToSection(item.id)}>
                    {item.label[language]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{tr("Previous editions", "Ediciones anteriores")}</h4>
            <ul className="footer-years">
              {previousMcprLinks.slice(0, 8).map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <button type="button" className="footer-more" onClick={() => navigateToSection("previous-mcprs")}>
              {tr("All editions", "Todas las ediciones")}
              <Icon name="arrow" size={15} />
            </button>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© 2027 MCPR · {tr("Mexican Conference on Pattern Recognition", "Conferencia Mexicana de Reconocimiento de Patrones")}</p>
          <p>
            {tr("Designed and built by", "Diseno y desarrollo por")}{" "}
            <a href="https://www.blak.com.mx/" target="_blank" rel="noopener noreferrer" className="credit-link">
              Blak
            </a>
          </p>
        </div>
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
