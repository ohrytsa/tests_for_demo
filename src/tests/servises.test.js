import { FetchData } from "../utils/servises";

global.fetch = require("jest-fetch-mock");

describe("FetchData", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("returns user data after success request", async () => {
    fetch.mockResponseOnce(
      JSON.stringify([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ])
    );

    const data = await FetchData();

    expect(data).toEqual([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ]);
    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users"
    );
  });

  it("returns error after failed request with 404", async () => {
    fetch.mockResponseOnce("", { status: 404 });

    await expect(FetchData()).rejects.toThrow("Failed to fetch data");
  });

  it("returns error after failed request with Network error", async () => {
    fetch.mockRejectOnce(new Error("Network error"));

    await expect(FetchData()).rejects.toThrow("Failed to fetch data");
  });
});
