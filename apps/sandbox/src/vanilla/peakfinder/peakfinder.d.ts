interface PanoramaPanelOptions {
  canvasid: string;
  baseurl?: string;
  locale?: string;
  bgcolor?: string;
  debug?: string;
  style?: string;
}

interface PanoramaPanelConstructor {
  new (options: PanoramaPanelOptions): PanoramaPanel;
}

interface PanoramaPanel {
  init(): void;
}
