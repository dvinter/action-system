export class SuperArray extends Array {
  constructor(value: number) {
    super(value);
  }

  public static compare(array1: any[], array2: any[]) {
    const jsonOne = JSON.stringify(array1);
    const jsonTwo = JSON.stringify(array2);

    if (jsonTwo == jsonOne) {
    }

    return jsonOne === jsonTwo;
  }
}
