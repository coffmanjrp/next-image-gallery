import { CgSpinnerTwoAlt } from 'react-icons/cg';

const Spinner = () => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-black/[.5]">
      <CgSpinnerTwoAlt className="text-primary text-8xl animate-spin" />
    </div>
  );
};

export default Spinner;
