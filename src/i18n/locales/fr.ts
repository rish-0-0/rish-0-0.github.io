import type { Translations } from './en';

const fr: Translations = {
  meta: {
    siteTitle: 'Portfolio',
    siteDescription: 'Portfolio personnel - travail, écriture et plus.',
  },
  nav: {
    chat: 'Chat',
    sectionLabel: 'Explorer',
    blog: 'Blog',
    work: 'Travaux',
    about: 'À propos',
    contact: 'Contact',
    collapseSidebar: 'Réduire la barre latérale',
    expandSidebar: 'Développer la barre latérale',
    siteNavLabel: 'Navigation du site',
    mainNavLabel: 'Navigation principale',
    openNavigation: 'Ouvrir la navigation',
  },
  home: {
    greeting: 'Bonjour, je suis Rishabh',
    prompt: 'Que souhaitez-vous savoir sur moi ?',
  },
  contact: {
    title: 'Contact',
    description: 'Prendre contact.',
    body: "La meilleure façon de me joindre est par e-mail. Je lis tout.",
    responseTime: 'Le délai de réponse est généralement d\'un à deux jours.',
  },
  about: {
    title: 'À propos',
    description: 'Un peu à mon sujet.',
    intro: "Bonjour - je suis <strong>Rishabh Anand</strong>, un ingénieur qui aime vraiment ça. Le moment où une idée devient quelque chose qui fonctionne à l'écran me semble toujours magique, et je ne m'en suis jamais vraiment remis. Je soigne des détails que presque personne ne remarque - l'espacement, la demi-seconde de latence, le mot exact sur un bouton - car c'est là que les bons logiciels gagnent discrètement la confiance des gens.",
    whatIDoTitle: 'Ce que je fais',
    whatIDo: "Je construis à l'intersection du design et de l'ingénierie, et j'aime prendre en charge un problème du début à la fin - du premier croquis brut jusqu'à ce qui est réellement déployé et tient en production. Je suis le plus heureux quand je plonge en profondeur dans le fonctionnement réel de quelque chose plutôt que d'en rester à la surface, et j'ai un fort penchant pour l'action : je préfère construire une version brute aujourd'hui et en tirer des leçons que d'en débattre pendant une semaine. J'exige un haut niveau de qualité dans mon travail, mais je me soucie encore plus de la personne de l'autre côté de l'écran.",
    currentlyTitle: 'Actuellement',
    currently: "En ce moment, je me concentre sur ce qui compte le plus pour moi : comprendre comment tirer parti de l'IA pour construire pour le bien commun - des outils qui rendent la vie des gens vraiment plus facile, plus accessible et plus humaine, et pas seulement plus tape-à-l'œil. Je vois grand quant à là où cette technologie peut nous mener, et je veux être l'une des personnes qui veillent à ce qu'elle aboutisse quelque part qui en vaille la peine. Vous pouvez parcourir mon <a href=\"{workUrl}\">travail sélectionné</a> ou lire mes réflexions sur le <a href=\"{blogUrl}\">blog</a>.",
    getInTouchTitle: 'Contact',
    getInTouch: 'Toujours heureux de discuter - contactez-moi via la <a href="{contactUrl}">page de contact</a>.',
  },
  blog: {
    title: 'Blog',
    description: "Écrits sur le design, l'ingénierie et les idées.",
    subtitle: "Réflexions sur le design, l'ingénierie et tout ce qui est entre les deux.",
    empty: 'Pas encore d\'articles - revenez bientôt.',
    backLink: 'Tous les articles',
  },
  work: {
    title: 'Travaux',
    description: 'Projets sélectionnés et études de cas.',
    subtitle: 'Projets sélectionnés - cliquez sur l\'un d\'eux pour en savoir plus.',
    empty: 'Pas encore de projets - revenez bientôt.',
    backLink: 'Tous les projets',
    liveSite: 'Site en ligne',
  },
  search: {
    placeholder: 'Posez-moi n\'importe quelle question…',
    clearLabel: 'Effacer la recherche',
    inputLabel: 'Rechercher ou naviguer',
    quickNavLabel: 'Navigation rapide',
    resultSingular: 'résultat',
    resultPlural: 'résultats',
    noResultsTemplate: 'Aucun résultat pour « {q} »',
    suggestionWork: 'Montrez-moi votre travail',
    suggestionBlog: 'Lire le blog',
    suggestionAbout: 'À votre sujet',
    suggestionContact: 'Prendre contact',
  },
  theme: {
    chooseLabel: 'Choisir un thème',
    currentTemplate: 'Thème actuel : {theme}. Changer de thème',
    dark: 'Sombre',
    light: 'Clair',
    solarized: 'Solarisé',
    aderberry: 'Aderberry',
  },
  postCard: {
    liveSite: 'Site en ligne',
  },
  localeSwitcher: {
    chooseLabel: 'Choisir la langue',
    currentTemplate: 'Langue actuelle : {locale}. Changer de langue',
  },
};

export default fr;
