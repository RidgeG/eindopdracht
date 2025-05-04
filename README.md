# ADHD Kalender App

Een eenvoudige kalenderapplicatie speciaal ontworpen voor gebruikers met ADHD, met focus op overzichtelijkheid en eenvoudig gebruik.

## Installatiehandleiding

### Vereisten
- Node.js (versie 18+)
- npm (meegeleverd met Node.js)
- Firebase account

### Stappen

1. **Kloon de repository**
   ```bash
   git clone https://github.com/jouw-gebruikersnaam/adhd-kalender.git
   cd adhd-kalender
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   ```

3. **Firebase Configuratie**
    - Maak een nieuw Firebase project op [console.firebase.google.com]
    - Vervang de configuratiewaarden in `firebaseConfig.js` met jouw eigen Firebase instellingen

4. **Start de applicatie**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Ga naar `http://localhost:5173`

## Gebruiksaanwijzing

### Registreren
1. Klik op "Registreer hier" op de loginpagina
2. Voer een geldig e-mailadres en wachtwoord in
3. Klik op "Account aanmaken"

### Inloggen
1. Voer je geregistreerde e-mail en wachtwoord in
2. Klik op "Inloggen"

### Taken beheren
- **Nieuwe taak toevoegen**:
    1. Klik op "+ Nieuwe Taak" in de navigatiebalk
    2. Vul titel en deadline in
    3. Klik op "Taak Opslaan"

- **Taken bekijken**:
    - **Home**: Taken voor vandaag
    - **Overzicht**: Alle taken
    - **Aankomende Taken**: Taken voor de komende 7 dagen

### Thema wisselen
Klik op het zon/maan icoon rechtsboven om tussen licht/donker thema te wisselen

### Uitloggen
Klik op "Uitloggen" in de navigatiebalk

## Technologieën
- React.js
- Firebase Authentication
- Local Storage
- React Big Calendar
- date-fns

## Licentie
MIT License