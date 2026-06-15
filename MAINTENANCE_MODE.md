# Sakienah — Maintenance Mode

Dit document legt uit hoe de maintenance mode werkt en hoe je als developer toegang houdt tot alle pagina's tijdens het coderen.

## Wat is de maintenance mode?

Wanneer `MAINTENANCE_MODE=true` is (zie `.env.local`), worden **alle bezoekers** automatisch doorgestuurd naar de `/dropping-soon` pagina. Deze pagina toont een "Uitverkocht — nieuwe collectie binnenkort"-bericht in Sakienah-stijl.

## Hoe werkt het?

- `middleware.ts` vangt elke pagina-request af.
- Bezoekers zonder `sakienah_dev` cookie → redirect naar `/dropping-soon`.
- Developers **met** de cookie → gewone toegang tot alle pagina's.
- Static assets (afbeeldingen, fonts, etc.) worden altijd doorgelaten.

---

## Stappen voor developers

### 1. Bypass-cookie activeren

Open eenmalig in je browser:

```
http://localhost:3000/dropping-soon?bypass=sakienah-dev-bypass-2024
```

De middleware zet automatisch een cookie `sakienah_dev=1` (30 dagen geldig) en stuurt je door naar de homepage.

### 2. Normaal verderwerken

Vanaf nu werkt alles als vanouds — `/shop`, `/cart`, `/checkout`, `/account`, etc. De cookie blijft 30 dagen actief.

### 3. Cookie verlopen?

Herhaal stap 1. Of, als je wilt testen als "echte bezoeker": verwijder de cookie `sakienah_dev` in je browser DevTools.

---

## Environment variabelen

| Variabele           | Waarde                     | Beschrijving                          |
| ------------------- | -------------------------- | ------------------------------------- |
| `MAINTENANCE_MODE`  | `true` / `false`           | Schakelt de maintenance mode aan/uit  |
| `DEV_BYPASS_SECRET` | `sakienah-dev-bypass-2024` | Geheime code voor de developer-bypass |

### Maintenance mode uitschakelen (webshop weer publiek)

In `.env.local`:

```env
MAINTENANCE_MODE=false
```

Herstart de dev server:

```bash
npm run dev
```

---

## Bestanden die zijn aangepast

| Bestand                      | Rol                                             |
| ---------------------------- | ----------------------------------------------- |
| `.env.local`                 | Bevat `MAINTENANCE_MODE` en `DEV_BYPASS_SECRET` |
| `.env.example`               | Documentatie van de nieuwe env vars             |
| `middleware.ts`              | Checkt maintenance mode + cookie bypass         |
| `app/dropping-soon/page.tsx` | De "uitverkocht"-landing page                   |

---

## Deploying naar productie

In productie (Vercel) voeg je toe:

1. `MAINTENANCE_MODE=true` → Environment Variables
2. `DEV_BYPASS_SECRET` → een eigen geheime string (niet de default!)

De bypass-URL wordt dan:

```
https://jouwdomein.nl/dropping-soon?bypass=JOUW_GEHEIME_STRING
```

---

## Troubleshooting

**"Ik zie het zellij-patroon niet op de dropping-soon pagina"**

- De middleware moet static assets doorlaten. Controleer `middleware.ts` of `/brand_assets/` en `.webp`/.png/.jpg in de uitzonderingenlijst staan.
- Hard refresh: `Cmd+Shift+R` (Mac) of `Ctrl+Shift+R` (Windows).
- Clear de Next.js cache: `rm -rf .next` en herstart `npm run dev`.

**"Ik krijg een redirect-loop"**

- Controleer of de middleware de `/dropping-soon` pagina zelf niet redirect.
- Zorg dat `MAINTENANCE_PAGE` in `middleware.ts` gelijk is aan `/dropping-soon`.
