import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { FadeInRight, FadeInDown, FadeInLeft } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import SkeletonContent from 'react-native-skeleton-content';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://fakestoreapi.com/products?limit=6`);
                const data = response.data;
                setProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);



    const [images, setimages] = useState([
        ('https://images.template.net/55513/Clothes-Shop-Facebook-Cover-Template-sm-161122484632-555130.jpeg'),
        ('https://marketplace.canva.com/EAFK-xSadAM/1/0/1600w/canva-white-minimalist-fashion-photo-collage-facebook-shops-cover-KvIe076LoPo.jpg'),
        ('https://marketplace.canva.com/EAFiOSpfP0o/1/0/1600w/canva-brown-organic-scrapbook-fashion-apparel-facebook-shops-cover-9Tn1-2cFqXw.jpg')
    ]);

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    return (
        <View className="flex-1 mb-12">
            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-[#AA613E] py-3 flex flex-row justify-between">
                <Animated.Text entering={FadeInLeft.delay(400).duration(1000).springify()} className="font-serif text-white ml-3 text-xl font-extrabold "> Dawn Clothing </Animated.Text>
                <View className="flex-row items-center">
                    <AnimatedTouchable onPress={() => navigation.navigate('ShowProd')} entering={FadeInRight.delay(500).duration(1000).springify()}><Text className="mr-4"> <Icon name="shopping-cart" size={25} color="#FFFF" /></Text></AnimatedTouchable>
                    <AnimatedTouchable onPress={() => navigation.navigate('ShowEdit')} entering={FadeInRight.delay(600).duration(1000).springify()}><Text className="mr-2 mt-1"><Icon name="edit" size={25} color="#FFFF" /></Text></AnimatedTouchable>
                </View>
            </Animated.View>
            <View>
                <FlatList
                    data={products}
                    numColumns={2}
                    nestedScrollEnabled
                    keyExtractor={(item, index) => item.id}
                    ListHeaderComponent={() => {
                        return (
                            <View>
                                <ScrollView horizontal>
                                    {images.map((i, k) => (
                                        < Image

                                            className="object-contain w-[400] h-[330]"
                                            source={{ uri: i }}
                                            key={k}
                                        />))}
                                </ScrollView>
                                <Text className="font-semibold mt-2 ml-4 text-xl">Products:</Text>
                            </View>)
                    }}
                    renderItem={({ item }) => {
                        return (
                            <SkeletonContent
                                isLoading={loading}
                                layout={[
                                    {
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginVertical: 20,
                                        children: [
                                            {
                                                height: height / 5,
                                                width: width / 4,
                                                marginHorizontal: 5,
                                            },
                                            {
                                                height: height / 5,
                                                width: width / 4,
                                                marginHorizontal: 5,
                                            },
                                            {
                                                height: height / 5,
                                                width: width / 4,
                                                marginHorizontal: 5,
                                            },
                                        ],
                                    },
                                ]}
                                duration={2000}
                            >
                                <View className="bg-[#AA613E] m-3 w-[170] h-[170] justify-center items-center rounded-xl shadow-lg">
                                    <Image
                                        className="w-[130] h-[100] rounded-xl"
                                        source={{ uri: item.image }}
                                    />
                                    <Text numberOfLines={2} ellipsizeMode="tail" className="text-white font-sm text-center mx-1">{item.title}</Text>
                                    <Text className="text-white font-bold">${item.price}</Text>
                                </View>
                            </SkeletonContent>
                        );
                    }}
                />
            </View>
        </View>
    );
}

export default Home
