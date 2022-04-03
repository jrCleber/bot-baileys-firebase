## bot-baileys-firebase

[![Discord](https://img.shields.io/badge/Channels-Discord-%23336EFF)](https://discord.com/channels/954499008724881458/954499009219801089)
[![Telegram](https://img.shields.io/badge/Group-Telegram-%2333C1FF)](https://t.me/codechatBR)
[![Whatsapp](https://img.shields.io/badge/WhatsApp-message-%2322BC18)](https://api.whatsapp.com/send?phone=5531995918699)

# Service Bot Via Whatsapp

This project was developed based on the library [@adiwajshing/baileys](https://adiwajshing.github.io/Baileys/) for handling whatsapp chats, and uses **Firestore**, a database **NoSql** from **Firebase**.

<hr>

## Objective
This application aims at automated fulfillment and order management.

### Functions
1. customer registration
2. order management
3. address registration
4. order registration and shipment to production
5. order cancellation
<hr>

### To execute the project
1. run the command: ```git clone https://github.com/jrCleber/bot-baileys-firebase.git```
2. create a [new project](https://console.firebase.google.com/) in firebase, select the [firestore](https://console.firebase.google.com/project/webbot-dbc99/firestore ) and configure the database
    * then click on **project settings -> [accounts and services](https://console.firebase.google.com/project/your-project/settings/serviceaccounts/adminsdk) -> generate a new private key**
    * save the key in the path **./firebase/token/** with the following name: **serviceAccountKey.json**
3. install dependencies:
    * with package manager **yarn**, run the command: ```yarn``` or ```yarn install```
    * with **npm**, run the command: ```npm install```
4. to start the app:
    * with **yarn** run: ```yarn start:app```
    * with **npm** run: ```npm run start:app```<br/>
    ↳ both commands above will create transpile the code, saving it in the dist folder
    * ```yarn dev``` or ```npm run dev``` will run the code in developer mode; with code transpilation at runtime
5. All right now. **HAVE A GOOD TIME**!
<hr>

This application does not manage payments, routing to attendants and general edits.

<hr>