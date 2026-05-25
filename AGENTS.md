# AGENTS.md

Pracovni poznamky pro dalsi agenty / vyvojare k projektu verejneSklizeniApp.

## Co je tohle za projekt

Aplikace ma byt mapa verejne dostupnych mist, kde lide nasli bylinky, ovoce nebo podobne prirodni zdroje. Hlavni use-case je:

- otevrit mapu,
- kliknout na misto,
- vybrat rostlinu,
- ulozit zaznam,
- pozdeji filtrovat podle rostliny, sezony, duveryhodnosti a potvrzeni od uzivatelu.

V poznamkach jsou zminene i budouci funkce: rank zaznamu, lajky/dislajky, starnuti neoverenych zaznamu, detail rostliny, recepty, houby a sezoni signal "Rostou!".

## Struktura repozitare

- `be/` - Express + MongoDB/Mongoose backend.
- `fe/` - webova React aplikace s Leaflet mapou.
- `fe-mobile-app/` - rozpracovana React Native aplikace, zatim samostatny pokus.
- `docker-compose.yml` - backend, frontend a MongoDB.
- `popis.txt` - produktove napady a cilove funkce.
- `postup.txt` - studijni / implementacni poznamky.

## Technologie

Backend:

- Node.js >= 18
- Express
- Mongoose
- MongoDB
- JWT autentizace

Frontend:

- Create React App
- React 18
- TypeScript jen v casti souboru (`.tsx`, `.ts`), zbytek je JS
- React Router
- React Leaflet / Leaflet
- i18next

## Spousteni

Backend:

```powershell
cd be
npm install
npm run start.dev
```

Backend s vynucenou lokalni MongoDB:

```powershell
cd be
npm run start.dev.local
```

Seed rostlin do lokalni MongoDB:

```powershell
cd be
npm run seed:local
```

Frontend:

```powershell
cd fe
npm install
npm start
```

Docker varianta:

```powershell
docker-compose up --build
```

Pozor: `docker-compose.yml` nastavuje backendu `MONGO_URL`, ale `be/server.js` cte `DATABASE_URL`. Bud je potreba sjednotit na `DATABASE_URL`, nebo upravit server, aby cetl i `MONGO_URL`.

## Dulezite env promenne

Backend:

- `DATABASE_URL` - MongoDB connection string, fallback je `mongodb://localhost:27017/sberatel`.
- `JWT_SECRET` - tajemstvi pro podepisovani JWT.

Frontend:

- `REACT_APP_API_URL` - base URL backendu, pouziva se napr. jako `${process.env.REACT_APP_API_URL}/api/records`.

Do dokumentace nikdy neprepisovat realne hodnoty z `.env`; soubory `.env` brat jako lokalni konfiguraci.

## Soucasny datovy model

`Plant`:

- `name`
- `description`
- `season`

`Record`:

- `lat`
- `lng`
- `plant._id`
- `plant.name`
- `createdAt`

`User`:

- `username`
- `email`
- `password` hashovane pres bcrypt pre-save hookem

## API mapa

Prefix backendu je `/api`.

Plants:

- `GET /api/plants`
- `POST /api/plants`
- `GET /api/plants/:id`

Users/auth:

- `POST /api/register`
- `POST /api/login`
- `GET /api/users`
- `GET /api/users/:id`
- `GET /api/profile`
- `PUT /api/profile`

Records:

- `POST /api/records`
- `GET /api/records`
- `GET /api/records:id`
- `PUT /api/records:id`
- `DELETE /api/records:id`
- `POST /api/records:id/like`

Pozor: record routes maji pravdepodobne bug. Maji byt spis `/records/:id`, ne `/records:id`.

## Frontend tok mapy

- `fe/src/pages/Home.tsx` renderuje `Layout` a `Map`.
- `fe/src/components/Map.tsx` zobrazuje Leaflet mapu Prahy.
- Klik do mapy vytvori docasny marker.
- Popup obsahuje select rostlin.
- Submit posle `POST /api/records` a lokalne prida marker do stavu.
- `fe/src/hooks/useMarkers.ts` nacita rostliny i existujici zaznamy z backendu.

## Zname problemy / technicky dluh

- Cast ceskych komentaru a textu je rozbita jako mojibake (napr. divne znaky misto diakritiky). Pravdepodobne problem s ulozenim / interpretaci kodovani.
- `Record` model nema `likes`, ale `recordController.likeRecord` dela `record.likes += 1`.
- `authMiddleware` a `userController.login` nemusi pouzivat stejny tvar JWT payloadu. Login podepisuje `{ userId: user._id }`, ale profilovy controller cte `req.user.id`.
- `GET/PUT/DELETE /records:id` routy chybi lomitko pred `:id`.
- `createRecord` kontroluje `!lat || !lng`, coz odmita legitimni souradnici `0`. Lepsi je kontrolovat `lat == null || lng == null`.
- Frontend po ulozeni markeru necte odpoved backendu, takze lokalni `id: Date.now()` se muze lisit od Mongo `_id`.
- U `markers.map` v `Map.tsx` chybi stabilni `key` na `MarkerWithPopupDetail`.
- Projekt micha JS a TS. To je ok, ale nove sdilene typy a mapova logika by mely radeji byt TS.
- `node_modules` jsou pritomne ve vice slozkach. Nemenit je rucne a necommitovat.
- React Native cast vypada oddelena a pravdepodobne neni nutna pro prvni funkcni webovou verzi.

## Doporuceny nejblizsi smer

Nejdriv zpevnit webovou MVP verzi:

1. Opravit backend routes pro records (`/records/:id`).
2. Sjednotit Mongo env promennou mezi Dockerem a serverem.
3. Opravit JWT payload / auth middleware, aby profil fungoval.
4. Doplnit `likes` nebo jednodussi `confirmations` do `Record` modelu.
5. Upravit ulozeni markeru tak, aby frontend pouzil zaznam vraceny backendem.
6. Pridat zakladni filter podle rostliny a podle sezony.
7. Az potom resit mobilni appku.

## Audit TODO pred dalsim vyvojem

Konkretni seznam veci nalezenych pri kontrole projektu. Prochazet postupne a pred upravami si vzdy potvrdit, co se bude menit.

### Priorita 1 - blokery a funkcni chyby

- [x] Opravit frontend build chybu v `fe/src/components/Layout.tsx`: soubor pouziva `React.ReactNode`, ale nema import `React`. Overeno: `npm run build` prochazi.
- [x] Opravit backend record routy v `be/routes.js`: misto `/records:id` ma byt `/records/:id` pro `GET`, `PUT`, `DELETE` i `POST /like`. Overeno po restartu backend containeru: route se matchuje.
- [x] Sjednotit JWT payload a auth middleware: login uklada `{ id: user._id }`, auth middleware overi token, nacte uzivatele bez hesla a ulozi ho do `req.user`.
- [x] Zprovoznit registraci ve `fe/src/pages/RegisterPage.js`: formular vola backend `/api/register` a presmeruje na login az po uspesne odpovedi. Overeno pres API registraci + login a `npm run build`.
- [ ] Rozhodnout, jestli `Record` model bude mit `likes`, nebo se like endpoint odstrani/prepracuje. Controller ted pouziva `record.likes`, ale aktivni schema ho nema.

### Priorita 2 - mapa a zaznamy

- [ ] Upravit ukladani markeru ve `fe/src/components/Map.tsx`: frontend by mel pockat na odpoved backendu a pouzit ulozeny Mongo zaznam misto lokalniho `Date.now()` id.
- [ ] Pridat stabilni `key` pri `markers.map` v `Map.tsx`, aby React nemel problem s renderem markeru.
- [ ] Opravit validaci v `be/controllers/recordController.js`: `!lat || !lng` odmita souradnici `0`; lepsi je `lat == null || lng == null`.
- [ ] Opravit detail endpoint v `be/controllers/recordController.js`: po oprave route uz `/api/records/:id` pada ve controlleru, protoze `getRecordById` dela `populate('plant user')`, ale aktualni schema nema `user` a `plant` je vnorene pole/objekt.
- [ ] Vyresit odkaz na `/detail/:id` v `Map.tsx`: bud pridat detail route/page, nebo docasne odkaz odstranit.
- [ ] Nahradit placeholder text `blaaa blaaa blaaa` v popup detailu smysluplnym obsahem.

### Priorita 3 - konfigurace a Docker

- [ ] Sjednotit Mongo env promenne: pro Docker se pouziva `DATABASE_URL: mongodb://mongo:27017/sberatel`; hlidat, aby kod, seed a dokumentace mluvily stejne.
- [ ] Uklidit `be/Dockerfile`: `RUN npm install cors` je nadbytecne, protoze `cors` uz je v `be/package.json`.
- [ ] Zkontrolovat `fe/Dockerfile`: pousti `npm run start.dev`, coz ve frontendu znamena `nodemon -L`; pro CRA dev server dava vetsi smysl `npm start`.
- [ ] Rozhodnout co s korenovym `package.json`: ted obsahuje jen `nodemon`, mozna je zbytecny, nebo by mel mit spolecne prikazy pro Docker/dev.
- [ ] Pridat/ujasnit seed script pro Docker DB, aby bylo jasne, kdy seedovat pres `localhost` a kdy pres Docker hostname `mongo`.

### Priorita 4 - uklid kodu a UX

- [ ] Rozhodnout co s `fe/src/components/AddRecord.js`: vypada jako nepouzivana starsi verze pridavani zaznamu a posila jiny tvar dat nez backend ceka.
- [ ] Opravit `fe/src/pages/EditProfile.js`: vola `/api/users/profile`, ale backend ma `/api/profile`; navic chybi Authorization header.
- [ ] Zkontrolovat `Profile.js`: ted je hlavne placeholder a ma zakomentovane nacitani dat.
- [ ] Opravit prekladovy klic v mobilnim menu Navbaru: pouziva `label.login`, ale v i18n existuje `label.logIn`.
- [ ] Nahradit logo/text `MyApp` skutecnym nazvem aplikace.
- [ ] Uklidit debug `console.log` hlasky ve frontendu (`index.js`, `Profile.js`, `AddRecord.js`, `RegisterPage.js`).
- [ ] Opravit rozbite ceske texty a komentare s mojibake znaky. Zacit u `fe/src/i18n.js`, potom backend komentare a Docker komentare.

### Priorita 5 - rozhodnuti o vetsi strukture

- [ ] Rozhodnout, jestli `fe-mobile-app/` zustava soucasti repozitare. Pro web MVP je to velky kus sumu; pokud zustane, brat ho jako oddeleny projekt.
- [ ] Rozhodnout, jestli `deleteRecords.js` zustane. Je uzitecny pro vyvoj, ale maze vsechny zaznamy, takze by mel mit jasny npm script a pojistku.
- [ ] Zvazit presun dlouhych studijnich poznamek z kodu do dokumentace. V kodu nechat jen kratke komentare, ktere pomahaji pochopit nejasnou logiku.
- [ ] Casem zalozit normalni `README.md` v koreni s kratkym postupem: Docker start, seed, URL frontend/backend, nejcastejsi problemy.

## Navrh domennich pravidel proti spamu

Pro prvni verzi neni potreba slozita AI validace. Staci jednoducha pravidla:

- Novy zaznam ma stav `pending` nebo nizky `confidence`.
- Prihlaseny uzivatel muze potvrdit nebo zpochybnit cizi zaznam.
- Autor nemuze potvrdit vlastni zaznam.
- Zaznam ma `confirmations`, `disputes`, `lastConfirmedAt`.
- Stare neoverene zaznamy postupne ztraci duveryhodnost.
- Na mape se vychoze zobrazuji jen zaznamy nad minimalni duveryhodnost.
- Pozdeji lze pridat sezonni kontrolu: pokud je rostlina mimo mesic sberu, zaznam se ulozi, ale dostane nizsi pocatecni duveryhodnost nebo upozorneni.

## Styl prace pro dalsi upravy

- Pred upravou precist relevantni controller, model a frontend komponentu.
- Delat male kroky a po kazdem zkontrolovat build/lint, pokud to jde.
- Nerefaktorovat mobilni appku, pokud ukol neni primo o ni.
- Nechat produktove poznamky v `popis.txt` a technicke instrukce udrzovat tady v `AGENTS.md`.
- Pri dalsim cisteni zvazit samostatny `README.md` pro bezne spusteni aplikace.
