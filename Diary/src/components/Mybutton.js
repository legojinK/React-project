const MyButton = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button // 클래스네임은 문자열이어야 하므로 string처리를 위한 .join.
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

// type Props 전달되지 않을 경우 default 설정
MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
