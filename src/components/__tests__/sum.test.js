import sum from "../Sum";

test("Sum function should calculate sum of 2 num", () => {
  const result = sum(4, 5);

  //Assertion
  expect(result).toBe(9);
});
