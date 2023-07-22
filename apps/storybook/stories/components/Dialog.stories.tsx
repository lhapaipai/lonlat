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
          <div className="box">
            <div className="description">coucou</div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog top type-info"
          data-status="open"
          role="tooltip"
          style={{ width: 300 }}
        >
          <div className="box">
            <div className="description">infos</div>
          </div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-bg"></div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-shadow"></div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog top type-primary"
          style={{ width: 300 }}
          data-status="open"
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
            <div className="description">description</div>
          </div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-bg"></div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-shadow"></div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog top type-primary"
          style={{ width: 300 }}
          data-status="open"
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
            <div className="description">description</div>
            <footer className="footer">
              <div className="actions">
                <button
                  className="ll-button shape-outline-weak button-weak shape-outline"
                  aria-busy="false"
                  data-tabindex=""
                >
                  Annuler
                </button>
                <button
                  className="ll-button shape-solid-primary button-primary shape-solid"
                  aria-busy="false"
                  data-tabindex=""
                >
                  Valider
                </button>
              </div>
            </footer>
          </div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-bg"></div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-shadow"></div>
        </div>
      </div>
    </div>
  );
};
