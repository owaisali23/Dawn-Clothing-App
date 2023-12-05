import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {Image, Pressable, ActivityIndicator, FlatList, View, Text,  Alert } from 'react-native';
import axios from 'axios';

export default function ShowEdit() {

const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);
const [limit, setLimit] = useState(4); 
const navigation = useNavigation();

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

useEffect(() => {
  getProducts();
}, [limit]);

const loadMore = () => {
  setLimit(limit + 3); 
};

const handleDelete = async (id) => {
  try {
    const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
    console.log('Product deleted:', response.data);
    Alert.alert('Success', 'Product deleted successfully!');
    // Reload products after deleting
    //await getProducts();
  } catch (error) {
    console.error('Error deleting product:', error);
    Alert.alert('Error', 'Failed to delete product. Please try again.');
  }
};

  return (
    // loading? < ActivityIndicator className="mt-[80%]"/>  :
    <View className="flex-1 ">
      {/* <Text className="font-bold text-2xl m-3">Products:</Text> */}
      <View>
        <FlatList
          data={products}
          numColumns={1}
          keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View className="bg-gray-100 border-2 border-[#AA613E] m-3 w-[370] h-[450] rounded-xl shadow-lg">
              <View className="justify-center items-center">
                <Image
                  className="w-[280] h-[290] rounded-bl-xl rounded-br-xl "
                  source={{ uri: item.image }}
                />
              </View>
              <View className="mt-4 mx-5">
                <Text numberOfLines={2} ellipsizeMode="tail" className="text-black font-bold text-start text-lg">{item.title}</Text>
                <Text className="text-gray-700 font-medium text-base">{item.category}</Text>
              </View>
              <View className="flex-row justify-between items-center mx-5 my-1">
              <Text className="text-gray-800 font-semibold text-lg"> $: {item.price}</Text>
              <View className="flex-row">
              <Pressable
                className="bg-[#AA613E] rounded-full mr-4 p-3"
                onPress={() => navigation.navigate('Update', { item })}
              >
                <Text className="text-white font-bold">
                  Update!
                </Text>
              </Pressable>
              <Pressable
                className="bg-[#AA613E] rounded-full p-3"
                onPress={() => handleDelete(item.id)}
              >
                <Text className="text-white font-bold" >
                  Delete
                </Text>
              </Pressable>
              </View>
              </View>
            </View>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loading && <ActivityIndicator className='mb-10'/>}
        />
      </View>
    </View>
  );
}
