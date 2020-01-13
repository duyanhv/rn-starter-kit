#!/bin/sh
base="./src/assets/images/app_icon.png"
noAlphaIcon="./src/assets/images/app_icon_no_alpha.png"
roundIcon="./src/assets/images/app_icon_round.png"
iosIconFolder="./ios/mobile/Images.xcassets/AppIcon.appiconset"
iosSplashIconFolder="./ios/mobile/Images.xcassets/SplashIcon.imageset"
androidIconFolder="./android/app/src/main/res"
roundIconRadius=512
halfRadius=$(( roundIconRadius / 2 ))
echo $z

convert "$base" -alpha remove "${noAlphaIcon}"
echo "Wrote ${noAlphaIcon}"

convert "$base"  \( +clone -alpha transparent -draw "circle ${halfRadius},${halfRadius} ${roundIconRadius},${halfRadius}" \) -compose copyopacity -composite "${roundIcon}"
# convert "$base" -alpha on \( +clone -threshold -1 -negate -fill white -draw "circle 539,539 539,0" \) -compose copy_opacity -composite "${roundIcon}"
# magick "$base" \( +clone -threshold 101% -fill white -draw "circle %[fx:int(w/2)],%[fx:int(h/2)] %[fx:int(w/2)],%[fx:${roundIconRadius}+int(h/2)]" \) -channel-fx "| gray=>alpha" "${roundIcon}"
echo "Wrote ${roundIcon}"

iosIconNames=(
  'icon-1024@1x' 
  'icon-20@1x' 'icon-20@2x' 'icon-20@3x' 
  'icon-29@1x' 'icon-29@2x' 'icon-29@3x' 
  'icon-40@1x' 'icon-40@2x' 'icon-40@3x' 
  'icon-50@1x' 'icon-50@2x' 
  'icon-57@1x' 'icon-57@2x' 
  'icon-60@2x' 'icon-60@3x' 
  'icon-72@1x' 'icon-72@2x' 
  'icon-76@1x' 'icon-76@2x'
  'icon-83.5@2x'
)
iosIconResolutions=(
  '1024' 
  '20' '40' '60' 
  '29' '58' '87' 
  '40' '80' '120' 
  '50' '100' 
  '57' '114' 
  '120' '180' 
  '72' '144' 
  '76' '152' 
  '167'
)
for (( i = 0; i < ${#iosIconNames[@]}; ++i )); do
  convert "$noAlphaIcon" -resize "${iosIconResolutions[i]}x${iosIconResolutions[i]}" -unsharp 1x4 "${iosIconFolder}/${iosIconNames[i]}.png"
  echo "Wrote ${iosIconFolder}/${iosIconNames[i]}.png"
done

iosSplashIconNames=(
  'app_icon@1x' 'app_icon@2x' 'app_icon@3x' 
)
iosSplashIconResolutions=(
  '100' '200' '300'
)
for (( i = 0; i < ${#iosSplashIconNames[@]}; ++i )); do
  convert "$base" -resize "${iosSplashIconResolutions[i]}x${iosSplashIconResolutions[i]}" -unsharp 1x4 "${iosSplashIconFolder}/${iosSplashIconNames[i]}.png"
  echo "Wrote ${iosSplashIconFolder}/${iosSplashIconNames[i]}.png"
done

androidIconNames=(
  'mipmap-hdpi/ic_launcher' 'mipmap-ldpi/ic_launcher' 'mipmap-mdpi/ic_launcher' 'mipmap-xhdpi/ic_launcher' 'mipmap-xxhdpi/ic_launcher' 'mipmap-xxxhdpi/ic_launcher' 
)
androidIconResolutions=(
  '72' '36' '48' '96' '144' '192'
)
for (( i = 0; i < ${#androidIconNames[@]}; ++i )); do
  convert "$base" -resize "${androidIconResolutions[i]}x${androidIconResolutions[i]}" -unsharp 1x4 "${androidIconFolder}/${androidIconNames[i]}.png"
  echo "Wrote ${androidIconFolder}/${androidIconNames[i]}.png"
done

androidRoundIconNames=(
  'mipmap-hdpi/ic_launcher_round' 'mipmap-mdpi/ic_launcher_round' 'mipmap-xhdpi/ic_launcher_round' 'mipmap-xxhdpi/ic_launcher_round' 'mipmap-xxxhdpi/ic_launcher_round' 
)
androidRoundIconResolutions=(
  '72' '48' '96' '144' '192'
)
for (( i = 0; i < ${#androidRoundIconNames[@]}; ++i )); do
  convert "$roundIcon" -resize "${androidRoundIconResolutions[i]}x${androidRoundIconResolutions[i]}" -unsharp 1x4 "${androidIconFolder}/${androidRoundIconNames[i]}.png"
  echo "Wrote ${androidIconFolder}/${androidRoundIconNames[i]}.png"
done