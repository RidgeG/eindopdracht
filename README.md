Installatiehandleiding ADHD Planner

1. Inleiding
   De ADHD Planner is een webapplicatie ontworpen om gebruikers met ADHD te helpen bij het organiseren van taken en deadlines. De applicatie biedt:

📅 Een interactieve kalenderweergave (dag/week/maand/agenda)

🛒 Categorieën voor taken (boodschappen, huishouden, werk, privé)

🔄 Synchronisatie met Todoist of lokale opslag

🌓 Dark/Light mode

📊 Overzicht van taken per categorie en deadline

![img.png](img.png)


2. Benodigdheden
   Om de applicatie te runnen, zijn de volgende zaken nodig:

Node.js (v18.x of hoger)

npm (v9.x of hoger)

Todoist API Token:

TODOIST_TOKEN=22fbcdbc3d1f2fc655d7a2661c2a5cc7493cc293  
Firebase Configuratie (voor authenticatie):

javascript
apiKey: "AIzaSyDPYG2whLAkqg4YAVlvjt9i3GFXKV0XJCM",  
authDomain: "kalenderapp94.firebaseapp.com",  
projectId: "kalenderapp94",  
storageBucket: "kalenderapp94.appspot.com",  
messagingSenderId: "94274665132",  
appId: "1:94274665132:web:f48aacbde3f59f4e56bd09"
3. Installatiestappen
   Volg deze stappen om de applicatie op te zetten:

Kloon de repository:

bash
git clone https://github.com/RidgeG/eindopdracht
cd adhd-planner  
Installeer dependencies:

bash
npm install  
Maak een .env bestand in de root-directorie met:

env
VITE_TODOIST_TOKEN=22fbcdbc3d1f2fc655d7a2661c2a5cc7493cc293  
VITE_FIREBASE_API_KEY=AIzaSyDPYG2whLAkqg4YAVlvjt9i3GFXKV0XJCM  
VITE_FIREBASE_AUTH_DOMAIN=kalenderapp94.firebaseapp.com  
VITE_FIREBASE_PROJECT_ID=kalenderapp94  
VITE_FIREBASE_STORAGE_BUCKET=kalenderapp94.appspot.com  
VITE_FIREBASE_MESSAGING_SENDER_ID=94274665132  
VITE_FIREBASE_APP_ID=1:94274665132:web:f48aacbde3f59f4e56bd09  
Start de applicatie:

bash
npm run dev  
Open de app in je browser:

http://localhost:5173
4. Inloggegevens
   Je kunt inloggen met deze testaccounts:

E-mail: test02@gmail.com

Wachtwoord: testpaswoord

Of registreer een nieuw account via het registratiescherm.

5. Beschikbare npm Commando’s
   Commando	Beschrijving
   npm run dev	Start de ontwikkelingsserver (live-reload)
   npm run build	Maak een productiebuild in de dist-map
   npm run preview	Preview de productiebuild lokaal
   npm run lint	Controleer code op syntaxfouten

6. Veelgestelde Vragen
   Q: Waarom krijg ik een Firebase-fout?
   Zorg dat de Firebase-configuratie in .env exact overeenkomt met de gegeven waarden.

Q: Werkt de Todoist-integratie niet?
Controleer of de VITE_TODOIST_TOKEN correct is ingevuld in .env.

Q: Hoe schakel ik naar dark mode?
Klik op het 🌙/☀️-icoon in de header.

Succes met het opzetten van de ADHD Planner! 🚀
Voor vragen: neem contact op via ridgegeervliet@gmail.com.