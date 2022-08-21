import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
const Home = () => {
  return (
    <div>
      <MyHeader
      
        leftChild={<MyButton text={"<"} onClick={} />}
        rightChild={<MyButton text={">"} onClick={} />}
      />
      <h1>Header</h1>
    </div>
  );
};
export default Home;
