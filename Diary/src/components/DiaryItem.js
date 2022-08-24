import React from "react";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  return (
    <div className="DiaryItem">
      <div className={`emotion_img_wrapper_${emotion}`}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 35)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton text={"Edit"} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
