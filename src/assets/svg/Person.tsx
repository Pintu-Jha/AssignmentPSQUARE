import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

interface CustomIconProps {
    size: number;
    color: string;
  }

const PersonIcon:React.FC<CustomIconProps> = ({size,color}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    stroke={color}
  >
    <Path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z" />
  </Svg>
)
export default PersonIcon
