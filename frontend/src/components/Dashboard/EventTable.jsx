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
import EditBand from "./EditBand";
import PreviexBand from "./PreviexBand";
import { facebook, instagram, website, youtube } from "@/assets";
import { api } from "@/services/api.route";

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
            <h2>{item.venueOrBandName}</h2>
            <span>{item.genreOrType}</span>
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
            <h2>{item.venueOrBandName}</h2>
            <span>{item.genreOrType}</span>
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
          <button onClick={() => {}}>
            <Settings />
          </button>
          <button onClick={() => {}}>
            <Delete />
          </button>
          <button onClick={() => {}}>
            <Preview />
          </button>
        </div>
      </td>
      {/* {deleteModal && (
        <Modal>
          <ConfirmDelete
            // confirmDelete={confirmDelete}
            // cancelDelete={cancelDelete}
          />
        </Modal>
      )} */}

      {/* {settingsModal && (
        <Modal modalHandler={()=>{}}>
          <EditBand
            item={item}
            data={data}
            setDeleteModal={settingsModal}
            getAllUserBandData={getAllUserBandData}
          />
        </Modal>
      )}

      {previewModal && (
        <Modal modalHandler={previewHandler}>
          <PreviexBand item={item} modalHandler={previewHandler} />
        </Modal>
      )} */}
    </>
  );
};

export default EventTable;
