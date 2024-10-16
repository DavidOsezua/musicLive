import React, { useEffect, useState } from "react";
import styles from "./Advert.module.css";
import { Url, api } from "@/services/api.route";

const AdvertItem = () => {
  const [adsImage, setAdsImage] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllAdsImage = async () => {
    try {
      const adsData = await api.get("/api/v1/ads/admin_approved");
      console.log(adsData.data);
      setAdsImage(adsData.data);
    } catch (e) {
      console.error(e);
      setError("Error fetching ads. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAdsImage();
  }, []);

  return (
    <div className={`flex mx-auto gap-2`}>
      {loading && <p>Loading ads...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {adsImage.map((ads) => (
        <img
          key={ads.id}
          src={Url + "/" + ads.image}
          alt="Advertisement"
          className={` mx-auto w-[400px] h-[112px] object-cover`}
        />
      ))}
    </div>
  );
};

const Advert = () => {
  return (
    <div className={`${styles.check}`}>
      <AdvertItem />
    </div>
  );
};

export default Advert;
