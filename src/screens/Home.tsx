import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderWithTitle from '../components/headerback';
import {setLanguage, t} from '../utilities/languages/i18n';

const Home = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState('');
  const {width} = Dimensions.get('window');
  const height = width * (198 / 393);

  const getPosts = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts');
      console.log('Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  const [refresh, setRefresh] = useState(false);

  const changeLang = lang => {
    setLanguage(lang);
    setRefresh(!refresh);
  };

  return (
    // <View style={{paddingTop: 70, paddingHorizontal: 20}}>
    //   {/* Back Button */}
    //   <TouchableOpacity onPress={() => navigation.pop()}>
    //     <Text
    //       style={{
    //         fontSize: 18,
    //         marginBottom: 20,
    //         backgroundColor: 'black',
    //         color: 'white',
    //         width: 40,
    //       }}>
    //       Back
    //     </Text>
    //   </TouchableOpacity>

    //   {/* Loading */}
    //   {loading && <ActivityIndicator size="large" />}

    //   {/* Error */}
    //   {error !== '' && <Text style={{color: 'red'}}>{error}</Text>}

    //   {/* Posts List */}
    //   {/* <FlatList
    //     data={posts}
    //     keyExtractor={item => item.id.toString()}
    //     renderItem={({item}) => (
    //       <View
    //         style={{
    //           padding: 12,
    //           borderBottomWidth: 0.4,
    //           borderColor: 'tan',
    //         }}>
    //         <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
    //       </View>
    //     )}
    //   /> */}
    //   <Text>Hi</Text>
    // </View>
    <View style={styles.bg}>
      <Text style={{fontSize: 32, textAlign: 'center'}}>{t('hello')}</Text>

      <Button title="English" onPress={() => changeLang('en')} />
      <Button title="Hindi" onPress={() => changeLang('hi')} />
      <Button title="French" onPress={() => changeLang('fr')} />
      <Button title="Spanish" onPress={() => changeLang('es')} />
      <Button title="German" onPress={() => changeLang('de')} />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'red',
    marginTop: 80,
  },
});
