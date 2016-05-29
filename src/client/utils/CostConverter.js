export const replaceCost = (text) => {
  const height = 24;
  if (!text) {
    return null;
  }

  const whiteRx = new RegExp(/{w}/ig);
  text = text.replace(whiteRx, '<img height=\'' + height + '\' src=\'../images/white_mana.png\'/>');

  const blueRx = new RegExp(/{u}/ig);
  text = text.replace(blueRx, '<img height=\'' + height + '\' src=\'../images/blue_mana.png\'/>');

  const blackRx = new RegExp(/{b}/ig);
  text = text.replace(blackRx, '<img height=\'' + height + '\' src=\'../images/black_mana.png\'/>');

  const redRx = new RegExp(/{r}/ig);
  text = text.replace(redRx, '<img height=\'' + height + '\' src=\'../images/red_mana.png\'/>');

  const greenRx = new RegExp(/{g}/ig);
  text = text.replace(greenRx, '<img height=\'' + height + '\' src=\'../images/green_mana.png\'/>');

  const devoidRx = new RegExp(/{c}/ig);
  text = text.replace(devoidRx, '<img height=\'' + height + '\' src=\'../images/devoid_mana.png\'/>');

  const xmanaRx = new RegExp(/{x}/ig);
  text = text.replace(xmanaRx, '<img height=\'' + height + '\' src=\'../images/x_mana.png\'/>');

  const tapRx = new RegExp(/{t}/ig);
  text = text.replace(tapRx, '<img height=\'' + height + '\' src=\'../images/tap.png\'/>');

  const colorlessRxAll = new RegExp(/{(\d+)}/g);
  const colorlessRx = new RegExp(/{(\d+)}/);
  if (colorlessRxAll.test(text)) {
    let colorlessCost = text.match(colorlessRxAll);
    for (let match of colorlessCost) {
      let instance = colorlessRx.exec(match);
      text = text.replace(colorlessRx, '<img height=\'' + height + '\' src=\'../images/' + instance[1] + '_mana.png\'/>');
    }
  }

  return {__html: text};
};
