import matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";

// the Vitest API is mostly compatible with the Jest API, making it possible to reuse many tools originally built for Jest.
expect.extend(matchers);
