import React, { useEffect, useState } from "react";
import SelectGenre from "../SVGcomponent/SelectGenre";
// import { genre } from "../../data/data";
import styles from "./Genre.module.css";
import { api, Url } from "@/services/api.route";
import { Link } from "react-router-dom";

const Genre = ({ link, handleGenre, setSelectedGenre }) => {
  const [genre, setGenre] = useState([]);
  const [genreFiltered, setGenreFiltered] = useState([]);

  useEffect(() => {
    const getAlluserVenue = async () => {
      try {
        const res = await api.get("/api/v1/genre");
        const totalGenreApproved = res.data;

        // Custom sort order
        const sortOrder = [
          "Rock",
          "Country",
          "Jazz",
          "Blues",
          "Pop",
          "Acoustic",
          "Metal",
          "Dance",
          "Raggae",
          "Urban",
        ];

        // Sort the data based on the custom order
        totalGenreApproved.sort((a, b) => {
          const indexA = sortOrder.indexOf(a.name);
          const indexB = sortOrder.indexOf(b.name);

          // If the name is not in the sortOrder array, place it at the end
          return (
            (indexA === -1 ? sortOrder.length : indexA) -
            (indexB === -1 ? sortOrder.length : indexB)
          );
        });

        const filteredData = totalGenreApproved.filter(
          (item) => item.is_admin_approved === true
        );
        console.log(totalGenreApproved);
        console.log(filteredData);
        setGenre(filteredData);
      } catch (error) {
        console.error("Error occur when getting the user venue:", error);
        setGenre([]);
        // toast.error(error || "An unexpected error occurred");
      }
    };
    getAlluserVenue();
  }, []);
  console.log(genre);

  const handleSelect = (data) => {
    handleGenre([data]);
    if (setSelectedGenre) setSelectedGenre([data]);
  };

  return (
    <div className={`${styles.genre}`}>
      {genre.map((list) => (
        <>
          {link ? (
            <Link to={`/venues?query=${list.name}`}>
              <div key={list.id} className="flex flex-col  items-center">
                <img src={`${Url}/${list.image}`} className={styles.image} />
                <h1 className="text-[0.7rem] font-[400] text-[#0A225980]">
                  {list.name}
                </h1>
              </div>
            </Link>
          ) : (
            <div
              key={list}
              className="flex flex-col  items-center"
              onClick={() => handleSelect(list)}
            >
              <img src={`${Url}/${list.image}`} className={styles.image} />
              <h1 className="text-[0.7rem] font-[400] text-[#0A225980]">
                {list.name}
              </h1>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default Genre;
