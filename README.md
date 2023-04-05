# Capsalert

## Project Overview

For our final group project we created a medication notification app, this android app allows users to create an account and input their medical history, allergies, and current medication.

Capsalert allows the user to have multiple reminders for specific medications, which will provide a push notification to the phone with a discreet message reminding them to take their scheduled medications.

## Built with...

<a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="tailwind"/></a>
<a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native"/></a>
<a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase"/></a>
<a href="https://www.javascript.com/"><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript"/></a>
<a href="https://code.visualstudio.com/"><img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="Visual Studio Code"/></a>
<a href="https://www.npmjs.com/"><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="Npm"/></a>
<a href="https://expo.dev/"><img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt="Expo"/></a>
<a href="https://www.nativewind.dev/">NativeWind</a>

## Getting set up

1. Fork & clone this repo.

2. Run the following commands:

   `npm install`

   `npx expo start`

## How to use this app

When you first access the app, you will be greeted with a sign in/sign up page. If you already have an account, log in as normal. If not, create a new account. After this, you may go into all the different pages and input the information you choose.

1. Add your previous/current diagnoses into the **Medical History** page.
2. Add food, drug and any other allergies into the **Allergy** page.
3. View a list of all your medications in the **Medications** page. From here you can do the following:

   - Add medications, where you can enter the medication's generic and brand names, dosage, form (e.g. pill, liquid, injection) and quantity to take. You can also set up notifications and input the time(s) the medication needs to be taken, which will generate local notifications on your phone. These medications can be edited and deleted at any time.

   - In an effort to help users feel less alone or scared, we have also created a More Info tag for each medication. This takes you to a separate page containing more information about the medication. There is also a link to the NHS page for that medication, and some of which contain a forum where people can share similar experiences with the medication.

   - We have also implemented a text to speech function to allow uses with sight impairments to still have full access to our app.

4. View which medications you're due to take in the **Due Medications** page, where there is a colour coded and chronological list of your due medications, including medications that are due imminently, missed medications, medications you've already taken, and ones scheduled for later in the day. You can also tap a medication card and mark it as "Taken".

5. Lastly. you can sign in and out of your account with ease, using the **Sign Out** button.
