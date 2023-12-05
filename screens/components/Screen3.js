import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Screen3() {
  return (
    <View>
      <View  >
     <Image className=" absolute top-6 left-10 w-[280] h-[280]"
             source={require('../../assets/images/back.png')}  
     />
     </View>
      {/* <View  >
     <Image className="absolute top-6 left-3 w-[280] h-[220]"
              source={{uri:'https://i.pinimg.com/originals/77/51/ec/7751ec974e76df5cfa2e70a78b1ad6a6.jpg'}}
     />
     </View> */}
    <View  className="justify-center items-center mt-3 " >
    <Image className="absolute top-4 left-3 w-[280] h-[250]"
              source={{uri:'https://freepngimg.com/thumb/categories/627.png'}}
     />
     </View>
    <View className="mt-[320]">
     <View className=" m-5" >
      <Text className="text-3xl font-bold text-black"> Shoes</Text>
      <Text className="text-2xl font-semibold text-black">$2500</Text>
      <Text className="mt-4 text-lg font-semibold text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
      </View>
      <View className='justify-center items-center p-5 m-4 bg-cyan-700 rounded-xl'>
        <Text className=" text-xl font-semibold text-white" >Buy Now!</Text>
      </View>
      </View>
      </View>
  )
}

const styles = StyleSheet.create({})