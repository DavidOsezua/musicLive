import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import Settings from "../SVGcomponent/Settings";
import Delete from "../SVGcomponent/Delete";
import Preview from "../SVGcomponent/Preview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfirmDelete from "../general/ConfirmDelete";
import { useModal } from "@/App";
import Modal from "../general/Modal";
import { facebook, instagram, website, youtube } from "@/assets";
import { api } from "@/services/api.route";
import PreviewEvent from "./PreviewEvent";
import EditEvent from "./EditEvent";
import Edit from "../SVGcomponent/Edit";

const EventTable = ({
  item,
  data,
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

  const settingsHandler = () => {
    setSettingsModal(!settingsModal);
  };
  const previewHandler = () => setPreviewModal(!previewModal);
  const { modal, modalHandler } = useModal() || {};

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

  console.log(data);
  return (
    <>
      <td className={`${styles.tdStyle}`}>{rowNumber + index + 1}</td>

      <td className={`${styles.tdStyle}`}>
        <div className="flex gap-3 items-center">
          <img
            src={item.image}
            className={`w-[40px] h-[40px] object-cover rounded-md`}
          />
          <div>
            <h2>{item.venueName}</h2>
            <span>{item.type}</span>
          </div>
        </div>
      </td>
      <td className={`${styles.tdStyle}`}>
        <div className="flex gap-3 items-center">
          <img
            src={item.image}
            className={`w-[40px] h-[40px] object-cover rounded-md`}
          />
          <div>
            <h2>{item.bandName}</h2>
            <span>{item.genre}</span>
          </div>
        </div>
      </td>

      <td className={`${styles.tdStyle}`}>
        <p>{item.date}</p>
      </td>
      <td className={`${styles.tdStyle}`}>
        <p>{item.time}</p>
      </td>

      <td className={`${styles.tdStyle}`}>
        <Select
          onValueChange={(value) => handleSelectChange(value, item, "band")}
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
          <button onClick={settingsHandler}>
            <Edit />
          </button>
          <button onClick={deleteHandler}>
            <Delete />
          </button>
          <button onClick={previewHandler}>
            <Preview />
          </button>
        </div>
      </td>
      {deleteModal && (
        <Modal modalHandler={cancelDelete}>
          <ConfirmDelete
            confirmDelete={confirmDelete}
            cancelDelete={cancelDelete}
            message={<p>Are you sure you want to delete</p>}
          />
        </Modal>
      )}

      {settingsModal && (
        <Modal modalHandler={settingsHandler}>
          <EditEvent item={item} cancel={settingsHandler} />
        </Modal>
      )}

      {previewModal && (
        <Modal modalHandler={previewHandler}>
          <PreviewEvent item={item} modalHandler={previewHandler} />
        </Modal>
      )}
    </>
  );
};

export default EventTable;
