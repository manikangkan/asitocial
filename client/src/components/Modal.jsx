const data = ["Edit", "Delete", "Share", "Copy Link"];

const Modal = ({ isOpen }) => {
  return (
    <div
      className={`absolute right-0 bg-teal-800/80 backdrop-blur-md text-white py-4 w-48 z-50 flex flex-col items-center justify-center rounded-md overflow-hidden divide-y divide-teal-600 ${
        isOpen ? `block` : `hidden`
      }`}>
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="text-center w-full space-x-2 py-4 cursor-pointer hover:bg-white hover:text-teal-800">
            <p className="hover:font-medium">{item}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Modal;
