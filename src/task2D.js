import colorString from 'color-string';
import colorParser from 'color-parser';

const PATTERN_RGB_COLOR = /rgb[a]?\((?:\s*([0-9]{0,3})\s*,\s*([0-9]{0,3})\s*,\s*([0-9]{0,3})\s*,\s*([0-9]{0,3})\s*)\)/i;

export default (req, res) => {
  let result;
  let { color='' } = req.query;
  color = color.trim().replace(/%20/ig, ' ');
  color = /^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color) ? `#${color}` : color;

  const rgb = colorString.get.rgb(color);
  const model = rgb ? colorString.get(color).model : null;

  let validColor = true;

  switch (model) {
    case 'rgb':
      const colorObject = colorParser(color);
      const colorArray = color.match(PATTERN_RGB_COLOR);
      validColor = (
        colorObject &&
        colorObject.r >= 0 && colorObject.r < 256 &&
        colorObject.g >= 0 && colorObject.g < 256 &&
        colorObject.b >= 0 && colorObject.b < 256 &&
        (!colorArray || Number(colorArray[4]) >= 0 && Number(colorArray[4]) <=1)
      ) ? true : false;
      break;
  }

  if (rgb && validColor) {
    res.send(colorString.to.hex(rgb).toLowerCase());
  } else {
    res
      .status(500)
      .send('Invalid color');
  }
};
