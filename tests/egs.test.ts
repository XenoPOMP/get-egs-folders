import { expect } from 'testyts/build/lib/assertion/expect';
import { Test } from 'testyts/build/lib/decorators/test.decorator';
import { TestSuite } from 'testyts/build/lib/decorators/testSuite.decorator';

import { getAllEgsGames, getEgsMainLocation } from '../src';

@TestSuite('EGS functions')
export class EgsTest {
  @Test('Get main installation path')
  async getMain() {
    await expect.not.toThrowAsync(async () => {
      const res = await getEgsMainLocation();

      console.log({
        path: res,
      });
    });
  }

  @Test('Get all EGS games')
  async getAll() {
    await expect.not.toThrowAsync(async () => {
      const res = await getAllEgsGames();

      console.log(res);
    });
  }
}
