const fs = require("fs");
const { read, write } = require("../file");
const citizens = require("../data");
const constants = require("../constants");

describe("read", () => {
  beforeEach(() => {
    jest.spyOn(fs.promises, "readFile").mockImplementation();
    citizens.shuffle = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should read the file, shuffle citizens, and return a limited number based on MAX_NUM_CITIZENS", async () => {
    const mockFileData = "Luke\nLeia\nAnakin\nHan";
    fs.promises.readFile.mockResolvedValue(mockFileData);

    citizens.shuffle.mockImplementation((data) => [
      "Han",
      "Anakin",
      "Leia",
      "Luke",
    ]);
    constants.MAX_NUM_CITIZENS = 2;

    const result = await read("mockFilePath.txt");

    expect(fs.promises.readFile).toHaveBeenCalledWith(
      "mockFilePath.txt",
      "utf-8"
    );
    expect(citizens.shuffle).toHaveBeenCalledWith([
      "Luke",
      "Leia",
      "Anakin",
      "Han",
    ]);
    expect(result).toEqual(["Han", "Anakin"]);
  });

  it("should throw an error if reading file fails", async () => {
    fs.promises.readFile.mockRejectedValue(new Error("File read error"));

    await expect(read("mockFilePath.txt")).rejects.toThrow("File read error");
    expect(fs.promises.readFile).toHaveBeenCalledWith(
      "mockFilePath.txt",
      "utf-8"
    );
  });
});

describe("write", () => {
  beforeEach(() => {
    fs.writeFile = jest.fn((_, __, ___, callback) => callback(null));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should write formatted data to file", async () => {
    const data = {
      Tatooine: ["Luke", "Anakin"],
      Alderaan: ["Leia"],
    };

    const expectedFileContent =
      "Tatooine\n- Luke\n- Anakin\n\nAlderaan\n- Leia\n\n";
    const outputFile = "citizens-super-secret-info.txt";

    await write(data);

    expect(fs.writeFile).toHaveBeenCalledWith(
      outputFile,
      expectedFileContent,
      "utf-8",
      expect.any(Function)
    );
  });

  it("should log an error if writing to file fails", async () => {
    const data = { Tatooine: ["Luke"] };

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    fs.writeFile.mockImplementation((_, __, ___, callback) =>
      callback(new Error("Write error"))
    );

    await write(data);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error writing to file:",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});
