import {
  wine,
  restaurant,
  Bar,
  night,
  outdoorStage,
  brewery,
} from "../src/assets";

export const getVenueImage = (venueType) => {
  switch (venueType) {
    case "Winery":
      return wine;
    case "restaurant":
      return restaurant;
    case "Brewery":
      return brewery;
    case "Bar":
      return Bar;
    case "Night":
      return night;
    case "Outdoor":
      return outdoorStage;

    default:
      return wine;
  }
};
