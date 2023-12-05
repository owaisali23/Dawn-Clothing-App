import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Button, ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

export default function MyComp() {

  const [products, setProducts] = useState([]);
  // const [imageIndexes, setImageIndexes] = useState({});
  const [page, setPage] = useState(1);
  const [limit] = useState(2);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
         // `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}&select=title,price`);
          `https://api.escuelajs.co/api/v1/products?offset=${(page - 1) * limit}&limit=${limit}`);
        const data = response.data;
        // const initialImageIndexes = {};
        // data.forEach(product => {
        //   initialImageIndexes[product.id] = 0;
        // });
        // setImageIndexes(initialImageIndexes);
        // setProducts(prevProducts => [...prevProducts, ...data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!products.length || (products.length < page * limit)) {
      getProducts();
    }
  }, [page]);



  // const handlePress = productId => {
  //   const updatedIndexes = { ...imageIndexes };
  //   updatedIndexes[productId] = (updatedIndexes[productId] + 1) % 3;
  //   setImageIndexes(updatedIndexes);
  // };

  const loadMore = () => {
    setPage(page + 1);
  };
  return (
    <View className="flex-1 mb-10">
      <Text className="font-bold text-2xl m-3">Products:</Text>
      <View >
        <FlatList
          data={products}
          numColumns={1}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => {
            return (

              <View className="bg-cyan-700 m-3 w-[370] h-[450] rounded-xl shadow-lg">
                <View className="justify-center items-center">
                  <Image className=" w-[280] h-[290] rounded-bl-xl rounded-br-xl"
                    source={{ uri: item.images[0]/*[imageIndexes[item.id]]*/ }}
                  />
                </View>
                <View className="m-4 pb-2 ">
                  <Text className="text-white font-bold text-start text-lg">{item.title}</Text>
                  <Text className="text-white font-semibold text-base">$: {item.price}</Text>
                  <Text className="text-white font-medium text-sm ">{item.description}</Text>
                </View>
                <Pressable className="bg-white absolute bottom-0 right-0 rounded-full p-3 mb-2 mr-4 mt-3 " onPress={() => navigation.navigate('Component2', { item })}>
                  <Text className="text-black font-bold "
                  numberOfLines={2} >
                  Buy Now!
                  </Text>
                </Pressable>
              </View>

            )
          }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loading && <ActivityIndicator />}
        />
      </View>
    </View>
  )

}



// import { FlatList, Image, TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native'
// import React, { useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import axios from "axios";

// export default function MyComp() {
//   const [products, setProducts] = useState([]);
//   const [imageIndexes, setImageIndexes] = useState({});
//   const navigation = useNavigation();

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const response = await axios.get('https://api.escuelajs.co/api/v1/products');
//         const data = response.data;
//         const initialImageIndexes = {};
//         console.log(data.length);
//         data.forEach(product => {
//           initialImageIndexes[product.id] = 0;
//         });
//         setImageIndexes(initialImageIndexes);
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     getProducts();
//   }, []);

//  const handlePress = (productId) => {
//     const updatedIndexes = { ...imageIndexes };
//     updatedIndexes[productId] = (updatedIndexes[productId] + 1) % 3;
//     setImageIndexes(updatedIndexes);
//   };

//   return (
//     <View className="flex-1">
//       <Text className="font-bold text-2xl m-3">Products:</Text>
//       <View className="justify-center items-center p-1 mb-4">
//         <FlatList
//           data={products}
//           numColumns={2}
//           keyExtractor={(item, index) => item.id}
//           renderItem={({ item }) => {
//             return (
//               <TouchableOpacity onPress={() => navigation.navigate('Component2', { item })}>
//                 <View className="bg-cyan-700 m-3 w-[170] h-[170] justify-center items-center rounded-xl shadow-lg">
//                 <TouchableOpacity onPress={() => handlePress(item.id)}>
//                   <Image className="w-[120] h-[100] rounded-xl"
//                     source={{ uri: item.images[imageIndexes[item.id]] }}
//                   />
//                   </TouchableOpacity>
//                   <Text className="text-white font-normal text-center mx-1">{item.title}</Text>
//                   <Text className="text-white font-bold">${item.price}</Text>
//                 </View>
//               </TouchableOpacity>
//             )
//           }}
//         />
//       </View>
//     </View>
//   )
// }













