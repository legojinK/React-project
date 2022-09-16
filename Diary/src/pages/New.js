import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `My diary - new diary `;
  }, []);
  return (
    <div>
      <DiaryEditor isEdit={undefined} originData={undefined} />
    </div>
  );
};

export default New;
