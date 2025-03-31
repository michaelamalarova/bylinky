import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        label:
        {
            email: "E-mail",
            password: "Password",
            logIn: "Log in",
            logOut: "Log out",
        },
        navbar:{
          home: "Home",
          about: "About",
          contact: "Contact",
          profile: "Profile",
        },
        home: {
          title: 'Home Page',
          welcomeMessage: 'Welcome to our herb and fruit app!',
        },
        about: {
          title: 'About Us',
          description: 'This app helps you find and collect herbs and fruits.',
        },
        logIn:
        {
          title: 'Log in'
        },
        registration:
        {
          title: "Registration",
          register: "Register",
        },
        contact:
        {
          title: 'Contact'
        },
        profile:
        {
          title: 'Profile'
        },
        editProfile:
        {
          title: "Edit profile",
          saveChanges: "Save changes",
        }
      },
    },
    cz: {
      translation: {
        label:
        {
            email: "E-mail",
            password: "Heslo",
            logIn: "Přihlásit se",
            logOut: "Odhlásit se",
            registration: "Zaregistrovat se",
        },
        navbar:{
          home: "Nástěnka",
          about: "O nás",
          contact: "Kontakt",
          profile: "Profil",
        },
        home: {
          title: 'Domovská stránka',
          welcomeMessage: 'Vítejte v naší aplikaci pro sběr bylin a ovoce!',
        },
        about: {
          title: 'O nás',
          description: 'Tato aplikace vám pomůže najít a sbírat byliny a ovoce.',
        },
        logIn:
        {
            title: 'Přihlášení'
        },
        registration:
        {
          title: "Registrace",
          register: "Zaregistrovat se",
        },
        contact:
        {
          title: 'Kontakt'
        },
        profile:
        {
          title: 'Profil'
        },
        editProfile:
        {
          title: "Upravit profil",
          saveChanges: "Uložit změny",
        }
      },
    },
  },
  lng: 'cz',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
