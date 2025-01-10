import React, { useEffect, useState } from "react";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import Modal from "../../components/general/Modal";
import AddLocation from "../../components/Dashboard/AddLocation";
import { api, Url } from "../../services/api.route";
import dayjs from "dayjs";
import { useModal } from "../../App";
import EventForm from "@/components/VenueBrand/EventForm";

const Event = () => {
  const [eventPageData, seteventPageData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalApprove, setTotalApprove] = useState(0);
  // const [pending, setpending] = useState(0)
  const [trackChanges, settrackChanges] = useState(false);
  const { modal, modalHandler } = useModal() || {};
  const [showModal, setShowModal] = useState(false);
  const getAllEventData = async () => {
    try {
      const res = await api.get("/api/v1/events/all");
      const resultData = res.data.length;
      let approvedCount = 0;

      const formattedData = res.data.map((event) => {
        console.log(event);
        if (event.status == "approved") {
          approvedCount += 1;
        }
        return {
          ID: event.id,
          name : event.name,
          image: event.venue.image1 ? Url + "/" + event.venue.image1 : "",
          venueName: event.venue.name || "",
          bandName: event.band.name || "",
          type: event.venue.venue_type || "",
          genre: event.band.genre_type || "",
          changeStatus: ["Approve", "Pending", "Inactive"],
          address: event.venue.address || "",
          email: event.venue.email || "",
          date: dayjs(event.date).format("DD MMM YYYY") || "",
          time: dayjs(event.time, "HH:mm:ss").format("h:mm A") || "",
          status: event.status.charAt(0).toUpperCase() + event.status.slice(1),
        };
      });
      setTotalData(resultData);
      setTotalApprove(approvedCount);
      seteventPageData(formattedData);
      // setpending(totalBand - totalApprove)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllEventData();
    console.log("Updated eventPageData", eventPageData);
  }, [totalData, trackChanges]);

  let pending = totalData - totalApprove;

  const eventData = {
    statusData: [
      { status: "Total", numbers: totalData, colorID: "total" },
      { status: "Approve", numbers: totalApprove, colorID: "approve" },
      { status: "Pending", numbers: pending, colorID: "pending" },
      // { status: "Inactive", numbers: 0, colorID: "inactive" },
    ],
    status: ["All", "Approved", "Pending", "Inactive"],
    tableHead: ["ID", "Venue", "Band", "Date", "Time", "Status", "Actions"],

    tableOrCardData: eventPageData,
    numberOfItem: 10,
  };

  const allModalHandler = () => {
    modalHandler();
    setShowModal((prev) => !prev);
  };

  return (
    <section className={`adminSection pageContainer transition`}>
      <TitleAndStatus
        title={`Event`}
        buttonText={`Create Event`}
        modalHandler={modalHandler}
        data={eventData}
      />

      <TablesAndCards
        pageData={eventData}
        pageType={`venue`}
        columnCount={9}
        setUserData={seteventPageData}
        setTotalData={setTotalData}
        setTotalApprove={setTotalApprove}
        settrackChanges={settrackChanges}
        // setpending = {setpending}
        from={`event`}
      />
      {modal ? (
        <Modal modalHandler={allModalHandler}>
          <EventForm
            cancel={allModalHandler}
            getAllEventData={getAllEventData}
            setShowModal={setShowModal}
            showModal={showModal}
          />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default Event;
