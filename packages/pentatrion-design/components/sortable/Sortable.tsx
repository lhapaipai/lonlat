import { arrayEquals } from "../../lib";
import { useMemo } from "react";
import {
  ItemInterface,
  ReactSortable,
  ReactSortableProps,
  Sortable as SortableLib,
  Store,
} from "react-sortablejs";

export function Sortable<T extends ItemInterface>({
  children,
  list,
  setList,
  ...rest
}: ReactSortableProps<T>) {
  const mutableList = useMemo(() => {
    return list.map((item) => ({ ...item }));
  }, [list]);

  function handleList(updatedList: T[], sortable: SortableLib | null, store: Store) {
    if (
      !arrayEquals(
        updatedList.map((l) => l.id),
        mutableList.map((l) => l.id),
      )
    ) {
      setList(updatedList, sortable, store);
    }
  }

  return (
    <ReactSortable list={mutableList} setList={handleList} {...rest}>
      {children}
    </ReactSortable>
  );
}
