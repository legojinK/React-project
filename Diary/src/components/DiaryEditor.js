// @ts-nocheck
import { useNavigate } from "react-router-dom";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DiaryDispatchContext } from "./../App.js";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { emotionList } from "../util/emotion";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));
  const navigate = useNavigate();

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit
          ? "Do you want to edit your diary ? "
          : "Do you want to register your diary?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("Do you want to delete this diary?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "E d i t  D i a r y" : "N e w  D i a r y "}
        leftChild={<MyButton text={"<"} onClick={() => navigate(-1)} />}
        rightChild={
          isEdit && (
            <MyButton text={"Del"} type={"negative"} onClick={handleRemove} />
          )
        }
      />
      <div>
        <section>
          <h4>Date</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>emotion</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              // <div key={it.emotion_id}>{it.emotion_descript}</div>
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>Diary</h4>
          <div className="input_box text_wrapper">
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"How was your day ?"}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton
              text={"Cancel"}
              onClick={() => {
                navigate(-1);
              }}
            />
            <MyButton
              text={"Submit"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
