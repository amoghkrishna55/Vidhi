import { LineWave } from "react-loader-spinner";

const GeneratingLoader = () => {
  return (
    <div>
      <LineWave
        visible={true}
        height="80"
        width="80"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        color="#FAD85D"
      />
    </div>
  );
};

export default GeneratingLoader;
