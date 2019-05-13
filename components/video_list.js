/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Search from 'react-native-search-box';


import {
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  Text,
  ListView,
  TouchableHighlight,
} from 'react-native';

import youtubeSearch from '../youtube-api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f9e170',
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 5,
    backgroundColor: 'black',
  },
  rightContainer: {
    flex: 1,
    padding: 5,
    height: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 12,
  },
  separator: {
    height: 3,
    backgroundColor: '#00C696',
  },
  listView: {
    backgroundColor: '#00C696',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class VideoList extends Component {
    static navigationOptions = {
      title: 'Youtube Search',
      headerStyle: {
        backgroundColor: '#00C696',
      },
      headerTintColor: 'white',
    };

    constructor(props) {
      super(props);
      this.state = {
        query: 'true facts',
        isLoading: true,
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
      };

      this.renderVideoCell = this.renderVideoCell.bind(this);
    }

    // ---------- componentDidMount here! -----------//\
    componentDidMount() {
      this.fetchData();
    }

    // ------------ put fetchData here! -------------//

    fetchData() {
      youtubeSearch(this.state.query)
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData),
            isLoading: false,
          });
        }).catch((error) => {
          console.log(error);
        });
    }


    showVideoDetail(video) {
      // pass in video into this.props.navigation.state.params.video in navigated view
      this.props.navigation.navigate('Detail', { video });
    }

    renderLoadingView() {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#00C696" />
        </View>
      );
    }


    renderVideoCell(video) {
      return (
        <TouchableHighlight onPress={() => { this.showVideoDetail(video); }} underlayColor="#00C696">
          <View>
            <View style={styles.container}>
              <Image
                source={{ uri: video.snippet.thumbnails.default.url }}
                style={styles.thumbnail}
              />
              <View style={styles.rightContainer}>
                <Text style={styles.title}>{video.snippet.title}</Text>
                <Text style={styles.subtitle}>{video.snippet.description}</Text>
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      );
    }

    render() {
      if (this.state.isLoading) {
        return this.renderLoadingView();
      }
      return (
        <View>
          <Search
            backgroundColor="#00C696"
            showsCancelButton={false}
            textFieldBackgroundColor="#00C696"
            onChangeText={(query) => {
              this.setState({ query });
              this.fetchData();
            }
            }
          />

          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderVideoCell}
            style={styles.listView}
          />
        </View>
      );
    }
}

export default VideoList;
