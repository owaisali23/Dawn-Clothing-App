import React, { useState } from 'react';
import { Pressable, View, Text, TextInput, Alert, StyleSheet  } from 'react-native';
import axios from 'axios';

export default function ShowUpdate({ route }) {
  const { item } = route.params;

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({}); 
  const [isFormValid, setIsFormValid] = useState(false); 

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://fakestoreapi.com/products/${item.id}`, {
        title: title,
        price: price,
        description: description,
        //   image,
        category: category,
      });

      console.log('Product updated:', response.data);
      Alert.alert('Success', 'Product updated successfully!');

      setTitle('');
      setPrice('');
      setDescription('');
      // setImage('');
      setCategory('');
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'Failed to update product. Please try again.');
    }
  };

  return (
    <View>
      {/* <Text className="font-bold text-2xl mt-3 ml-4">Products:</Text> */}
      <View className="m-5">
        <View className="my-2">
          <Text className="text-[#AA613E] mb-1 pl-1">New Title:</Text>
          <TextInput className="bg-gray-200 p-2 rounded-lg"
            value={title}
            onChangeText={setTitle}
            placeholder={item.title}
          />
        </View>
        <View className="my-2">
          <Text className="text-[#AA613E] mb-1 pl-1">New Price:</Text>
          <TextInput
            className="bg-gray-200 p-2 rounded-lg"
            value={price}
            onChangeText={setPrice}
            placeholder={item.price.toString()}
            keyboardType="numeric"
          />
        </View>
        <View className="my-2">
          <Text className="text-[#AA613E] mb-1 pl-1" >New Description:</Text>
          <TextInput
            className="bg-gray-200 p-2 rounded-lg"
            value={description}
            onChangeText={setDescription}
            placeholder={item.description}
            multiline
          />
        </View>
        <View className="my-2">
          <Text className="text-[#AA613E] mb-1 pl-1">New Image URL:</Text>
          <TextInput
            className="bg-gray-200 p-2 rounded-lg"
            value={image}
            onChangeText={setImage}
            placeholder={item.image}
          />
        </View>
        <View className="my-2">
          <Text className="text-[#AA613E] mb-1 pl-1">New Category:</Text>
          <TextInput
            className="bg-gray-200 p-2 rounded-lg"
            value={category}
            onChangeText={setCategory}
            placeholder={item.category}
          />
        </View>
        <Pressable className="bg-[#AA613E] p-3 mt-8 rounded-2xl justify-center items-center" onPress={handleUpdate} >
          <Text className="font-semibold text-white">Update Product!</Text>
        </Pressable>
      </View>
    </View>
  );
}
