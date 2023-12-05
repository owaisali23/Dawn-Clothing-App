import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, ActivityIndicator, FlatList, Image, Text, View, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';

export default function ShowProd() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(3);
    const navigation = useNavigation();
    const [selectedProduct, setSelectedProduct] = useState(null);


    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://fakestoreapi.com/products?limit=${limit}`);
                const data = response.data;
                setProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, [limit]);

    const bottomSheetModalRef = useRef(null);
    
    const openBottomSheet = (item) => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        }
        setSelectedProduct(item);
    };

    const loadMore = () => {
        setLimit(limit + 3);
    };
    
    return (
        // loading? < ActivityIndicator className="mt-[80%]"/>  :
        <BottomSheetModalProvider>
            <View className="flex-1 mb-10">
                <View>
                    <Text className="text-stone-700 font-bold text-2xl m-3">Products:</Text>
                    <Pressable
                        className="bg-[#AA613E] absolute bottom-0 right-0 rounded-full p-2 mb-2 mr-4 mt-3"
                        onPress={() => navigation.navigate('ShowEdit')}
                    ><Text><Icon name="edit" size={25} color="#FFFF" /></Text></Pressable>
                    <Pressable
                        className="bg-[#AA613E] absolute bottom-0 right-0 rounded-full p-2 mb-2 mr-[70] mt-3"
                        onPress={() => navigation.navigate('AddProd')}
                    ><Text><Icon name="plus-square-o" size={25} color="#FFFF" /></Text></Pressable>
                </View>
                <View>
                    <FlatList
                        data={products}
                        numColumns={1}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View className="bg-gray-100 border-2 border-[#AA613E] m-3 w-[370] h-[450] rounded-xl shadow-lg">
                                <View className="justify-center items-center">
                                    <Image
                                        className="w-[280] h-[290] rounded-bl-xl rounded-br-xl"
                                        source={{ uri: item.image }}
                                    />
                                </View>
                                <View className="mt-4 ml-5 mr-4">
                                    <Text numberOfLines={2} ellipsizeMode="tail" className="text-stone-700 font-bold text-start text-lg">{item.title}</Text>
                                    <Text className="text-gray-700 font-medium text-base">{item.category}</Text>
                                </View>
                                <View className="flex-row items-center justify-between mx-5">
                                    <Text className="text-gray-500  font-bold text-lg">$ {item.price}</Text>
                                    <Pressable
                                        className="bg-[#AA613E] rounded-full p-3  "
                                        onPress={() => {
                                            () => openBottomSheet(item)
                                          }}
                                    >
                                        <Text className="text-white font-bold">
                                            Buy Now!
                                        </Text>
                                    </Pressable>
                                </View>
                                <BottomSheetModal
                                    ref={bottomSheetModalRef}
                                    index={0}
                                    snapPoints={['25%', '50%', '90%']}
                                >
                                    <BottomSheetScrollView
                                        style={{
                                            flex: 1,
                                            backgroundColor: '#f8ccb7',
                                        }}>
                                        <Text className="text-gray-900 font-semibold text-2xl text-center m-4">Product is added to cart!</Text>
                                        <View className="flex-row items-center justify-between mx-5">
                                        <View className="mt-4 ml-5 mr-4">
                                            <Text numberOfLines={2} ellipsizeMode="tail" className="text-stone-700 font-bold text-start text-lg">{selectedProduct.title}</Text>
                                            <Text className="text-gray-800 font-medium text-base ml-1">{selectedProduct.category}</Text>
                                        </View>
                                            <Text className="text-gray-700  font-bold text-lg">$ {selectedProduct.price}</Text>
                                        </View>
                                    </BottomSheetScrollView>
                                </BottomSheetModal>
                            </View>

                        )}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={loading && <ActivityIndicator />}
                    />
                </View>
                {/* <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={['25%', '50%', '90%']}
            >
                <BottomSheetScrollView 
                style={{
                    flex: 1,
                    backgroundColor: '#E8E8E8',
                  }}>
                    <Text className="text-[#AA613E] font-semibold text-2xl text-center m-4">Product is added to cart!</Text>
                </BottomSheetScrollView>
            </BottomSheetModal> */}
            </View>
        </BottomSheetModalProvider>


    );
}










// import React, { useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { Pressable, Button, ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
// import axios from 'axios';

// export default function ShowProd() {

//   const [products, setProducts] = useState([]);
//   // const [imageIndexes, setImageIndexes] = useState({});
//   const [page, setPage] = useState(1);
//   const [limit] = useState(2);
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//         //    `https://fakestoreapi.com/products?limit=5`);
//           `https://api.escuelajs.co/api/v1/products?offset=${(page - 1) * limit}&limit=${limit}`);
//         const data = response.data;

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!products.length || (products.length < page * limit)) {
//       getProducts();
//     }
//   }, [page]);


//   const loadMore = () => {
//     setPage(page + 1);
//   };
//   return (
//     <View className="flex-1 mb-10">
//       <Text className="font-bold text-2xl m-3">Products:</Text>
//       <View >
//         <FlatList
//           data={products}
//           numColumns={1}
//           keyExtractor={(item, index) => item.id}
//           renderItem={({ item }) => {
//             return (

//               <View className="bg-cyan-700 m-3 w-[370] h-[450] rounded-xl shadow-lg">
//                 <View className="justify-center items-center">
//                   <Image className=" w-[280] h-[290] rounded-bl-xl rounded-br-xl"
//                     source={{ uri: item.images/*[imageIndexes[item.id]]*/ }}
//                   />
//                 </View>
//                 <View className="m-4 pb-2 ">
//                   <Text className="text-white font-bold text-start text-lg">{item.title}</Text>
//                   <Text className="text-white font-semibold text-base">$: {item.price}</Text>
//                   <Text className="text-white font-medium text-sm ">{item.description}</Text>
//                 </View>
//                 <Pressable className="bg-white absolute bottom-0 right-0 rounded-full p-3 mb-2 mr-4 mt-3 " onPress={() => navigation.navigate('Component2', { item })}>
//                   <Text className="text-black font-bold "
//                   numberOfLines={2} >
//                   Buy Now!
//                   </Text>
//                 </Pressable>
//               </View>

//             )
//           }}
//           onEndReached={loadMore}
//           onEndReachedThreshold={0.1}
//           ListFooterComponent={loading && <ActivityIndicator />}
//         />
//       </View>
//     </View>
//   )

// }