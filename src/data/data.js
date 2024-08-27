import {
  Acoustic,
  adImg,
  ads,
  band1,
  band2,
  band3,
  band4,
  band5,
  Bands,
  blues,
  country,
  dance,
  facebook,
  fans,
  genreImg,
  instagram,
  jazz,
  metal,
  musicians,
  pop,
  raggae,
  rock,
  urban,
  venue,
  venueImg,
  website,
} from "../assets";
import { v4 as uuidv4 } from "uuid";

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

export const dashboardSummary = [
  {
    name: "Bands",
    numbers: 2000,
    image: Bands,
    status: [
      { state: "active", number: 1200, colorID: "active" },
      { state: "Pending", number: 460, colorID: "pending" },
      { state: "inactive", number: 340, colorID: "inactive" },
    ],
    colorID: "band",
    buttonText: "Add Band +",
  },
  {
    name: "Venue",
    numbers: 200,
    image: venueImg,
    status: [
      { state: "active", number: 1200, colorID: "active" },
      { state: "Pending", number: 460, colorID: "pending" },
      { state: "inactive", number: 340, colorID: "inactive" },
    ],
    colorID: "venue",
    buttonText: "Add Venue +",
  },
  {
    name: "Genre",
    numbers: 200,
    image: genreImg,
    status: [
      { state: "active", number: 1200, colorID: "active" },
      { state: "Pending", number: 460, colorID: "pending" },
      { state: "inactive", number: 340, colorID: "inactive" },
    ],
    colorID: "genre",
    buttonText: "Add Genre +",
  },
  {
    name: "Advertisment",
    numbers: 5,
    image: ads,
    status: [
      { state: "active", number: 1200, colorID: "active" },
      { state: "Pending", number: 460, colorID: "pending" },
      { state: "inactive", number: 340, colorID: "inactive" },
    ],
    colorID: "band",
    buttonText: "Add Ads +",
  },
  {
    name: "Venue Type",
    numbers: 30,
    image: venueImg,
    status: [
      { state: "active", number: 1200, colorID: "active" },
      { state: "Pending", number: 460, colorID: "pending" },
      { state: "inactive", number: 340, colorID: "inactive" },
    ],
    colorID: "venue",
    buttonText: "Add Venue +",
  },
];

export const venueLocationData = [
  { status: "Total", numbers: 2000, colorID: "total" },
  { status: "Approve", numbers: 2000, colorID: "approve" },
  { status: "Pending", numbers: 2000, colorID: "pending" },
  { status: "Inactive", numbers: 2000, colorID: "inactive" },
];

export const venueTypeData = [
  { status: "Total", numbers: 2000, colorID: "total" },
  { status: "Approve", numbers: 2000, colorID: "approve" },
  { status: "Inactive", numbers: 2000, colorID: "inactive" },
];

/************  BAND TABLE DATA  *************/
export const bandPageData = {
  statusData: [
    { status: "Total", numbers: 2000, colorID: "total" },
    { status: "Approve", numbers: 2000, colorID: "approve" },
    { status: "Pending", numbers: 2000, colorID: "pending" },
    { status: "Inactive", numbers: 2000, colorID: "inactive" },
  ],
  status: ["All", "Approved", "Pending", "Inactive"],
  tableHead: [
    "ID",
    "Band name/Genre",
    "Socials",
    "Email",
    "Date",
    "Status",
    "Actions",
  ],
  tableOrCardData: [
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Pending",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Pending",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Pending",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Pending",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Pending",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Pending",
    },
    {
      ID: uuidv4(),
      image: "",
      bandName: "Demi3D Bands",
      genre: "Blues",
      socials: ["wb", "fb", "ig", "x"],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      actions: ["Set", "Del", "Details"],
      status: "Inactive",
    },
  ],
  numberOfItem: 5,
};

/************  GENRE TABLE DATA  *************/
export const genrePageData = {
  statusData: [
    { status: "Total", numbers: 2000, colorID: "total" },
    { status: "Approve", numbers: 2000, colorID: "approve" },
    { status: "Inactive", numbers: 2000, colorID: "inactive" },
  ],

  status: ["All", "Approved", "Inactive"],

  tableOrCardData: [
    {
      ID: uuidv4(),
      status: "Approve",
      genre: "Rock",
      image: rock,
    },

    {
      ID: uuidv4(),
      status: "Inactive",
      genre: "Jazz",
      image: jazz,
    },
    {
      ID: uuidv4(),
      status: "Approve",
      genre: "Blues",
      image: blues,
    },
    {
      ID: uuidv4(),
      status: "Inactive",
      genre: "Pop",
      image: pop,
    },
    {
      ID: uuidv4(),
      status: "Approve",
      genre: "Urban",
      image: urban,
    },
    {
      ID: uuidv4(),
      status: "Approve",
      genre: "Acoustic",
      image: Acoustic,
    },
    {
      ID: uuidv4(),
      status: "Inactive",
      genre: "Raggae",
      image: raggae,
    },
    {
      ID: uuidv4(),
      status: "Approve",
      genre: "Country",
      image: country,
    },
    {
      ID: uuidv4(),
      status: "Inactive",
      genre: "Metal",
      image: metal,
    },
    {
      ID: uuidv4(),
      status: "Inactive",
      genre: "Dance",
      image: dance,
    },
  ],
  numberOfItem: 12,
  size: "genre",
};

/************  ADS TABLE DATA  *************/
export const adsPageData = {
  statusData: [
    { status: "Total", numbers: 2000, colorID: "total" },
    { status: "Approve", numbers: 2000, colorID: "approve" },
    { status: "Inactive", numbers: 2000, colorID: "inactive" },
  ],

  status: ["All", "Approved", "Inactive"],

  tableOrCardData: [
    {
      ID: uuidv4(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: uuidv4(),
      image: adImg,
      status: "Inactive",
    },
  ],
  numberOfItem: 12,
  size: "ads",
};

export const emailPageData =[
  
]