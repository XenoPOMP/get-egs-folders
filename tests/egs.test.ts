import { expect } from 'testyts/build/lib/assertion/expect';
import { Test } from 'testyts/build/lib/decorators/test.decorator';
import { TestSuite } from 'testyts/build/lib/decorators/testSuite.decorator';

import { getAllEgsGames, getEgsMainLocation } from '../src';

@TestSuite('EGS functions')
export class EgsTest {
  @Test('Get main installation path')
  async getMain() {
    // await expect.not.toThrowAsync(async () => {
    //
    // });

    const res = await getEgsMainLocation({
      debug: true,
    });

    // console.log({
    //   path: res,
    // });
  }

  @Test('Get all EGS games')
  async getAll() {
    const res = await getAllEgsGames({
      debug: true,
    });

    // console.log(res);
  }
}
