abstract class Base {
  id!: any;
  /**
   * @param string - The snowflake
   */
  constructor(id: string | Record<any, any>) {
    this.id =
      typeof id === "string"
        ? id
        : id?.id || id?.user?.id || id?.author?.id || id?.member?.user?.id;
  }

  _patch(data: unknown) {
    return data;
  }

  get ___getBinary() {
    return BigInt(this.id || 0) >> 22n;
  }

  get ___getEpoch() {
    return 1420070400000n;
  }
}

export { Base };
