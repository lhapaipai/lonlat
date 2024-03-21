import { useMemo } from "react";
import {
  ItemInterface,
  ReactSortable,
  ReactSortableProps,
  Sortable as SortableLib,
  Store,
} from "react-sortablejs";

function arrayEquals(a: any, b: any) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

export default function Sortable<T extends ItemInterface>({
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
