@AGENTS.md

# CapSES : guide du dépôt

Site de révision SES (Seconde, Première, Terminale) et BTS CEJM.
Stack : Next.js 16 (App Router), React 19, TypeScript, Tailwind 4 (peu utilisé, la plupart des styles sont inline).
Scripts : `npm run dev`, `npm run build`, `npm run lint`.

## Structure réelle

- `src/app/layout.tsx` : layout racine.
- `src/app/page.tsx` : accueil, affiche `CAPSESPage` (`src/app/capses-page.tsx`).
- `src/app/capses-page.tsx` : page d'accueil et hub Terminale (prop `terminale`), avec la navigation globale.
- `src/app/home-sections.tsx` et `home-sections.module.css` : sections de l'accueil.
- `src/app/globals.css` : styles globaux.
- `public/brand/` : logo. `public/memos/` : fiches mémo PDF.

### Routes
| Route | Fichier |
|---|---|
| `/` | `src/app/page.tsx` |
| `/seconde` | `src/app/seconde/page.tsx` (hub Seconde) |
| `/seconde/creation-richesses` (+ `/a-savoir`) | `src/app/seconde/creation-richesses/` |
| `/seconde/formation-prix` | `src/app/seconde/formation-prix/page.tsx` |
| `/premiere` | `src/app/premiere/page.tsx` (page minimale) |
| `/terminale` | `src/app/terminale/page.tsx` → `CAPSESPage terminale` |
| `/terminale/[slug]` | page générique de secours pour un slug sans dossier dédié |
| `/terminale/chomage`, `commerce-international` (+ `/complements`), `croissance-economique` (+ `/complements`), `engagement-politique`, `environnement`, `europe`, `mobilite-sociale`, `mutations-travail-emploi`, `politiques-europeennes`, `structure-sociale` | un dossier par chapitre |
| `/bts-cejm`, `/methodes`, `/espace-eleves` | pages dédiées |

### Composants
Il n'y a pas de dossier de composants partagés. Chaque page de chapitre définit localement
`useIsMobile`, `DefBox`, `STitle`, `StatGrid`, `CardGrid`, `NoteBox`, `MecaBox` et `Accordion`.
Pour un nouveau chapitre, copier ces composants depuis un chapitre existant
(par exemple `src/app/terminale/chomage/page.tsx`).

### Fichiers hors application
`page.tsx` à la racine, `capses-correctifs-croissance.patch` et `Claude outputs/` ne sont pas servis par Next.js.

## Conventions
- Environnement Windows + PowerShell : jamais de && ; une commande par ligne ; New-Item avant tout Copy-Item vers un dossier inexistant.
- Messages de commit sans accents.
- Styles inline et hook useIsMobile() pour le responsive ; chaque page doit fonctionner en largeur téléphone.
- Réutiliser les composants existants (DefBox, STitle, StatGrid, CardGrid, NoteBox, MecaBox, Accordion) avant d'en créer un nouveau.
- Seconde : fond clair, architecture en 10 étapes. Palette relevée dans `src/app/seconde/` :
  - titres et texte : `#07194F`, `#173B73`, `#10234D` ; texte secondaire : `#50617F`, `#64748B` ;
  - accent principal : `#2563EB` (survol `#1D4ED8`) ;
  - bordures : `#DBE7F5` ; fonds : `#FFFFFF`, `#F8FBFF`, `#F1F6FF` ;
  - une couleur d'accent par chapitre : `creation-richesses` en vert `#0F766E` (fond `#ECFDF5`, bordure `#BDECE2`) et `formation-prix` en violet `#7C3AED` (fond `#F3EFFF`, bordure `#DDD6FE`) ;
  - encadrés d'alerte : fond `#FFF7ED`, bordure `#FED7AA`.
- Terminale : design navy, 10 étapes, sidebar sticky.
- Avant de dire « terminé » : npm run build doit passer sans erreur.

## Pièges connus
- Le slug d'un chapitre doit correspondre exactement au nom du dossier de la route, sinon 404.
- Échapper apostrophes et guillemets dans le JSX.
- Vérifier l'affichage mobile avant chaque push.
- La page Méthodes est `/methodes` (pas `/methodologie`).
- Un chapitre sans page ne doit pas avoir de lien actif : en Seconde, « Découvrir les SES » (statut « Vidéo à intégrer ») affiche « Vidéo à venir » sans lien.
