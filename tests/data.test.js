const { shuffle, format, removeDuplicates, getHomeworldNames } = require("../data");
const api = require("../api");

describe("shuffle", () => {
  it("should shuffle the array elements", () => {
    const data = [1, 2, 3, 4, 5];
    const shuffledData = shuffle([...data]);
    expect(shuffledData).toHaveLength(data.length);
    expect(shuffledData).not.toEqual(data); // Expect the order to be different
    expect(shuffledData.sort()).toEqual(data.sort()); // Same elements in any order
  });
});

describe("format", () => {
  it("should parse and format JSON strings to an array of objects with name and homeworld", () => {
    const data = [
      JSON.stringify({ name: "Luke", homeworld: "Tatooine" }),
      JSON.stringify({ name: "Leia", homeworld: "Alderaan" })
    ];
    const formattedData = format(data);
    expect(formattedData).toEqual([
      { name: "Luke", homeworld: "Tatooine" },
      { name: "Leia", homeworld: "Alderaan" }
    ]);
  });
});

describe("removeDuplicates", () => {
  it("should remove duplicates based on name and homeworld", () => {
    const data = [
      { name: "Luke", homeworld: "Tatooine" },
      { name: "Leia", homeworld: "Alderaan" },
      { name: "Luke", homeworld: "Tatooine" }
    ];
    const noDuplicatedData = removeDuplicates(data);
    expect(noDuplicatedData).toEqual({
      Tatooine: ["Luke"],
      Alderaan: ["Leia"]
    });
  });

  it("should handle empty data", () => {
    const data = [];
    const noDuplicatedData = removeDuplicates(data);
    expect(noDuplicatedData).toEqual({});
  });
});

describe("getHomeworldNames", () => {
  it("should map homeworld URLs to their names", async () => {
    const citizens = {
      "https://swapi.dev/api/planets/1/": ["Luke", "Anakin"],
      "https://swapi.dev/api/planets/2/": ["Leia"]
    };
    
    jest.spyOn(api, "getHomeworld").mockImplementation((url) => {
      const homeworlds = {
        "https://swapi.dev/api/planets/1/": { name: "Tatooine" },
        "https://swapi.dev/api/planets/2/": { name: "Alderaan" }
      };
      return Promise.resolve(homeworlds[url]);
    });

    const homeworldNames = await getHomeworldNames(citizens);
    expect(homeworldNames).toEqual({
      Tatooine: ["Luke", "Anakin"],
      Alderaan: ["Leia"]
    });

    api.getHomeworld.mockRestore();
  });

  it("should return the input if the API call fails", async () => {
    const citizens = {
      "https://swapi.dev/api/planets/1/": ["Luke", "Anakin"]
    };

    jest.spyOn(api, "getHomeworld").mockImplementation(() => Promise.reject());

    const result = await getHomeworldNames(citizens);
    expect(result).toEqual(citizens);

    api.getHomeworld.mockRestore();
  });
});
