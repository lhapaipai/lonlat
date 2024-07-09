import { version } from "~/../package.json";

import { useT } from "talkr";
import ShareUrlInput from "./ShareUrlInput";

export default function HelpTab() {
  const { T } = useT();
  return (
    <div>
      <div className="p8n-setting">
        <div>{T("sourceCode")}</div>
        <div>
          <a target="_blank" href="https://github.com/lhapaipai/lonlat">
            Github
          </a>
        </div>
      </div>
      <div className="p8n-setting">
        <div>{T("version")}</div>
        <div>
          <a
            target="_blank"
            href="https://github.com/lhapaipai/lonlat/blob/main/apps/front/CHANGELOG.md"
          >
            {version}
          </a>
        </div>
      </div>
      <div className="p8n-setting">
        <div>{T("fixIssue")}</div>
        <div>
          <a target="_blank" href="https://github.com/lhapaipai/lonlat/issues">
            {T("submitIssue")}
          </a>
        </div>
      </div>
      <div className="p8n-separator"></div>
      <ShareUrlInput />
    </div>
  );
}
