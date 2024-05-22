import { Meta } from "@storybook/react";
import { Dialog } from "pentatrion-design";

const meta = {
  title: "pentatrion-geo/Components/Dialog",
} satisfies Meta;
export default meta;

export const Search = () => {
  return (
    <div className="flex flex-column gap-2">
      <div>
        <Dialog className="" style={{ maxWidth: 375 }}>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-housenumber"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">point</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">
                <mark>65 Impasse des perrières</mark>
              </div>
              <div className="text-gray-6 text-xs truncate">Marignier, Haute-Savoie</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-street"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Rue</div>
            </div>

            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">
                Rue <mark>Joseph Vallot</mark>
              </div>
              <div className="text-gray-6 text-xs truncate">Chamonix-Mont-Blanc, Haute-Savoie</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-locality"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Lieu-dit</div>
            </div>

            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">
                <mark>Chamonix Sud</mark>
              </div>
              <div className="text-gray-6 text-xs truncate">Chamonix-Mont-Blanc, Haute-Savoie</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-municipality"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Ville</div>
            </div>

            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Chamonix-Mont-Blanc</div>
              <div className="text-gray-6 text-xs truncate">Haute-Savoie</div>
            </div>
          </div>

          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-municipality"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">
                Ville vraiment bien trop long
              </div>
            </div>

            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">
                Chamonix-Mont-Blanc vraiment bien trop long vraiment bien trop long vraiment bien
                trop long
              </div>
              <div className="text-gray-6 text-xs truncate">
                Haute-Savoie vraiment bien trop long vraiment bien trop long vraiment bien trop long
                vraiment bien trop long vraiment bien trop long
              </div>
            </div>
          </div>
        </Dialog>
      </div>
      <div>
        <Dialog
          className="ll-dialog ll-autocomplete-dialog"
          style={{ maxWidth: 375, maxHeight: "none" }}
        >
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-access"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Accès</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Parking de la Pierre Écrite</div>
              <div className="text-gray-6 text-xs truncate">
                Préalpes de Digne, Alpes de Haute-Provence
              </div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-base_camp"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Camp</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Banji Feng base camp</div>
              <div className="text-gray-6 text-xs truncate">Sichuan, Chine</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-bisse"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Bisse</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Canal de Crévoux</div>
              <div className="text-gray-6 text-xs truncate">
                Queyras S - Parpaillon - Ubaye - Orrenaye, Hautes-Alpes
              </div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-bivouac"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Bivouac</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Buvouac du Rognon de la Girose</div>
              <div className="text-gray-6 text-xs truncate">Écrins, Hautes-Alpes</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-camp_site"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Camping</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Camping Municiapl du Tir</div>
              <div className="text-gray-6 text-xs truncate">Cantal, France</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-canyon"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Canyon</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Cascades du Canalet</div>
              <div className="text-gray-6 text-xs truncate">
                Puigmal - Canigou - Albères, Pyrénées-Orientales
              </div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-cave"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Grotte</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Grotte des Rochers de Chamalière</div>
              <div className="text-gray-6 text-xs truncate">Cantal, France</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-climbing_indoor"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">S.A.E.</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Strasbourg - Bloc en stock</div>
              <div className="text-gray-6 text-xs truncate">Bas-Rhin, France</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-climbing_outdoor"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Escalade</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Verdon - Courchon</div>
              <div className="text-gray-6 text-xs truncate">
                Préalpes de Digne, Alpes de Haute-Provence
              </div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-gite"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Gite</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Relais Montagnard de Bonac</div>
              <div className="text-gray-6 text-xs truncate">Couserans - Aran N, Ariège</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-hut"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Refuge</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Chalet buvette du Boret</div>
              <div className="text-gray-6 text-xs truncate">
                Haut Fiffre - AiguillesRouges - Fiz, Haute-Savoie
              </div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-lake"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Lac</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Lac de Pareloup</div>
              <div className="text-gray-6 text-xs truncate">Aveyron, France</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-local_product"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Produits</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Alpage de Blaitière de dessous</div>
              <div className="text-gray-6 text-xs truncate">Mont-Blanc, Haute-Savoie</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-locality"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Lieu-dit</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Cabanes de Sanguinière (Estenc)</div>
              <div className="text-gray-6 text-xs truncate">
                Mercantour - Argentera, Alpes-Maritimes
              </div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-misc"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Divers</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Parking Iselstrasse Arosa</div>
              <div className="text-gray-6 text-xs truncate">Frisons centraux, Grisons</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-paragliding_landing"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Parapente</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Hippodrome de la Chaup</div>
              <div className="text-gray-6 text-xs truncate">
                Mercantour - Argentera, Alpes-de-Haute-Provence
              </div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-paragliding_takeoff"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Parapente</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Plan de Chouet</div>
              <div className="text-gray-6 text-xs truncate">Bornes - Aravis, Haute-Savoie</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-pass"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Col</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Brèche N du Pic Allemand</div>
              <div className="text-gray-6 text-xs truncate">Bigorre - Ordesa, Hautes-Pyrénées</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-shelter"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Abri</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Cabane du Plainet</div>
              <div className="text-gray-6 text-xs truncate">Écrins, Isère</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-slackline_spot"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Slackline</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Neuchâtel lac</div>
              <div className="text-gray-6 text-xs truncate">Jura, Canton de Neuchâtel</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-summit"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Sommet</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Rottalhorn</div>
              <div className="text-gray-6 text-xs truncate">Alpes Bernoises, Canton de Berne</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-virtual"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Virtuel</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Massif des Monts Dore</div>
              <div className="text-gray-6 text-xs truncate">Puy-de-Dôme, France</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-waterfall"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Cascade</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Cascade de Cerveyrieu</div>
              <div className="text-gray-6 text-xs truncate">Genevois - Jura S, Ain</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-waterpoint"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Eau</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Source de la combe S de Léchaud</div>
              <div className="text-gray-6 text-xs truncate">Chartreuse, Isère</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-weather_station"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Météo</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Les Portes en Valgaudemar (Station météo)</div>
              <div className="text-gray-6 text-xs truncate">Écrins, Hautes-Alpes</div>
            </div>
          </div>
          <div className="option h-12 flex px-0">
            <div className="h-12 w-12 flex-flex-col">
              <div className="flex-1 text-xl flex-center">
                <i className="fe-webcam"></i>
              </div>
              <div className="text-center text-gray-6 text-2xs/[11px] truncate">Webcam</div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
              <div className="truncate">Webcam Flaine Véret</div>
              <div className="text-gray-6 text-xs truncate">
                Haut Giffre - Aiguilles Rouges - Fiz, Haute-Savoie
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};
