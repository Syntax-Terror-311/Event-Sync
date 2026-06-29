# EventSync — Frontend Public (Next.js)

Interface publique de la plateforme EventSync, accessible à tous les participants sans authentification.

## Stack technique

- **Next.js 14** (App Router) — framework React avec SSR/SSG
- **TypeScript** — typage statique
- **Tailwind CSS** — styles utilitaires
- **date-fns** — manipulation des dates

## Prérequis

- Node.js >= 18
- Le backend `eventsync-backend` doit tourner sur le port 4000

## Installation

```bash
# 1. Cloner le repo
git clone https://github.com/TON_USER/eventsync-user.git
cd eventsync-user

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.local.example .env.local
```

### Contenu de `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## Démarrage

```bash
# Développement
npm run dev
# → http://localhost:3000

# Build de production
npm run build
npm start
```

## Pages disponibles

| Route | Description |
|-------|-------------|
| `/` | Accueil — présentation + événements récents |
| `/events` | Liste de tous les événements |
| `/events/[id]` | Détail d'un événement + planning multi-track |
| `/events/[id]/rooms/[roomId]` | Planning d'une salle (vue chronologique) |
| `/sessions/[id]` | Détail d'une session + Q&A live |
| `/speakers/[id]` | Page publique d'un intervenant |
| `/favorites` | Mon itinéraire personnel (favoris localStorage) |

## Fonctionnalités clés

### 🔴 Sessions Live
Une session est détectée "live" automatiquement si l'heure actuelle est entre `start_time` et `end_time`. Un badge rouge animé s'affiche partout (liste, planning, page session).

### 💬 Questions / Réponses
- Visible **uniquement** quand la session est live
- Soumission anonyme possible (nom optionnel)
- Upvote des questions existantes (1 upvote par navigateur par session)
- Rafraîchissement automatique toutes les 15 secondes
- Tri par nombre de upvotes (ordre décroissant)

### ⭐ Favoris
- Ajout/suppression depuis n'importe quelle SessionCard
- Stockage en `localStorage` (côté navigateur uniquement)
- Page dédiée `/favorites` avec vue de son itinéraire

### 🏛 Planning Multi-Track
- Vue globale groupée par salle sur `/events/[id]`
- Vue dédiée par salle sur `/events/[id]/rooms/[roomId]`
- Sessions parallèles visibles côte à côte

## Structure du projet

```
src/
├── app/                          # App Router Next.js
│   ├── layout.tsx                # Layout racine (Navbar)
│   ├── globals.css               # Styles globaux Tailwind
│   ├── page.tsx                  # Page d'accueil
│   ├── events/
│   │   ├── page.tsx              # Liste des événements
│   │   └── [id]/
│   │       ├── page.tsx          # Détail événement + planning
│   │       └── rooms/[roomId]/
│   │           └── page.tsx      # Vue par salle
│   ├── sessions/[id]/
│   │   └── page.tsx              # Détail session + Q&A
│   ├── speakers/[id]/
│   │   └── page.tsx              # Page intervenant
│   └── favorites/
│       └── page.tsx              # Mes favoris
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── sessions/
│   │   └── SessionCard.tsx       # Card réutilisable (liste, planning)
│   └── questions/
│       └── QASection.tsx         # Système Q&A interactif
├── hooks/
│   └── useFavorites.ts           # Hook gestion favoris localStorage
└── lib/
    └── api.ts                    # Client API + types TypeScript
```
