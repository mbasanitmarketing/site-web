# Passation — Site MBA Sanit

Document de reprise pour une nouvelle session. État arrêté au 6 septembre 2026.

---

## 1. L'objectif

Réaliser le site vitrine de **MBA Sanit**, entreprise d'installations sanitaires
et de salles de bain en Suisse romande (client de l'Atelier Web Romand).

Le projet vit **entièrement** dans `/Users/rosiemvl/Clients/MBA Sanit/Site Web MBA Sanit`.
Consigne explicite du client : ne rien créer ni modifier en dehors de ce dossier.

Périmètre volontairement réduit : **pas de CMS, pas de base de données**. Juste
un site. Le code est hébergé sur le compte GitHub **du client** :
<https://github.com/mbasanitmarketing/site-web> (privé). Le compte agence
`atelierwebromand-art` y est **collaborateur en écriture**. Le projet Vercel
reste à créer — délibérément repoussé, on valide en local d'abord.

### Où on en est

| Section | État |
|---|---|
| Hero « les lumières s'allument » | Fonctionnelle, validée par le client |
| Section 2 (arrivée d'image + panneau) | Fonctionnelle, validée sur le principe |
| Suite du site | Rien |
| Git | **Fait** — dépôt privé `mbasanitmarketing/site-web` |
| Vercel | Rien, volontairement repoussé |

---

## 2. La problématique

Le client ne veut pas d'animations génériques : il fournit des **maquettes Figma
précises** et des **références vidéo**, et attend une reproduction fidèle, au
pixel. Toute la difficulté est là — et le principal risque est de **croire** avoir
reproduit quelque chose sans l'avoir vérifié (voir § 5, c'est le cœur du sujet).

### Le langage visuel du site

Un motif revient partout et structure le design : **le bord en décrochement**
(une « marche » : un palier bas d'un côté, un palier haut de l'autre). Il apparaît
sur trois éléments, avec des comportements différents qu'il ne faut pas confondre :

| Élément | Marche | Comportement |
|---|---|---|
| Header de la hero | 50 px / 60 px, marche à `clamp(200px,17vw,280px)` | **Permanente** |
| Bord du gris (arrivée de section 2) | 9,3svh, marche à 34 % | **Se résorbe** progressivement, arrive à plat |
| Panneau sombre (section 2) | 9,3svh, marche à 34 % | **Permanente** |

Cette distinction a coûté trois allers-retours. Ne pas la perdre.

### Les animations

**Hero** — au scroll : fondu croisé de la photo éteinte vers la photo allumée,
l'image « se lève » de 9 %, le titre monte, son second segment passe de 18 % à
100 % d'opacité, le bandeau du header se dissipe, le logo rétrécit à 58 %.

**Section 2** — modelée sur la transition vers la section *Location* de
<https://likova.space/>. Deux phases qui se chevauchent :
1. l'image monte depuis le bas jusqu'au plein cadre, bord en décrochement ;
2. un panneau sombre glisse par-dessus l'image, qui reste fixe derrière.

---

## 3. Les fichiers

### Code

| Fichier | Rôle |
|---|---|
| `src/lib/useScrollProgress.ts` | Écrit la progression (0→1) dans `--p` sur la scène épinglée. Le paramètre `span` fait aboutir l'animation **avant** la fin de l'épinglage — c'est lui qui crée le palier pendant lequel la hero reste visible sous la section 2. |
| `src/components/Hero.tsx` + `.module.css` | Hero. Piste 360vh, `span 0.615` (l'animation dure 160vh, puis 100vh de palier). |
| `src/components/PanelSection.tsx` + `.module.css` | Section 2. Piste 320vh, `margin-top: -190svh` pour chevaucher la hero. |
| `src/components/SmoothScroll.tsx` | Lenis (`<ReactLenis root>`), enveloppe l'app dans `layout.tsx`. |
| `src/app/page.tsx` | `<Hero />` puis `<PanelSection />` puis un bloc provisoire. |

### Réglages principaux

Tout est piloté par des variables CSS en haut des modules.

```
Hero.module.css        .track height 360vh · --band-h 60px · --band-thin 50px
                       --band-step clamp(200px,17vw,280px) · --rise clamp(180px,33svh,320px)
                       .bandInner filter blur(28px) · .bandTint rgba(255,255,255,.5)
Hero.tsx               useScrollProgress(trackRef, stageRef, 0.615)
PanelSection.module    .track height 320vh · margin-top -190svh
                       --step-x 34% · --step-y 9.3svh · --panel-top 55.8svh · --gutter 1%
                       image  --q sur p 0..0.34 ; marche se résorbe à partir de q 0.62
                       panneau --r sur p 0.30..0.72
```

### Sources fournies par le client (à la racine du projet)

- `FIGMA - Hero section 1.png` / `2.png` — les deux états de la hero
- `Image fred etat 1.png` / `2.jpeg` — les photos sources (copiées en `public/hero-dark.png` et `hero-light.jpg`)
- `MBA Sanit Logo detourné.jpeg` — logo sur fond blanc, **détouré par script** en `public/logo-mba.png` (600 px, alpha propre)
- `Enregistrement de l'écran … .mov` — la vidéo de référence pour la section 2

### Stack

Next.js **16.3.4** (App Router, Turbopack), React 19.2.8, Tailwind **v4**,
Lenis 1.3.26, pnpm. `AGENTS.md` rappelle de lire `node_modules/next/dist/docs/`
avant d'écrire du code — Next 16 diffère des versions connues.

---

## 4. Contraintes de contenu

Pour la section 2, le client a demandé **explicitement** :
- **lorem ipsum uniquement**, pas de vrai contenu
- **aplats gris** à la place des images

Ne pas « améliorer » en mettant du contenu réel. Le vrai contenu viendra plus tard.

---

## 5. Ce que j'ai essayé et qui a raté

> Cette section est la plus utile du document. Lis-la avant de toucher au code.

### L'erreur de méthode qui a coûté le plus cher

**J'ai affirmé deux fois qu'un effet fonctionnait alors qu'il ne fonctionnait pas.**
Pour vérifier le flou du header, je comparais une capture à `--p=0` et une à
`--p=1`. Or ces deux états affichent **deux photos sources différentes** (l'une
sombre, l'autre claire) : l'écart que j'observais venait des photos, pas du flou.
Le client a dû me le signaler trois fois avant que je fasse un test à photo
constante — et le `backdrop-filter` ne rendait rien du tout.

**La règle qui en découle : ne jamais faire varier deux choses à la fois.** Pour
tester un effet, on fige tout le reste et on ne bascule que l'effet lui-même.

Deuxième piège de la même famille : **les captures prises avant le décodage des
images** donnent des écrans noirs, dont j'ai tiré de fausses conclusions. Toujours
attendre que `document.images` soit complet, et se méfier d'une capture noire.

### `backdrop-filter` — abandonné

Trois tentatives, toutes infructueuses :

1. Sur l'élément complet → aucun effet.
2. Sur un enfant dédié → **pire** : le `mask` du parent en fait une *backdrop root*,
   l'enfant n'a alors plus rien à flouter derrière lui.
3. Dépouillé, `blur(40px)` seul, sans mask ni opacité ni `will-change` → toujours rien.

**Solution retenue** : flouter une **copie des photos** (`filter: blur()`, qui lui
fonctionne partout) et la découper à la hauteur du header. Voir `.band` /
`.bandInner` / `.bandTint` dans `Hero.module.css`. Ne pas réintroduire de
`backdrop-filter`, ça a déjà été tranché.

### Préfixes CSS écrits à la main

J'avais écrit `-webkit-backdrop-filter` **après** la version standard.
**Lightning CSS** (le transformeur CSS de Next) a gardé le préfixe et **supprimé
la propriété standard**. Règle : dans les CSS modules, **n'écrire aucun préfixe** —
l'outil s'en charge. (Dans la preview HTML autonome, à l'inverse, les préfixes
manuels sont à leur place.)

### Fausses fermetures de marche

Deux erreurs successives sur le même sujet :

1. J'ai fermé la marche du **panneau sombre** alors que le client parlait du **gris**.
2. Ma « fermeture » du gris n'en était pas une : je gardais la marche à 83,7 px
   pendant toute la montée, et elle ne disparaissait qu'au dernier instant, quand
   le palier droit sortait par le haut du cadre. Visuellement, les deux niveaux
   restaient écartés jusqu'au bout.

**Solution** : `--step-live` fait décroître le dénivelé à partir de `q = 0.62`,
les deux paliers convergent et touchent le haut ensemble. Vérifié à
`elementFromPoint` : 84 → 52 → 26 → 12 → 0 px.

### Deux sections qui se succédaient au lieu de se superposer

Pendant la montée du gris, on voyait un **aplat noir** au lieu de la hero. Corrigé
par `margin-top: -190svh` sur la piste de la section 2, son fond passé en
`transparent`, et le paramètre `span` de la hero pour qu'elle reste épinglée et
finie pendant que l'image monte.

Chronologie vérifiée (viewport 900 px) : animation hero finie à 1439 px · l'image
commence à monter à 1530 px · image montée à 2203 px · la hero se retire à 2340 px.
Les marges de 91 px et 137 px garantissent qu'on ne voit jamais de vide.
**Si tu touches à la hauteur d'une des deux pistes, refais ce calcul.**

### Erreurs de lecture des maquettes

- **J'ai inventé un menu** (« Services / Réalisations / Contact ») qui n'existe
  dans aucune maquette. Le header, c'est **le logo seul**.
- **J'ai vu le décrochement du header et je l'ai écarté**, en le prenant pour un
  artefact de cadrage Figma. C'était le design. → Devant un détail inattendu dans
  une maquette, demander plutôt que trancher seul.
- **J'ai redessiné le logo en SVG** alors que le client avait déjà fourni le
  fichier. Vérifier le dossier avant de recréer quoi que ce soit.

---

## 6. Pièges d'environnement

### Le panneau de prévisualisation ne peut pas valider le scroll

C'est **la** limite à connaître. Le panneau intégré :

- ne délivre **ni `requestAnimationFrame` ni événements `scroll`** ;
- **Lenis en a besoin** → depuis son installation, le scroll y est **figé** ;
- renvoie parfois `innerWidth/innerHeight` à **0×0**, et des captures **périmées
  ou noires**.

**Ne pas conclure d'une capture noire que le code est cassé.** J'ai perdu beaucoup
de temps là-dessus. Test décisif : passer `document.body.style.background='red'` —
si le rouge apparaît, le rendu est vivant et c'est autre chose qui cloche.

### La méthode de vérification qui marche

```js
// 1. amener la section dans le champ sans dépendre du scroll
document.querySelectorAll('section')[0].style.display = 'none';

// 2. forcer la progression à la main
const stage = [...document.querySelectorAll('div')]
  .filter(d => getComputedStyle(d).position === 'sticky')[1];
stage.style.setProperty('--p', '0.30');

// 3. mesurer la géométrie PEINTE, pas le CSS calculé
const edgeAt = x => { for (let y = 2; y < 895; y += 2) {
  const e = document.elementFromPoint(x, y);
  if (e && /__image/.test(String(e.className))) return y;
} return null; };
edgeAt(200); edgeAt(1200);   // palier gauche / palier droit
```

`elementFromPoint` et `getBoundingClientRect` disent la vérité même quand la
capture ment. **C'est la seule vérification fiable dans cet environnement.**

Et surtout : **la validation visuelle finale revient au client**, dans son propre
navigateur (`open http://localhost:3000`). Le dire plutôt que de prétendre avoir vu.

### Fichiers dans les dossiers temporaires macOS

Une vidéo déposée depuis l'outil de capture d'écran atterrit dans un dossier
protégé (`/var/folders/.../TemporaryItems/`) : **illisible**, `Operation not
permitted`, même en lecture. Demander au client de la déplacer dans le projet.

`ffmpeg` et `PIL` sont disponibles et ont bien servi (extraction d'images,
planche-contact, mesure de netteté, détourage du logo).

---

## 7. Ce qu'on compte faire ensuite

### Immédiat

1. **Faire confirmer la section 2 par le client** dans son navigateur. Le dernier
   correctif (résorption progressive de la marche) n'a été validé que par la
   mesure, jamais à l'œil.
2. **Trancher le header de la hero.** Son état actuel — **blanc à 50 % d'opacité**
   avec bord franc — est né d'un test, pas d'une décision. Le flou de 28 px est
   toujours dessous et transparaît au travers. À confirmer ou remplacer.

### Ensuite

3. **Contenu réel de la section 2** : textes et photos, en remplacement du lorem
   ipsum et des aplats gris. Quatre photos client sont disponibles dans le dossier
   parent (chaufferie, salles de bain, réalisations).
4. **La suite du site** — sections non définies à ce jour.
5. **Vercel** — à brancher sur le dépôt GitHub quand le client le voudra. Rien
   n'y dépend du code : c'est une étape isolée. Question ouverte : le projet
   Vercel se crée sous le compte du client (cohérent avec le dépôt) ou sous
   celui de l'agence ?

### Git — en place

`git init` fait, premier commit poussé sur `main`. **Les vidéos de référence
sont exclues** (`*.mov`, `*.mp4`) : `section 3 animation.mov` pèse 141 Mo, très
au-delà de la limite de 100 Mo par fichier de GitHub. Elles restent en local —
ne pas tenter de les committer.

Avec deux sessions qui travaillent sur le même dossier, **committer souvent**
est la seule protection contre un écrasement mutuel.

### Dette technique connue

- **Avertissement LCP** : les images clonées du bandeau flouté n'ont pas
  l'attribut `priority`, Next les prend pour l'image déterminante du chargement.
  Sans effet visuel, mais à corriger à la passe d'optimisation.
- **Réglages jamais soumis au client** : l'inertie de Lenis (`lerp: 0.085`) et la
  durée des pistes (360vh / 320vh).
- Une **preview publiée** existe pour la hero seule :
  <https://claude.ai/code/artifact/aa9d138c-725d-49d2-b81c-3cff4aae7e68>.
  C'est une réplique HTML autonome, **désynchronisée depuis** : elle n'a ni la
  section 2, ni le décrochement du header, ni Lenis. Soit la mettre à jour, soit
  l'abandonner au profit du seul `localhost`.

---

## 8. Comment travailler avec ce client

Observations utiles, tirées de la session :

- **Il est précis et il a raison.** Chaque fois qu'il a dit « ça ne marche pas »
  alors que je pensais le contraire, c'est moi qui me trompais. Le prendre au mot
  et re-vérifier depuis zéro, sans réutiliser une vérification antérieure.
- **Il travaille par itérations courtes** et n'aime pas les réponses longues.
  Aller au fait.
- **Ne pas élargir le périmètre.** Il a repris à plusieurs reprises des ajouts non
  demandés (un menu inventé, un blanc retiré alors qu'il testait encore).
- **Ses instructions priment sur la référence.** Quand il demande quelque chose qui
  s'écarte de la vidéo, le faire — et le signaler en une ligne, sans discuter.

---

## 9. Section 3 — « paysage scroll » (préparée, NON branchée)

> Ajouté en fin de session 1, après que la session 2 a repris la main sur le
> projet. Le client avait donné ces consignes dans la mauvaise conversation.
> **Rien ici n'est branché** : `page.tsx` n'importe pas ces fichiers.

### Fichiers livrés

- `src/components/PaysageScroll.tsx`
- `src/components/PaysageScroll.module.css`

Orphelins et inoffensifs. À brancher dans `page.tsx` **après `EscalierSection`**,
en remplacement du bloc gris provisoire — ou à jeter si la session 2 préfère
repartir de zéro.

Nommés en français par cohérence avec `EscalierSection`. Ils utilisent
`useScrollProgress` comme les deux autres sections.

### La référence

`section 3 animation.mov`, à la racine du projet (17,4 s, 3510×2084).
Tirée du même site que la section 2 : <https://likova.space/>.

### Ce que fait l'animation

Un **carrousel 3D horizontal piloté par le scroll vertical**, sur fond blanc.

1. **L'arrivée** — le blanc monte depuis le bas par-dessus la section
   précédente. **Bord parfaitement plat, aucun décrochement** : mesuré image par
   image, les bords gauche et droit sont strictement identiques
   (74 % → 38 % → 25 % → 11 % → 0 % de la hauteur). C'est la différence avec la
   section 2, ne pas y remettre de marche par habitude.
2. **Le défilement** — les diapos glissent de droite à gauche pendant que la
   scène reste épinglée. La diapo centrale est à plat face à l'écran ; les
   latérales sont pivotées autour de l'axe vertical, comme posées sur un
   cylindre. C'est cette rotation qui donne le caractère de l'effet.
3. **Le texte** — titre et paragraphe en haut à droite, capitales noires,
   alignés à droite.

### Décisions prises avec le client

| Question | Réponse |
|---|---|
| Les « éventails » blancs de la vidéo | **À ne pas reproduire** — décor propre à leur site |
| Nombre de diapos | **5** pour l'instant, on en ajoutera |
| La flèche → | **Supprimée** — le défilement se fait au scroll |
| L'arrivée | **Identique à la vidéo** (blanc à plat) |
| La perspective | **Version fidèle avec la rotation 3D** |
| Durée du défilement | Libre — en mettre autant qu'il faut |
| Titre | **« Nos réalisations »**, en haut à droite, au-dessus du texte |
| Contenu | Lorem ipsum + aplats gris |

### Comment c'est construit

Les diapos sont posées sur un **cylindre** : chacune est tournée de `i × --step`
autour de l'axe vertical puis poussée de `--radius` vers l'avant. Faire tourner
le rail de `-turn` ramène chaque diapo face à l'écran à son tour, et celles des
côtés se présentent naturellement de biais.

```
.stage    --step 34deg · --radius 88vw · --count 4
.track    height 620vh · margin-top -95svh  (chevauche la section precedente)
.curtain  translateY 100% -> 0  sur p 0..0.10
.head     opacite 0 -> 1        sur p 0.08..0.16
.rail     rotateY 0 -> -(count x step)  sur p 0.14..0.94
```

**Piège 3D** : ne jamais mettre `overflow: hidden` sur l'élément qui porte
`transform-style: preserve-3d` — ça aplatit toute la scène. Le rognage se fait
sur `.stage`, en amont.

Les cinq gris sont **volontairement de nuances différentes** (`#6e6e73` à
`#828287`) : des aplats identiques rendraient le défilement illisible.

### Ce qui reste à faire

1. **Brancher** le composant dans `page.tsx`.
2. **Vérifier le chevauchement** avec `EscalierSection` : le `margin-top: -95svh`
   a été calculé sur l'ancienne `PanelSection` (piste 320vh) et n'a **jamais été
   testé**. Refaire le calcul de chronologie décrit au § 5, et vérifier que le
   rideau blanc monte bien pendant que la section précédente est encore épinglée.
3. **Régler la perspective à l'œil** — `--step`, `--radius` et `perspective:
   132vw` ont été choisis d'après les proportions de la vidéo, pas ajustés en
   conditions réelles.
4. Le client a mentionné un autre fichier, `animation images scroll.mov`, qui n'a
   pas été ouvert. Lui demander à quoi il correspond.

**Aucune de ces valeurs n'a été validée visuellement** : la session s'est
interrompue avant. Tout est à éprouver.
