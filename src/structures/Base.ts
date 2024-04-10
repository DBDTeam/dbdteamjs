abstract class Base {
  id!: any;
  /* The base data. */
  data: unknown;

  /**
   * @param string - The snowflake
   */
  constructor(id: string | Record<any, any>) {
    this.id = typeof id === "string" ? id : id?.id || id?.user?.id;
  }

  _patch(data: unknown) {
    return data;
  }

  get getBinary() {
    return BigInt(this.id) >> 22n;
  }

  get getEpoch() {
    return 1420070400000n;
  }
}

export { Base };
