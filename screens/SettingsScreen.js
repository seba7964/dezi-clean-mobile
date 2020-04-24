/*Example of Expandable ListView in React Native*/
import React, { Component } from 'react';
import { Header } from 'react-native-elements';
//import react in our project
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
} from 'react-native';
//import basic react native components

class ExpandableItemComponent extends Component {
  //Custom Component for the Expandable List
  constructor() {
    super();
    this.state = {
      layoutHeight: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.item.isExpanded) {
      this.setState(() => {
        return {
          layoutHeight: null,
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0,
        };
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }
  //ovdje mi je html
  render() {
    return (

      <View>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.header}>
          <Text style={styles.headerText}>{this.props.item.category_name}</Text>
        </TouchableOpacity>
        <View
          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
          }}>
          {/*Content under the header of the Expandable List Item*/}
          {this.props.item.subcategory.map((item, key) => (
            <TouchableOpacity
              disabled={true}
              key={key}
              style={styles.content}
              onPress={() => alert('Id: ' + item.id + ' val: ' + item.val)}>
              <Text style={styles.text}>
                {item.val}
              </Text>
              <View style={styles.separator} />
            </TouchableOpacity>
            /* <Text style={styles.text}>
              {item.val}
                </Text> */

          ))}
        </View>
      </View>
    );
  }
}

export default class SettingsScreen extends React.Component {
  //export default function SettingsScreen() {
  constructor() {
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = { listDataSource: CONTENT };
  }

  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false)
    );
    this.setState(() => {
      return {
        listDataSource: array,
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          barStyle="light-content" // or directly
          centerComponent={{ text: 'FAQ', style: { color: '#fff', fontStyle: 'normal', fontSize: 20 } }}
          containerStyle={{
            backgroundColor: '#32CD32',
            justifyContent: 'space-around',
          }}
        />

        <ScrollView>
          {this.state.listDataSource.map((item, key) => (
            <ExpandableItemComponent
              key={item.category_name}
              onClickFunction={this.updateLayout.bind(this, key)}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
SettingsScreen.navigationOptions = {
  title: 'FAQ',
  header: null


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 30,
    backgroundColor: '#F5FCFF',
  },
  topHeading: {
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 20,
  },
  header: {
    borderColor: '#32CD32',
    borderWidth: 1,
    backgroundColor: '#F5FCFF',
    padding: 16,
  },
  headerText: {
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  /* separator: {
     height: 0.5,
     backgroundColor: '#808080',
     width: '95%',
     marginLeft: 16,
     marginRight: 16,
   }, */
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
    //color: 'blue',
    //fontWeight: 'bold',
    //borderColor: 'black',
    //borderWidth: 1
  },
  content: {
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
});

//Dummy content to show
//You can also use dynamic data by calling webservice
const CONTENT = [
  {
    isExpanded: false,
    category_name: 'Kolko često pijete pivo?',
    subcategory: [{ id: 1, val: 'Često' }],
  },
  {
    isExpanded: false,
    category_name: 'Item 2',
    subcategory: [{ id: 4, val: 'Sub Cat 4' }, { id: 5, val: 'Sub Cat 5' }],
  },
  {
    isExpanded: false,
    category_name: 'Item 3',
    subcategory: [{ id: 7, val: 'Sub Cat 7' }, { id: 9, val: 'Sub Cat 9' }],
  },
  {
    isExpanded: false,
    category_name: 'Item 4',
    subcategory: [{ id: 10, val: 'Sub Cat 10' }, { id: 12, val: 'Sub Cat 2' }],
  },
  {
    isExpanded: false,
    category_name: 'Item 5',
    subcategory: [{ id: 13, val: 'Sub Cat 13' }, { id: 15, val: 'Sub Cat 5' }],
  },
  {
    isExpanded: false,
    category_name: 'Item 6',
    subcategory: [{ id: 17, val: 'Sub Cat 17' }, { id: 18, val: 'Sub Cat 8' }],
  },
  {
    isExpanded: false,
    category_name: 'Item 7',
    subcategory: [{ id: 20, val: 'Sub Cat 20' }],
  },
  {
    isExpanded: false,
    category_name: 'Item 8',
    subcategory: [{ id: 22, val: 'Sub Cat 22' }],
  },
  {
    isExpanded: false,
    category_name: 'Item 9',
    subcategory: [{ id: 26, val: 'Sub Cat 26' }, { id: 27, val: 'Sub Cat 7' }],
  },
  {
    isExpanded: false,
    category_name: 'Item 10',
    subcategory: [{ id: 28, val: 'Sub Cat 28' }, { id: 30, val: 'Sub Cat 0' }],
  },
  {
    isExpanded: false,
    category_name: 'Item 11',
    subcategory: [{ id: 31, val: 'Sub Cat 31' }],
  },
  {
    isExpanded: false,
    category_name: 'Item 12',
    subcategory: [{ id: 34, val: 'Sub Cat 34' }],
  },
  {
    isExpanded: false,
    category_name: 'Item 13',
    subcategory: [{ id: 38, val: 'Sub Cat 38' }, { id: 39, val: 'Sub Cat 9' }],
  },
  {
    isExpanded: false,
    category_name: 'Item 14',
    subcategory: [{ id: 40, val: 'Sub Cat 40' }, { id: 42, val: 'Sub Cat 2' }],
  },
  {
    isExpanded: false,
    category_name: 'Item 15',
    subcategory: [{ id: 43, val: 'Sub Cat 43' }, { id: 44, val: 'Sub Cat 44' }],
  },
];
