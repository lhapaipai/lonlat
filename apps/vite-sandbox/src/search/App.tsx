import {
  Button,
  FetchError,
  FormattedItem,
  Highlight,
  Input,
  NotificationsProvider,
  customFetch,
  prepareTownsResult,
  useNotifications,
} from "@lonlat/shared/index";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
interface Town {
  insee: number;
  code_postal: number;
  latitude: number;
  longitude: number;
  nom_commune: string;
  code_departement: number;
  nom_departement: string;
  code_region: number;
  nom_region: string;
  context: string;
  population: number;
  icon: string;
}

type FormattedTown = FormattedItem<Town>;

function Inner() {
  const notificationManager = useNotifications();
  const [search, setSearch] = useState("");
  const searchDebounced = useDebounce(search, 200);

  const [results, setResults] = useState<FormattedTown[]>([]);

  useEffect(() => {
    console.log("fetch", searchDebounced);

    let abort = false;
    customFetch(`http://localhost:6005/towns?q=${searchDebounced}`)
      .then((results: FormattedTown[]) => {
        if (!abort) {
          const towns = prepareTownsResult(results, searchDebounced);
          setResults(towns);
        }
      })
      .catch((err) => {
        if (err instanceof FetchError) {
          notificationManager.addNotification(err.message);
        } else {
          throw err;
        }
      });

    return () => {
      abort = true;
    };
  }, [searchDebounced, notificationManager]);

  async function handleClick() {
    try {
      const response = await customFetch("http://localhost:6005/post");
      console.log(response);
    } catch (err) {
      if (err instanceof FetchError) {
        notificationManager.addNotification(err.message);
        // console.log("FetchError error :", err, err.name, err.message);
      }
    }
  }

  return (
    <>
      <Button className="ll-button" onClick={handleClick}>
        Fetch
      </Button>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="ll-dialog ll-autocomplete-dialog">
        <div className="box">
          {results.map((result) => {
            return (
              <div className="option search" key={result.insee}>
                <div className="icon flex-center">
                  <i className={result.icon}></i>
                </div>
                <div className="content">
                  <div>
                    <Highlight
                      fallback={result.nom_commune}
                      zones={result?._formatted?.nom_commune}
                    />
                  </div>
                  <div className="hint">
                    <Highlight fallback={result.context} zones={result?._formatted?.context} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <div id="my-app">
      <NotificationsProvider>
        <Inner />
      </NotificationsProvider>
    </div>
  );
}

export default App;
