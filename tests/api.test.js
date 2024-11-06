const axios = require("axios");
const { decrypt, getHomeworld } = require("../api");
const constants = require("../constants");

jest.mock("axios");

describe("decrypt", () => {
  it("should call the decrypt API and return decrypted data", async () => {
    const mockData = { encryptedData: "test" };
    const mockResponse = { decryptedData: "mockedData" };

    axios.post.mockResolvedValue({ data: mockResponse });

    const result = await decrypt(mockData);

    expect(axios.post).toHaveBeenCalledWith(constants.DECRYPT_URL, mockData, {
      headers: {
        "x-api-key": constants.DECRYPT_KEY,
      },
    });
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error if the API call fails", async () => {
    const mockData = { encryptedData: "test" };

    axios.post.mockRejectedValue(new Error("Decryption error"));

    await expect(decrypt(mockData)).rejects.toThrow("Decryption error");
  });
});

describe("getHomeworld", () => {
  it("should fetch homeworld data and return it", async () => {
    const mockUrl = "https://swapi.co/api/planets/1/";
    const mockResponse = { name: "Tatooine" };

    axios.get.mockResolvedValue({ data: mockResponse });

    const result = await getHomeworld(mockUrl);

    const formattedUrl = mockUrl.replace("swapi.co", "swapi.dev");
    expect(axios.get).toHaveBeenCalledWith(formattedUrl);
    expect(result).toEqual(mockResponse);
  });

  it("should return null if the API call fails", async () => {
    const mockUrl = "https://swapi.co/api/planets/1/";

    axios.get.mockRejectedValue(new Error("API error"));

    const result = await getHomeworld(mockUrl);
    expect(result).toBeNull();
  });
});