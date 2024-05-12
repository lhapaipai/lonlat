import { Meta } from "@storybook/react";

const meta = {
  title: "Components/Dialog",
} satisfies Meta;
export default meta;

export const Basic = () => {
  return (
    <div className="flex gap-8 flex-column mb-4">
      <div>
        <div className="ll-dialog">
          <div className="description">coucou</div>
        </div>
      </div>
      <div>
        <div
          className="ll-dialog placement-top border-color-blue"
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
          className="ll-dialog placement-bottom border-color-blue"
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
          className="ll-dialog placement-left border-color-blue"
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
          className="ll-dialog placement-right border-color-blue"
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
          className="ll-dialog placement-top border-color-blue"
          data-status="open"
          role="tooltip"
          style={{ width: 300 }}
        >
          <div className="bar-buttons">
            <button
              className="ll-button icon variant-ghost-gray button-gray variant-ghost"
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
          className="ll-dialog placement-top border-color-yellow"
          style={{ width: 300 }}
          data-status="open"
          role="dialog"
        >
          <div className="bar-buttons">
            <button
              className="ll-button icon variant-ghost-gray button-gray variant-ghost"
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
          className="ll-dialog placement-top border-color-yellow"
          style={{ width: 300 }}
          data-status="open"
          role="dialog"
        >
          <div className="bar-buttons">
            <button
              className="ll-button icon variant-ghost-gray button-gray variant-ghost"
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
                className="ll-button variant-outlined-gray button-gray variant-outlined"
                aria-busy="false"
                data-tabindex=""
              >
                Annuler
              </button>
              <button
                className="ll-button variant-solid-yellow button-yellow variant-solid"
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

export const Options = () => {
  return (
    <div className="flex gap-8 flex-column mb-4">
      <div>
        <div className="ll-dialog">
          <div className="option">Default state 1</div>
          <div className="option active">Active state 2 (keyboard navigation)</div>
          <div className="option">Default state 3</div>
          <div className="option selected">Selected state 4</div>
          <div className="option">Default state 5</div>
          <div className="option">Default state 6</div>
        </div>
      </div>

      <div>
        <div className="ll-dialog">
          <div className="option">
            <i className="fe-star"></i>
            <span className="content">Default state 1</span>
          </div>
          <div className="option">
            <i className="fe-marker"></i>
            <span className="content">State 2</span>
          </div>
        </div>
      </div>

      <div>
        <div className="ll-dialog compact">
          <div className="option">
            <span className="bullet">A</span>
            <span className="content">Itinéraire depuis ce point</span>
          </div>
          <div className="option discret">
            <i className="fe-point-inter"></i>
            <span className="content">Ajouter un point</span>
          </div>
          <div className="option">
            <span className="bullet">B</span>
            <span className="content">Itinéraire vers ce point</span>
          </div>
          <div className="option">
            <i className="fe-plus"></i>
            <span className="content">Prolonger l'itinéraire jusqu'ici</span>
          </div>
        </div>
      </div>

      <div>
        <div className="ll-dialog compact">
          <div className="option">
            <span className="bullet">A</span>
            <span className="content">Itinéraire depuis ce point</span>
          </div>
          <div className="option discret">
            <i className="fe-point-inter"></i>
            <span className="content">point intermédiaire</span>
          </div>
          <div className="option">
            <span className="bullet">B</span>
            <span className="content">Déplacer ce point</span>
          </div>
          <div className="option discret">
            <i className="fe-point-inter"></i>
            <span className="content">point intermédiaire</span>
          </div>
          <div className="option">
            <span className="bullet">C</span>
            <span className="content">Déplacer ce point</span>
          </div>
          <div className="option discret">
            <i className="fe-point-inter"></i>
            <span className="content">point intermédiaire</span>
          </div>
          <div className="option">
            <span className="bullet">D</span>
            <span className="content">Itinéraire vers ce point</span>
          </div>
          <div className="option">
            <i className="fe-plus"></i>
            <span className="content">Prolonger l'itinéraire jusqu'ici</span>
          </div>
        </div>
      </div>

      <div>
        <div className="ll-dialog compact">
          <div className="options-container">
            <div className="option">
              <span className="bullet">A</span>
              <span className="content">Itinéraire depuis ce point</span>
            </div>
            <div className="option discret">
              <i className="fe-point-inter"></i>
              <span className="content">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">B</span>
              <span className="content">Déplacer ce point</span>
            </div>
            <div className="option discret">
              <i className="fe-point-inter"></i>
              <span className="content">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">C</span>
              <span className="content">Déplacer ce point</span>
            </div>
            <div className="option discret">
              <i className="fe-point-inter"></i>
              <span className="content">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">D</span>
              <span className="content">Itinéraire vers ce point</span>
            </div>
            <div className="option discret">
              <i className="fe-point-inter"></i>
              <span className="content">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">E</span>
              <span className="content">Itinéraire vers ce point</span>
            </div>
            <div className="option discret">
              <i className="fe-point-inter"></i>
              <span className="content">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">F</span>
              <span className="content">Itinéraire vers ce point</span>
            </div>
            <div className="option discret">
              <i className="fe-point-inter"></i>
              <span className="content">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">G</span>
              <span className="content">Itinéraire vers ce point</span>
            </div>
            <div className="option discret">
              <i className="fe-point-inter"></i>
              <span className="content">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">H</span>
              <span className="content">Itinéraire vers ce point</span>
            </div>
            <div className="option discret">
              <i className="fe-point-inter"></i>
              <span className="content">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">I</span>
              <span className="content">Itinéraire vers ce point</span>
            </div>
            <div className="option discret">
              <i className="fe-point-inter"></i>
              <span className="content">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">J</span>
              <span className="content">Itinéraire vers ce point</span>
            </div>
          </div>
          <div className="option">
            <i className="fe-plus"></i>
            <span className="content">Prolonger l'itinéraire jusqu'ici</span>
          </div>
        </div>
      </div>
    </div>
  );
};
