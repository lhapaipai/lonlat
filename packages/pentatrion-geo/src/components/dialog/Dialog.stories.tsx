import { Meta } from "@storybook/react";
import "./Dialog.scss";

const meta = {
  title: "pentatrion-geo/Components/Dialog",
} satisfies Meta;
export default meta;

export const Search = () => {
  return (
    <div className="flex flex-column gap-2">
      <div className="ll-dialog ll-autocomplete-dialog" style={{ maxWidth: 375 }}>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-housenumber"></i>
            </div>
            <div className="type">point</div>
          </div>
          <div className="content">
            <div>
              <mark>65 Impasse des perrières</mark>
            </div>
            <div className="context">Marignier, Haute-Savoie</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-street"></i>
            </div>
            <div className="type">Rue</div>
          </div>

          <div className="content">
            <div>
              Rue <mark>Joseph Vallot</mark>
            </div>
            <div className="context">Chamonix-Mont-Blanc, Haute-Savoie</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-locality"></i>
            </div>
            <div className="type">Lieu-dit</div>
          </div>

          <div className="content">
            <div>
              <mark>Chamonix Sud</mark>
            </div>
            <div className="context">Chamonix-Mont-Blanc, Haute-Savoie</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-municipality"></i>
            </div>
            <div className="type">Ville</div>
          </div>

          <div className="content">
            <div>Chamonix-Mont-Blanc</div>
            <div className="context">Haute-Savoie</div>
          </div>
        </div>

        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-municipality"></i>
            </div>
            <div className="type">Ville vraiment bien trop long</div>
          </div>

          <div className="content">
            <div>
              Chamonix-Mont-Blanc vraiment bien trop long vraiment bien trop long vraiment bien trop
              long
            </div>
            <div className="context">
              Haute-Savoie vraiment bien trop long vraiment bien trop long vraiment bien trop long
              vraiment bien trop long vraiment bien trop long
            </div>
          </div>
        </div>
      </div>

      <div
        className="ll-dialog ll-autocomplete-dialog"
        style={{ maxWidth: 375, maxHeight: "none" }}
      >
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-access"></i>
            </div>
            <div className="type">Accès</div>
          </div>
          <div className="content">
            <div>Parking de la Pierre Écrite</div>
            <div className="context">Préalpes de Digne, Alpes de Haute-Provence</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-base_camp"></i>
            </div>
            <div className="type">Camp</div>
          </div>
          <div className="content">
            <div>Banji Feng base camp</div>
            <div className="context">Sichuan, Chine</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-bisse"></i>
            </div>
            <div className="type">Bisse</div>
          </div>
          <div className="content">
            <div>Canal de Crévoux</div>
            <div className="context">Queyras S - Parpaillon - Ubaye - Orrenaye, Hautes-Alpes</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-bivouac"></i>
            </div>
            <div className="type">Bivouac</div>
          </div>
          <div className="content">
            <div>Buvouac du Rognon de la Girose</div>
            <div className="context">Écrins, Hautes-Alpes</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-camp_site"></i>
            </div>
            <div className="type">Camping</div>
          </div>
          <div className="content">
            <div>Camping Municiapl du Tir</div>
            <div className="context">Cantal, France</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-canyon"></i>
            </div>
            <div className="type">Canyon</div>
          </div>
          <div className="content">
            <div>Cascades du Canalet</div>
            <div className="context">Puigmal - Canigou - Albères, Pyrénées-Orientales</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-cave"></i>
            </div>
            <div className="type">Grotte</div>
          </div>
          <div className="content">
            <div>Grotte des Rochers de Chamalière</div>
            <div className="context">Cantal, France</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-climbing_indoor"></i>
            </div>
            <div className="type">S.A.E.</div>
          </div>
          <div className="content">
            <div>Strasbourg - Bloc en stock</div>
            <div className="context">Bas-Rhin, France</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-climbing_outdoor"></i>
            </div>
            <div className="type">Escalade</div>
          </div>
          <div className="content">
            <div>Verdon - Courchon</div>
            <div className="context">Préalpes de Digne, Alpes de Haute-Provence</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-gite"></i>
            </div>
            <div className="type">Gite</div>
          </div>
          <div className="content">
            <div>Relais Montagnard de Bonac</div>
            <div className="context">Couserans - Aran N, Ariège</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-hut"></i>
            </div>
            <div className="type">Refuge</div>
          </div>
          <div className="content">
            <div>Chalet buvette du Boret</div>
            <div className="context">Haut Fiffre - AiguillesRouges - Fiz, Haute-Savoie</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-lake"></i>
            </div>
            <div className="type">Lac</div>
          </div>
          <div className="content">
            <div>Lac de Pareloup</div>
            <div className="context">Aveyron, France</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-local_product"></i>
            </div>
            <div className="type">Produits</div>
          </div>
          <div className="content">
            <div>Alpage de Blaitière de dessous</div>
            <div className="context">Mont-Blanc, Haute-Savoie</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-locality"></i>
            </div>
            <div className="type">Lieu-dit</div>
          </div>
          <div className="content">
            <div>Cabanes de Sanguinière (Estenc)</div>
            <div className="context">Mercantour - Argentera, Alpes-Maritimes</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-misc"></i>
            </div>
            <div className="type">Divers</div>
          </div>
          <div className="content">
            <div>Parking Iselstrasse Arosa</div>
            <div className="context">Frisons centraux, Grisons</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-paragliding_landing"></i>
            </div>
            <div className="type">Parapente</div>
          </div>
          <div className="content">
            <div>Hippodrome de la Chaup</div>
            <div className="context">Mercantour - Argentera, Alpes-de-Haute-Provence</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-paragliding_takeoff"></i>
            </div>
            <div className="type">Parapente</div>
          </div>
          <div className="content">
            <div>Plan de Chouet</div>
            <div className="context">Bornes - Aravis, Haute-Savoie</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-pass"></i>
            </div>
            <div className="type">Col</div>
          </div>
          <div className="content">
            <div>Brèche N du Pic Allemand</div>
            <div className="context">Bigorre - Ordesa, Hautes-Pyrénées</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-shelter"></i>
            </div>
            <div className="type">Abri</div>
          </div>
          <div className="content">
            <div>Cabane du Plainet</div>
            <div className="context">Écrins, Isère</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-slackline_spot"></i>
            </div>
            <div className="type">Slackline</div>
          </div>
          <div className="content">
            <div>Neuchâtel lac</div>
            <div className="context">Jura, Canton de Neuchâtel</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-summit"></i>
            </div>
            <div className="type">Sommet</div>
          </div>
          <div className="content">
            <div>Rottalhorn</div>
            <div className="context">Alpes Bernoises, Canton de Berne</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-virtual"></i>
            </div>
            <div className="type">Virtuel</div>
          </div>
          <div className="content">
            <div>Massif des Monts Dore</div>
            <div className="context">Puy-de-Dôme, France</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-waterfall"></i>
            </div>
            <div className="type">Cascade</div>
          </div>
          <div className="content">
            <div>Cascade de Cerveyrieu</div>
            <div className="context">Genevois - Jura S, Ain</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-waterpoint"></i>
            </div>
            <div className="type">Eau</div>
          </div>
          <div className="content">
            <div>Source de la combe S de Léchaud</div>
            <div className="context">Chartreuse, Isère</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-weather_station"></i>
            </div>
            <div className="type">Météo</div>
          </div>
          <div className="content">
            <div>Les Portes en Valgaudemar (Station météo)</div>
            <div className="context">Écrins, Hautes-Alpes</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-webcam"></i>
            </div>
            <div className="type">Webcam</div>
          </div>
          <div className="content">
            <div>Webcam Flaine Véret</div>
            <div className="context">Haut Giffre - Aiguilles Rouges - Fiz, Haute-Savoie</div>
          </div>
        </div>
      </div>
    </div>
  );
};
