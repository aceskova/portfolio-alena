# Portfolio Aleny Češkové

Osobní portfolio frontend vývojářky se zkušenostmi s backendem a testováním. Představuje vlastní projekty, aktuální práci, dovednosti a zkušenosti získané při práci podle tutoriálů. Obsah je dostupný česky a anglicky, ve světlém i tmavém režimu.

## Technologie

- Next.js 16 (App Router), React 19 a TypeScript.
- Tailwind CSS 4, Radix UI a Lucide ikony.
- next-intl pro překlady.
- Vercel Analytics pro měření návštěvnosti.
- ESLint a Prettier pro kontrolu kódu a formátování.

Konkrétní verze závislostí jsou v `package.json` a `yarn.lock`.

## Lokální spuštění

Používej Yarn Classic (1.x) a Node.js kompatibilní s nainstalovaným Next.js. Požadavek verze Node.js lze ověřit v `node_modules/next/package.json` v položce `engines`.

```bash
yarn install --frozen-lockfile
yarn dev
```

Aplikace běží na [localhost:3000](http://localhost:3000). Aktuální portfolio nepotřebuje vlastní databázi ani aplikační API klíče.

Nové závislosti přidávej přes `yarn add nazev-balicku`, vývojové přes `yarn add -D nazev-balicku`. Commituj `yarn.lock`; nevytvářej souběžně `package-lock.json`.

## Stránky

| Cesta                     | Obsah                                            |
| ------------------------- | ------------------------------------------------ |
| `/`                       | Představení, fotografie, odkazy na projekty a CV |
| `/about`                  | Zkušenosti, způsob práce a lezení                |
| `/projects`               | Aktuální práce, portfolio a vybrané projekty     |
| `/projects/reserve-app`   | Detail Reserve App                               |
| `/projects/jablonec-sea`  | Detail projektu Jablonecké moře                  |
| `/learning`               | Přehled aplikací vytvořených podle tutoriálů     |
| `/learning/ibuiltthis`    | Zkušenosti z fullstack tutoriálu Next.js         |
| `/learning/habit-tracker` | Zkušenosti z tvorby Habit Trackeru               |
| `/skills`                 | Dovednosti a odkazy na konkrétní ukázky          |
| `/contact`                | E-mail, profesní profily a CV                    |

## Struktura a sdílené komponenty

- `app/` — stránky, kořenový layout a globální styly.
- `components/portfolioCard.tsx` — karta projektu nebo tutoriálu. Volitelný `action` z ní vytvoří odkaz; bez něj je neklikací. Podporuje popisek, poznámku a doplňkový obsah. Do klikací karty nevkládej další odkazy ani tlačítka. Přístupný název odkazu je propojený s nadpisem přes `aria-labelledby`.
- `components/technologyBadges.tsx` — společné štítky technologií. `limit` omezuje počet viditelných položek a přidává počet zbývajících, `size` vybírá velikost.
- `components/learningDetail.tsx` — společné rozložení detailů tutoriálů s typem `LearningDetailData`.
- `components/hero/` — úvodní sekce a fotografie.
- `components/ui/` — základní UI prvky.
- `messages/cs.json`, `messages/en.json` — texty obou jazykových verzí.
- `i18n/` — konfigurace jazyků a načítání překladů.
- `public/` — obrázky a PDF životopisy; `app/icon.png` slouží také jako ilustrace chytu na stránce O mně.

### Přidání projektu nebo tutoriálu

1. Doplň texty do obou souborů v `messages/`.
2. Přidej `PortfolioCard` do příslušného přehledu. U projektu s detailem nastav `action` s existující cestou a přeloženým popiskem.
3. Pro detail tutoriálu vytvoř `app/learning/<slug>/page.tsx`, načti jeho překlady a předej je do `LearningDetail` podle stávajících stránek.
4. Ověř oba jazyky, světlý i tmavý režim, mobilní rozložení a ovládání klávesnicí.

## Jazyky a vzhled

Jazyk se vybírá podle cookie `locale`, případně hlavičky prohlížeče; výchozí jazyk je čeština. Přepnutí jazyka zachovává URL a obnovuje obsah stránky. Routy nemají jazykový prefix.

Barvy jsou definované v `app/globals.css`. Pro modré texty a odkazy používej `text-brand-foreground`: ve světlém režimu odpovídá `sky-700`, v tmavém `sky-400`. Štítky používej prostřednictvím `TechnologyBadges`, aby se jejich vzhled nemusel upravovat na více místech.

Volba vzhledu se ukládá do cookie `theme`; bez uložené volby se zohledňuje nastavení systému. Běžný text používá systémové bezpatkové písmo. Animace rámečku fotografie se spouští pouze při `prefers-reduced-motion: no-preference`.

Životopisy jsou v `public/cv/` jako `alena-ceskova-cv-cs.pdf` a `alena-ceskova-cv-en.pdf`. Odkazy vybírají soubor podle aktuálního jazyka.

### Kontrola překladů — současný stav

Detaily zatím používají `t.raw(...) as LearningDetailData`. Jde o typové přetypování, nikoli o kontrolu skutečné struktury JSON. Samotné `tsc` proto nezaručuje, že překlady obsahují všechny požadované položky.

Navrženým dalším krokem je kontrolní skript bez nové knihovny, který projde oba jazykové soubory, porovná klíče a typy a ověří povinné řetězce, seznamy a objekty detailů. Při chybě má vypsat přesnou cestu položky a skončit nenulovým kódem. Tato automatická kontrola zatím není implementovaná ani zapojená do buildu.

## Kontroly a produkční sestavení

```bash
yarn tsc --noEmit
yarn lint
yarn format:check
yarn build
```

Automatické formátování:

```bash
yarn format
```

Spuštění již sestavené produkční verze:

```bash
yarn start
```

Projekt zatím nemá vlastní automatizovanou sadu unit nebo E2E testů. Zmínky o Playwrightu v obsahu portfolia se vztahují k prezentovaným projektům.

Layout stále načítá `Geist Mono` přes `next/font/google`. Produkční build proto potřebuje přístup k Google Fonts; při nedostupném spojení může selhat stahování fontu. Běžné systémové písmo tuto závislost nemá.

## Nasazení a analytika

Portfolio používá integraci Vercel Analytics v `app/layout.tsx`. Pro sběr dat je potřeba mít Web Analytics zapnuté také v nastavení projektu na Vercelu. Samotná přítomnost komponenty v kódu nepotvrzuje, že služba už data sbírá.

Při nasazování používej Yarn a příkaz `yarn build`. Úspěšný lint a typová kontrola nenahrazují ověření produkčního sestavení.

## Pokyny pro práci s Next.js

Respektuj `AGENTS.md`. Před úpravami frameworkového kódu čti dokumentaci instalované verze v `node_modules/next/dist/docs/`; její API se může lišit od starších verzí Next.js.
