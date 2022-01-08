import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { generate } from '../../lib';

expect.extend({ toMatchImageSnapshot });

describe('バイナリ', () => {
  test('デフォルト', () => {
    const { buffer } = generate('emo\nji');

    expect(buffer).toMatchImageSnapshot();
  });
});
