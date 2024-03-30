import { Oval } from "react-loader-spinner";

const GeneratingLoader1 = () => {
  return (
    <div>
      <Oval
        visible={true}
        height="30"
        width="30"
        color="#FAD85D"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default GeneratingLoader1;
