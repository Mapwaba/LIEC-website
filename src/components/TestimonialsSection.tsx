import React from "react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      initials: "JM",
      avatarBg: "bg-primary-container text-surface",
      name: "Jovani M.",
      subtitle: "B3 Développement Web",
      quote:
        "« La structuration du projet m'a permis de mieux comprendre ce que les universités attendaient dans le dossier. Les retours méthodologiques sur ma lettre de motivation ont été déterminants. »",
      tag: "Projet 2025/2026 • Accompagnement complet • Rentrée 2026",
    },
    {
      initials: "MN",
      avatarBg: "bg-secondary text-surface",
      name: "Manasse N.",
      subtitle: "B1 Management des entreprises",
      quote:
        "« Les séances préparatoires PREPA m’ont donné les repères nécessaires sur les cours magistraux et les travaux dirigés. C’est un vrai pont de confiance avant le grand saut. »",
      tag: "Cohorte PREPA • Session Automne • Rentrée 2026",
    },
    {
      initials: "TM",
      avatarBg: "bg-tertiary-fixed text-primary",
      name: "Therese M.",
      subtitle: "M1 Responsabilité sociale des entreprises",
      quote:
        "« Ce que nous avons particulièrement apprécié, c'est l'honnêteté sur les coûts réels de la vie étudiante en France et l'absence de promesses irréalistes. Cela rassure les parents. »",
      tag: "Conseil aux familles • Rentrée 2026",
    },
    {
      initials: "BG",
      avatarBg: "bg-[#002452] text-[#ffdf9e] border border-[#ffdf9e]/30 shadow-sm",
      name: "Blessing GUBEGELA M.",
      subtitle: "B1 Développement Web",
      quote:
        "« Je voulais partager mon expérience avec LIEC et sa prépa. Au départ, je pensais simplement suivre quelques webinaires. J'en suis ressorti transformé.\n\nGrâce aux coachings et à un suivi vraiment personnalisé, j'ai appris à construire un projet professionnel, quelque chose que l'école ne m'avait jamais enseigné. J'ai aussi appris à prendre la parole avec assurance, à convaincre, et à devenir plus responsable.\n\nEt surtout, il y a eu l'ambiance. Les encadreurs ne se contentent pas de transmettre : ils vous portent. Pendant ces séances, on oublie les soucis du quotidien, on se sent capable, on se met en mouvement.\n\nAujourd'hui, je regarde le chemin parcouru et je ne vois plus les mêmes possibilités qu'avant.\n\nSi vous hésitez encore, posez-vous une seule question : où voulez-vous être dans un an ? Pour ma part, j'ai trouvé ma réponse avec LIEC, et je la recommande sans réserve pour son professionnalisme.\n\nFaites le premier pas. Vous me remercierez plus tard. »",
      tag: "Conseil aux étudiants • Rentrée 2026",
    },
  ];

  return (
    <section id="temoignages-ressources" className="w-full bg-surface-container-low py-space-xl lg:py-24">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-space-xl">
          <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold mb-space-xs">
            Cohorte &amp; Mentorat
          </span>
          <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
            Ils préparent leur avenir avec LIEC
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
            Retours d'expérience et témoignages en cours de collecte auprès de notre première cohorte d'accompagnement.
          </p>

          {/* Avertissement déontologique rigoureux */}
          <div className="mt-space-sm inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
            <span className="material-symbols-outlined notranslate text-sm text-secondary" translate="no">info</span>
            <span>Démonstration illustrative en attente des bilans officiels de session</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-stretch">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div>
                <div className="flex items-center gap-space-sm mb-space-md">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center font-headline-sm font-bold shrink-0 ${t.avatarBg}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <h3 className="font-label-lg text-label-lg text-primary">{t.name}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {t.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-tertiary-fixed-dim flex gap-1 mb-space-sm">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined notranslate text-lg" translate="no"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed whitespace-pre-line">
                  {t.quote}
                </p>
              </div>

              <div className="mt-space-md pt-space-sm text-[11px] font-label-sm text-outline uppercase tracking-wider border-t border-surface-container/60">
                {t.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
