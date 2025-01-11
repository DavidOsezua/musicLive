/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./Table.module.css";
import Delete from "../SVGcomponent/Delete";
import Settings from "../SVGcomponent/Settings";
import Preview from "../SVGcomponent/Preview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModal } from "@/App";
import Modal from "../general/Modal";
import ConfirmDelete from "../general/ConfirmDelete";
import EditLocation from "./EditLocation";
import PreviewLocation from "./PreviewLocation";
import Edit from "../SVGcomponent/Edit";

const LocationTableData = ({
  item,
  rowNumber,
  index,
  handleDelete,
  handleSelectChange,
  getBackgroundColor,
  status,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);

  const settingsHandler = () => setSettingsModal(!settingsModal);
  const previewHandler = () => setPreviewModal(!previewModal);

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

  console.log(item);

  return (
    <>
      <td className={`${styles.tdStyle}`}>{rowNumber + index + 1}</td>

      <td className={`${styles.tdStyle}`}>
        <div className="flex gap-3 items-center">
          <img
            src={item.image}
            alt={`${item.venueOrBandName} image`}
            className={`w-[40px] h-[40px] object-cover rounded-md`}
          />
          <div>
            <h2>{item.venueOrBandName}</h2>
            <span>{item.genreOrType}</span>
          </div>
        </div>
      </td>

      <td className={`${styles.tdStyle}`}>
        <p>{item.address}</p>
      </td>
      <td className={`${styles.tdStyle}`}>
        <p>{item.email}</p>
      </td>
      <td className={`${styles.tdStyle}`}>
        <p>{item.date}</p>
      </td>
      <td className={`${styles.tdStyle}`}>
        <p>{item.time}</p>
      </td>

      <td className={`${styles.tdStyle} text-[#FF6665]`}>
        <Select
          onValueChange={(value) => handleSelectChange(value, item, "location")}
          className=""
        >
          <SelectTrigger className={`${getBackgroundColor()} p-2 rounded-md`}>
            <SelectValue placeholder={status} />
          </SelectTrigger>
          <SelectContent className="bg-[#E6ECF8]">
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            {/* <SelectItem value="Inactive">Inactive</SelectItem> */}
          </SelectContent>
        </Select>
      </td>

      <td className={`${styles.tdStyle} text-[#FF6665]`}>
        <div className="flex items-center gap-3">
          <button aria-label="Settings" onClick={settingsHandler}>
            <Edit />
          </button>
          <button onClick={deleteHandler} aria-label="Delete">
            <Delete />
          </button>
          <button aria-label="Preview" onClick={previewHandler}>
            <Preview />
          </button>
        </div>
      </td>

      {deleteModal && (
        <Modal>
          <ConfirmDelete
            confirmDelete={confirmDelete}
            cancelDelete={cancelDelete}
          />
        </Modal>
      )}

      {settingsModal && (
        <Modal modalHandler={settingsHandler}>
          <EditLocation item={item} cancel={settingsHandler} />
        </Modal>
      )}
      {previewModal && (
        <Modal modalHandler={previewHandler}>
          <PreviewLocation item={item} modalHandler={previewHandler} />
        </Modal>
      )}
    </>
  );
};

export default LocationTableData;
