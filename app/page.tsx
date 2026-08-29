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

function ComingSoon({
  badge,
  title,
  message,
  note,
  compact = false,
}: {
  badge: string;
  title: string;
  message: string;
  note?: string;
  compact?: boolean;
}) {
  return (
    <article
      className={`surface page-block coming-soon-block${compact ? " coming-soon-block--compact" : ""}`}
    >
      <div className="coming-soon-badge">{badge}</div>
      <h2>{title}</h2>
      <div className="coming-soon-art" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
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

  const navItems = [
    { id: "home", label: { en: "Home", es: "Inicio" } },
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
    { title: "Submission deadline", date: "January 31, 2027" },
    { title: "Notification", date: "April 8, 2027" },
    { title: "Camera-ready due", date: "April 10, 2027" },
    { title: "Early bird registration", date: "April 24, 2027" },
    { title: "Main conference", date: "June 22-25, 2027" },
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

  // TODO: add "Elsa Rubio Espino, CIC - IPN" once she confirms her participation.
  const psmCommittee = [
    "Jose Arturo Olvera Lopez, BUAP",
    "Juan Humberto Sossa Azuela, CIC - IPN",
    "Osslan Osiris Vergara Villegas, UACJ",
    "Jesus A. Carrasco Ochoa, INAOE, Mexico",
    "Jose F. Martinez Trinidad, INAOE, Mexico",
  ];

  // TODO: add { name: "Elsa Rubio Espino", affiliation: "CIC-IPN, Mexico", initials: "ER",
  // image: "./people/elsa_rubio.jpeg" } once she confirms her participation.
  const committeeChairs = [
    { name: "Juan H. Sossa Azuela", affiliation: "CIC-IPN, Mexico", initials: "JS", image: "./people/humberto_sossa.jpeg" },
    { name: "Osslan O. Vergara Villegas", affiliation: "UACJ, Mexico", initials: "OV", image: "./people/osslan_vergara.png" },
  ];

  // TODO: add "Elsa Rubio Espino, CIC - IPN" to organizingCommittee once she confirms.
  const organizingCommittee = [
    "Juan Humberto Sossa Azuela, CIC - IPN",
    "Osslan Osiris Vergara Villegas, UACJ",
    "Jesus A. Carrasco Ochoa, INAOE, Mexico",
    "Jose F. Martinez Trinidad, INAOE, Mexico",
    "Jose A. Olvera Lopez, BUAP, Mexico",
  ];

  const steeringCommittee = [
    "Jesus A. Carrasco Ochoa, INAOE, Mexico",
    "Jose F. Martinez Trinidad, INAOE, Mexico",
    "Jose A. Olvera Lopez, BUAP, Mexico",
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
        <article className="surface page-block home-block">
          <h2>{tr("19th Mexican Conference on Pattern Recognition MCPR 2027", "19a Conferencia Mexicana de Reconocimiento de Patrones MCPR 2027")}</h2>
          <p className="center-line">{tr("Mexico City, Mexico", "Ciudad de Mexico, Mexico")}</p>
          <p className="center-line">{tr("June 22 to June 25, 2027", "22 al 25 de junio de 2027")}</p>
          <div className="announcement">{tr("The MCPR 2027 conference will be held in person", "La conferencia MCPR 2027 se celebrara de forma presencial")}</div>

          <div className="home-grid">
            <div>
              <p>
                {tr(
                  "The 19th Mexican Conference on Pattern Recognition (MCPR2027) will be held at the Centro de Investigacion en Computacion (CIC) of the Instituto Politecnico Nacional in Mexico City, Mexico from June 22 to June 25, 2027. This is under the direction of the Coordinacion de Ciencias Computacionales and with the consent of the Mexican Association for Pattern Recognition.",
                  "La 19a Conferencia Mexicana de Reconocimiento de Patrones (MCPR2027) se llevara a cabo en el Centro de Investigacion en Computacion (CIC) del Instituto Politecnico Nacional, en Ciudad de Mexico, Mexico, del 22 al 25 de junio de 2027. Esta edicion se realiza bajo la direccion de la Coordinacion de Ciencias Computacionales y con el respaldo de la Asociacion Mexicana de Reconocimiento de Patrones."
                )}
              </p>
              <p>
                {tr(
                  "MCPR2027 attempts to provide a forum for the exchange of scientific results, experiences, and new knowledge, as well as promoting cooperation among research groups in Pattern Recognition and related areas in Mexico and around the world.",
                  "MCPR2027 busca ofrecer un foro para el intercambio de resultados cientificos, experiencias y nuevo conocimiento, ademas de fomentar la colaboracion entre grupos de investigacion en Reconocimiento de Patrones y areas afines en Mexico y el mundo."
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
        <ComingSoon
          badge={tr("Under construction", "En construccion")}
          title={tr("Paper awards", "Premios de articulos")}
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
          title={tr("Tutorials MCPR 2027", "Tutoriales MCPR 2027")}
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
          title={tr("Conference program", "Programa de conferencia")}
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
                "In line with previous editions, accepted papers are expected to be published in the conference proceedings as part of the Springer LNCS series. The papers should be prepared following the authors' guidelines provided by Springer and adhering to the Code of Conduct of the Editorial. Submission implies that at least one author is willing to register and present the conference communication if it is accepted.",
                "En linea con ediciones anteriores, se espera que los articulos aceptados se publiquen en las memorias de la conferencia como parte de la serie LNCS de Springer. Los trabajos deben prepararse siguiendo las guias para autores de Springer y respetando el codigo editorial. El envio implica que al menos un autor se compromete a registrarse y presentar el trabajo en caso de ser aceptado."
              )}
            </p>
          </section>
        </article>
      );
    }

    if (activeSection === "keynote-speakers") {
      return (
        <ComingSoon
          badge={tr("To be announced", "Por anunciar")}
          title={tr("Keynote speakers and panelists", "Conferencistas y panelistas")}
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
          <h2>{tr("Student's Meeting", "Reunion de Estudiantes")}</h2>

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

          <ComingSoon
            badge={tr("Under construction", "En construccion")}
            title={tr("Program Committee", "Comite de Programa")}
            message={tr(
              "The MCPR 2027 Program Committee will be published soon.",
              "El Comite de Programa de MCPR 2027 se publicara proximamente."
            )}
            compact
          />
        </section>
      );
    }

    if (activeSection === "organization") {
      return (
        <article className="surface page-block organization-block">
          <h2>{tr("Organization", "Organizacion")}</h2>

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
        <ComingSoon
          badge={tr("Working on it", "En preparacion")}
          title={tr("Submission guidelines", "Lineamientos de envio")}
          message={tr(
            "The submission guidelines for MCPR 2027 are being prepared and will be published soon.",
            "Los lineamientos de envio de MCPR 2027 se estan preparando y se publicaran proximamente."
          )}
          note={tr(
            "Questions? Write to mcpr2027@inaoep.mx",
            "Dudas? Escribenos a mcpr2027@inaoep.mx"
          )}
        />
      );
    }

    if (activeSection === "important-dates") {
      return (
        <article className="surface page-block important-dates-block">
          <h2>{tr("Important dates", "Fechas importantes")}</h2>
          <ol className="dates-track" aria-label={tr("Conference important dates", "Fechas importantes de la conferencia")}>
            <li>
              <h3>{tr("Submission deadline", "Fecha limite de envio")}</h3>
              <p>January 31, 2027</p>
            </li>
            <li>
              <h3>{tr("Notification", "Notificacion")}</h3>
              <p>April 8, 2027</p>
            </li>
            <li>
              <h3>{tr("Camera-ready due", "Entrega camera-ready")}</h3>
              <p>April 10, 2027</p>
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
          <h2>{tr("Conference Venue", "Sede de la conferencia")}</h2>

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
          title={tr("Registration", "Registro")}
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
          title={tr("Fees for Authors and Registration", "Cuotas para autores y registro")}
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
          title={tr("Conference proceedings", "Memorias de la conferencia")}
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
        title={tr("Section coming soon", "Seccion en preparacion")}
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

  return (
    <div className="conference-page">
      <header
        className="hero"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgb(19 39 63 / 34%), rgb(47 75 112 / 20%)), url('./img/bg.jpeg')",
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-kicker">{tr("Mexican Conference on Pattern Recognition", "Conferencia Mexicana de Reconocimiento de Patrones")}</p>
          <h1>MCPR 2027</h1>
          <p className="hero-location">{tr("Mexico City, Mexico", "Ciudad de Mexico, Mexico")}</p>
          <p className="hero-date">{tr("June 22-25, 2027", "22-25 de junio, 2027")}</p>
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
                src="./sponsors/cic.jpeg"
                alt="CIC - IPN"
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
            <div className="media-box">{tr("Under construction", "En construccion")}</div>
            <p className="mini-note">
              {tr(
                "Program, tutorials, keynote speakers and panelists will be published soon.",
                "El programa, los tutoriales y los conferencistas y panelistas se publicaran proximamente."
              )}
            </p>
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
