import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import "@testing-library/jest-dom";
import Home from "../Home";
import MOCK_DATA from "../mocks/mockResListsData.json";
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Should Search Res List for burger text input", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  );

  const cardsBeforeSearch = screen.getAllByTestId("resCard");
  expect(cardsBeforeSearch.length).toBe(8);

  const searchBtn = screen.getByRole("button", { name: "Search" });

  const searchInput = screen.getByTestId("searchInput");

  fireEvent.change(searchInput, { target: { value: "m" } });

  fireEvent.click(searchBtn);

  //screen should load 4 res cards
  const cards = screen.getAllByTestId("resCard");

  expect(cards.length).toBe(4);
});

it("Should filter Top Rated Restaurant", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  );

  const topRatedBtn = screen.getByRole("button", {
    name: "Top Rated Restaurants",
  });

  fireEvent.click(topRatedBtn);

  const cards = screen.getAllByTestId("resCard");

  expect(cards.length).toBe(5);
});
