# Capsalert

## Project Overview

For our final group project we created a medication notification app, this android app allows users to create an account and input their medical history, allergies, and current medication.
Capsalert allows the user to have multiple reminders for specific medications, which will provide a push notification to the phone with a discreet message reminding them to take their schedualed medications.

## Built with...

<a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="tailwind"/></a>
<a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native"/></a>
<a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase"/></a>
<a href="https://www.javascript.com/"><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript"/></a>
<a href="https://code.visualstudio.com/"><img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="Visual Studio Code"/></a>
<a href="https://www.npmjs.com/"><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="Npm"/></a>
<a href="https://expo.dev/"><img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt="Expo"/></a>
<a href="https://www.nativewind.dev/"><img width="142" alt="native-wind-img" src="https://user-images.githubusercontent.com/107635204/230014237-a3db14e1-fd2c-47cd-b9a1-24bbf4097385.png"></a>

## Getting set up

### Commands to run in the terminal

Fork & clone this repo

`npm install`

`npx expo start`

### Add subscription key

This app utilises the NHS Medicines API

`https://api.nhs.uk/medicines`

To use this api, please register an account from the following webpage
`https://developer.api.nhs.uk/register`

Create a `.env` file and add the subscription key as below.

NHS_API_KEY = "INSERT YOUR SUBSCRIPTION KEY"

## How to use this app

### Sign in/ Register

When you first access the app you will be greeted with a sign in/sign up page, if you already have an account log in as normal; if not, create a new account.

After this you may go into all the different pages and input the information you choose.

### Medical History

You can add into your medical history page previous diagnosises and medical appoinments.

### Allergies

Add any important allergies into the allergy page, where this will stored as a list.

Checkbox list is also provided for the 14 most common food allergens.

### Add Medications

Add medications into the medication page, when adding this information add the name, start and end date, dosage and regularity (you can edit and delete these medications at any time).

### Additional Medication Information

In an effort to help users feel less alone or scared we have created a more information button containing some information about the medication. In addition, there is a link to the nhs page for the medication inputted.

A text-to-speach toggle has been added, which aims for better accessibility for the user.

### Notifications

To remind users to take their medications on time, notification alerts can be set up.

### Due Medications

Notifications can be tracked on the due medications page, where there is a colour coded and chronological list of your notifications, incluing missed medications, imminent notifications and medications scheduled for later in the day.

### Sign Out

Lastly you can sign in and out of your account with ease, using the sign out button.
