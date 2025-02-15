import React from 'react';
import { Text, TextStyle, TextProps } from 'react-native';
import { textScale } from '../../styles/responsiveStyles';
import { fontNames } from '../../styles/typography';

interface TextComponentProps extends TextProps {
  text?: string;
  color?: string;
  size?: number;
  flex?: number;
  style?: TextStyle;
  fontWeight?: TextStyle['fontWeight'];
  textAlign?: TextStyle['textAlign'];
  font?: string;
  numberOfLines?: number;
  underline?: boolean;
  lineHeight?: number;
}

const TextComponent: React.FC<TextComponentProps> = ({
  text = '',
  color = '#000',
  size = textScale(14),
  flex = 0,
  style = {},
  fontWeight = 'normal',
  textAlign = 'auto',
  font = fontNames.ROBOTO_FONT_FAMILY_REGULAR,
  numberOfLines,
  underline = false,
  lineHeight,
  ...props
}) => {
  const baseTextStyle: TextStyle = {
    color,
    textDecorationLine: underline ? 'underline' : 'none',
    fontSize: textScale(size),
    flex,
    fontWeight,
    textAlign,
    fontFamily: font,
    lineHeight,
  };

  return (
    <Text
      {...props}
      allowFontScaling={false}
      style={[baseTextStyle, style]}
      numberOfLines={numberOfLines}>
      {text}
    </Text>
  );
};

export default TextComponent;
