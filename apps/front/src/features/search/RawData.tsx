import { Button, Textarea, useCopyToClipboard } from "pentatrion-design";
import { useReduxNotifications } from "pentatrion-design/redux";
import { GeoPointOption } from "pentatrion-geo";
import { stringifyGeoOption } from "pentatrion-geo";
import { useT } from "talkr";

interface Props {
  feature: GeoPointOption;
}

export default function RawData({ feature }: Props) {
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
        className="h-10 text-sm [&_textarea]:h-full"
        readOnly
        value={stringifyGeoOption(feature, "lng-lat-array")}
        action={
          <Button
            withRipple={false}
            icon
            variant="text"
            color="gray"
            onClick={() =>
              handleClickClipboard(stringifyGeoOption(feature, "lng-lat-array"))
            }
          >
            <i className="fe-clipboard-copy"></i>
          </Button>
        }
      />
      <Textarea
        className="h-24 text-sm [&_textarea]:h-full"
        readOnly
        value={stringifyGeoOption(feature, "lng-lat")}
        action={
          <Button
            withRipple={false}
            icon
            variant="text"
            color="gray"
            onClick={() =>
              handleClickClipboard(stringifyGeoOption(feature, "lng-lat"))
            }
          >
            <i className="fe-clipboard-copy"></i>
          </Button>
        }
      />
      <Textarea
        className="min-h-48 text-sm [&_textarea]:h-full"
        readOnly
        value={stringifyGeoOption(feature)}
        action={
          <Button
            withRipple={false}
            icon
            variant="text"
            color="gray"
            onClick={() => handleClickClipboard(stringifyGeoOption(feature))}
          >
            <i className="fe-clipboard-copy"></i>
          </Button>
        }
      />
    </>
  );
}
