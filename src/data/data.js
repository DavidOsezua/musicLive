import {
  Acoustic,
  blues,
  country,
  dance,
  jazz,
  metal,
  pop,
  raggae,
  rock,
  urban,
} from "../assets";

export const navLinks = [
  { link: "Home", path: "/" },
  { link: "Venues", path: "/venues" },
  { link: "Bands", path: "/bands" },
  { link: "Add your venue", path: "/addyourvenue" },
  { link: "Add your band", path: "/addyourband" },
  { link: "Contact US", path: "/contactus" },
  { link: "About US", path: "/aboutus" },
];

export const footerLinks = [
  {
    title: "Quicklink",
    links: [
      {
        name: "email@findmelivemusic.com",
      },
      {
        name: "About us",
      },
      {
        name: "Terms",
      },
    ],
  },
  {
    title: "Interests",
    links: [
      {
        name: "Sponsor Interest",
      },
      {
        name: "Adverts Interest",
      },
    ],
  },
];

export const genre = [
  { genre: "Rock", image: rock },
  { genre: "Jazz", image: jazz },
  { genre: "Blues", image: blues },
  { genre: "Pop", image: pop },
  { genre: "Urban", image: urban },
  { genre: "Acoustic", image: Acoustic },
  { genre: "Raggae", image: raggae },
  { genre: "Country", image: country },
  { genre: "Metal", image: metal },
  { genre: "Dance", image: dance },
];
