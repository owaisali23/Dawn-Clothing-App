import {useState, React} from 'react';
import {  TouchableOpacity, FlatList, View, Text, Image} from 'react-native';

const Component2 = ({ route }) => {
  const { item } = route.params;

  const [images, setimages] = useState([
    require('../../assets/images/shoes.png'),
    // require('../../assets/images/shoes2.png'),
    // require('../../assets/images/shoes3.png'),
    require('../../assets/images/shoes4.png'),
  ]);

  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const scaleStyle = isPressed ? { transform: [{ scale: 1.5 }] } : {};

 
  return (
    <View>
  
    <View  >
     <Image className= "absolute left-3 w-[380] h-[330]"
             source={require('../../assets/images/back.png')}  
     />
    </View>
    <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={1}>
    <View style={scaleStyle}>
    <FlatList
    horizontal={true} 
    showsHorizontalScrollIndicator={false} 
    data={images}
    renderItem={ ({ item, index }) => (
      
      <Image className=" object-contain w-[370] h-[370] mr-5" source={item} 
        key={index} 
        
      />
    )}
  />
  </View>
  </TouchableOpacity>
     <View >
     <View className="m-5" >
      <Text className="text-3xl font-bold text-black">Title:{item.title}</Text>
      <Text className="text-2xl font-semibold text-black">Price: ${item.price}</Text>
      <Text className="mt-3 text-sm font-semibold text-gray-600">Details: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  {item.description}</Text>
     </View>
      <View className='justify-center items-center p-5 my-4 mx-8 bg-cyan-700 rounded-3xl'>
        <Text className=" text-xl font-semibold text-white" >Buy Now!</Text>
      </View>                                                                 
       </View>
    </View>
  );
};

export default Component2;


// import { FlatList, Image,TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native'
// import React, { useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';

// import axios from "axios";

// export default function MyComp() {
//   const [products, setProducts] = useState([]);
//   const [index, setIndex] = useState(0); 
//   const navigation = useNavigation();

//   useEffect(() => {
//     const getProducts = () => {
//       axios
//         .get('https://api.escuelajs.co/api/v1/products')
//         // .then((res) => res.json())
//         // .then((json) => setProducts(json))
//         .then((response) => {
//           const data = response.data;
//           setProducts(data);
//           //  console.log(data); 
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     };
//     getProducts();
//   }, []);

//   const handlePress = () => {
//     let nextIndex = index + 1;
//     if (nextIndex > 2) {
//       nextIndex = 0; 
//     }
//     setIndex(nextIndex);
//   };

  
//  return (
//     <View>
//     <Text className="font-bold text-2xl m-3 ">Products:</Text>
//     <View className="justify-center items-center p-1">
//       <FlatList 
//         // keyExtractor={item => item.id}
//         data={products}
//         numColumns={2}
//         keyExtractor={(item, index) => item.id}
//         renderItem={({ item }) => {
//           return(
//           <TouchableOpacity onPress={() => navigation.navigate('Component2', { item })}> 
//            <View className="bg-cyan-700 m-3 w-[170] h-[170] justify-center items-center rounded-xl shadow-lg" >
//             <TouchableOpacity 
//             onPress={() => handlePress()}
//             >
//             <Image  className="w-[120] h-[100] rounded-xl"
//               source={{uri:item.images[index]}}
//             />
//             </TouchableOpacity>
//             <Text className="text-white font-normal text-center mx-1 ">{item.title}</Text>
//             <Text className="text-white font-bold">${item.price}</Text>
//            </View>
//           </TouchableOpacity>
//         )}}
//       />
//     </View>
//     </View>
//   )
// }

// // const styles = StyleSheet.create({})

