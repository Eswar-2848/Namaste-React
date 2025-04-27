import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RestaurantCard from "../RestaurantCard";
import MOCK_DATA from "../mocks/resCardMock.json";

it("should render RestaurantCard component with props Data", () => {
  render(<RestaurantCard resData={MOCK_DATA} />);

  const name = screen.getByText("Theobroma");

  expect(name).toBeInTheDocument();
});
