export const LocationPin = ({ text, image }) => {
  console.log(text)
  
  return (<div className="pin">
    <img src={image || ''} className="pin-icon" alt="Venue icon" />
    <p className="pin-text">{text}</p>
  </div>)
};