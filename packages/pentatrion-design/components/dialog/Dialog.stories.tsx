import { Meta } from "@storybook/react";
import { Dialog } from ".";
import { Button } from "../button";

const meta = {
  title: "Components/Dialog",
} satisfies Meta;
export default meta;

export const Basic = () => {
  return (
    <div className="flex gap-8 flex-col mb-4">
      <div>
        <Dialog>
          <div className="description p-2">coucou</div>
        </Dialog>
      </div>
      <div>
        <Dialog placement="top" color="gray" style={{ width: 300 }}>
          <div className="description p-2">infos</div>
          <div style={{ left: "18px" }} className="p8n-arrow"></div>
        </Dialog>
      </div>
      <div>
        <Dialog placement="bottom" color="red" style={{ width: 300 }}>
          <div className="description p-2">infos</div>
          <div style={{ left: "18px" }} className="p8n-arrow"></div>
        </Dialog>
      </div>
      <div>
        <Dialog placement="left" color="blue" style={{ width: 300 }}>
          <div className="description p-2">infos</div>
          <div style={{ top: "12px" }} className="p8n-arrow"></div>
        </Dialog>
      </div>
      <div>
        <Dialog placement="right" color="green" style={{ width: 300 }}>
          <div className="description p-2">infos</div>
          <div style={{ top: "12px" }} className="p8n-arrow"></div>
        </Dialog>
      </div>

      <div>
        <Dialog placement="top" color="orange" style={{ width: 300 }}>
          <div className="p-1 float-right">
            <Button icon variant="text" color="gray">
              <i className="fe-cancel"></i>
            </Button>
          </div>

          <div className="description p-2">infos</div>
          <div style={{ left: "18px", bottom: "-8px" }} className="p8n-arrow"></div>
        </Dialog>
      </div>

      <div>
        <Dialog placement="top" color="blue" style={{ width: 300 }}>
          <div className="p-1 float-right">
            <Button icon variant="text" color="gray">
              <i className="fe-cancel"></i>
            </Button>
          </div>
          <header className="flex items-center px-2 pt-2">
            <h4>Heading</h4>
          </header>
          <div className="description p-2">description</div>
          <div style={{ left: "18px", bottom: "-8px" }} className="p8n-arrow"></div>
        </Dialog>
      </div>

      <div>
        <Dialog placement="top" color="yellow" style={{ width: 300 }}>
          <div className="p-1 float-right">
            <Button icon variant="text" color="gray">
              <i className="fe-cancel"></i>
            </Button>
          </div>
          <header className="flex items-center px-2 pt-2">
            <h4>Heading</h4>
          </header>
          <div className="description p-2">description</div>
          <footer className="relative z-10 px-2 pb-2">
            <div className="flex justify-between">
              <Button variant="text" color="gray">
                Annuler
              </Button>
              <Button color="yellow">Valider</Button>
            </div>
          </footer>
          <div style={{ left: "18px", bottom: "-8px" }} className="p8n-arrow"></div>
        </Dialog>
      </div>
    </div>
  );
};

export const Options = () => {
  return (
    <div className="flex gap-8 flex-col mb-4">
      <div>
        <Dialog placement="bottom" style={{ width: 300 }}>
          <div className="option">Default state 1</div>
          <div className="option active">Active state 2 (keyboard navigation)</div>
          <div className="option">Default state 3</div>
          <div className="option selected">Selected state 4</div>
          <div className="option">Default state 5</div>
          <div className="option">Default state 6</div>
        </Dialog>
      </div>

      <div>
        <Dialog placement="bottom" style={{ width: 300 }}>
          <div className="option">
            <i className="fe-star mr-2"></i>
            <span>Default state 1</span>
          </div>
          <div className="option">
            <i className="fe-marker mr-2"></i>
            <span>State 2</span>
          </div>
        </Dialog>
      </div>

      <div>
        <Dialog placement="bottom" style={{ width: 300 }}>
          <div className="option">
            <span className="bullet">A</span>
            <span>Itinéraire depuis ce point</span>
          </div>
          <div className="option text-gray-6">
            <i className="fe-point-inter mr-2"></i>
            <span>Ajouter un point</span>
          </div>
          <div className="option">
            <span className="bullet">B</span>
            <span>Itinéraire vers ce point</span>
          </div>
          <div className="option">
            <i className="fe-plus mr-2"></i>
            <span>Prolonger l'itinéraire jusqu'ici</span>
          </div>
        </Dialog>
      </div>

      <div>
        <Dialog placement="bottom" style={{ width: 300 }}>
          <div className="option">
            <span className="bullet">A</span>
            <span>Itinéraire depuis ce point</span>
          </div>
          <div className="option text-gray-6">
            <i className="fe-point-inter mr-2"></i>
            <span className="text-sm">point intermédiaire</span>
          </div>
          <div className="option">
            <span className="bullet">B</span>
            <span>Déplacer ce point</span>
          </div>
          <div className="option text-gray-6">
            <i className="fe-point-inter mr-2"></i>
            <span className="text-sm">point intermédiaire</span>
          </div>
          <div className="option">
            <span className="bullet">C</span>
            <span>Déplacer ce point</span>
          </div>
          <div className="option text-gray-6">
            <i className="fe-point-inter mr-2"></i>
            <span className="text-sm">point intermédiaire</span>
          </div>
          <div className="option">
            <span className="bullet">D</span>
            <span>Itinéraire vers ce point</span>
          </div>
          <div className="option">
            <i className="fe-plus mr-2"></i>
            <span>Prolonger l'itinéraire jusqu'ici</span>
          </div>
        </Dialog>
      </div>

      <div>
        <Dialog placement="bottom" style={{ width: 300 }}>
          <div className="overflow-auto max-h-56">
            <div className="option">
              <span className="bullet">A</span>
              <span>Itinéraire depuis ce point</span>
            </div>
            <div className="option text-gray-6">
              <i className="fe-point-inter mr-2"></i>
              <span className="text-sm">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">B</span>
              <span>Déplacer ce point</span>
            </div>
            <div className="option text-gray-6">
              <i className="fe-point-inter mr-2"></i>
              <span className="text-sm">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">C</span>
              <span>Déplacer ce point</span>
            </div>
            <div className="option text-gray-6">
              <i className="fe-point-inter mr-2"></i>
              <span className="text-sm">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">D</span>
              <span>Itinéraire vers ce point</span>
            </div>
            <div className="option text-gray-6">
              <i className="fe-point-inter mr-2"></i>
              <span className="text-sm">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">E</span>
              <span>Itinéraire vers ce point</span>
            </div>
            <div className="option text-gray-6">
              <i className="fe-point-inter mr-2"></i>
              <span className="text-sm">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">F</span>
              <span>Itinéraire vers ce point</span>
            </div>
            <div className="option text-gray-6">
              <i className="fe-point-inter mr-2"></i>
              <span className="text-sm">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">G</span>
              <span>Itinéraire vers ce point</span>
            </div>
            <div className="option text-gray-6">
              <i className="fe-point-inter mr-2"></i>
              <span className="text-sm">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">H</span>
              <span>Itinéraire vers ce point</span>
            </div>
            <div className="option text-gray-6">
              <i className="fe-point-inter mr-2"></i>
              <span className="text-sm">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">I</span>
              <span>Itinéraire vers ce point</span>
            </div>
            <div className="option text-gray-6">
              <i className="fe-point-inter mr-2"></i>
              <span className="text-sm">point intermédiaire</span>
            </div>
            <div className="option">
              <span className="bullet">J</span>
              <span>Itinéraire vers ce point</span>
            </div>
          </div>
          <div className="option">
            <i className="fe-plus"></i>
            <span>Prolonger l'itinéraire jusqu'ici</span>
          </div>
        </Dialog>
      </div>
    </div>
  );
};
