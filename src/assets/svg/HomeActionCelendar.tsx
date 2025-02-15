import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg"


interface CustomIconProps {
    size: number;
    color: string;
  }


const HomeActionCelendar:React.FC<CustomIconProps> = ({size}) => (
  <Svg
    width={size}
    height={size}
    fill="none"
  >
    <Path fill="url(#a)" d="M0 0h34v34H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="scale(.02083)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACE0lEQVR4nO1T3ytDYRg+/8SmhjojyZVcyoV2hfwD7pG4WC7kVxLlZs0dO3e4cuHnFi60Y2PsCIVCWThfYjeEbKe0jotX33Dadsj3renbqe+pp9Z72vO8z/e+ryBwcHBQIxBWWv3haDwQit6vbu21sNahBjYMhBVIM6TcsdahhmH6RdY6P6LS91Yu+rRl0aclnZIGmcw1zv1OysAfOl/eflFKVAu0zTt92vNPpuJ00mSMa7TNU+q84J6IA+CX/83YMXJpMsY12gB56CzSBDCtzTftPdmmmPZu+jWi1RElLUEc4C/juY2oYTq7roC9Zz+vAHOUOgUJgMfsGo2kzbGpa3QXSkdiea2Qi1KnIAHwoWFz/IKY+He+R+yg1ClIAJYUeADJIhOQ0TsUIwUeAPEJAF8hEvzHqtg6dwx65Ud2R2zLaISEPAAq8ATapMssVvXuG69d03dg+l50E5Bz2DB+YjTW7D0nWj1P8AEGVuLQ5DmD1skLcM/fwkYsZZ0AtYOHpltpnDiFoGqRACVdEagbOoIKt5JVn4o8WyPAsD+erq3FUuB0R416/9K9NQJkHnH92LFR75i9sV6Ahoz/t8/wAJ/gE0B8hYAfsVyEFEhh+QBBpCdZNyubqL+SB1B1P/uG37Op6gvEAUIoVS2r+gvzptEng6r+tH0FZQINNq+hXEb6ooz0BMO1SeCXp26eg4NDsAw+AMVSJ4VOjmwQAAAAAElFTkSuQmCC"
        id="b"
        width={48}
        height={48}
      />
    </Defs>
  </Svg>
)
export default HomeActionCelendar
