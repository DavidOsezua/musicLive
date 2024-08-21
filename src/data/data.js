import {
  Acoustic,
  band1,
  band2,
  band3,
  band4,
  band5,
  blues,
  country,
  dance,
  facebook,
  fans,
  instagram,
  jazz,
  metal,
  musicians,
  pop,
  raggae,
  rock,
  urban,
  venue,
  website,
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

export const sideBarLinks = [
  { link: "Dashboard", path: "dashboard" },
  { link: "Venues", path: "adminvenue" },
  { link: "Bands", path: "adminband" },
  { link: "Genre", path: "admingenre" },
  { link: "Ads", path: "ads" },
  { link: "Email Templates", path: "emailtemplates" },
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

export const about = [
  {
    title: "Musicians",
    image: musicians,
    content:
      "are amazing and have spent enormous amounts of time, energy, money, and effort to perfect their skills so the audience has the greatest experience. However, spending money on advertising is not practical for most artists.  So for musicians and bands, we make our site entirely free.",
  },
  {
    title: "Venues",
    image: venue,
    content:
      "We envision a world where live music is accessible to everyone, regardless of location or budget. Our website will empower users to explore and experience live band performances by offering a user-friendly, interactive map that showcases nearby venues and events at no cost. So for venues such as wineries, bars, restaurants, breweries, casinos, and seasonal outdoor events, we make our site entirely free. ",
  },
  {
    title: "Fans",
    image: fans,
    content:
      "will put great effort into finding and supporting venues and musicians they love.  As we said, “Music Makes People Happy”. (Insert small photo of frustrated fan?)  And of course, fans are happy to spend money at the venue and hopefully on big tips for the musicians.  So for fans we also make this site entirely free!",
  },
];

export const bands = [
  {
    image: band1,
    genre: "Blues",
    bandName: "Demi3D Bands",
    socials: [facebook, instagram, website],
  },
  {
    image: band2,
    genre: "Blues",
    bandName: "Demi3D Bands",
    socials: [facebook, instagram, website],
  },
  {
    image: band3,
    genre: "Blues",
    bandName: "Demi3D Bands",
    socials: [facebook, instagram, website],
  },
  {
    image: band4,
    genre: "Blues",
    bandName: "Demi3D Bands",
    socials: [facebook, instagram, website],
  },
  {
    image: band5,
    genre: "Blues",
    bandName: "Demi3D Bands",
    socials: [facebook, instagram, website],
  },
  {
    image: band4,
    genre: "Blues",
    bandName: "Demi3D Bands",
    socials: [facebook, instagram, website],
  },
  {
    image: band3,
    genre: "Blues",
    bandName: "Demi3D Bands",
    socials: [facebook, instagram, website],
  },
  {
    image: band5,
    genre: "Blues",
    bandName: "Demi3D Bands",
    socials: [facebook, instagram, website],
  },
];
