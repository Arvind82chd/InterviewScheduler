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
const SECOND = "SECOND";
const THIRD = "THIRD";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
})

test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  //console.log(result.current);
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.transition(THIRD, true));
  expect(result.current.mode).toBe(THIRD);

  // act(() => result.current.back());
  // expect(result.current.mode).toBe(SECOND);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});