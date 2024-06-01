export interface SortableItem<I> {
  /** The unique id associated with your item. It's recommended this is the same as the key prop for your list item. */
  id: string | number;
  /** When true, the item is selected using MultiDrag */
  selected?: boolean;
  /** When true, the item is deemed "chosen", which basically just a mousedown event. */
  chosen?: boolean;
  /** When true, it will not be possible to pick this item up in the list. */
  filtered?: boolean;

  data: I;
}
