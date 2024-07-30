const Message = ({ message, messageType }) => {
  let messageStyle;

  if (messageType === 1) {
    messageStyle = "text-red-500 p-2";
  } else {
    messageStyle = "text-green-300 p-2";
  }
  if (message) {
    return <p className={messageStyle}>{message}</p>;
  }
};

export { Message };
