/* eslint-disable sort-keys */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */

import { findAllPaths } from "./connectionsGraph";

const connections = {
  248: [1084, 507, 2188],
  346: [3941, 1452, 507, 421, 7447, 1590, 1382, 644, 599, 2188, 1551, 1218, 2564, 3885, 609, 1665, 3077, 3930, 2939, 3484, 1335, 1587, 679, 2985],
  421: [507, 346, 1382, 1218, 3885, 609, 1665, 3077, 3930, 644, 1587, 2985, 1590, 679, 3941, 599, 2939],
  503: [599, 1551, 1665],
  507: [3941, 248, 1218, 1382, 609, 599, 2188, 1665, 421, 3484, 1335, 346, 644, 1587, 1551, 679, 3885, 2564, 3077, 3930, 2939, 1590, 2985],
  599: [507, 1382, 503, 609, 421, 644, 3941, 1218, 1665, 1335, 346, 1587, 1551, 679, 2188],
  609: [507, 644, 679, 1382, 1551, 421, 1665, 3941, 1218, 599, 3484, 1587, 1590, 2188, 346, 3885, 2985],
  644: [3941, 507, 1382, 421, 1218, 3885, 609, 599, 1665, 2939, 346, 1587, 1551, 679, 2985],
  679: [3941, 507, 609, 1382, 421, 1218, 644, 599, 2188, 346, 1665, 2939, 1587, 2985, 1590],
  1084: [248, 1382, 2188, 1218],
  1218: [3941, 507, 1382, 421, 609, 644, 679, 599, 2188, 1084, 2939, 1335, 346, 1587, 1590, 1551, 1665, 2564, 2985],
  1335: [3941, 1587, 1551, 507, 1382, 599, 2188, 1218, 346, 1452],
  1382: [3941, 1452, 507, 1218, 3885, 609, 1084, 599, 2188, 2564, 1665, 421, 3077, 3930, 2939, 3484, 1335, 346, 644, 1587, 2985, 1590, 1551, 679],
  1452: [3941, 1382, 346, 1590, 1665, 1587, 2939, 2985, 1335],
  1551: [1335, 507, 1382, 3941, 609, 1587, 2985, 503, 644, 599, 2188, 346, 1218, 1590, 1665],
  1587: [3941, 1335, 507, 1382, 1551, 421, 609, 644, 599, 2188, 1218, 3930, 346, 679, 1665, 1590, 1452, 2939, 2985],
  1590: [3941, 1452, 346, 1382, 421, 507, 609, 1218, 3930, 679, 1665, 3885, 3077, 2939, 3484, 1587, 1551, 2985],
  1665: [3941, 507, 1382, 421, 609, 644, 599, 2188, 346, 679, 1218, 1452, 503, 1587, 1590, 2939, 2985, 1551],
  1960: [3484, 3077, 2009, 3361, 3930],
  2009: [3361],
  2188: [507, 1382, 3484, 3077, 248, 3941, 1218, 3885, 609, 1084, 599, 2564, 1665, 3930, 2939, 1335, 346, 1587, 3361, 1551, 679, 2985],
  2564: [3484, 1382, 507, 2188, 346, 1218],
  2939: [1382, 507, 644, 2188, 1218, 346, 679, 1590, 1587, 3941, 3885, 1665, 421, 1452, 2985],
  2985: [1382, 421, 1551, 3484, 3930, 2188, 679, 1587, 3380, 609, 644, 3941, 1218, 3885, 1665, 1452, 3077, 2939, 507, 346, 1590, 7447],
  3077: [3930, 3484, 1382, 421, 3361, 507, 3885, 2188, 1960, 346, 1590, 3380, 2985],
  3361: [2009, 3484, 3077, 3885, 2188, 1960, 3930],
  3380: [3930, 3885, 3077, 2985],
  3484: [3520, 2564, 3077, 507, 1960, 3361, 1382, 2188, 3930, 2985, 609, 346, 1590],
  3520: [3484],
  3885: [3930, 1382, 421, 507, 3077, 644, 2188, 3361, 346, 1590, 3380, 2939, 609, 2985],
  3930: [3885, 3077, 1382, 421, 507, 3484, 2188, 1960, 1587, 2985, 3361, 1590, 3380, 346],
  3941: [1218, 1382, 1665, 1452, 507, 1335, 346, 644, 1587, 1590, 679, 1551, 609, 421, 599, 2188, 2939, 2985],
  7447: [346, 2985],
};

const src3941 = 3941;

const dst1551 = 1551;

const maxConnections2 = 2;
const maxConnections0 = 0;

const minResults10 = 10;
const minResults50 = 50;

const resultingPaths1 = findAllPaths(connections, src3941, dst1551, maxConnections2, minResults10);
const resultingPaths2 = findAllPaths(connections, src3941, dst1551, maxConnections2, minResults50);
const resultingPaths3 = findAllPaths(connections, src3941, dst1551, maxConnections0, minResults50);

describe(`from ${src3941}, to ${dst1551}, max connections ${maxConnections2}, `, () => {
  test(`returns 10 paths with min results = ${minResults10}`, () => {
    expect(resultingPaths1.length).toBe(10);
  });
  test(`returns 50 paths with min results = ${minResults50}`, () => {
    expect(resultingPaths2.length).toBe(50);
  });
  test(`all returned paths have a maximum of ${maxConnections2} connections`, () => {
    expect(resultingPaths2.every((path) => path.length <= maxConnections2 + 2)).toBeTruthy();
  });
  test(`all 50 paths starts with ${src3941} and ends with ${dst1551}`, () => {
    expect(resultingPaths2.every((path) => path[0] === src3941 && path[path.length - 1] === dst1551)).toBeTruthy();
  });
});

describe(`from ${src3941}, to ${dst1551}, max connections ${maxConnections0}, `, () => {
  test("returns 1 path only", () => {
    expect(resultingPaths3.length).toBe(1);
  });
});
