import { Button, Textarea, useCopyToClipboard } from "pentatrion-design";
import { useReduxNotifications } from "pentatrion-design/redux";
import { RouteFeatureResponse } from "pentatrion-geo";
import { stringifyRoute } from "pentatrion-geo";
import { useT } from "talkr";

interface Props {
  route: RouteFeatureResponse;
}

export default function RawData({ route }: Props) {
  const [, copy] = useCopyToClipboard();
  const { notify } = useReduxNotifications();
  const { T } = useT();

  function handleClickClipboard(value: string) {
    copy(value);
    notify(T("copiedIntoClipboard"));
  }

  return (
    <>
      <div className="p8n-separator"></div>

      <Textarea
        className="min-h-48 text-sm [&_textarea]:h-full"
        readOnly
        value={stringifyRoute(route)}
        action={
          <Button
            withRipple={false}
            icon
            variant="text"
            color="gray"
            onClick={() => handleClickClipboard(stringifyRoute(route))}
          >
            <i className="fe-clipboard-copy"></i>
          </Button>
        }
      />
    </>
  );
}
