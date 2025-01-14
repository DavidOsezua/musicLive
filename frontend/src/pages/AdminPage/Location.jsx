import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import { useModal } from "@/App";

import Modal from "../../components/general/Modal";
import AddLocation from "../../components/Dashboard/AddLocation";
import useVenues from "@/CustomHooks/useVenues";

const Location = () => {
  const {
    getuserVenueData,
    setLocationPageData,
    setTotalData,
    setTotalApprove,
    settrackVenueChanges,
    setVenueShowResultModal,
    modal,
    allModalHandlerVenue,
    modalHandler,
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
          <AddLocation allModalHandlerVenue={allModalHandlerVenue} />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default Location;
