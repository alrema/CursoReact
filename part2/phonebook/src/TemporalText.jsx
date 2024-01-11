import { useEffect } from "react";

const TemporalText = ({ style, text, updateText }) => {
  useEffect(() => {
    setTimeout(() => {
      updateText("");
    }, 2000);
  }, [text]);

  if (text === "") {
    return null;
  }

  return <p style={style}>{text}</p>;
};

export default TemporalText;
