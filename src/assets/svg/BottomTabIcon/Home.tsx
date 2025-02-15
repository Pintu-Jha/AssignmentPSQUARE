import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

interface CustomIconProps {
    size: number;
    color: string;
    focused: boolean;
  }

const HomeIcon: React.FC<CustomIconProps> = ({size=24,color="#3B3B3B",focused}) => (
  <Svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
  >
    <Path
      fill={color}
      d="M24.549 14.605c.767 0 1.444-.711 1.444-1.63.045-.457-.135-.864-.496-1.22l-2.384-2.36V3.25c0-.899-.645-1.625-1.444-1.625h-1.445c-.8 0-1.445.726-1.445 1.625v1.864L13.972.355A1.393 1.393 0 0 0 13.024 0c-.316 0-.677.05-.993.406L.45 11.756A1.76 1.76 0 0 0 0 12.975c0 .914.632 1.63 1.445 1.63h1.444v3.54c-.004.045-.004.09-.004.141v5.683C2.885 25.09 3.693 26 4.69 26h.723c.054 0 .108-.005.162-.01.068.005.136.01.203.01h2.528c.998 0 1.806-.909 1.806-2.031V19.5c0-.899.646-1.625 1.444-1.625h2.89c.799 0 1.444.726 1.444 1.625v4.469c0 1.122.808 2.031 1.806 2.031h2.551c.063 0 .126 0 .19-.005.049.005.098.005.148.005h.722c.998 0 1.806-.909 1.806-2.031v-.823a4.03 4.03 0 0 0 .023-.411l-.032-8.135h1.445v.005Z"
    />
  </Svg>
)
export default HomeIcon
