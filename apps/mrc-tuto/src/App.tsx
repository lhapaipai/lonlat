import { MapLayerMouseEvent } from "maplibre-gl";
import "maplibre-theme/modern.css";
import "maplibre-react-components/dist/style.css";
import {
  RGradientMarker,
  RLayer,
  RMap,
  RNavigationControl,
  RSource,
  useRControl,
} from "maplibre-react-components";
import { Dispatch, SetStateAction, useState } from "react";
import { createPortal } from "react-dom";
import { Feature, Polygon } from "geojson";

const mountain: [number, number] = [6.4546, 46.1067];

const townData: Feature<Polygon> = {
  type: "Feature",
  properties: {
    category: "boundary",
    type: "administrative",
    name: "Marignier",
  },
  geometry: {
    type: "Polygon",
    coordinates: [
      // prettier-ignore
      [[6.4578873,46.1053342],[6.4583722,46.1046283],[6.4586968,46.1042697],[6.4590359,46.1034403],[6.4602051,46.1024575],[6.4623609,46.1013575],[6.4635036,46.1008877],[6.4648316,46.1005103],[6.4669699,46.0993843],[6.4670603,46.0991854],[6.4681181,46.0984843],[6.4682578,46.0981164],[6.4686063,46.0976129],[6.4692338,46.0973559],[6.4691339,46.0972806],[6.4687742,46.0897729],[6.4688015,46.0879982],[6.4685839,46.087715],[6.4680794,46.0873146],[6.4676629,46.0871831],[6.4679617,46.0865847],[6.4678873,46.0865152],[6.4679222,46.0864482],[6.4678991,46.0864142],[6.4677614,46.0862117],[6.467566,46.0862087],[6.4674425,46.0861159],[6.4672962,46.0860923],[6.4658199,46.0839738],[6.4661174,46.0828446],[6.4663027,46.0827906],[6.466516,46.0822048],[6.4664038,46.0817405],[6.4661503,46.0814569],[6.4662738,46.080895],[6.4666694,46.0801202],[6.4666748,46.0796859],[6.4669067,46.0794191],[6.4670791,46.0793864],[6.4671428,46.0793743],[6.4671809,46.0793138],[6.4672376,46.0792235],[6.4672975,46.0791282],[6.4674983,46.0788089],[6.4673892,46.0786741],[6.4672386,46.0784799],[6.4672548,46.0784473],[6.4674635,46.0783898],[6.4674688,46.0782256],[6.4672867,46.0773545],[6.4672045,46.0770494],[6.4671546,46.0765912],[6.467067,46.0757867],[6.4670491,46.0727424],[6.467049,46.0726849],[6.4670474,46.072112],[6.4778568,46.0710097],[6.4793489,46.070534],[6.4802531,46.0700884],[6.4801113,46.0697783],[6.4819724,46.069628],[6.4820948,46.0702825],[6.4831851,46.0724165],[6.4830407,46.0724476],[6.4830568,46.0726486],[6.4830435,46.0724518],[6.4832094,46.0724206],[6.4825981,46.0712001],[6.482151,46.0703075],[6.4823055,46.0701218],[6.4832495,46.0695602],[6.4929205,46.0687344],[6.4936384,46.0688617],[6.497314,46.0695775],[6.4974286,46.069534],[6.5055062,46.0709672],[6.5054501,46.0711026],[6.513565,46.0725651],[6.5134859,46.0730138],[6.5132662,46.0762372],[6.5132796,46.0771628],[6.5135775,46.0789812],[6.5139042,46.080301],[6.5142922,46.0828822],[6.5136547,46.0847315],[6.5142975,46.086082],[6.5140983,46.0862389],[6.5146582,46.0878843],[6.5150542,46.0878244],[6.5152796,46.0885804],[6.5152914,46.0893634],[6.5157817,46.0902562],[6.5158299,46.0905356],[6.5157642,46.0908476],[6.5157461,46.0909333],[6.5160421,46.0918072],[6.5165543,46.0923984],[6.5168694,46.0931554],[6.5173575,46.0930197],[6.5181043,46.0929352],[6.5203149,46.0925485],[6.5204499,46.0925614],[6.5207242,46.0929725],[6.5209258,46.093493],[6.5214819,46.094085],[6.5218669,46.0939295],[6.5223373,46.0943604],[6.5233591,46.0949972],[6.523725,46.0953325],[6.5243498,46.0961565],[6.5244354,46.0962494],[6.5254529,46.0973569],[6.525665,46.0977586],[6.5259917,46.0980262],[6.5266907,46.0983885],[6.5274967,46.0997852],[6.5281668,46.1005733],[6.5286122,46.1012345],[6.5293246,46.1049008],[6.5294635,46.1065357],[6.5287653,46.1067547],[6.527099,46.1072506],[6.5262499,46.1077669],[6.5258241,46.1079449],[6.5246086,46.1081695],[6.5238383,46.1084712],[6.5237838,46.1084262],[6.5232812,46.1086332],[6.5233715,46.1086916],[6.5232208,46.1087801],[6.5216245,46.1094614],[6.5213699,46.1096301],[6.5208168,46.1095036],[6.5194992,46.1103063],[6.5186657,46.1104192],[6.5174733,46.111145],[6.5172527,46.1115458],[6.5165194,46.1125302],[6.5153281,46.1134728],[6.5148917,46.1137079],[6.5144048,46.1140713],[6.5142437,46.1145629],[6.5133712,46.1155251],[6.5103241,46.1174399],[6.5075583,46.1188874],[6.5060325,46.1199719],[6.5045331,46.120573],[6.5042196,46.1214896],[6.5040621,46.1215481],[6.504032,46.1217784],[6.5040936,46.1224452],[6.5042312,46.1228936],[6.504114,46.1230311],[6.5041717,46.1233479],[6.5047135,46.1245155],[6.504329,46.1249818],[6.502591,46.1266608],[6.5025557,46.1267517],[6.5022047,46.1266894],[6.5013827,46.1260473],[6.5008933,46.1257806],[6.5006932,46.125733],[6.5002818,46.1257467],[6.499819,46.1256653],[6.4994904,46.1255208],[6.4993646,46.1254631],[6.4983757,46.125241],[6.498062,46.1251181],[6.4973839,46.124628],[6.496932,46.1246118],[6.4961198,46.1247779],[6.4954925,46.1247175],[6.4952598,46.1246528],[6.4948454,46.1244583],[6.4938998,46.1238919],[6.4934142,46.1234643],[6.4932136,46.1232876],[6.4929284,46.1229042],[6.4927001,46.1223767],[6.4926319,46.121892],[6.4927328,46.1214696],[6.4930262,46.1209939],[6.4936618,46.1205097],[6.4940042,46.1203444],[6.4945261,46.1202292],[6.4951417,46.1199843],[6.4950248,46.1197134],[6.4951057,46.1192046],[6.4949252,46.1190877],[6.4946336,46.1189792],[6.4944031,46.1190199],[6.4940651,46.1189148],[6.4937381,46.1189308],[6.4934521,46.1187892],[6.4931733,46.1188123],[6.4928869,46.1187017],[6.4926577,46.1187003],[6.4925763,46.118644],[6.4921351,46.1186468],[6.4917932,46.1185828],[6.4916409,46.1186333],[6.4910715,46.1186021],[6.4907586,46.1186801],[6.4889828,46.1188993],[6.4887995,46.1188525],[6.4877449,46.1188381],[6.4873722,46.1187487],[6.4858591,46.1185567],[6.4856827,46.1186694],[6.4851137,46.1186959],[6.4847231,46.1185778],[6.4846371,46.1184716],[6.4845698,46.1181813],[6.4843244,46.1178207],[6.4842049,46.1176819],[6.4837772,46.1174169],[6.4834558,46.1167709],[6.482783,46.1160622],[6.4824509,46.1155783],[6.4822696,46.1151899],[6.4818008,46.1145913],[6.481682,46.1142901],[6.4817313,46.1140248],[6.4816171,46.1138004],[6.4814913,46.1137198],[6.481356,46.113526],[6.4810426,46.1133231],[6.4806048,46.1127399],[6.480314,46.1121768],[6.4799142,46.1117457],[6.4793838,46.1114865],[6.4790081,46.1110954],[6.4785297,46.1100427],[6.4779554,46.1093397],[6.4771114,46.10889],[6.4762948,46.1082665],[6.4755965,46.1078401],[6.4748573,46.1075626],[6.4739034,46.1071123],[6.4734743,46.1069949],[6.4725749,46.1063402],[6.4715031,46.106024],[6.4702058,46.1057863],[6.4698023,46.1058517],[6.4691504,46.1060676],[6.4687463,46.1062519],[6.4683523,46.1061706],[6.4677986,46.1061522],[6.4662667,46.1063432],[6.4660059,46.1064258],[6.4643173,46.1061911],[6.4638194,46.1060699],[6.4631836,46.1057549],[6.4619843,46.1055384],[6.4578873,46.1053342]],
    ],
  },
};

const townFillPaint = {
  "fill-outline-color": "rgba(0,0,0,0.1)",
  "fill-color": "rgba(0,0,0,0.3)",
};

const styles = {
  "OSM Bright": "https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json",
  demotiles: "https://demotiles.maplibre.org/style.json",
  streets:
    "https://api.maptiler.com/maps/streets-v2/style.json?key=" +
    import.meta.env.VITE_MAPTILER_TOKEN,
};
type StyleID = keyof typeof styles;

interface LayerSwitcherControlProps {
  style: StyleID;
  setStyle: Dispatch<SetStateAction<StyleID>>;
}
function LayerSwitcherControl({ style, setStyle }: LayerSwitcherControlProps) {
  const { container } = useRControl({
    position: "top-right",
  });

  return createPortal(
    <div>
      {Object.entries(styles).map(([key]) => (
        <label key={key}>
          <input
            type="radio"
            name="base-layer"
            checked={style === key}
            onChange={() => setStyle(key as StyleID)}
          />
          {key}
        </label>
      ))}
    </div>,
    container,
  );
}

function App() {
  const [style, setStyle] = useState<StyleID>("OSM Bright");

  const [markerPosition, setMarkerPosition] = useState<null | [number, number]>(null);

  function handleClick(e: MapLayerMouseEvent) {
    console.log("handleClick", e);
    setMarkerPosition(e.lngLat.toArray());
  }

  return (
    <RMap
      className="theme-modern"
      minZoom={6}
      onClick={handleClick}
      initialCenter={mountain}
      initialZoom={11}
      mapStyle={styles[style]}
    >
      <LayerSwitcherControl style={style} setStyle={setStyle} />
      <RNavigationControl position="top-left" visualizePitch={true} />
      <RGradientMarker longitude={mountain[0]} latitude={mountain[1]} />
      {markerPosition && (
        <RGradientMarker
          color="#285daa"
          longitude={markerPosition[0]}
          latitude={markerPosition[1]}
        />
      )}
      <RSource key="town" id="town" type="geojson" data={townData} />
      <RLayer key="town-fill" id="town-fill" source="town" type="fill" paint={townFillPaint} />
    </RMap>
  );
}

export default App;
