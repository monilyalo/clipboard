const { deterministicPartitionKey } = require("./dpk");

const longString = "306bff8a719aa21b04a0b06841e495a569922a7188671d1e59c1629820c977e15f0e2024b98f7484869e5ed13a6ee0b0e7eef56eab4d927dbe2e6035d78387b0306bff8a719aa21b04a0b06841e495a569922a7188671d1e59c1629820c977e15f0e2024b98f7484869e5ed13a6ee0b0e7eef56eab4d927dbe2e6035d78387b0306bff8a719aa21b04a0b06841e495a569922a7188671d1e59c1629820c977e15f0e2024b98f7484869e5ed13a6ee0b0e7eef56eab4d927dbe2e6035d78387b0"

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the key when given '2' as input", () => {
    const trivialKey = deterministicPartitionKey('2');
    expect(trivialKey).toBe("306bff8a719aa21b04a0b06841e495a569922a7188671d1e59c1629820c977e15f0e2024b98f7484869e5ed13a6ee0b0e7eef56eab4d927dbe2e6035d78387b0");
  });

  it("Returns a 256 length key when string size is more than 256 char as input", () => {
    const trivialKey = deterministicPartitionKey(longString);
    expect(trivialKey).toBe("b0cdcf46863da039d88a1b7d68e3d0855d881877e83c078ea0bef435d29496c46be27291b422c87ff12fe6faed5570ec9aa3094b54642626fd8a92885a84e06c");
  });

  it("Returns the key when given partitionKey as input", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: "20"});
    expect(trivialKey).toBe("20");
  });

  it("Returns a 256 length key when partitionKey size is more than 256 char as input", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: longString});
    expect(trivialKey).toBe("443953a16d7140135f69184cd13a42cd0fb1586157b083dc268b3e081a69710bffce520bdc03d5cbf95dab697fa93fb7cb5ac5bb8fda51b1478132e3b3ee9b9d");
  });
});
