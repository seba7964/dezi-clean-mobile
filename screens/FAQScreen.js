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
      //isExpanded: true,
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

  doNothing() {
    return false;
  }

  checkFunction(bool) {
    //debugger;
    if(bool == true) {
      this.props.onClickFunction
    }
    else {
      this.doNothing
    }
  }
  //ovdje mi je html
  render() {
    return (

      <View>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={0.8}
          //onPress={this.props.onClickFunction}
         //onPress={this.checkFunction(this.props.item.isExpanded)}
         onPress={this.props.item.canBeExpanded ? this.props.onClickFunction : this.doNothing}
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
        //isExpanded: true,
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
    fontSize: 20,
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
    fontSize: 18,
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
    isExpanded: true,
    canBeExpanded : true,
    category_name: 'Što vi možete napraviti kako bi populacija komaraca bila što manja?',
    subcategory: [{ id: 1, val: '1. UKLONITE ili ISPRAZNITE VODU iz svih predmeta (npr. bačve, kante, prazne lončanice te podlošci za lončanice, auto-gume, barke i sl.) na javnim površinama, u dvorištima, vrtovima, na balkonima ili terasama!' }, { id: 2, val: '2. Auto-gume (pneumatske gume), nakon što ste ih ispraznili od vode, SLOŽITE u piramide i PRESLOŽITE ih svakih 15 dana te ih POKRIJTE nepropusnim pokrivalom na način da se onemogući nakupljanje vode!' },  { id: 3, val: '3. ODRŽAVAJTE UREDNIM vaše vrtove i dvorišta, tj. pokosite travu i uklonite suvišno grmlje! Vodu za zalijevanje vrtova trebate redovito MIJENJATI (trošiti) - NE SMIJE stajati dulje od 5 dana u posudi za zalijevanje!' },  { id: 4, val: '4. Rezerve vode HERMETIČKI ZATVORITE poklopcima ili na neki drugi prihvatljiv način!' },  { id: 5, val: '5. ZATRPAJTE jame, bare i slične površine kako se ne bi zadržavala kišnica ili drugi izvori vode!' },  { id: 6, val: '6. Sve spremnike i ostale materijale (npr. plastične folije) ODLAŽITE na način da se IZBJEGNE NAKUPLJANJE kišnice!' },  { id: 7, val: '7. Na GROBLJIMA vaze za cvijeće NAPUNITE vlažnim pijeskom, a sve druge posude koje povremeno koristite za cvijeće i zalijevanje MORATE odlagati na način da se izbjegne nakupljanje vode u slučaju kiše!' }],    
  },
  {
    isExpanded: true,
    canBeExpanded : true,
    category_name: 'Zašto o komarcima moramo razmišljati već danas?',
    subcategory: [{ id: 8, val: 'Zato jer komarci koji su u ožujku i travnju bezazlene ličinke, dolaskom toplijih dana (od svibnja i lipnja) postaju nesnosne leteće krvopije koje:' }, { id: 9, val: '→ mogu prenositi opasne zarazne bolesti' },{ id: 10, val: '→ ubodima uzrokuju značajne kožne probleme' },{ id: 11, val: '→ uzrokuju velike smetnje pri normalnom odvijanju čovjekovih aktivnosti' },{ id: 12, val: '→ kada ih je puno uzrokuju kolektivno nezadovoljstvo građana i turista' }],
  },
  {
    isExpanded: true,
    canBeExpanded : true,
    category_name: 'Kako se komarci legu u vodama stajačicama?',
    subcategory: [{ id: 20, val: '→ polažu jajašca u vode stajaćice ' }, { id: 21, val: '→ u vodi se iz jajašca razvijaju ličinke komaraca ' },{ id: 22, val: '→ iz ličinki nastaje kukuljica ' },{ id: 23, val: '→ iz kukuljica izlijeću odrasli komarci' },],
  },
  {
    isExpanded: true,
    canBeExpanded : true,
    category_name: 'Koje su vrste i brojnost komaraca ovisno o vrsti i veličini legla?',
    subcategory: [{ id: 30, val: 'STANIŠTA (legla) JAJAŠACA, LIČINKI I KUKULJICA' }, { id: 31, val: '→ vode stajaćice, bare, lokve, kanali, potoci, poplavne livade, šikare, šume, bačve s vodom, vaze, auto-gume, odbačene kante i kućanski aparati, podrumi stambenih zgrada, šahtovi, septičke jame te sva druga mjesta i predmeti na kojima voda poslije kiše stoji duže od 5 dana' },{ id: 33, val: 'STANIŠTA (legla) ODRASLIH KOMARACA' },{ id: 34, val: '→ livade, šume, nisko raslinje, krošnja manjeg drveća, grmlje, živica, podrumi stambenih zgrada, napuštene zgrade, neodržavane javne površine i sl.' },{ id: 35, val: ' Kako su komarci ovisni o mikroklimi njihova se aktivnost odvija uglavnom u doba noći, predvečerje ili u rano jutro, kada je izraženija vlažnost zraka i niža temperatura.' },{ id: 36, val: 'Izuzetak čini agresivna vrsta u Republici Hrvatskoj - azijski tigrasti komarac (Aedes albopictus) koja je ishodišno vrsta vlažnih šuma (danas udomaćena u gradovima) i koja bode tijekom čitavog dana.' },],
  },
  {
    isExpanded: true,
    canBeExpanded : true,
    category_name: 'Zašto je suzbijanje odraslih komaraca kratkoročnog učinka tek kada počnu letjeti?',
    subcategory: [{ id: 40, val: '→ odrasli komarci zaposjedaju puno veća područja nego kada su bili u obliku jajašca, ličinke ili kukuljice' }, { id: 41, val: '→ tijekom suzbijanja mnogi odrasli komarci su skriveni, tj. zaštićeni u zelenoj vegetaciji' }, { id: 42, val: '→ ubrzo nakon akcija suzbijanja na jednom području, drugi komarci dolaze iz područja u kojima nije provedeno suzbijanje' }, { id: 43, val: '→ insekticid ne djeluje na zaustavljanje razvoja ličinki pa za nekoliko dana dolazi po invazije nove generacije odraslih komaraca na tretiranom području' }],
  },
  {
    isExpanded: true,
    canBeExpanded : true,
    category_name: 'Kako možemo sami smanjiti pojavu glodavaca u našoj okolini?',
    subcategory: [{ id: 50, val: 'Ne odlažite kućni i ostali organski otpad u vrećicama na javnim površinama nego isključivo u kantama ili kontejnerima kako bi onemogućili pristup i hranjenje štetnih glodavaca!' }, { id: 51, val: '1.	Građevinski i svaki drugi slični otpad odlažite na za to predviđenim mjestima za deponiranje takve vrste otpada!' }, { id: 52, val: '2.	Ne ostavljajte hranu za kućne ljubimce i domaće životinje u vrtovima te niti na drugim javnim površinama!' }, { id: 53, val: '3. Temelji objekata u kojima živite i radite moraju biti građevinski pravilno i kvalitetno izrađeni!' }, { id: 54, val: '4.	Zatvarajte sve ulazne otvore dovodnih i odvodnih instalacija u vašim objektima!' }, { id: 55, val: '5. Sva ulazna vrata trebaju tijesno prianjati uz dovratnike (štokove) kako ne bi bilo suvišnih pukotina kroz koje se mogu provlačiti štetni glodavaci!' }, { id: 56, val: '6.	Ugradite zaštitne mreže na prozore, odzračnike i ostale otvore na objektu te ispravne sifone i prepreke u kanalizacijskom sustavu!' }, { id: 57, val: '7.	Onemogućite kapanje vode iz žljebova te drugih vrsta cijevi i sprječite zadržavanje vode u lokvama!' }, { id: 58, val: '8.	Ako skladištite hranu činite to na način da onemogućite pristup štetnim glodavcima te povremeno kontrolirajte i preslagujte uskladištenu hranu!' }, { id: 59, val: '9.	Štakori i miševi obožavaju grmlje i puzajuće biljke oko objekata u kojima živite i radite pa je nužno potrebno da kontinuirano održavate urednim Vaše vrtove te sve javne površine!' }],
  },
  /*{
    isExpanded: true,
    canBeExpanded : true,
    category_name: 'Item 7',
    subcategory: [{ id: 20, val: 'Sub Cat 20' }],
  }, */
];
