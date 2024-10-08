import React from "react";
import UploadForm from "../general/UploadForm";
import UploadForm2 from "../general/UploadForm2";

const AddGenre = () => {
  const { modal, modalHandler } = useModal() || {};
  const [message, setMessage] = useState();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });
  return <UploadForm2 />;
};

export default AddGenre;
