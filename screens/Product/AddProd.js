import React, { useState } from 'react';
import { Pressable, View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function AddProd() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://fakestoreapi.com/products', {
        title: title,
        price: price,
        description: description,
        image: image,
        category: category,
      });

      console.log('Product added:', response.data);
      Alert.alert('Success', 'Product added successfully!');

      setTitle('');
      setPrice('');
      setDescription('');
      setImage('');
      setCategory('');
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Failed to add product. Please try again.');
    }
  };

  return (
    <View>
      <Text className="font-bold text-2xl mt-3 ml-4">Enter Products Details:</Text>
      <View className="m-5">
        <View className="my-1">
          <Text className="text-[#AA613E] mb-1 pl-1">Title:</Text>
          <TextInput className="bg-gray-200 p-2 rounded-lg"
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
          />
        </View>
        <View className="my-2">
          <Text className="text-[#AA613E] mb-1 pl-1">Price:</Text>
          <TextInput
            className="bg-gray-200 p-2 rounded-lg"
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="numeric"
          />
        </View>
        <View className="my-2">
          <Text className="text-[#AA613E] mb-1 pl-1" >Description:</Text>
          <TextInput
            className="bg-gray-200 p-2 rounded-lg"
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline
          />
        </View>
        <View className="my-2">
          <Text className="text-[#AA613E] mb-1 pl-1">Image URL:</Text>
          <TextInput
            className="bg-gray-200 p-2 rounded-lg"
            value={image}
            onChangeText={setImage}
            placeholder="Enter image URL"
          />
        </View>
        <View className="my-2">
          <Text className="text-[#AA613E] mb-1 pl-1">Category:</Text>
          <TextInput
            className="bg-gray-200 p-2 rounded-lg"
            value={category}
            onChangeText={setCategory}
            placeholder="Enter category"
          />
        </View>
        <Pressable className="bg-[#AA613E] p-3 mt-10 rounded-2xl justify-center items-center" onPress={handleSubmit} >
          <Text className="font-semibold text-white">Add Product!</Text>
        </Pressable>
      </View>
    </View>
  );
}
