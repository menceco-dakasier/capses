# CAPSES — Référence visuelle

Statut : proposition de prévisualisation du 4 octobre 2026, à valider avant production.

## Intention et public
CAPSES est un espace de révision SES destiné en priorité aux lycéens de Seconde, Première et Terminale. Le BTS CEJM est un espace complémentaire. L’interface doit être accueillante, lisible et calme, avec des parcours guidés sans infantiliser les élèves.

## Références et priorité
Structure inspirée d’Awesome DESIGN.md de VoltAgent, en particulier de sa référence Notion : https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/notion/DESIGN.md. Ce document est une adaptation originale pour CAPSES ; il ne reprend ni la marque, ni les textes, ni la composition marketing de Notion. Les consignes de l’enseignante et les exigences d’accessibilité priment sur les références. Taste accompagne la composition ; Vercel Web Design Guidelines accompagne la vérification.

## Couleurs et rôles
| Token CSS | Valeur | Rôle |
| --- | --- | --- |
| --capses-background | #fcfbf8 | Fond général ivoire léger |
| --capses-canvas | #ffffff | Fond et cartes de lecture |
| --capses-surface | #f7f7f5 | Encarts neutres et surfaces secondaires |
| --capses-ink | #142343 | Titres et texte principal |
| --capses-muted | #52617a | Texte secondaire lisible |
| --capses-line | #dce3ee | Bordures et séparateurs |
| --capses-accent | #176b64 | Action principale, liens et focus |
| --capses-accent-hover | #10564f | Survol de l’action principale |
| --capses-success | #16634b | Réponse correcte, avec texte explicite |
| --capses-error | #9a3e32 | Réponse incorrecte, avec texte explicite |

Le vert pétrole est la couleur signature, utilisée avec parcimonie. Fond général ivoire léger (#fcfbf8), surfaces de lecture blanches. Aucun grand fond bleu nuit ou bleu ciel. Les cartes de niveau sont blanches, avec des bordures fines et des icônes neutres ; aucun fond pastel par niveau. Une couleur seule ne transmet jamais un état.

## Typographie
Geist Sans, chargé par Next/font, puis Arial et sans-serif. Aucun chargement de police externe supplémentaire.
- Titre d’accueil : 54 px maximum sur ordinateur, 38 px sur téléphone, interligne 1,1.
- Titre de chapitre : 45–48 px maximum, 30–38 px sur téléphone.
- Titres de sections : 28–32 px ; titres de cartes : 22–28 px.
- Texte de cours et réponses de quiz : 16 px minimum, interligne 1,65–1,75.
- Navigation et informations secondaires : 14 px ; légendes : 12–13 px.
- Titres équilibrés, paragraphes aérés ; ne pas comprimer les textes pour tenir dans une carte.

## Composition et espacement
Échelle : 4, 8, 12, 16, 24, 32, 48, 64 px. Contenu d’accueil centré, largeur maximale 1200 px. Trois cartes lycée au même niveau, puis une ligne BTS complémentaire. Accueil : titre et action principale à gauche, parcours Comprendre / S’entraîner / Retenir sous les cartes de niveaux ; une colonne sur mobile. Chapitre : plan à gauche, contenu à droite ; plan au-dessus du cours sur téléphone. Les contenus existants restent accessibles.

## Visuel d’accueil
Le parcours de révision apparaît immédiatement sous les cartes des niveaux, sur trois colonnes sur ordinateur et une colonne sur téléphone. Il est un repère secondaire, avec un titre discret de 18 px : « Tes étapes de révision ». Aucun motif de branche ou de feuilles. À droite de l’accueil : un encart blanc L’économie en vrai, affichant le chiffre de la semaine une seule fois. Les détails, calculs, notions et explications sont accessibles dans un accordéon « Comprendre ce chiffre » dans cet encart. Aucun bloc dupliqué plus bas. Le chiffre, son intitulé et sa source proviennent de la banque existante ; un état unique pilote le chiffre. Aucune nouvelle donnée inventée. Trois lignes Comprendre / S’entraîner / Retenir, séparées par de fins traits, sans bulles colorées ni décalage. Le titre d’accueil et l’action principale dominent. Fond transparent sur l’ivoire général. Les cartes Seconde, Première et Terminale restent blanches, sans distinction par couleur.

## Composants et états
Boutons rectangulaires, rayon 10 px, hauteur minimale 44 px, texte explicite. Une action principale vert pétrole par groupe ; actions secondaires blanches bordées. Survol : contraste renforcé ; focus clavier : contour vert pétrole de 3 px décalé de 4 px. Étape active : fond léger, numéro et aria-pressed. Menus : vrais boutons ou details/summary natifs. Cartes : rayon 14–16 px, bordure de 1 px, sans ombre pour le cours ; ombre légère réservée aux menus. Quiz : réponse sélectionnée accessible, correction textuelle dans une zone aria-live déjà montée ; ne pas modifier la banque de questions pour une refonte visuelle.

## Responsive et mouvement
Sous 720 px : une colonne, marges 16 px, cartes à hauteur naturelle. Navigation repliée avant de manquer de place ; cibles séparées d’au moins 8 px lorsque possible. Aucun débordement horizontal de page ; les tableaux et le plan peuvent défiler dans leur propre zone. Transitions de couleur ou transform limitées à 150–200 ms. Respecter prefers-reduced-motion. Pas d’animation décorative permanente.

## Règles éditoriales et garde-fous
Tutoiement simple, français naturel, labels orientés action. Conserver cours, sources, exercices, progression et liens existants. Ne pas inventer scores, activité récente, témoignages ou données. Une section en préparation doit l’indiquer. Préserver le logo. Ne pas utiliser de compteurs ou récompenses fictifs. Ne pas adopter les règles commerciales d’un site de référence.

## Guide pour les agents et validation
Lire ce document avant toute modification d’interface. Appliquer les tokens CSS existants plutôt que créer une nouvelle palette par page. Vérifier accueil, niveau, cours et quiz sur ordinateur et téléphone ; vérifier clavier, focus, contraste, feedback, navigation et absence de débordement. Lancer le build. Travailler dans une branche de prévisualisation ; aucune mise en production avant validation explicite de l’enseignante. Ce document ne constitue pas une validation des contenus pédagogiques.
