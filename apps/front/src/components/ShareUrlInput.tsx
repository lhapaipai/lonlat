import { useCopyToClipboard } from "pentatrion-design";
import { Button } from "pentatrion-design/components/button";
import { Input } from "pentatrion-design/components/input";
import { useReduxNotifications } from "pentatrion-design/redux";
import { useEffect, useState } from "react";
import { useT } from "talkr";

export default function ShareUrlInput() {
  const [, copy] = useCopyToClipboard();
  const { notify } = useReduxNotifications();
  const { T } = useT();
  const [url, setUrl] = useState(window.location.href);

  function handleClickClipboard() {
    copy(url);
    notify(`${T("copiedIntoClipboard")} : URL`, {
      expiration: 5000,
    });
  }

  useEffect(() => {
    function handleHashChange() {
      setUrl(window.location.href);
    }
    window.addEventListener("replacestate", handleHashChange);
    return () =>
      void window.removeEventListener("replacestate", handleHashChange);
  }, []);
  return (
    <Input
      readOnly={true}
      value={url}
      suffix={
        <Button
          withRipple={false}
          icon
          variant="text"
          color="gray"
          onClick={handleClickClipboard}
        >
          <i className="fe-clipboard-copy"></i>
        </Button>
      }
    />
  );
}
