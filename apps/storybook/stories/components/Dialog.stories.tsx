import { Meta } from "@storybook/react";

const meta = {
  title: "Components/Dialog",
} satisfies Meta;
export default meta;

export const Basic = () => {
  return (
    <div className="flex gap-4 flex-column">
      <div>
        <div className="ll-dialog">
          <div className="box">Coucou</div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog top type-info"
          data-status="open"
          id=":rt:"
          role="tooltip"
          style={{ width: 300 }}
        >
          <div className="box">infos</div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-bg"></div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-shadow"></div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog bottom type-default"
          style={{ width: 300 }}
          data-status="open"
          id=":rl:"
          role="dialog"
        >
          <div className="box">
            <header className="header">
              <h4>Heading</h4>
              <div className="actions">
                <button
                  className="ll-button icon shape-ghost-weak button-weak shape-ghost"
                  aria-busy="false"
                  data-tabindex=""
                >
                  <i className="fe-cancel"></i>
                </button>
              </div>
            </header>
            <div>description</div>
          </div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-bg"></div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-shadow"></div>
        </div>
      </div>
    </div>
  );
};
