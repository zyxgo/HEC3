import React from "react";
import { observer, inject } from "mobx-react/native";
// import DaftarObatApotekPage from "../../../stories/screens/apotek/DaftarObatApotekPage";
// import { db } from "../../../firebase";
import * as db1 from "../../../firebase/firebase";

import {
	Icon,
	Text,
	Card,
	View,
	Toast,
	Button,
	Container, Header, Left, Body, Title, Content,
} from "native-base";
import FooterNav from "../../../navigation/FooterNav";
// import moment from "moment";
import styles from "./styles";

export interface Props {
	navigation: any;
	mainStore: any;
	inputBarangApotekStore;
}
export interface State {
	listObats;
}

@inject ("mainStore", "inputBarangApotekStore")
@observer
export default class DaftarObatApotekPageContainer extends React.Component<Props, State> {
	taskObat;

	constructor(props) {
		super(props);
		this.taskObat = db1.db.ref(`apotekStokBarang`);
		this.state = {
			listObats: [],
		};
	}

	getFirstData( p ) {
		p.once("value")
			.then((result) => {
				const r1 = [];
				result.forEach(el => {
					r1.push(el.val());
				});
				this.setState({
					listObats: r1,
				});

			}).catch((err) => {
				console.log(err);
		});
	}

	componentDidMount() {
		this.getFirstData(this.taskObat);
	}

	componentDidUpdate() {
		this.getFirstData(this.taskObat);
	}

	_onApotekUbahData( p ) {
		this.props.inputBarangApotekStore.modalApotekStok( p.idAS, p.namaAS, p.hargaBeliAS,
			p.satuanAS, p.jenisAS, p.jumlahAS, p.hargaJualAS,
		);
		// this.props.inputBarangApotekStore.flagActionUpdate("update");
		this.props.navigation.navigate("InputBarangApotekPage", {action: "update"});
	}

	_onApotekHapusData( p ) {
		this.taskObat.child(`${p.idAS}`).remove();
		Toast.show({
			text: p.namaAS + " berhasil di hapus dari database",
			// buttonText: "Okay",
			duration: 3000,
			position: "top",
			type: "success",
		});
		// this.props.inputBarangApotekStore.flagActionUpdate("update");
		// this.props.navigation.navigate("InputBarangApotekPage", {action: "update"});
	}

	render() {
		// console.log(this.state.listObats);
		const {listObats } = this.state;
		const viewObats = (
			<View>
				{ listObats.map(el =>
					<Card key={el.idAS}>
						<View padder>
							<View>
								<Text style={styles.headerTitle}>{el.namaAS}</Text>
								<Text style={styles.tags}>{el.satuanAS} - {el.jenisAS}</Text>
								<Text style={styles.postDescription}>Jumlah: {el.jumlahAS}</Text>
								<Text style={styles.postDescription}>Harga Beli: {el.hargaBeliAS}</Text>
								<Text style={styles.postDescription}>Harga Jual: {el.hargaJualAS}</Text>
								<View style={styles.view1}>
									<View style={styles.view2}>
										<Button info
											onPress={() => this._onApotekUbahData(el)}
										>
											<Icon name="md-create"/>
											<Text>Ubah</Text>
										</Button>
									</View>
									<View style={styles.view2}>
										<Button info
											onPress={() => this._onApotekHapusData(el)}
										>
											<Icon name="md-remove-circle"/>
											<Text>Hapus</Text>
										</Button>
									</View>
								</View>
							</View>
						</View>
					</Card>,
				)}
			</View>
		);

		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="ios-arrow-back" />
						</Button>
					</Left>
					<Body style={{ flex: 3 }}>
						<Title>Daftar Obat Apotek</Title>
					</Body>
					{/* <Right>
						<Button transparent>
							<Icon
								active
								name="home"
								onPress={() => this.props.navigation.navigate("Home")}
							/>
						</Button>
					</Right> */}
				</Header>

				<Content padder>
					{viewObats}
				</Content>
				<FooterNav navigation={this.props.navigation} />
			</Container>
		);
	}
}
