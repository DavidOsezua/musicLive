import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import Modal from "../../components/general/Modal";
import AddLocation from "../../components/Dashboard/AddLocation";
import useVenues from "@/CustomHooks/useVenues";

const Location = () => {
  const {
    modal,
    modalHandler,
    getuserVenueData,
    setLocationPageData,
    allModalHandlerVenue,
    setTotalData,
    setTotalApprove,
    settrackVenueChanges,
    setVenueShowResultModal,
    venueShowResultModal,
  } = useVenues();

  return (
    <section className={`adminSection pageContainer transition`}>
      <TitleAndStatus
        title={`Venue Location`}
        buttonText={`Add Location`}
        modalHandler={modalHandler}
        data={getuserVenueData}
      />

      <TablesAndCards
        pageData={getuserVenueData}
        pageType={`venue`}
        columnCount={8}
        setUserData={setLocationPageData}
        setTotalData={setTotalData}
        setTotalApprove={setTotalApprove}
        settrackChanges={settrackVenueChanges}
        from={`venue`}
      />
      {modal ? (
        <Modal modalHandler={allModalHandlerVenue}>
          <AddLocation
            cancel={allModalHandlerVenue}
            setShowResultModal={setVenueShowResultModal}
            ShowResultModal={venueShowResultModal}
            settrackChanges={settrackVenueChanges}
          />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default Location;
