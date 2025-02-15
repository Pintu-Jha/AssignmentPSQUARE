import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

interface CustomIconProps {
    size: number;
    color: string;
  }

const MenuIcon:React.FC<CustomIconProps> = ({size,color}) => (
  <Svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
  >
    <Path
      fill={color}
      d="M0 6.188c0-1.141 1.053-2.063 2.357-2.063h28.286c1.304 0 2.357.922 2.357 2.063 0 1.14-1.053 2.062-2.357 2.062H2.357C1.053 8.25 0 7.328 0 6.187ZM0 16.5c0-1.14 1.053-2.063 2.357-2.063h28.286c1.304 0 2.357.922 2.357 2.063 0 1.14-1.053 2.063-2.357 2.063H2.357C1.053 18.563 0 17.64 0 16.5Zm33 10.313c0 1.14-1.053 2.062-2.357 2.062H2.357C1.053 28.875 0 27.953 0 26.812c0-1.14 1.053-2.062 2.357-2.062h28.286c1.304 0 2.357.922 2.357 2.063Z"
    />
  </Svg>
)
export default MenuIcon
