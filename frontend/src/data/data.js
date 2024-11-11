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
  wine,
  concert,
  resturant,
  Bar,
  night,
  outdoorStage,
  brewery,
  youtube,
} from "../assets";
import Preview from "../components/SVGcomponent/Preview";
import Delete from "../components/SVGcomponent/Delete";
import Settings from "../components/SVGcomponent/Settings";
import { calculateSummary } from "./helper";

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
  {
    link: "Venues",
    path: "adminvenue",
    dropdownLink: [
      { link: "Location", path: "location" },
      { link: "Type", path: "type" },
    ],
  },
  { link: "Event", path: "adminevent" },
  { link: "Genre", path: "admingenre" },
  { link: "Bands", path: "adminband" },
  { link: "Ads", path: "ads" },
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

export const venueType = [
  {
    ID: crypto.randomUUID(),
    genreOrType: "Winery",
    image: wine,
  },
  {
    ID: crypto.randomUUID(),
    genreOrType: "Resturant",
    image: resturant,
  },
  {
    ID: crypto.randomUUID(),
    genreOrType: "Brewery",
    image: brewery,
  },
  {
    ID: crypto.randomUUID(),
    status: "Approved",
    genreOrType: "Bar",
    image: Bar,
  },
  {
    ID: crypto.randomUUID(),
    genreOrType: "Night",
    image: night,
  },
  {
    ID: crypto.randomUUID(),
    genreOrType: "Outdoor",
    image: outdoorStage,
  },
];

export const genre = [
  { ID: crypto.randomUUID(), genreOrType: "Rock", image: rock },
  { ID: crypto.randomUUID(), genreOrType: "Jazz", image: jazz },
  { ID: crypto.randomUUID(), genreOrType: "Blues", image: blues },
  { ID: crypto.randomUUID(), genreOrType: "Pop", image: pop },
  { ID: crypto.randomUUID(), genreOrType: "Urban", image: urban },
  { ID: crypto.randomUUID(), genreOrType: "Acoustic", image: Acoustic },
  { ID: crypto.randomUUID(), genreOrType: "Raggae", image: raggae },
  { ID: crypto.randomUUID(), genreOrType: "Country", image: country },
  { ID: crypto.randomUUID(), genreOrType: "Metal", image: metal },
  { ID: crypto.randomUUID(), genreOrType: "Dance", image: dance },
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
    date: "",
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
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Pending",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Pending",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Pending",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Pending",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Pending",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Pending",
    },
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Demi3D Bands",
      genreOrType: "Blues",
      socials: [website, facebook, instagram, youtube],
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Inactive",
    },
  ],
  numberOfItem: 5,
};
/************  LOCATION TABLE DATA  *************/
export const locationPageData = {
  statusData: [
    { status: "Total", numbers: 2000, colorID: "total" },
    { status: "Approve", numbers: 2000, colorID: "approve" },
    { status: "Pending", numbers: 2000, colorID: "pending" },
    { status: "Inactive", numbers: 2000, colorID: "inactive" },
  ],
  status: ["All", "Approved", "Pending", "Inactive"],
  tableHead: [
    "ID",
    "Venue name/Genre",
    "Address",
    "Email",
    "Date",
    "Time",
    "Status",
    "Actions",
  ],
  tableOrCardData: [
    {
      ID: crypto.randomUUID(),
      image: band1,
      venueOrBandName: "Transcorp Hilton",
      genreOrType: "Hotel",
      address: "2200 Harvard St, Sacramento, CA 95815",
      email: "band@findmelivemusic.com",
      date: "19 Aug 2024",
      changeStatus: ["Approve", "Pending", "Inactive"],
      status: "Approved",
      time: "9:00PM - UTC",
    },
  ],
  numberOfItem: 5,
};

/************  TYPE TABLE DATA  *************/
export const typePageData = {
  statusData: [
    { status: "Total", numbers: 2000, colorID: "total" },
    { status: "Approve", numbers: 2000, colorID: "approve" },
    { status: "Inactive", numbers: 2000, colorID: "inactive" },
  ],

  status: ["All", "Approved", "Inactive"],

  tableOrCardData: [
    {
      ID: crypto.randomUUID(),
      status: "Approved",
      genreOrType: "Winery",
      image: wine,
    },
    {
      ID: crypto.randomUUID(),
      status: "Inactive",
      genreOrType: "Resturant",
      image: resturant,
    },
    {
      ID: crypto.randomUUID(),
      status: "Inactive",
      genreOrType: "Brewery",
      image: brewery,
    },
    {
      ID: crypto.randomUUID(),
      status: "Approved",
      genreOrType: "Bar",
      image: Bar,
    },
    {
      ID: crypto.randomUUID(),
      status: "Approved",
      genreOrType: "Night club",
      image: night,
    },
    {
      ID: crypto.randomUUID(),
      status: "Approved",
      genreOrType: "Outdoor Stage",
      image: outdoorStage,
    },
  ],
  numberOfItem: 12,
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
      ID: crypto.randomUUID(),
      status: "Approved",
      genreOrType: "Rock",
      image: rock,
    },

    {
      ID: crypto.randomUUID(),
      status: "Inactive",
      genreOrType: "Jazz",
      image: jazz,
    },
    {
      ID: crypto.randomUUID(),
      status: "Approved",
      genreOrType: "Blues",
      image: blues,
    },
    {
      ID: crypto.randomUUID(),
      status: "Inactive",
      genreOrType: "Pop",
      image: pop,
    },
    {
      ID: crypto.randomUUID(),
      status: "Approved",
      genreOrType: "Urban",
      image: urban,
    },
    {
      ID: crypto.randomUUID(),
      status: "Approved",
      genreOrType: "Acoustic",
      image: Acoustic,
    },
    {
      ID: crypto.randomUUID(),
      status: "Inactive",
      genreOrType: "Raggae",
      image: raggae,
    },
    {
      ID: crypto.randomUUID(),
      status: "Approved",
      genreOrType: "Country",
      image: country,
    },
    {
      ID: crypto.randomUUID(),
      status: "Inactive",
      genreOrType: "Metal",
      image: metal,
    },
    {
      ID: crypto.randomUUID(),
      status: "Inactive",
      genreOrType: "Dance",
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
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Approved",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
    {
      ID: crypto.randomUUID(),
      image: adImg,
      status: "Inactive",
    },
  ],
  numberOfItem: 12,
  size: "ads",
};

export const emailPageData = [];

const bandSummary = calculateSummary(bandPageData.tableOrCardData);
const venueLocationSummary = calculateSummary(locationPageData.tableOrCardData);
const venueTypeSummary = calculateSummary(typePageData.tableOrCardData);
const adsSummary = calculateSummary(adsPageData.tableOrCardData);
const genreSummary = calculateSummary(genrePageData.tableOrCardData);
/************  BAND TABLE DATA  *************/
export const dashboardSummary = [
  {
    name: "Bands",
    ID: crypto.randomUUID(),
    path: "/admin/adminband",
    numbers: bandSummary.totalItems,
    image: Bands,
    status: [
      {
        state: "active",
        number: bandSummary.statusCount.Approved,
        colorID: "active",
      },
      {
        state: "Pending",
        number: bandSummary.statusCount.Pending,
        colorID: "pending",
      },
      {
        state: "inactive",
        number: bandSummary.statusCount.Inactive,
        colorID: "inactive",
      },
    ],
    colorID: "band",
    buttonText: "Add Band +",
  },
  {
    name: "Venue",
    ID: crypto.randomUUID(),
    path: "/admin/location",
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
    ID: crypto.randomUUID(),
    path: "/admin/admingenre",
    numbers: genreSummary.totalItems,
    image: genreImg,
    status: [
      {
        state: "active",
        number: genreSummary.statusCount.Approved,
        colorID: "active",
      },

      {
        state: "inactive",
        number: genreSummary.statusCount.Inactive,
        colorID: "inactive",
      },
    ],
    colorID: "genre",
    buttonText: "Add Genre +",
  },
  {
    name: "Advertisment",
    ID: crypto.randomUUID(),
    path: "/admin/ads",
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
    ID: crypto.randomUUID(),
    path: "/admin/type",
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
