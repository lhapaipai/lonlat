import { version } from "~/../package.json";

import { useT } from "talkr";

export default function HelpTab() {
  const { T } = useT();
  return (
    <div className="ll-quick-settings">
      <div>
        <div className="setting">
          <div className="text-hint">{T("sourceCode")}</div>
          <div>
            <a target="_blank" href="https://github.com/lhapaipai/lonlat">
              Github
            </a>
          </div>
        </div>
        <div className="setting">
          <div className="text-hint">{T("version")}</div>
          <div>
            <a
              target="_blank"
              href="https://github.com/lhapaipai/lonlat/blob/main/apps/front/CHANGELOG.md"
            >
              {version}
            </a>
          </div>
        </div>
        <div className="setting">
          <div className="text-hint">{T("fixIssue")}</div>
          <div>
            <a target="_blank" href="https://github.com/lhapaipai/lonlat/issues">
              {T("submitIssue")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
