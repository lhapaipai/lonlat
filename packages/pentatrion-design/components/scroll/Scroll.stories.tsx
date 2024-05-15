import { Scroll } from "~design";

export default {
  component: Scroll,
  title: "Components/Scroll",
};

export const Basic = () => {
  return (
    <div className="flex flex-col gap-2">
      <Scroll className="border border-gray-2" style={{ height: "160px", width: "400px" }}>
        <div className="px-4 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
            rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
            Deleniti iure amet qui vero, blanditiis quos?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
            rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
            Deleniti iure amet qui vero, blanditiis quos?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
            rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
            Deleniti iure amet qui vero, blanditiis quos?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
            rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
            Deleniti iure amet qui vero, blanditiis quos?
          </p>
        </div>
      </Scroll>
      <Scroll horizontal className="border border-gray-2">
        <div className="p-4 flex flex-nowrap">
          <p className="pr-7" style={{ minWidth: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
            rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
            Deleniti iure amet qui vero, blanditiis quos?
          </p>
          <p className="pr-7" style={{ minWidth: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
            rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
            Deleniti iure amet qui vero, blanditiis quos?
          </p>
          <p className="pr-7" style={{ minWidth: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
            rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
            Deleniti iure amet qui vero, blanditiis quos?
          </p>
          <p className="pr-7" style={{ minWidth: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
            rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
            Deleniti iure amet qui vero, blanditiis quos?
          </p>
          <p className="pr-7" style={{ minWidth: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
            rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
            Deleniti iure amet qui vero, blanditiis quos?
          </p>
          <p className="pr-7" style={{ minWidth: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
            rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
            Deleniti iure amet qui vero, blanditiis quos?
          </p>
          <p className="pr-7" style={{ minWidth: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
            rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
            Deleniti iure amet qui vero, blanditiis quos?
          </p>
          <p style={{ minWidth: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
            rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
            Deleniti iure amet qui vero, blanditiis quos?
          </p>
        </div>
      </Scroll>
    </div>
  );
};
