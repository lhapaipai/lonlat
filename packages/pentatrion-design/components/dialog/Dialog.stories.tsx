import { Meta } from "@storybook/react";

const meta = {
  title: "Components/Dialog",
} satisfies Meta;
export default meta;

export const Basic = () => {
  return (
    <div className="flex gap-8 flex-column">
      <div>
        <div className="ll-dialog">
          <div className="description">coucou</div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog placement-top border-color-info"
          data-status="open"
          role="tooltip"
          style={{ width: 300 }}
        >
          <div className="description">infos</div>
          <div style={{ left: "18px" }} className="arrow"></div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog placement-bottom border-color-info"
          data-status="open"
          role="tooltip"
          style={{ width: 300 }}
        >
          <div className="description">infos</div>
          <div style={{ left: "18px" }} className="arrow"></div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog placement-left border-color-info"
          data-status="open"
          role="tooltip"
          style={{ width: 300 }}
        >
          <div className="description">infos</div>
          <div style={{ top: "18px" }} className="arrow"></div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog placement-right border-color-info"
          data-status="open"
          role="tooltip"
          style={{ width: 300 }}
        >
          <div className="description">infos</div>
          <div style={{ top: "18px" }} className="arrow"></div>
        </div>
      </div>

      <div>
        <div
          className="ll-dialog placement-top border-color-info"
          data-status="open"
          role="tooltip"
          style={{ width: 300 }}
        >
          <div className="bar-buttons">
            <button
              className="ll-button icon variant-ghost-weak button-weak variant-ghost"
              aria-busy="false"
              data-tabindex=""
            >
              <i className="fe-cancel"></i>
            </button>
          </div>

          <div className="description">infos</div>
          <div style={{ left: "18px", bottom: "-8px" }} className="arrow"></div>
        </div>
      </div>

      <div>
        <div
          className="ll-dialog placement-top border-color-primary"
          style={{ width: 300 }}
          data-status="open"
          role="dialog"
        >
          <div className="bar-buttons">
            <button
              className="ll-button icon variant-ghost-weak button-weak variant-ghost"
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
          <div style={{ left: "18px", bottom: "-8px" }} className="arrow"></div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog placement-top border-color-primary"
          style={{ width: 300 }}
          data-status="open"
          role="dialog"
        >
          <div className="bar-buttons">
            <button
              className="ll-button icon variant-ghost-weak button-weak variant-ghost"
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
                className="ll-button variant-outline-weak button-weak variant-outline"
                aria-busy="false"
                data-tabindex=""
              >
                Annuler
              </button>
              <button
                className="ll-button variant-solid-primary button-primary variant-solid"
                aria-busy="false"
                data-tabindex=""
              >
                Valider
              </button>
            </div>
          </footer>
          <div style={{ left: "18px", bottom: "-8px" }} className="arrow"></div>
        </div>
      </div>
    </div>
  );
};
