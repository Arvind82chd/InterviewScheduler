import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "hooks/useVisualMode";


afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});

const FIRST = "FIRST";

test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.transition(THIRD));
  expect(result.current.mode).toBe(THIRD);

  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});