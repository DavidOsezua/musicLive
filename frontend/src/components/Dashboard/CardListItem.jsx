/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Switch from "../general/Switch";
import Delete from "../SVGcomponent/Delete";
import styles from "./CardListItem.module.css";
import { api } from "../../services/api.route";
import { useModal } from "../../App";
import Modal from "../general/Modal";
import ConfirmDelete from "../general/ConfirmDelete";

const CardListItem = ({ item, updateItemStatus, handleDelete }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  console.log(item);

  const deleteHandler = () => {
    setDeleteModal(true);
  };

  const cancelDelete = () => {
    setDeleteModal(false);
  };

  const confirmDelete = () => {
    handleDelete(item.ID);
    setDeleteModal(false);
  };
  const [isToggled, setIsToggled] = useState(false);
  const [status, setStatus] = useState(item.status);
  const handleToggle = async () => {
    setIsToggled(!isToggled);

    if (!isToggled) {
      updateItemStatus(item.genreOrType, "Approved", item.ID);
      setStatus("Approved");
    } else {
      updateItemStatus(item.genreOrType, "Inactive", item.ID);
      setStatus("Inactive");
    }
  };

  return (
    <div key={item.ID} className={styles.cardContainer}>
      <div className="flex justify-between">
        <p
          className={` ${
            status === "Inactive" ? "text-[#FF1316] " : "text-[#27993A]"
          }`}
        >
          {status}
        </p>
        <Switch
          isToggled={isToggled}
          handleToggle={handleToggle}
          status={status}
        />
      </div>

      <div className="flex justify-center w-full">
        <img src={item.image} className="" />
      </div>

      <p className="text-center">{item.genreOrType}</p>

      <button className={styles.delete} onClick={deleteHandler}>
        <Delete />
      </button>

      {deleteModal && (
        <Modal>
          <ConfirmDelete
            confirmDelete={confirmDelete}
            cancelDelete={cancelDelete}
          />
        </Modal>
      )}
    </div>
  );
};

export default CardListItem;
