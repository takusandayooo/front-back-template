import { getDefaultMock } from "common/generate/index.msw";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(...getDefaultMock());
