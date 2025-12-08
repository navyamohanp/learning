import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useGetPostsQuery} from '../services/postApi';

export default function PostsScreen({navigation}: any) {
  const {data, error, isLoading} = useGetPostsQuery();

  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error fetching data</Text>;

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{padding: 20, borderBottomWidth: 0.5}}
            onPress={() => navigation.navigate('Home')}>
            <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
            <Text>{item.body}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
