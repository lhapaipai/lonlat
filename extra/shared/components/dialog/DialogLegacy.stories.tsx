import { Meta } from "@storybook/react";

const meta = {
  title: "Components/DialogLegacy",
} satisfies Meta;
export default meta;

export const Basic = () => {
  return (
    <div className="flex gap-8 flex-column">
      <div>
        <div className="ll-dialog">
          <div className="box">
            <div className="description">coucou</div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog placement-top type-info"
          data-status="open"
          role="tooltip"
          style={{ width: 300 }}
        >
          <div className="box">
            <div className="description">infos</div>
          </div>
          <div style={{ left: "18px", bottom: "-8px" }} className="arrow-double"></div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog placement-top type-info"
          data-status="open"
          role="tooltip"
          style={{ width: 300 }}
        >
          <div className="box">
            <div className="description">infos</div>
            <div style={{ left: "18px", bottom: "-6px" }} className="ll-arrow"></div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog placement-top type-info"
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
          className="ll-dialog placement-bottom type-info"
          data-status="open"
          role="tooltip"
          style={{ width: 300 }}
        >
          <div className="box">
            <div className="description">infos</div>
          </div>
          <div style={{ left: "18px", top: "-6px" }} className="arrow arrow-bg"></div>
          <div style={{ left: "18px", top: "-6px" }} className="arrow arrow-shadow"></div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog placement-left type-info"
          data-status="open"
          role="tooltip"
          style={{ width: 300 }}
        >
          <div className="box">
            <div className="description">infos</div>
          </div>
          <div style={{ top: "18px", right: "-6px" }} className="arrow arrow-bg"></div>
          <div style={{ top: "18px", right: "-6px" }} className="arrow arrow-shadow"></div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog placement-right type-info"
          data-status="open"
          role="tooltip"
          style={{ width: 300 }}
        >
          <div className="box">
            <div className="description">infos</div>
          </div>
          <div style={{ top: "18px", left: "-6px" }} className="arrow arrow-bg"></div>
          <div style={{ top: "18px", left: "-6px" }} className="arrow arrow-shadow"></div>
        </div>
      </div>

      <div>
        <div
          className="ll-dialog placement-top type-info"
          data-status="open"
          role="tooltip"
          style={{ width: 300 }}
        >
          <div className="box">
            <div className="bar-buttons">
              <button
                className="ll-button icon shape-ghost-weak button-weak shape-ghost"
                aria-busy="false"
                data-tabindex=""
              >
                <i className="fe-cancel"></i>
              </button>
            </div>

            <div className="description">infos</div>
          </div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-bg"></div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-shadow"></div>
        </div>
      </div>

      <div>
        <div
          className="ll-dialog placement-top type-primary"
          style={{ width: 300 }}
          data-status="open"
          role="dialog"
        >
          <div className="box">
            <div className="bar-buttons">
              <button
                className="ll-button icon shape-ghost-weak button-weak shape-ghost"
                aria-busy="false"
                data-tabindex=""
              >
                <i className="fe-cancel"></i>
              </button>
            </div>
            <header className="header">
              <h4>Heading</h4>
            </header>
            <div className="description">description</div>
          </div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-bg"></div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-shadow"></div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog placement-top type-primary"
          style={{ width: 300 }}
          data-status="open"
          role="dialog"
        >
          <div className="box">
            <div className="bar-buttons">
              <button
                className="ll-button icon shape-ghost-weak button-weak shape-ghost"
                aria-busy="false"
                data-tabindex=""
              >
                <i className="fe-cancel"></i>
              </button>
            </div>
            <header className="header">
              <h4>Heading</h4>
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
