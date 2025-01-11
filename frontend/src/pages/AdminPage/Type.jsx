import React from "react";
// import { typePageData } from "../../data/data";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import Modal from "../../components/general/Modal";
import AddType from "../../components/Dashboard/AddType";
import useType from "@/CustomHooks/useType";

const Type = () => {
  const {
    modalHandler,
    venueFormData,
    settypePageData,
    settrackTypeChanges,
    setTotalData,
    setTotalApprove,
    allTypeModalHandler,
    setTypeShowResultModal,
    TypeShowResultModal,
    getAllVenueTypeData,
    modal,
  } = useType();

  return (
    <section className={` adminSection pageContainer transition`}>
      <TitleAndStatus
        title={`Venue Type`}
        buttonText={`Add Type`}
        modalHandler={modalHandler}
        data={venueFormData}
      />

      <TablesAndCards
        pageData={venueFormData}
        pageType={`cardList`}
        musicType="venueType"
        from={`Type`}
        setUserData={settypePageData}
        settrackChanges={settrackTypeChanges}
        setTotalData={setTotalData}
        setTotalApprove={setTotalApprove}
      />
      {modal ? (
        <Modal modalHandler={allTypeModalHandler} component={""}>
          <AddType
            cancel={allTypeModalHandler}
            setShowResultModal={setTypeShowResultModal}
            showResultModal={TypeShowResultModal}
            getAllVenueTypeData={getAllVenueTypeData}
          />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default Type;
