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

const BandTableData = ({
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

  // const getAllUserBandData = async () => {
  //   try {
  //     const res = await api.get("/api/v1/band");
  //     const resultData = res.data.length;
  //     console.log(res.data);

  //     let approvedCount = 0;

  //     const formattedData = res.data.map((band) => {
  //       if (band.is_verified) {
  //         approvedCount += 1;
  //       }

  //       return {
  //         ID: band.id,
  //         image: band.image1 ? Url + "/" + band.image1 : "",
  //         venueOrBandName: band.name || "",
  //         genreOrType: band.genre_type || "",
  //         socials: [website, facebook, instagram, youtube],
  //         changeStatus: ["Approve", "Pending", "Inactive"],
  //         email: band.email || "",
  //         date: band.venue_date
  //           ? dayjs(band.venue_date).format("DD MMM YYYY")
  //           : "",
  //         status: band.is_verified ? "Approved" : "Pending",
  //       };
  //     });

  //     setTotalApprove(approvedCount);
  //     setTotalData(resultData);
  //     setLocationPageData(formattedData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  console.log(item, data);

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

  console.log(settingsModal);
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
          {item.homepage === "" ? (
            ""
          ) : (
            <a href={item.homepage} target="_blank">
              <img src={website} />
            </a>
          )}

          {item.facebook === "" ? (
            ""
          ) : (
            <a href={item.facebook} target="_blank">
              <img src={facebook} />
            </a>
          )}

          {item.youtube === "" ? (
            ""
          ) : (
            <a href={item.youtube} target="_blank">
              <img src={youtube} />
            </a>
          )}

          {item.instagram == "" ? (
            ""
          ) : (
            <a href={item.instagram} target="_blank">
              <img src={instagram} />
            </a>
          )}
        </div>
      </td>

      <td className={`${styles.tdStyle}`}>
        <p>{item.email}</p>
      </td>
      <td className={`${styles.tdStyle}`}>
        <p>{item.date}</p>
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
            <Settings />
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
        <Modal>
          <ConfirmDelete
            confirmDelete={confirmDelete}
            cancelDelete={cancelDelete}
          />
        </Modal>
      )}

      {settingsModal && (
        <Modal modalHandler={settingsHandler}>
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
      )}
    </>
  );
};

export default BandTableData;
