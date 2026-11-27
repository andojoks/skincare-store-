interface SorrelTestBridge {
  start: () => void;
  speed: number;
}

interface Window {
  SORREL?: SorrelTestBridge;
}
