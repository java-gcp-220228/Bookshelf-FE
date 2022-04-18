import { AvailibityPipe } from './availibity.pipe';

describe('AvailibityPipe', () => {
  it('create an instance', () => {
    const pipe = new AvailibityPipe();
    expect(pipe).toBeTruthy();
  });

  it('should display false if string is Availible', () => {
    let pipe = new AvailibityPipe()

    expect(pipe.transform('Available')).toEqual(false);
  })

  it('should display true if string is not Availible', () => {
    let pipe = new AvailibityPipe()

    expect(pipe.transform('Smores')).toEqual(true);
  })
});
