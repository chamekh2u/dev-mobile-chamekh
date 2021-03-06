import React from 'react';
import { SafeAreaView, Image, View, Button } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, List, ListItem, Avatar } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { useState } from 'react/cjs/react.development';
import movieDetails from '../helpers/MovieDetails';
import movieCast from '../helpers/MovieCast';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const DetailsScreen = ({ navigation, favorisList, route, dispatch }) => {

  const [details, setDetails] = useState(movieDetails);
  const [cast, setCast] = useState(movieCast.cast);

  const navigateBack = () => {
    console.log(route.params);
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const getGenres = () => {
    const res = [];
    details.genres.forEach(g => res.push(g.name));
    return res.join(', ')
  }

  

  const renderItem = ({ item, index }) => {

    return (
      <ListItem
        title={`${item.original_name}`}
        description={`${item.character}`}

      // accessoryLeft={() => renderImage(item.poster_path)}
      // accessoryRight={() => renderItemAccessory(item.id)}
      />
    );
  }
  const updateFavoris = (id) => {
    let action;
    action = favorisList.findIndex(i => (i === id)) !== -1 ? { type: 'REMOVE', value: id } : { type: 'ADD', value: id }
    dispatch(action);
 
  } 

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
      <TopNavigation title='MyApp' accessoryLeft={BackAction} />
      <Divider />
      <Layout style={{ flex: 1 }}>
        <Avatar
          size='giant'

          source={{ uri: 'https://image.tmdb.org/t/p/w500' + details.poster_path }}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text category='h2'>{details.original_title}</Text>
        </View>
        <Button onPress={()=> updateFavoris(details.id)} title={(favorisList.findIndex(i => (i === details.id)) !== -1) ? 'déja vu': 'Pas vu'}/>
        <Text category='h6'>{details.release_date}  </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text category='h6'>Genre :  </Text>
          <Text>{getGenres()}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text category='h6'>Runtime :  </Text>
          <Text>{details.runtime}</Text>
        </View>
        <Text category='h6'>Overview :  </Text>
        <Text>{details.overview}</Text>

        <Text category='h5'>Cast({cast.length}) :  </Text>
        <List
          style={{ flex: 1, marginTop: 5 }}
          data={cast}
          renderItem={renderItem}
        />


      </Layout>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    favorisList: state.filmFavoris
  }
}

export default connect(mapStateToProps)(DetailsScreen);