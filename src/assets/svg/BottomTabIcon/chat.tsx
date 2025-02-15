import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface CustomIconProps {
    size: number;
    color: string;
    focused: boolean;
  }

const ChatIcon: React.FC<CustomIconProps> = ({size= 24,color = "#3B3B3B",focused}) => (
  <Svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
  >
    <Path
      fill={color}
      d="M3.25 0A3.253 3.253 0 0 0 0 3.25v14.626a3.253 3.253 0 0 0 3.25 3.25h4.875v4.063c0 .31.173.589.447.726a.822.822 0 0 0 .853-.076l6.282-4.713h7.043a3.253 3.253 0 0 0 3.25-3.25V3.25A3.253 3.253 0 0 0 22.75 0H3.25Z"
    />
  </Svg>
)
export default ChatIcon
