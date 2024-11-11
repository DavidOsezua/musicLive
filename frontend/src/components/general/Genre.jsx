import React, { useEffect, useState } from "react";
import SelectGenre from "../SVGcomponent/SelectGenre";
// import { genre } from "../../data/data";
import styles from "./Genre.module.css";
import { api, Url } from "@/services/api.route";
import { Link } from "react-router-dom";

const Genre = () => {
  const [genre, setGenre] = useState([]);
  useEffect(() => {
    const getAlluserVenue = async () => {
      try {
        const res = await api.get("/api/v1/genre");
        const totalGenreApproved = res.data;

        const filteredData = totalGenreApproved.filter(
          (item) => item.is_admin_approved === true
        );
        console.log(totalGenreApproved);
        console.log(filteredData);
        setGenre(filteredData);
      } catch (error) {
        console.error("Error occur when getting the user venue:", error);
        setGenre([]);
        // toast.error(error|| "An unexpected error occurred");
      }
    };
    getAlluserVenue();
  }, []);
  console.log(genre);
  return (
    <div className={`${styles.genre}`}>
      {genre.map((list) => (
        <Link to={`/venues?query=${list.name}`} >
        <div key={list.id} className="flex flex-col  items-center">
          <img src={`${Url}/${list.image}`} className={styles.image} />
          <h1 className="text-[0.7rem] font-[400] text-[#0A225980]">
            {list.name}
          </h1>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default Genre;
